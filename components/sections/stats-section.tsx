const stats = [
  { label: "Área total", value: "12.000 m²" },
  { label: "Capacidade", value: "320 pessoas" },
  { label: "Avaliações", value: "36 reviews" },
  { label: "Google", value: "5★" },
];

export function StatsSection() {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-2 border-t border-border md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border-b border-r border-border p-8 text-center last:border-r-0 md:border-b-0"
          >
            <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              {stat.label}
            </p>
            <p className="font-medium text-foreground text-4xl">{stat.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
