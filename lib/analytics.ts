/**
 * Rastreamento do site, 100% em código (sem GTM).
 *
 * Tudo que é medido passa por aqui: IDs, eventos e para onde cada evento vai.
 * Para adicionar uma plataforma ou um evento, editar este arquivo.
 *
 *   GA4 ........... propriedade 509223804, stream G-C11MGCM7W2
 *   Google Ads .... AW-ID + rótulo da conversão de WhatsApp (preencher abaixo)
 *   Meta Pixel .... 1442151020219648
 *
 * Conversão principal: clique em qualquer link de WhatsApp (wa.me).
 * Capturado por delegação global em components/analytics/analytics-listener.tsx,
 * então nenhum botão precisa de onClick próprio. Para dar nome à origem do
 * clique, basta o link (ou um ancestral) ter data-cta-position="..." e,
 * em LPs, data-lp="slug".
 */

export const GA4_MEASUREMENT_ID = "G-C11MGCM7W2";
export const META_PIXEL_ID = "1442151020219648";

/**
 * Google Ads. Deixar null até a conta ter a ação de conversão criada.
 * GOOGLE_ADS_ID: "AW-123456789"
 * GOOGLE_ADS_WHATSAPP_LABEL: rótulo da ação de conversão (ex: "AbCdEfGhIj")
 */
export const GOOGLE_ADS_ID: string | null = null;
export const GOOGLE_ADS_WHATSAPP_LABEL: string | null = null;

type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.gtag?.(...args);
}

function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.fbq?.(...args);
}

export type WhatsAppClick = {
  /** De onde veio o clique: header, footer, flutuante, hero, final... */
  position: string;
  /** Slug da LP, quando o clique foi numa landing page de campanha. */
  lp?: string;
  /** Texto visível do botão (truncado). */
  text?: string;
};

/** Conversão principal: lead via WhatsApp. Vai para GA4, Google Ads e Meta. */
export function trackWhatsAppClick({ position, lp, text }: WhatsAppClick) {
  const params: Params = {
    cta_position: position,
    lp_slug: lp,
    link_text: text,
    page_path: window.location.pathname,
  };

  // GA4: evento-chave (marcado como key event na propriedade).
  gtag("event", "whatsapp_click", params);

  // Google Ads: conversão direta, quando configurada.
  if (GOOGLE_ADS_ID && GOOGLE_ADS_WHATSAPP_LABEL) {
    gtag("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_WHATSAPP_LABEL}`,
    });
  }

  // Meta: evento padrão Contact.
  fbq("track", "Contact", { content_name: lp ? `lp:${lp}` : position });
}

/** PageView do Pixel em navegação client-side (o GA4 cuida disso sozinho). */
export function trackMetaPageView() {
  fbq("track", "PageView");
}

/** Snippet inline que inicializa gtag + Pixel (filas antes dos scripts carregarem). */
export function trackingBootstrap() {
  const adsConfig = GOOGLE_ADS_ID ? `gtag('config','${GOOGLE_ADS_ID}');` : "";
  return `window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=gtag;
gtag('js',new Date());
gtag('config','${GA4_MEASUREMENT_ID}');
${adsConfig}
!function(f){if(f.fbq)return;var n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[]}(window);
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`;
}
