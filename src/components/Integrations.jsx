const integrations = [
  { name: 'Procore', note: 'Project data and drawing context', mark: 'P', color: 'bg-[#f86232]' },
  { name: 'Autodesk Build', note: 'Live job sync and issue context', mark: 'A', color: 'bg-[#0f4bff]' },
  { name: 'Bluebeam', note: 'PDF markups and attachments', mark: 'B', color: 'bg-[#002852]' },
  { name: 'Outlook', note: 'Inbox capture and thread history', mark: 'O', color: 'bg-[#0a5bd3]' },
  { name: 'Sage 300', note: 'Billing handoff and accounting sync', mark: 'S', color: 'bg-[#2f6b54]' },
  { name: 'Vista', note: 'ERP export for finance teams', mark: 'V', color: 'bg-[#5e2d91]' },
];

const flow = [
  {
    label: 'Inbox',
    title: 'Architect bulletin or markup arrives',
    copy: 'Forward the thread or connect inbox capture so the message lands on the right job automatically.',
  },
  {
    label: 'ScopeBolt',
    title: 'Draft CO opens with backup and owner assignment',
    copy: 'The record starts with thread history, attachments, and placeholder value fields already attached.',
  },
  {
    label: 'PM + Estimating',
    title: 'Pricing review happens in one shared queue',
    copy: 'Stakeholders update exposure, due dates, and billing readiness without rebuilding the context.',
  },
  {
    label: 'Accounting',
    title: 'Approved value exports when it is ready to invoice',
    copy: 'Accounting receives the billing-ready handoff list with the supporting backup at the same time.',
  },
];

export default function Integrations() {
  return (
    <section id="integrations" className="deferred-section grid gap-6 xl:grid-cols-[0.95fr,1.05fr]">
      <div className="space-y-5">
        <div className="eyebrow">Integrations</div>
        <h2 className="section-heading max-w-2xl text-[var(--text)]">Keep the systems your teams already live in.</h2>
        <p className="section-copy">
          ScopeBolt sits between project communication and billing. It does not ask PMs, field teams, or accounting to abandon
          the tools already holding job data and approvals.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {integrations.map((integration) => (
            <div key={integration.name} className="surface-card flex items-center gap-4 p-4 text-[var(--panel-text)]">
              <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] text-sm font-bold text-white ${integration.color}`}>
                {integration.mark}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--panel-text)]">{integration.name}</p>
                <p className="mt-1 text-sm text-[var(--panel-text-soft)]">{integration.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 text-sm text-[var(--text-soft)]">
          <span className="tag-pill">2-way job sync</span>
          <span className="tag-pill">Inbox OCR</span>
          <span className="tag-pill">Finance export</span>
        </div>
      </div>

      <div className="section-frame">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Example workflow</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--text)]">Move scope change from inbox to invoice support.</h3>
          </div>
          <span className="tag-pill">Webhooks available</span>
        </div>

        <div className="mt-6 space-y-3">
          {flow.map((step, index) => (
            <div key={step.title} className="surface-card flex gap-4 p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(31,107,255,0.08)] text-sm font-semibold text-[var(--accent)]">
                0{index + 1}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">{step.label}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--panel-text)]">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--panel-text-soft)]">{step.copy}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-[var(--text-soft)]">
          <span className="tag-pill">Document linking</span>
          <span className="tag-pill">CSV import</span>
          <span className="tag-pill">Role routing</span>
        </div>
      </div>
    </section>
  );
}
