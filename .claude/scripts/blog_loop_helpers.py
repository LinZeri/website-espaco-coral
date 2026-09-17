#!/usr/bin/env python3
"""
blog_loop_helpers.py

Helper module for the /blog-loop autonomous blog production skill.

Stateless functions operating on a project's blog-queue.json and
blog-loop-log.md. Intended to be invoked via Bash from the orchestrator
SKILL.md preamble, the Workflow script's commit stage, or directly by an
agent.

All file I/O uses UTF-8 with LF newlines (queue.json), and is safe to
run concurrently with file-locking at the queue.json level via .lock
sentinel (caller's responsibility).

Commands (argparse subcommands):
  pick-batch          Print N pending items as JSON array.
  mark-in-progress    Flip an item to in_progress with started_at + iteration id.
  mark-published      Flip to published with score, commit_sha, published_date.
  mark-failed         Flip to failed with last_error message.
  replenish-check     Print {pending, target, need_replenish, count_to_add}.
  author-for-date     Print the chosen author for a given date (LRU + 1/day cap).
  append-log          Append a row to docs/blog-loop-log.md.
  load-config         Print the resolved .blog-loop.config.json as JSON (defaults applied).

Usage examples:
  python blog_loop_helpers.py pick-batch --queue docs/blog-queue.json --n 5
  python blog_loop_helpers.py mark-in-progress --queue docs/blog-queue.json \\
      --slug my-slug --iteration abc123
  python blog_loop_helpers.py replenish-check --queue docs/blog-queue.json \\
      --batch-size 5
  python blog_loop_helpers.py author-for-date --queue docs/blog-queue.json \\
      --date 2026-06-15
"""

import argparse
import json
import os
import sys
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_CONFIG = {
    "branch": "vercel-deploy",
    "remote": "origin",
    "blogDir": "blog/posts",
    "schemaDir": "blog/schemas",
    "briefDir": "briefs",
    "imageDir": "public/blog/images",
    "queueFile": "docs/blog-queue.json",
    "logFile": "docs/blog-loop-log.md",
    "strategyFile": "docs/blog-strategy.md",
    "lockFile": "docs/.blog-loop.lock",
    "drySentinel": "docs/.blog-loop-dry-run",
    "batchSize": 5,
    "reschedule": "auto",
    "scheduleCadence": "daily-09-central",
    "preflightGates": [1, 2, 5],
    "hero": {
        "model": "imagen-4.0-generate-001",
        "aspectRatio": "16:9",
        "format": "webp",
        "size": [1200, 630],
    },
    "deploy": {"mode": "auto-push", "prTarget": None},
    "escalationChannel": "push-notification",
    "replenishThresholdMultiplier": 2,
}


def load_queue(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def save_queue(path, queue):
    queue["updated"] = datetime.now(timezone.utc).isoformat()
    with open(path, "w", encoding="utf-8", newline="\n") as f:
        json.dump(queue, f, indent=2, ensure_ascii=False)
        f.write("\n")


def cmd_load_config(args):
    config_path = Path(args.project) / ".blog-loop.config.json"
    config = dict(DEFAULT_CONFIG)
    if config_path.exists():
        with open(config_path, "r", encoding="utf-8") as f:
            user_config = json.load(f)
        config.update(user_config)
        for key in ("hero", "deploy"):
            if key in user_config and isinstance(user_config[key], dict):
                merged = dict(DEFAULT_CONFIG[key])
                merged.update(user_config[key])
                config[key] = merged
    print(json.dumps(config, indent=2))


def cmd_pick_batch(args):
    queue = load_queue(args.queue)
    pending = [
        it for it in queue["items"]
        if it.get("status") == "pending" and it.get("attempts", 0) < 2
    ]
    batch = pending[: args.n]
    print(json.dumps(batch, indent=2, ensure_ascii=False))


def cmd_mark_in_progress(args):
    queue = load_queue(args.queue)
    iso_now = datetime.now(timezone.utc).isoformat()
    for it in queue["items"]:
        if it.get("slug") == args.slug:
            it["status"] = "in_progress"
            it["started_at"] = iso_now
            it["attempts"] = it.get("attempts", 0) + 1
            it["iteration_id"] = args.iteration
            save_queue(args.queue, queue)
            print(json.dumps({"ok": True, "slug": args.slug, "started_at": iso_now}))
            return
    print(json.dumps({"ok": False, "error": f"slug {args.slug} not found"}))
    sys.exit(1)


def cmd_mark_published(args):
    queue = load_queue(args.queue)
    for it in queue["items"]:
        if it.get("slug") == args.slug:
            it["status"] = "published"
            it["last_score"] = args.score
            it["commit_sha"] = args.commit
            it["published_date"] = args.date or it.get("publish_date")
            it["last_error"] = None
            counts = queue.setdefault("author_daily_counts", {})
            pub_date = it.get("published_date") or it.get("publish_date")
            if pub_date and it.get("author"):
                day = counts.setdefault(pub_date, {})
                day[it["author"]] = day.get(it["author"], 0) + 1
            save_queue(args.queue, queue)
            print(json.dumps({"ok": True, "slug": args.slug, "status": "published"}))
            return
    print(json.dumps({"ok": False, "error": f"slug {args.slug} not found"}))
    sys.exit(1)


def cmd_mark_failed(args):
    queue = load_queue(args.queue)
    for it in queue["items"]:
        if it.get("slug") == args.slug:
            it["status"] = "failed" if it.get("attempts", 0) >= 2 else "pending"
            it["last_error"] = args.error
            save_queue(args.queue, queue)
            print(json.dumps({
                "ok": True,
                "slug": args.slug,
                "status": it["status"],
                "attempts": it["attempts"],
            }))
            return
    print(json.dumps({"ok": False, "error": f"slug {args.slug} not found"}))
    sys.exit(1)


def cmd_replenish_check(args):
    queue = load_queue(args.queue)
    pending = sum(
        1 for it in queue["items"]
        if it.get("status") == "pending" and it.get("attempts", 0) < 2
    )
    target = args.batch_size * args.multiplier
    need = pending < target
    print(json.dumps({
        "pending": pending,
        "target": target,
        "need_replenish": need,
        "count_to_add": max(target - pending, args.batch_size) if need else 0,
    }))


def cmd_author_for_date(args):
    queue = load_queue(args.queue)
    authors = queue.get("authors", [])
    if not authors:
        print(json.dumps({"ok": False, "error": "no authors defined in queue"}))
        sys.exit(1)
    counts = queue.get("author_daily_counts", {}).get(args.date, {})
    eligible = [a for a in authors if counts.get(a, 0) < args.cap]
    if not eligible:
        print(json.dumps({"ok": False, "error": "no eligible author for date", "date": args.date}))
        sys.exit(2)
    published = [
        it.get("author") for it in queue["items"]
        if it.get("status") == "published" and it.get("author")
    ]
    recent = published[-5:]
    chosen = None
    for a in eligible:
        if a not in recent:
            chosen = a
            break
    if chosen is None:
        chosen = eligible[0]
    print(json.dumps({"ok": True, "author": chosen, "date": args.date, "eligible": eligible}))


def cmd_append_log(args):
    row = (
        f"| {args.timestamp} | {args.slug} | {args.cluster} | {args.author} "
        f"| {args.score} | {args.rewrites} | {args.date} | {args.commit} "
        f"| {args.duration} | {args.warnings} |\n"
    )
    log_path = Path(args.log)
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with open(log_path, "a", encoding="utf-8", newline="\n") as f:
        f.write(row)
    print(json.dumps({"ok": True}))


def cmd_check_lock(args):
    lock_path = Path(args.lock)
    if not lock_path.exists():
        print(json.dumps({"locked": False}))
        return
    mtime = datetime.fromtimestamp(lock_path.stat().st_mtime, tz=timezone.utc)
    age_seconds = (datetime.now(timezone.utc) - mtime).total_seconds()
    stale = age_seconds > args.ttl
    print(json.dumps({
        "locked": True,
        "stale": stale,
        "age_seconds": age_seconds,
        "ttl": args.ttl,
    }))


def cmd_acquire_lock(args):
    lock_path = Path(args.lock)
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    content = f"{datetime.now(timezone.utc).isoformat()} {args.iteration}\n"
    with open(lock_path, "w", encoding="utf-8") as f:
        f.write(content)
    print(json.dumps({"ok": True, "iteration": args.iteration}))


def cmd_release_lock(args):
    lock_path = Path(args.lock)
    if lock_path.exists():
        lock_path.unlink()
    print(json.dumps({"ok": True}))


def cmd_recover_stale(args):
    queue = load_queue(args.queue)
    recovered = []
    now = datetime.now(timezone.utc)
    for it in queue["items"]:
        if it.get("status") != "in_progress":
            continue
        started = it.get("started_at")
        if not started:
            continue
        try:
            started_dt = datetime.fromisoformat(started.replace("Z", "+00:00"))
        except ValueError:
            continue
        age = (now - started_dt).total_seconds()
        if age > args.ttl:
            it["status"] = "pending"
            it["last_error"] = "auto_recovered_stale"
            recovered.append(it.get("slug"))
    if recovered:
        save_queue(args.queue, queue)
    print(json.dumps({"recovered": recovered}))


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawTextHelpFormatter)
    sub = parser.add_subparsers(dest="cmd", required=True)

    p_lc = sub.add_parser("load-config")
    p_lc.add_argument("--project", default=".")
    p_lc.set_defaults(func=cmd_load_config)

    p_pb = sub.add_parser("pick-batch")
    p_pb.add_argument("--queue", required=True)
    p_pb.add_argument("--n", type=int, default=5)
    p_pb.set_defaults(func=cmd_pick_batch)

    p_mip = sub.add_parser("mark-in-progress")
    p_mip.add_argument("--queue", required=True)
    p_mip.add_argument("--slug", required=True)
    p_mip.add_argument("--iteration", required=True)
    p_mip.set_defaults(func=cmd_mark_in_progress)

    p_mp = sub.add_parser("mark-published")
    p_mp.add_argument("--queue", required=True)
    p_mp.add_argument("--slug", required=True)
    p_mp.add_argument("--score", type=int, required=True)
    p_mp.add_argument("--commit", required=True)
    p_mp.add_argument("--date", default=None)
    p_mp.set_defaults(func=cmd_mark_published)

    p_mf = sub.add_parser("mark-failed")
    p_mf.add_argument("--queue", required=True)
    p_mf.add_argument("--slug", required=True)
    p_mf.add_argument("--error", required=True)
    p_mf.set_defaults(func=cmd_mark_failed)

    p_rc = sub.add_parser("replenish-check")
    p_rc.add_argument("--queue", required=True)
    p_rc.add_argument("--batch-size", type=int, required=True)
    p_rc.add_argument("--multiplier", type=int, default=2)
    p_rc.set_defaults(func=cmd_replenish_check)

    p_afd = sub.add_parser("author-for-date")
    p_afd.add_argument("--queue", required=True)
    p_afd.add_argument("--date", required=True)
    p_afd.add_argument("--cap", type=int, default=1)
    p_afd.set_defaults(func=cmd_author_for_date)

    p_al = sub.add_parser("append-log")
    p_al.add_argument("--log", required=True)
    p_al.add_argument("--timestamp", required=True)
    p_al.add_argument("--slug", required=True)
    p_al.add_argument("--cluster", required=True)
    p_al.add_argument("--author", required=True)
    p_al.add_argument("--score", default="-")
    p_al.add_argument("--rewrites", default="0")
    p_al.add_argument("--date", required=True)
    p_al.add_argument("--commit", default="-")
    p_al.add_argument("--duration", default="-")
    p_al.add_argument("--warnings", default="")
    p_al.set_defaults(func=cmd_append_log)

    p_cl = sub.add_parser("check-lock")
    p_cl.add_argument("--lock", required=True)
    p_cl.add_argument("--ttl", type=int, default=7200)
    p_cl.set_defaults(func=cmd_check_lock)

    p_aq = sub.add_parser("acquire-lock")
    p_aq.add_argument("--lock", required=True)
    p_aq.add_argument("--iteration", required=True)
    p_aq.set_defaults(func=cmd_acquire_lock)

    p_rl = sub.add_parser("release-lock")
    p_rl.add_argument("--lock", required=True)
    p_rl.set_defaults(func=cmd_release_lock)

    p_rs = sub.add_parser("recover-stale")
    p_rs.add_argument("--queue", required=True)
    p_rs.add_argument("--ttl", type=int, default=7200)
    p_rs.set_defaults(func=cmd_recover_stale)

    args = parser.parse_args()
    args.func(args)


if __name__ == "__main__":
    main()
