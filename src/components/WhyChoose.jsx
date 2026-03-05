const services = [
  {
    title: 'Marketing pages',
    copy: 'Landing pages, feature pages, pricing pages, and conversion-focused frontends that do not feel generic.',
  },
  {
    title: 'Product UI',
    copy: 'Dashboards, onboarding flows, internal tools, settings areas, and everyday app surfaces.',
  },
  {
    title: 'Frontend refactors',
    copy: 'Cleanup work that improves maintainability, responsiveness, consistency, and shipping confidence.',
  },
  {
    title: 'Design implementation',
    copy: 'Turning Figma into working UI with attention to spacing, states, accessibility, and real-world behavior.',
  },
  {
    title: 'Shipping support',
    copy: 'QA, polish, bug fixing, release help, and final passes that raise the quality bar before launch.',
  },
  {
    title: 'Ongoing remote support',
    copy: 'Steady product contribution for teams that need a reliable developer without hiring full-time immediately.',
  },
];

export default function WhyChoose() {
  return (
    <section id="services" className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Services</p>
          <h2 className="text-3xl font-semibold text-[var(--ink)] sm:text-4xl">The kind of work I am usually brought in to handle.</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
          Most often that means frontend-heavy work with product taste, strong implementation discipline, and enough
          ownership to keep the team moving.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={service.title}
            className={`rounded-[28px] border p-6 shadow-[0_22px_50px_-40px_var(--shadow)] ${
              index === 1 || index === 4
                ? 'border-[rgba(125,92,57,0.18)] bg-[linear-gradient(180deg,rgba(186,142,90,0.1),rgba(255,253,249,0.96))]'
                : 'border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f6ede1)]'
            }`}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--line)] bg-[rgba(239,228,214,0.64)] text-sm font-semibold text-[var(--accent)]">
              0{index + 1}
            </div>
            <h3 className="mt-5 text-xl font-semibold text-[var(--ink)]">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{service.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
