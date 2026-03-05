const steps = [
  {
    number: '01',
    title: 'Align on the work',
    copy: 'We define the scope, outcomes, constraints, and the simplest path to delivery before the build starts.',
  },
  {
    number: '02',
    title: 'Build with clear updates',
    copy: 'I move the work forward, communicate decisions and blockers, and keep the team informed without over-meeting.',
  },
  {
    number: '03',
    title: 'Polish and hand off cleanly',
    copy: 'The goal is not just to finish tasks. It is to leave the work stable, readable, and easy for the team to keep building on.',
  },
];

export default function Process() {
  return (
    <section id="process" className="grid items-center gap-10 lg:grid-cols-[0.9fr,1.1fr]">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Process</p>
        <h2 className="text-3xl font-semibold leading-tight text-[var(--ink)] sm:text-4xl">
          Simple remote collaboration, built around shipping instead of ceremony.
        </h2>
        <p className="max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
          I work best with teams that want clear ownership, steady progress, and direct communication.
        </p>

        <div className="grid gap-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f6ede1)] p-6 shadow-[0_22px_50px_-40px_var(--shadow)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--line)] bg-[rgba(239,228,214,0.64)] text-sm font-semibold text-[var(--accent)]">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[var(--ink)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{step.copy}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="overflow-hidden rounded-[34px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f1e8db)] p-5 shadow-[0_28px_60px_-42px_var(--shadow)]">
        <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,253,249,0.9)] p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">What working together looks like</p>
              <p className="mt-1 text-lg font-semibold text-[var(--ink)]">A reliable rhythm without unnecessary overhead</p>
            </div>
            <span className="rounded-full bg-[rgba(186,142,90,0.14)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
              Remote first
            </span>
          </div>

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {[
              {
                title: 'Scope',
                items: ['Clear task breakdown', 'Shared priorities', 'Fast technical decisions'],
              },
              {
                title: 'Execution',
                items: ['Visible progress', 'Low-noise updates', 'Thoughtful implementation'],
              },
              {
                title: 'Delivery',
                items: ['QA and polish', 'Clean handoff notes', 'Stable shipped output'],
              },
            ].map((column) => (
              <div key={column.title} className="rounded-[22px] border border-[var(--line)] bg-[rgba(239,228,214,0.56)] p-4">
                <p className="text-sm font-semibold text-[var(--ink)]">{column.title}</p>
                <div className="mt-4 space-y-3">
                  {column.items.map((item) => (
                    <div key={item} className="rounded-2xl border border-[var(--line)] bg-[rgba(255,253,249,0.86)] px-3 py-3">
                      <p className="text-sm text-[var(--ink)]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-[22px] border border-[rgba(125,92,57,0.14)] bg-[linear-gradient(180deg,rgba(186,142,90,0.1),rgba(255,253,249,0.92))] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--muted)]">Default communication style</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">
              Async-first updates, short calls when needed, and enough visibility that no one has to wonder what is happening.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
