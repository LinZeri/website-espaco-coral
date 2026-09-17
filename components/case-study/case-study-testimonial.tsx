import { Quote } from "lucide-react";
import type { CaseStudyTestimonial } from "@/lib/case-studies";

interface CaseStudyTestimonialProps {
  testimonial: CaseStudyTestimonial;
}

/**
 * Depoimento embutido do case: a fala dos anfitriões sobre a experiência de
 * celebrar no espaço. Bloco de destaque, não o card de review do Google (esse
 * fica na testimonials-section da home). Reforça E-E-A-T experiencial.
 */
export function CaseStudyTestimonial({ testimonial }: CaseStudyTestimonialProps) {
  return (
    <section className="bg-background px-6 py-16 md:px-12 md:py-20 lg:px-20">
      <figure className="mx-auto max-w-3xl text-center">
        <Quote
          size={40}
          className="mx-auto mb-6 text-gold/40"
          aria-hidden="true"
        />
        <blockquote className="font-display text-2xl font-normal leading-relaxed tracking-tight text-foreground md:text-3xl md:leading-relaxed">
          {testimonial.quote}
        </blockquote>
        <figcaption className="mt-8 text-sm uppercase tracking-widest text-muted-foreground">
          {testimonial.author}
        </figcaption>
      </figure>
    </section>
  );
}
