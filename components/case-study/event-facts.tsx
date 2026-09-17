import { Calendar, Users, MapPin, Clock, Palette } from "lucide-react";
import { formatEventDate, type CaseStudyFrontmatter } from "@/lib/case-studies";

interface EventFactsProps {
  frontmatter: CaseStudyFrontmatter;
}

/**
 * Ficha do evento: tira de fatos (tipo, data, convidados, formato, período,
 * paleta) exibida logo abaixo do título. Só renderiza os campos presentes,
 * então cases com menos dados não deixam buracos.
 */
export function EventFacts({ frontmatter }: EventFactsProps) {
  const eventDate = formatEventDate(frontmatter.eventDate);

  const facts: Array<{ icon: typeof Calendar; label: string; value: string }> = [];

  facts.push({ icon: MapPin, label: "Tipo", value: frontmatter.eventType });
  if (eventDate) facts.push({ icon: Calendar, label: "Data", value: eventDate });
  if (typeof frontmatter.guests === "number") {
    facts.push({
      icon: Users,
      label: "Convidados",
      value: `${frontmatter.guests}`,
    });
  }
  if (frontmatter.format) {
    facts.push({ icon: MapPin, label: "Formato", value: frontmatter.format });
  }
  if (frontmatter.period) {
    facts.push({ icon: Clock, label: "Período", value: frontmatter.period });
  }
  if (frontmatter.palette) {
    facts.push({ icon: Palette, label: "Estilo", value: frontmatter.palette });
  }

  if (facts.length === 0) return null;

  return (
    <dl className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex items-start gap-3">
          <fact.icon
            size={18}
            className="mt-0.5 shrink-0 text-gold"
            aria-hidden="true"
          />
          <div>
            <dt className="text-xs uppercase tracking-widest text-foreground/70">
              {fact.label}
            </dt>
            <dd className="mt-1 text-sm font-medium leading-snug text-foreground">
              {fact.value}
            </dd>
          </div>
        </div>
      ))}
    </dl>
  );
}
