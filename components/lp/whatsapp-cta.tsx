"use client";

import { MessageCircle } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const WHATSAPP_NUMBER = "5516991294178";

export function lpWhatsAppUrl(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

type Props = {
  /** Slug da LP (ex: "casamentos"). Vai para o dataLayer. */
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
 * No clique, empurra para o dataLayer:
 *   { event: "lp_whatsapp_click", lp_slug, cta_position }
 * No GTM: gatilho "Evento personalizado" = lp_whatsapp_click, ligado à tag de
 * conversão do Google Ads e ao evento Contact do Meta Pixel.
 * Os atributos data-* permitem também um gatilho de clique por seletor.
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
  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "lp_whatsapp_click",
      lp_slug: lp,
      cta_position: position,
    });
  };

  return (
    <a
      href={lpWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
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
