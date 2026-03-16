const highlights = [
  ['31%', 'faster RFI turnaround'],
  ['$247k', 'average CO leakage recovered'],
  ['7.2 hrs', 'saved weekly per PM'],
];

const dashboardMetrics = [
  { label: 'RFIs due today', value: '14', detail: '3 past the 48-hour target', accent: 'var(--accent-amber)' },
  { label: 'Pending CO value', value: '$184k', detail: '6 items waiting on action', accent: 'var(--accent)' },
  { label: 'Ready to bill', value: '$126k', detail: 'Approved with backup attached', accent: 'var(--accent-emerald)' },
];

const projectRows = [
  { name: 'Terminal B fit-out', owner: 'A. Rivera', status: 'Needs reply', progress: 'RFI #148 due 4:30 PM' },
  { name: 'Harbor Point Garage', owner: 'N. Patel', status: 'Pricing review', progress: 'CO-11 needs estimating backup' },
  { name: 'Westgate Labs', owner: 'M. Cole', status: 'Approved', progress: 'Submittal package 28 cleared' },
];

const actionQueue = [
  ['Architect bulletin received', 'Draft CO created and routed in under 2 minutes.'],
  ['Billing cutoff tomorrow', '4 approved items are queued for accounting export.'],
  ['Executive digest ready', 'Portfolio risk is grouped by owner and due date.'],
];

const statusStyles = {
  'Needs reply': 'bg-[rgba(201,130,45,0.12)] text-[var(--accent-amber)]',
  'Pricing review': 'bg-[rgba(31,107,255,0.08)] text-[var(--accent)]',
  Approved: 'bg-[rgba(47,133,90,0.12)] text-[var(--accent-emerald)]',
};

export default function Hero() {
  return (
    <section id="hero">
      <div className="grid gap-10 lg:grid-cols-[0.84fr,1.16fr] lg:items-center">
        <div className="space-y-6">
          <div className="eyebrow select-ui-none">Built for commercial subcontractors</div>

          <div className="space-y-4">
            <h1 className="max-w-2xl text-balance text-4xl font-semibold leading-[0.97] text-[var(--text)] sm:text-5xl lg:text-[4.1rem]">
              Stop losing margin to buried RFIs and late change orders.
            </h1>
            <p className="section-copy max-w-xl text-lg sm:text-[1.15rem]">
              ScopeBolt gives PMs, project executives, and accounting one operating layer for inbox capture, aging follow-up,
              and billing-ready handoff.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="#demo" className="button-primary px-6">
              Book a 20-min walkthrough
            </a>
            <a href="#pricing" className="button-secondary px-6">
              See pricing
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map(([value, label]) => (
              <div key={value} className="metric-card">
                <p className="text-2xl font-semibold text-[var(--text)]">{value}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr),280px]">
          <div className="section-frame p-0">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4 sm:px-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">Live portfolio</p>
                <p className="mt-1 text-lg font-semibold text-[var(--panel-text)]">Southeast division dashboard</p>
              </div>
              <span className="tag-pill bg-[rgba(47,133,90,0.12)] text-[var(--accent-emerald)]">42 active jobs synced</span>
            </div>

            <div className="p-5 sm:p-6">
              <div className="grid gap-3 sm:grid-cols-3">
                {dashboardMetrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">{metric.label}</p>
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: metric.accent }} />
                    </div>
                    <p className="mt-3 text-3xl font-semibold text-[var(--panel-text)]">{metric.value}</p>
                    <p className="mt-2 text-sm text-[var(--panel-text-soft)]">{metric.detail}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr,0.92fr]">
                <div className="surface-card p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">This week</p>
                      <p className="mt-1 text-lg font-semibold text-[var(--panel-text)]">Aging pressure by job</p>
                    </div>
                    <span className="tag-pill bg-[rgba(201,130,45,0.12)] text-[var(--accent-amber)]">Updated 6 min ago</span>
                  </div>

                  <div className="mt-4 rounded-[18px] border border-[var(--panel-line)] bg-white p-4">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      viewBox="0 0 320 170"
                      className="h-[170px] w-full"
                    >
                      {[24, 56, 88, 120, 152].map((line) => (
                        <line
                          key={line}
                          x1="0"
                          x2="320"
                          y1={line}
                          y2={line}
                          stroke="rgba(20,32,49,0.08)"
                          strokeDasharray="4 6"
                        />
                      ))}
                      <path
                        d="M0,140 C30,128 60,124 90,106 C118,88 142,94 170,74 C196,56 224,62 252,48 C276,36 296,34 320,22"
                        fill="none"
                        stroke="#1f6bff"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M0,140 C30,128 60,124 90,106 C118,88 142,94 170,74 C196,56 224,62 252,48 C276,36 296,34 320,22 L320,170 L0,170 Z"
                        fill="rgba(31,107,255,0.08)"
                      />
                    </svg>
                    <div className="mt-3 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">
                      <span>Mon</span>
                      <span>Tue</span>
                      <span>Wed</span>
                      <span>Thu</span>
                      <span>Fri</span>
                      <span>Sat</span>
                      <span>Sun</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {projectRows.map((row) => (
                    <div key={row.name} className="surface-card flex items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[var(--panel-text)]">{row.name}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[var(--panel-text-soft)]">
                          PM {row.owner} / {row.progress}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${statusStyles[row.status]}`}>
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <aside className="surface-card flex flex-col gap-4 lg:mt-8">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">Weekly focus</p>
              <h3 className="text-2xl font-semibold text-[var(--panel-text)]">Same-day follow-up for the items that move revenue.</h3>
              <p className="text-sm leading-6 text-[var(--panel-text-soft)]">
                ScopeBolt groups today&apos;s blockers by owner, due date, and billing impact so PMs know what to escalate first.
              </p>
            </div>

            <div className="space-y-3">
              {actionQueue.map(([item, detail]) => (
                <div key={item} className="rounded-[18px] border border-[var(--panel-line)] bg-white px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-[var(--panel-text)]">{item}</p>
                    <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent)]">Auto</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--panel-text-soft)]">{detail}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[18px] border border-[var(--panel-line)] bg-[var(--surface-soft)] px-4 py-4">
              <p className="text-sm font-semibold text-[var(--panel-text)]">2 jobs need same-day attention</p>
              <p className="mt-2 text-sm leading-6 text-[var(--panel-text-soft)]">
                Harbor Point Garage and Terminal B are the only active records that can still affect this billing cycle today.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
