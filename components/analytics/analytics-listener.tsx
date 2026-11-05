"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackMetaPageView, trackWhatsAppClick } from "@/lib/analytics";

const WHATSAPP_HREF = /(wa\.me|api\.whatsapp\.com|whatsapp:\/\/)/i;

function positionOf(link: HTMLAnchorElement): string {
  const tagged = link.closest<HTMLElement>("[data-cta-position]");
  if (tagged?.dataset.ctaPosition) return tagged.dataset.ctaPosition;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "footer";
  const section = link.closest<HTMLElement>("section[id]");
  if (section?.id) return `section:${section.id}`;
  return "conteudo";
}

/**
 * Um único listener global: todo clique em link de WhatsApp vira conversão,
 * inclusive links novos em páginas, posts MDX e LPs, sem código extra.
 * Também dispara o PageView do Pixel nas navegações client-side.
 */
export function AnalyticsListener() {
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false; // PageView inicial já sai no bootstrap
      return;
    }
    trackMetaPageView();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || !WHATSAPP_HREF.test(link.href)) return;

      trackWhatsAppClick({
        position: positionOf(link),
        lp: link.closest<HTMLElement>("[data-lp]")?.dataset.lp,
        text: (link.textContent || link.getAttribute("aria-label") || "")
          .trim()
          .slice(0, 80),
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
