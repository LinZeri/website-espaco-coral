"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MessageCircle, ChevronDown } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5516991294178?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20visita%20ao%20Espa%C3%A7o%20Coral.";

type NavChild = { label: string; href: string };
type NavLink = { label: string; href: string; children?: NavChild[] };

const navLinks: NavLink[] = [
  { label: "O Espaço", href: "/estrutura" },
  {
    label: "Eventos",
    href: "/eventos",
    children: [
      { label: "Casamentos", href: "/eventos/casamentos" },
      { label: "Festas de 15 Anos", href: "/eventos/15-anos" },
      { label: "Corporativo", href: "/eventos/corporativo" },
    ],
  },
  { label: "Galeria", href: "/galeria" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const pathname = usePathname();

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMobile(null);
  };

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0" onClick={closeMenu}>
          <Image
            src="/images/logo/logo-coral-completo.svg"
            alt="Espaço Coral"
            width={130}
            height={38}
            priority
            className="h-10 w-auto brightness-0"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-7 lg:gap-9 md:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                    isActive(link.href) ? "text-gold" : "text-foreground"
                  }`}
                >
                  {link.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                  <span
                    className={`pointer-events-none absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                      isActive(link.href) ? "w-full" : "w-0"
                    }`}
                  />
                </Link>

                {/* Dropdown */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[200px] overflow-hidden border border-border bg-background shadow-md">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-muted-foreground transition-colors hover:bg-cream hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                    <div className="border-t border-border">
                      <Link
                        href={link.href}
                        className="block px-5 py-3 text-xs uppercase tracking-widest text-gold-text transition-colors hover:bg-cream"
                      >
                        Ver todos os eventos
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium uppercase tracking-[0.15em] transition-colors hover:text-gold ${
                  isActive(link.href) ? "text-gold" : "text-foreground"
                }`}
              >
                {link.label}
                <span
                  className={`pointer-events-none absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            )
          )}
        </nav>

        {/* CTA (desktop) */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-xs font-medium uppercase tracking-widest text-foreground transition-colors hover:bg-gold-light md:flex"
        >
          <MessageCircle size={14} />
          Agendar visita
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex h-11 w-11 items-center justify-center text-foreground transition-colors md:hidden"
          aria-label="Abrir menu"
        >
          {isMenuOpen ? (
            <X size={28} strokeWidth={2} />
          ) : (
            <Menu size={28} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className={`py-3 text-sm font-medium uppercase tracking-[0.15em] ${
                        isActive(link.href) ? "text-gold" : "text-foreground"
                      }`}
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedMobile(
                          expandedMobile === link.href ? null : link.href
                        )
                      }
                      className="p-2 text-muted-foreground"
                      aria-label="Expandir sub-menu"
                    >
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          expandedMobile === link.href ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                  {expandedMobile === link.href && (
                    <div className="mb-2 ml-1 flex flex-col gap-1 border-l border-border pl-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                          onClick={closeMenu}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-3 text-sm font-medium uppercase tracking-[0.15em] ${
                    isActive(link.href) ? "text-gold" : "text-foreground"
                  }`}
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              )
            )}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-center text-xs font-medium uppercase tracking-widest text-foreground"
              onClick={closeMenu}
            >
              <MessageCircle size={14} />
              Agendar visita
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
