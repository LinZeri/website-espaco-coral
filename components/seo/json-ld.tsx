/**
 * Componente para inserir JSON-LD no head sem hidratação.
 * Renderiza <script type="application/ld+json"> diretamente no HTML estático
 * Compatível com SSG e RSC, zero runtime JS.
 *
 * O replace de "<" pelo escape unicode < impede que um "</script>"
 * dentro de qualquer string (ex: resposta de FAQ vinda de frontmatter)
 * encerre a tag e quebre o parsing do restante da página.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
