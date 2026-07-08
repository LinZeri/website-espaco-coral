import Link from "next/link";

interface AuthorBioProps {
  name: string;
  bio: string;
}

/**
 * Caixa de bio do autor ao final do post. Torna visível a experiência de quem
 * escreve (sinal de E-E-A-T) e linka para a página institucional.
 */
export function AuthorBio({ name, bio }: AuthorBioProps) {
  return (
    <aside className="mt-14 border-t border-border pt-8">
      <div className="flex items-start gap-4">
        <div
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold/15 text-lg font-semibold text-gold-dark"
        >
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Escrito por
          </p>
          <p className="mt-1 text-base font-semibold text-foreground">{name}</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {bio}
          </p>
          <Link
            href="/sobre"
            className="mt-3 inline-block text-sm font-medium text-gold transition-colors hover:text-gold-dark"
          >
            Conheça o Espaço Coral →
          </Link>
        </div>
      </div>
    </aside>
  );
}
