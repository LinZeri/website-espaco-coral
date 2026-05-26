import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { contatoSchema } from "@/lib/schema";

const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials-section").then(
    (m) => m.TestimonialsSection
  )
);

export const metadata: Metadata = {
  title: "Contato e Endereço em Batatais, SP",
  description:
    "Fale com o Espaço Coral pelo WhatsApp (16) 99129-4178. Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP. Agende sua visita ao espaço.",
  alternates: { canonical: "https://coraleventos.com.br/contato" },
  openGraph: {
    title: "Contato do Espaço Coral em Batatais, SP",
    description:
      "WhatsApp (16) 99129-4178. Rua Matheus Marinelli, 18, Jardim Elena, Batatais, SP.",
    url: "https://coraleventos.com.br/contato",
    images: [
      {
        url: "/og/contato.jpg",
        width: 1200,
        height: 630,
        alt: "Fachada do Espaço Coral ao entardecer em Batatais, SP",
      },
    ],
  },
};

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Espa%C3%A7o%20Coral.";

export default function ContatoPage() {
  return (
    <>
      <JsonLd data={contatoSchema()} />
      <Header />
      <main>
        <PageHero
          title="Fale Conosco"
          subtitle="Espaço Coral em Batatais, SP"
          imageSrc="/images/spaces/fachada-entardecer.webp"
          imageAlt="Fachada do Espaço Coral ao entardecer em Batatais SP"
        />

        {/* CTA + Info */}
        <section className="bg-background px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32">
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:gap-24">
            {/* WhatsApp CTA */}
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">
                Canal principal de atendimento
              </p>
              <h2 className="font-display mb-6 text-4xl font-normal tracking-tight text-foreground md:text-5xl">
                WhatsApp
              </h2>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground">
                A forma mais rápida de entrar em contato com o Espaço Coral é
                pelo WhatsApp. Nossa equipe responde com agilidade para verificar
                disponibilidade, esclarecer dúvidas e agendar visitas.
              </p>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-foreground px-8 py-4 text-sm font-medium tracking-wide text-white transition-colors duration-200 hover:bg-foreground/80"
              >
                <MessageCircle size={18} />
                Enviar mensagem
              </a>
              <p className="mt-4 text-sm text-muted-foreground">
                (16) 99129-4178
              </p>

              {/* Divider */}
              <div className="gold-divider my-10 opacity-30" />

              {/* Info */}
              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin size={16} className="mt-1 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Endereço
                    </p>
                    <address className="text-sm text-foreground not-italic leading-relaxed">
                      Rua Matheus Marinelli, 18
                      <br />
                      Jardim Elena · Batatais, SP
                      <br />
                      CEP 14300-111
                    </address>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone size={16} className="mt-1 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Telefone / WhatsApp
                    </p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground hover:text-gold transition-colors"
                    >
                      (16) 99129-4178
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="3"/>
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
                    </svg>
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                      Redes Sociais
                    </p>
                    <div className="flex flex-col gap-1">
                      <a
                        href="https://www.instagram.com/espaco.coral"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-gold transition-colors"
                      >
                        @espaco.coral no Instagram
                      </a>
                      <a
                        href="https://www.facebook.com/EspacoCoralEventos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-gold transition-colors"
                      >
                        EspacoCoralEventos no Facebook
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Como chegar
              </p>
              <div className="overflow-hidden rounded-2xl border border-border" style={{ height: "420px" }}>
                <iframe
                  src="https://www.google.com/maps?q=Rua+Matheus+Marinelli+18+Jardim+Elena+Batatais+SP+14300-111&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do Espaço Coral em Batatais, SP"
                />
              </div>
              <a
                href="https://maps.app.goo.gl/zhbZpzoYTjqZHc967"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin size={14} />
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </section>

        <TestimonialsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
