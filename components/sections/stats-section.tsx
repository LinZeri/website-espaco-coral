"use client";

import { useEffect, useRef } from "react";
import { REVIEWS } from "@/lib/seo-config";

type Stat = {
  label: string;
  target: number;
  suffix: string;
  format: (n: number) => string;
};

const stats: Stat[] = [
  {
    label: "Área total",
    target: 12000,
    suffix: " m²",
    format: (n) => Math.round(n).toLocaleString("pt-BR"),
  },
  {
    label: "Capacidade",
    target: 320,
    suffix: " pessoas",
    format: (n) => Math.round(n).toLocaleString("pt-BR"),
  },
  {
    label: "Avaliações",
    target: REVIEWS.reviewCount,
    suffix: " reviews",
    format: (n) => Math.round(n).toLocaleString("pt-BR"),
  },
  {
    label: "Google",
    target: REVIEWS.ratingValue,
    suffix: "★",
    format: (n) => n.toFixed(0),
  },
];

const displayValue = (stat: Stat, n: number) => stat.format(n) + stat.suffix;

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Respeita usuários que preferem menos movimento: mostra o valor final.
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animate = () => {
      if (prefersReduced) return;
      const duration = 1400;
      let startTime: number | null = null;
      const tick = (now: number) => {
        if (startTime === null) startTime = now;
        const t = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
        stats.forEach((stat, i) => {
          const node = valueRefs.current[i];
          if (node) node.textContent = displayValue(stat, stat.target * eased);
        });
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            animate();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-background py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-2 border-y border-border md:grid-cols-4">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0 md:py-12"
          >
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="text-4xl font-semibold tabular-nums text-foreground md:text-5xl">
              <span ref={(el) => { valueRefs.current[i] = el; }}>
                {displayValue(stat, stat.target)}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
