"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  useEffect(() => {
    const sentinel = document.getElementById("header-scroll-sentinel");
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMobile(null);
  };

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-3xl transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md rounded-full"
          : "bg-transparent"
      }`}
      style={{
        boxShadow: isScrolled
          ? "rgba(14, 63, 126, 0.04) 0px 0px 0px 1px, rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.04) 0px 6px 6px -3px, rgba(14, 63, 126, 0.04) 0px 12px 12px -6px, rgba(14, 63, 126, 0.04) 0px 24px 24px -12px"
          : "none",
      }}
    >
      <div className="flex items-center justify-between px-2 pl-5 py-2 transition-all duration-300">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo/logo-coral-completo.svg"
            alt="Espaço Coral"
            width={120}
            height={34}
            className={`h-7 w-auto brightness-0 ${isScrolled ? "" : "invert"}`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={`flex items-center gap-1 text-sm transition-colors ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/90 hover:text-white drop-shadow-sm"}`}
                >
                  {link.label}
                  <ChevronDown
                    size={13}
                    className="transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>

                {/* Dropdown */}
                <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[180px] overflow-hidden rounded-xl border border-border bg-background shadow-lg">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-5 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        {child.label}
                      </Link>
                    ))}
                    <div className="border-t border-border">
                      <Link
                        href={link.href}
                        className="block px-5 py-3 text-xs uppercase tracking-widest text-gold transition-colors hover:bg-secondary"
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
                className={`text-sm transition-colors ${isScrolled ? "text-foreground/70 hover:text-foreground" : "text-white/90 hover:text-white drop-shadow-sm"}`}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* CTA */}
        <div className="hidden items-center md:flex">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isScrolled
                ? "bg-gold text-white hover:bg-gold-dark"
                : "bg-white text-foreground hover:bg-white/90"
            }`}
          >
            <MessageCircle size={14} />
            Agendar visita
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white transition-colors md:hidden"
          aria-label="Abrir menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="rounded-b-2xl border-t border-border bg-background px-6 py-8 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      href={link.href}
                      className="py-3 text-lg text-foreground"
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
                    <div className="mb-2 ml-4 flex flex-col gap-1 border-l border-border pl-4">
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
                  className="py-3 text-lg text-foreground"
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
              className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3 text-center text-sm font-medium text-white"
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
