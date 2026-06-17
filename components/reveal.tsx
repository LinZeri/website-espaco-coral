"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Atraso da animação em ms (para efeito escalonado). */
  delay?: number;
  /** Direção da entrada. */
  from?: "up" | "left" | "right";
  as?: "div" | "section" | "li";
}

/**
 * Wrapper de animação de entrada por scroll.
 *
 * Performance (regras do projeto): NÃO usa estado por pixel de scroll.
 * Um único IntersectionObserver dispara um único toggle de estado e
 * desconecta em seguida. A transição é puramente CSS (transform/opacity),
 * sem repaints contínuos. Respeita prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduce) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hidden =
    from === "left"
      ? "opacity-0 -translate-x-8"
      : from === "right"
        ? "opacity-0 translate-x-8"
        : "opacity-0 translate-y-8";

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all duration-700 ease-out motion-reduce:transition-none",
        shown ? "translate-x-0 translate-y-0 opacity-100" : hidden,
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
