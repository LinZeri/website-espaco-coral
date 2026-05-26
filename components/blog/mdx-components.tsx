import Image from "next/image";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ComponentType, ReactNode } from "react";

// Tipo dos componentes MDX. Define localmente para não depender de `mdx/types`,
// que nem sempre é resolvido sem `@types/mdx` explícito.
type BlogMdxComponents = Record<string, ComponentType<Record<string, unknown>>>;

/**
 * Componentes MDX customizados que renderizam markdown produzido por
 * `/blog write` com o design system do Espaço Coral.
 *
 * Decisões:
 *  - Imagens com `src` que começa com `/` usam next/image (otimização SSG).
 *    URLs externas usam <img loading="lazy"> direto.
 *  - Links internos (começam com `/`) usam next/link.
 *  - Blockquotes ganham borda dourada à esquerda (estilo "Em resumo").
 *  - Tabelas envolvem em <div overflow-x-auto> para mobile.
 *  - Headings recebem âncora invisível (id) para deep linking.
 */

function slugifyHeading(text: ReactNode): string {
  if (typeof text !== "string") return "";
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function H1(props: ComponentPropsWithoutRef<"h1">) {
  return (
    <h1
      className="font-display mb-8 mt-12 text-4xl font-normal tracking-tight text-foreground md:text-5xl"
      {...props}
    />
  );
}

function H2({ children, ...rest }: ComponentPropsWithoutRef<"h2">) {
  const id = rest.id ?? slugifyHeading(children);
  return (
    <h2
      id={id}
      className="font-display mb-6 mt-16 scroll-mt-24 text-3xl font-normal tracking-tight text-foreground md:text-4xl"
      {...rest}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...rest }: ComponentPropsWithoutRef<"h3">) {
  const id = rest.id ?? slugifyHeading(children);
  return (
    <h3
      id={id}
      className="font-display mb-4 mt-10 scroll-mt-24 text-2xl font-normal tracking-tight text-foreground"
      {...rest}
    >
      {children}
    </h3>
  );
}

function H4(props: ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className="mb-3 mt-8 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    />
  );
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mb-6 text-base leading-relaxed text-muted-foreground md:text-lg md:leading-relaxed"
      {...props}
    />
  );
}

function Anchor({ href = "#", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    "font-medium text-foreground underline decoration-gold decoration-2 underline-offset-4 transition-colors hover:text-gold-dark";

  if (isInternal && !href.startsWith("#")) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mb-6 space-y-2 pl-6 text-base leading-relaxed text-muted-foreground marker:text-gold md:text-lg"
      {...props}
    />
  );
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mb-6 list-decimal space-y-2 pl-6 text-base leading-relaxed text-muted-foreground marker:text-gold marker:font-display md:text-lg"
      {...props}
    />
  );
}

function ListItem(props: ComponentPropsWithoutRef<"li">) {
  return <li className="pl-1" {...props} />;
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
  return (
    <blockquote
      className="my-8 border-l-2 border-gold bg-secondary/40 px-6 py-5 text-base leading-relaxed text-foreground md:text-lg md:leading-relaxed [&>p]:mb-3 [&>p:last-child]:mb-0 [&>p]:text-foreground"
      {...props}
    />
  );
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
  return (
    <code
      className="rounded-sm bg-secondary px-1.5 py-0.5 text-[0.9em] font-medium text-foreground"
      {...props}
    />
  );
}

function CodeBlock(props: ComponentPropsWithoutRef<"pre">) {
  return (
    <pre
      className="my-6 overflow-x-auto rounded-md border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-foreground"
      {...props}
    />
  );
}

function HorizontalRule() {
  return <div className="gold-divider mx-auto my-12 w-24 opacity-50" aria-hidden="true" />;
}

function MdxImage({ src = "", alt = "", width, height }: ComponentPropsWithoutRef<"img">) {
  const imgAlt = alt || "";
  const isLocal = typeof src === "string" && src.startsWith("/");

  if (isLocal) {
    const w = typeof width === "string" ? parseInt(width, 10) : (width ?? 1200);
    const h = typeof height === "string" ? parseInt(height, 10) : (height ?? 675);
    return (
      <figure className="my-10">
        <Image
          src={src as string}
          alt={imgAlt}
          width={Number.isFinite(w) ? (w as number) : 1200}
          height={Number.isFinite(h) ? (h as number) : 675}
          sizes="(max-width: 768px) 100vw, 768px"
          className="h-auto w-full rounded-md"
        />
        {imgAlt && (
          <figcaption className="mt-3 text-center text-sm text-muted-foreground">
            {imgAlt}
          </figcaption>
        )}
      </figure>
    );
  }

  return (
    <figure className="my-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src as string}
        alt={imgAlt}
        loading="lazy"
        className="h-auto w-full rounded-md"
      />
      {imgAlt && (
        <figcaption className="mt-3 text-center text-sm text-muted-foreground">
          {imgAlt}
        </figcaption>
      )}
    </figure>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-8 overflow-x-auto">
      <table
        className="w-full border-collapse text-left text-sm md:text-base"
        {...props}
      />
    </div>
  );
}

function TableHead(props: ComponentPropsWithoutRef<"thead">) {
  return <thead className="border-b-2 border-gold/40 bg-secondary/40" {...props} />;
}

function TableRow(props: ComponentPropsWithoutRef<"tr">) {
  return <tr className="border-b border-border" {...props} />;
}

function TableHeader(props: ComponentPropsWithoutRef<"th">) {
  return (
    <th
      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-foreground"
      {...props}
    />
  );
}

function TableCell(props: ComponentPropsWithoutRef<"td">) {
  return (
    <td className="px-4 py-3 text-sm leading-relaxed text-muted-foreground" {...props} />
  );
}

function Strong(props: ComponentPropsWithoutRef<"strong">) {
  return <strong className="font-semibold text-foreground" {...props} />;
}

function Emphasis(props: ComponentPropsWithoutRef<"em">) {
  return <em className="italic text-foreground" {...props} />;
}

export const blogMdxComponents = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  p: Paragraph,
  a: Anchor,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  code: InlineCode,
  pre: CodeBlock,
  hr: HorizontalRule,
  img: MdxImage,
  table: Table,
  thead: TableHead,
  tr: TableRow,
  th: TableHeader,
  td: TableCell,
  strong: Strong,
  em: Emphasis,
} as unknown as BlogMdxComponents;
