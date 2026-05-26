/**
 * Componente para inserir JSON-LD no head sem hidratação.
 * Renderiza <script type="application/ld+json"> diretamente no HTML estático
 * Compatível com SSG e RSC, zero runtime JS.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
