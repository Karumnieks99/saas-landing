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
    <section id="process" className="deferred-section grid gap-10 xl:grid-cols-[0.82fr,1.18fr]">
      <div className="space-y-5">
        <div className="eyebrow select-ui-none">Launch plan</div>
        <h2 className="section-heading max-w-2xl text-[var(--text)]">
          Go live in 10 business days without replacing every tool your teams already use.
        </h2>
        <p className="section-copy">
          ScopeBolt rolls out like an operating layer. Start with one division, prove the value quickly, then expand once the
          weekly review gets cleaner.
        </p>

        <div className="surface-card">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--panel-text)]">Typical launch timeline</p>
              <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">
                From kickoff to first billing-ready workflow
              </p>
            </div>
            <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent)]">Under 2 weeks</span>
          </div>

          <div className="mt-5 space-y-3">
            {rollout.map(([time, detail]) => (
              <div key={time} className="rounded-[18px] border border-[var(--panel-line)] bg-white px-4 py-3">
                <p className="text-sm font-semibold text-[var(--panel-text)]">{time}</p>
                <p className="mt-1 text-sm leading-6 text-[var(--panel-text-soft)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step) => (
          <article key={step.number} className="surface-card flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--line)] bg-[var(--surface-soft)] text-sm font-semibold text-[var(--accent-strong)]">
                {step.number}
              </div>
              <span className="tag-pill">{step.note}</span>
            </div>

            <h3 className="text-[1.35rem] font-semibold leading-8 text-[var(--text)]">{step.title}</h3>
            <p className="text-sm leading-7 text-[var(--text-soft)]">{step.copy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
