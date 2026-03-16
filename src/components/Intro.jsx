const workspaceStats = [
  { label: 'Open COs', value: '19', detail: '6 waiting on pricing' },
  { label: 'Average age', value: '11.4d', detail: 'Down from 16.2d' },
  { label: 'Ready to bill', value: '$126k', detail: 'Approved this cycle' },
];

const changeRows = [
  { project: 'Orlando Med Tower', gc: 'Wright Builders', value: '$68,400', health: 'Awaiting architect bulletin' },
  { project: 'Harbor Point Garage', gc: 'Morris GC', value: '$24,900', health: 'Pricing due Friday' },
  { project: 'Ivy Square Labs', gc: 'North Crest', value: '$43,100', health: 'Owner approval pending' },
];

const builderSteps = [
  { title: 'Forward the architect email or markup package.', note: 'Inbox capture' },
  { title: 'ScopeBolt matches the job, phase, and drawing context.', note: 'Auto match' },
  { title: 'A draft record opens with owner, backup, and next action.', note: 'Ready to route' },
];

const executiveRows = [
  { label: 'Billing-ready value', score: '$126k', trend: '+4 items this week' },
  { label: 'Pending exposure', score: '$184k', trend: '6 items need review' },
  { label: 'Average response lag', score: '2.1d', trend: '-0.8d from last month' },
];

const pipeline = [
  ['Pricing review', '36%'],
  ['Pending GC approval', '48%'],
  ['Ready for billing', '68%'],
];

export default function Intro() {
  return (
    <section id="product" className="deferred-section space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="eyebrow select-ui-none">Product walkthrough</div>
          <h2 className="section-heading max-w-3xl text-[var(--text)]">
            A real workspace for the approvals and handoffs that move subcontractor revenue.
          </h2>
        </div>
        <p className="section-copy max-w-xl">
          ScopeBolt keeps the high-friction work in one place: change-order capture, owner assignment, aging follow-up, and
          billing readiness.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
        <div className="section-frame">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">Change order workspace</p>
              <p className="mt-1 text-xl font-semibold text-[var(--panel-text)]">Division revenue protection board</p>
            </div>
            <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent)]">Synced 3 min ago</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {workspaceStats.map((stat) => (
              <div key={stat.label} className="metric-card">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-[var(--panel-text)]">{stat.value}</p>
                <p className="mt-2 text-sm text-[var(--panel-text-soft)]">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.08fr,0.92fr]">
            <div className="surface-card overflow-hidden p-0">
              <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--panel-text)]">CO pipeline by stage</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">Last 30 days</p>
                </div>
                <span className="tag-pill bg-[rgba(47,133,90,0.12)] text-[var(--accent-emerald)]">+19% to approved</span>
              </div>

              <div className="p-5">
                <div className="rounded-[18px] border border-[var(--panel-line)] bg-white p-4">
                  <svg aria-hidden="true" focusable="false" viewBox="0 0 320 180" className="h-[180px] w-full">
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
                    {[36, 68, 100, 132, 164, 196, 228].map((x, index) => (
                      <rect
                        key={x}
                        x={x}
                        y={126 - index * 8}
                        width="22"
                        height={46 + index * 8}
                        rx="8"
                        fill={index > 4 ? 'rgba(117,160,138,0.88)' : 'rgba(208,123,55,0.84)'}
                      />
                    ))}
                    <path
                      d="M32,124 C58,108 92,102 126,86 C154,72 179,82 212,58 C242,36 270,48 288,26"
                      fill="none"
                      stroke="#1f6bff"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                <div className="mt-4 space-y-3">
                  {changeRows.map((row) => (
                    <div
                      key={row.project}
                      className="grid gap-3 rounded-[18px] border border-[var(--panel-line)] bg-white px-4 py-3 sm:grid-cols-[1.4fr,0.8fr,1fr]"
                    >
                      <div>
                        <p className="text-sm font-semibold text-[var(--panel-text)]">{row.project}</p>
                        <p className="text-xs uppercase tracking-[0.15em] text-[var(--panel-text-soft)]">{row.gc}</p>
                      </div>
                      <div className="text-sm text-[var(--panel-text-soft)]">{row.value}</div>
                      <div className="text-sm font-semibold text-[var(--accent-amber)]">{row.health}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="surface-card">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--panel-text)]">Value by status</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">Updated hourly</p>
                </div>
                <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent)]">4 actions due today</span>
              </div>

              <div className="mt-5 space-y-4">
                {pipeline.map(([label, value]) => (
                  <div key={label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[var(--panel-text)]">{label}</span>
                      <span className="text-[var(--panel-text-soft)]">{value}</span>
                    </div>
                    <div className="mt-2 h-2.5 rounded-full bg-[rgba(20,32,49,0.08)]">
                      <div className="h-2.5 rounded-full bg-[var(--accent)]" style={{ width: value }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-[18px] border border-[var(--panel-line)] bg-white p-4">
                <p className="text-sm font-semibold text-[var(--panel-text)]">Recommended next action</p>
                <p className="mt-2 text-sm leading-6 text-[var(--panel-text-soft)]">
                  Route Harbor Point Garage CO-11 to estimating today. Missing pricing backup is the only blocker keeping
                  $24,900 out of this billing cycle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="surface-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Automation layer</p>
                <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">Send one email. Get the right draft started.</h3>
              </div>
              <span className="tag-pill">Minimal PM setup</span>
            </div>

            <div className="mt-5 space-y-3">
              {builderSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="flex items-center gap-4 rounded-[18px] border border-[var(--panel-line)] bg-white px-4 py-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[rgba(31,107,255,0.08)] text-sm font-semibold text-[var(--accent)]">
                    0{index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[var(--panel-text)]">{step.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--panel-text-soft)]">{step.note}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-[var(--panel-text-soft)]">
              PMs stop rebuilding the same context from inboxes, PDF folders, and spreadsheet logs every time a new issue appears.
            </p>
          </article>

          <article className="surface-card">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Executive digest</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">Leadership sees the week without waiting on PM rollups.</h3>

            <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              {executiveRows.map((row) => (
                <div key={row.label} className="metric-card">
                  <p className="text-sm font-semibold text-[var(--text)]">{row.label}</p>
                  <p className="mt-3 text-4xl font-semibold text-[var(--text)]">{row.score}</p>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">{row.trend}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-sm leading-6 text-[var(--text-soft)]">
              Weekly digests show what can bill now, which jobs are aging, and where leadership needs to unblock approvals.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
