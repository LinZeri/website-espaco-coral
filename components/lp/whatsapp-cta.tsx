"use client";

import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5516991294178";

export function lpWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Props = {
  /** Slug da LP (ex: "casamentos"). Vai como lp_slug na conversão. */
  lp: string;
  /** Posição do botão na página (ex: "hero", "final", "flutuante"). */
  position: string;
  /** Mensagem pré-preenchida no WhatsApp. */
  message: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  showIcon?: boolean;
};

/**
 * Botão de WhatsApp das landing pages de campanha.
 *
 * A conversão é registrada pelo listener global (components/analytics/
 * analytics-listener.tsx), que lê data-lp e data-cta-position deste link e
 * envia whatsapp_click (GA4), a conversão do Google Ads e Contact (Meta).
 */
export function LpWhatsAppCta({
  lp,
  position,
  message,
  children,
  className,
  ariaLabel,
  showIcon = true,
}: Props) {
  return (
    <a
      href={lpWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      data-lp={lp}
      data-cta-position={position}
      aria-label={ariaLabel}
      className={className}
    >
      {showIcon && <MessageCircle size={18} aria-hidden="true" />}
      {children}
    </a>
  );
}
