const steps = [
  {
    number: '01',
    title: 'Sync active jobs',
    copy: 'Connect Procore or Autodesk Build and pull in live jobs instead of rebuilding your portfolio.',
    note: 'Day 1',
  },
  {
    number: '02',
    title: 'Capture project traffic',
    copy: 'Forward inbox traffic, PDFs, and markups so RFIs, submittals, and CO drafts start from one intake path.',
    note: 'Day 3',
  },
  {
    number: '03',
    title: 'Set routing rules',
    copy: 'Map who reviews pricing, who owns approvals, and when aging items should escalate automatically.',
    note: 'Day 7',
  },
  {
    number: '04',
    title: 'Launch billing views',
    copy: 'Ship the executive digest and accounting handoff so the whole team works from the same record.',
    note: 'Day 10',
  },
];

const rollout = [
  ['Day 1', 'Connect your project source and import active jobs'],
  ['Day 3', 'Map inbox capture, document types, and owners'],
  ['Day 7', 'Launch one live RFI and CO workflow'],
  ['Day 10', 'Deliver executive digest and billing-ready backup'],
];

export default function Process() {
  return (
    <section id="process" className="deferred-section space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="eyebrow select-ui-none">Process</div>
          <h2 className="section-heading max-w-3xl text-[var(--text)]">
            Watch ScopeBolt learn one workflow before you ask the team to change anything.
          </h2>
        </div>
        <p className="section-copy max-w-xl">
          The rollout is built like an evaluation cycle: map the handoff, test the draft, verify the output, then go live.
        </p>
      </div>

      <div className="section-frame p-0">
        <div className="grid gap-px bg-[var(--line)] xl:grid-cols-[0.78fr,1.22fr]">
          <div className="bg-[var(--surface-strong)] p-5 sm:p-6 lg:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">Typical launch timeline</p>
            <h3 className="mt-4 max-w-xl text-[2rem] font-semibold leading-[1] text-[var(--text)] sm:text-[2.5rem]">
              Go live in 10 business days without replacing every tool your team already uses.
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
              Start with one division, prove the workflow on real jobs, then expand once the weekly review gets cleaner and the
              billing handoff gets faster.
            </p>

            <div className="mt-6">
              <a href="#demo" className="button-primary">
                Book walkthrough
                <span className="button-icon" aria-hidden="true">
                  &rarr;
                </span>
              </a>
            </div>

            <div className="mt-8 space-y-3">
              {rollout.map(([time, detail]) => (
                <div key={time} className="rounded-[18px] border border-[var(--panel-line)] bg-[rgba(255,255,255,0.56)] px-4 py-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">{time}</p>
                  <p className="mt-2 text-sm leading-7 text-[var(--panel-text)]">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[var(--surface-strong)] p-5 sm:p-6 lg:p-8">
            <div className="demo-screen p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--panel-text)]">Evaluation workflow</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)]">
                    From kickoff to billing-ready handoff
                  </p>
                </div>
                <span className="tag-pill">Under 2 weeks</span>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {steps.map((step) => (
                  <article key={step.number} className="surface-card flex h-full flex-col gap-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-surface)] text-sm font-semibold text-[var(--accent)]">
                        {step.number}
                      </div>
                      <span className="tag-pill">{step.note}</span>
                    </div>

                    <h3 className="text-[1.2rem] font-semibold leading-7 text-[var(--text)]">{step.title}</h3>
                    <p className="text-sm leading-7 text-[var(--text-soft)]">{step.copy}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
