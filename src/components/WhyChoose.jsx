const features = [
  {
    key: 'capture',
    label: 'Inbox capture',
    title: 'Forward email. Open the right record.',
    copy: 'ScopeBolt matches the job, document type, and thread context without another manual log.',
    note: 'Less inbox cleanup',
  },
  {
    key: 'aging',
    label: 'Aging control',
    title: 'See what is sitting too long.',
    copy: 'PMs get one queue for overdue RFIs, stalled submittals, and slow approvals before the billing window closes.',
    note: 'Protect billing cadence',
  },
  {
    key: 'change',
    label: 'Change orders',
    title: 'Start COs when risk appears, not weeks later.',
    copy: 'Capture backup early, attach pricing context, and keep status visible from first signal to approved value.',
    note: 'Recover revenue faster',
  },
  {
    key: 'field',
    label: 'Field input',
    title: 'Give supers a simple way to flag scope change.',
    copy: 'Photos, notes, and markups can flow in without asking the field to learn another heavyweight platform.',
    note: 'Cleaner handoffs',
  },
  {
    key: 'exec',
    label: 'Executive view',
    title: 'Run weekly reviews from one source.',
    copy: 'Project leaders see value at risk, items without owners, and what can still move this billing cycle.',
    note: 'Faster escalation',
  },
  {
    key: 'audit',
    label: 'Audit trail',
    title: 'Keep every reply and revision attached.',
    copy: 'When timing or backup gets challenged, the full record is already organized for the PM and accounting team.',
    note: 'GC-ready backup',
  },
];

function FeatureIcon({ kind }) {
  const iconProps = {
    'aria-hidden': 'true',
    className: 'h-5 w-5',
    fill: 'none',
    focusable: 'false',
    viewBox: '0 0 24 24',
  };

  if (kind === 'capture') {
    return (
      <svg {...iconProps}>
        <path d="M5 7h14v10H5z" stroke="currentColor" strokeWidth="1.8" />
        <path d="m6 8 6 5 6-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === 'aging') {
    return (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 8v4l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === 'change') {
    return (
      <svg {...iconProps}>
        <path d="M6 8h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M6 16h7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="m14 13 4 3-4 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === 'field') {
    return (
      <svg {...iconProps}>
        <path d="M7 18V9l5-4 5 4v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 18v-4h4v4" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  }

  if (kind === 'exec') {
    return (
      <svg {...iconProps}>
        <path d="M5 18V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 18V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M19 18v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M4 18h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg {...iconProps}>
      <path d="M7 7h10v10H7z" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 10h4M10 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function WhyChoose() {
  return (
    <section id="workflow" className="deferred-section space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="eyebrow select-ui-none">Core workflow</div>
          <h2 className="section-heading max-w-3xl text-[var(--text)]">
            Built around the exact handoffs where subcontractors lose context and margin.
          </h2>
        </div>
        <p className="section-copy max-w-xl">
          The product is narrow on purpose: capture the project signal, route it cleanly, and keep billing exposure visible.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <article key={feature.title} className="surface-card flex h-full flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[var(--line)] bg-[var(--surface-soft)] text-[var(--accent-strong)]">
                <FeatureIcon kind={feature.key} />
              </div>
              <span className="tag-pill">{feature.label}</span>
            </div>

            <h3 className="text-[1.35rem] font-semibold leading-8 text-[var(--text)]">{feature.title}</h3>
            <p className="text-sm leading-7 text-[var(--text-soft)]">{feature.copy}</p>
            <p className="mt-auto text-sm font-semibold text-[var(--accent-cyan)]">{feature.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
