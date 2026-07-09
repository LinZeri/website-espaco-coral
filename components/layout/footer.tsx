import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20saber%20mais%20sobre%20o%20Espa%C3%A7o%20Coral.";

const navLinks = [
  { label: "O Espaço", href: "/estrutura" },
  { label: "Eventos", href: "/eventos" },
  { label: "Galeria", href: "/galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

const cityLinks = [
  { label: "Ribeirão Preto", href: "/cidades/ribeirao-preto" },
  { label: "Franca", href: "/cidades/franca" },
  { label: "Todas as cidades", href: "/cidades" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
            <Image
              src="/images/logo/logo-coral-completo.svg"
              alt="Espaço Coral"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Espaço premium para casamentos, festas de 15 anos e eventos em
              Batatais, SP.
            </p>
            <div className="flex gap-6 mt-2 justify-center md:justify-start md:gap-4">
              <a
                href="https://www.instagram.com/espaco.coral"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 md:w-5 md:h-5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="3"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a
                href="https://www.facebook.com/EspacoCoralEventos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-14 h-14 md:w-5 md:h-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
              Navegação
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cidades atendidas */}
          <div className="flex flex-col gap-3 items-center text-center md:items-start md:text-left">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
              Atendemos
            </p>
            {cityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4 items-center text-center md:items-start md:text-left">
            <p className="text-xs font-medium tracking-widest uppercase text-muted-foreground mb-1">
              Contato
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone size={14} />
              (16) 99129-4178
            </a>
            <address className="flex items-start gap-2 text-sm text-muted-foreground not-italic leading-relaxed">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>
                Rua Matheus Marinelli, 18
                <br />
                Jardim Elena, Batatais - SP
                <br />
                CEP 14300-111
              </span>
            </address>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Espaço Coral. Todos os direitos reservados.</p>
          <p>Batatais, São Paulo, Brasil</p>
        </div>
      </div>
    </footer>
  );
}
