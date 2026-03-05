const models = [
  {
    name: 'Project work',
    description: 'Best for a defined page, feature, frontend pass, or short-term deliverable.',
    cta: 'Start a project',
    href: '#contact',
    features: ['Clear scope', 'Fast execution', 'Clean handoff'],
  },
  {
    name: 'Sprint support',
    description: 'Best for product teams that need focused delivery help across a few active priorities.',
    cta: 'Book a call',
    href: '#contact',
    highlight: true,
    features: ['Weekly momentum', 'Async updates', 'Product-facing output'],
  },
  {
    name: 'Ongoing partner',
    description: 'Best for teams that want a reliable remote developer without hiring full-time immediately.',
    cta: 'Talk to me',
    href: 'mailto:hello@eg-remote.dev',
    features: ['Longer-term continuity', 'Flexible contribution', 'Lower management overhead'],
  },
];

export default function Pricing() {
  return (
    <section id="work-with-me" className="space-y-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Ways to work with me</p>
          <h2 className="text-3xl font-semibold text-[var(--ink)] sm:text-4xl">Flexible engagement depending on what the team needs.</h2>
        </div>
        <p className="max-w-xl text-sm leading-relaxed text-[var(--ink-soft)]">
          I am usually most useful where there is meaningful product or frontend work to move, not just ticket volume to clear.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {models.map((model) => (
          <div
            key={model.name}
            className={`rounded-[30px] border p-7 shadow-[0_22px_50px_-40px_var(--shadow)] ${
              model.highlight
                ? 'border-[rgba(125,92,57,0.18)] bg-[linear-gradient(180deg,rgba(186,142,90,0.1),rgba(255,253,249,0.96))]'
                : 'border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f6ede1)]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--ink)]">{model.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">{model.description}</p>
              </div>
              {model.highlight && (
                <span className="rounded-full bg-[rgba(186,142,90,0.14)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                  Best fit
                </span>
              )}
            </div>

            <div className="mt-6">
              <p className="text-4xl font-semibold text-[var(--ink)]">
                {model.name === 'Project work' ? 'Fixed' : model.name === 'Sprint support' ? 'Flexible' : 'Retained'}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Engagement style</p>
            </div>

            <div className="mt-6">
              <a
                href={model.href}
                className={`inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] ${
                  model.highlight
                    ? 'bg-[var(--ink)] text-[var(--panel-strong)] hover:bg-[#382c20]'
                    : 'border border-[var(--line)] bg-[rgba(255,253,249,0.84)] text-[var(--ink)] hover:bg-[var(--panel-soft)]'
                }`}
              >
                {model.cta}
              </a>
            </div>

            <div className="mt-6 space-y-3">
              {model.features.map((feature) => (
                <div key={feature} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[rgba(239,228,214,0.56)] px-3 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  <span className="text-sm text-[var(--ink)]">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
