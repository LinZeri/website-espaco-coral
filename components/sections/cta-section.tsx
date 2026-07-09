import { MessageCircle, MapPin } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20ao%20Espa%C3%A7o%20Coral.";

export function CtaSection() {
  return (
    <section className="bg-sand py-24 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <div className="gold-divider w-16 mx-auto mb-10 opacity-60" />

        <h2 className="font-display text-4xl md:text-6xl text-foreground font-normal tracking-tight mb-6">
          O seu evento começa
          <br />
          com uma visita.
        </h2>

        <p className="text-foreground/70 text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Agende uma visita sem compromisso e conheça pessoalmente cada detalhe
          do Espaço Coral. Será um prazer recebê-los.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 bg-gold text-foreground text-sm font-medium tracking-wide hover:bg-gold-light transition-colors duration-200"
          >
            <MessageCircle size={16} />
            Agendar visita pelo WhatsApp
          </a>
          <a
            href="https://maps.app.goo.gl/RRvRvYMonqZWbR1v8"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 border border-foreground/20 text-foreground/70 text-sm font-medium tracking-wide hover:text-foreground hover:border-foreground/40 transition-colors duration-200"
          >
            <MapPin size={16} />
            Ver no mapa
          </a>
        </div>

        <p className="mt-8 text-foreground/60 text-xs">
          Rua Matheus Marinelli, 18 · Jardim Elena · Batatais, SP
        </p>
      </div>
    </section>
  );
}
