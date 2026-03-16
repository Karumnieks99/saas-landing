const logos = [
  'Ironcrest Interiors',
  'Hartwell Mechanical',
  'Pillar Glass',
  'Signal Fire',
  'Northshore Drywall',
  'Arcwell Electric',
];

const metrics = [
  ['24 days', 'average drop in CO billing lag'],
  ['19%', 'more approved value captured'],
  ['83%', 'fewer status-check emails'],
];

const testimonials = [
  {
    quote: 'We stopped learning about approved COs after the billing cutoff had already passed.',
    name: 'Jared Holmes',
    role: 'Director of Operations',
    company: 'Northgate Mechanical',
    result: '$312k surfaced in the first quarter',
  },
  {
    quote: 'Inbox capture paid for itself. Bulletins and markups finally land on the right job without side-thread cleanup.',
    name: 'Olivia Tran',
    role: 'VP, Project Delivery',
    company: 'Vector Interiors',
    result: '31% faster RFI response time',
  },
  {
    quote: 'Our executive review shifted from status hunting to deciding which owners need escalation this week.',
    name: 'Marcus Lee',
    role: 'CFO',
    company: 'Beacon Electric',
    result: '2 fewer billing slips per month',
  },
];

export default function SocialProof() {
  return (
    <section id="proof" className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <div className="eyebrow select-ui-none">Proof and trust</div>
          <h2 className="section-heading max-w-3xl text-[var(--text)]">
            Teams buy ScopeBolt when inbox chaos starts delaying billing.
          </h2>
          <p className="section-copy">
            The value shows up when PMs stop rebuilding context from Outlook threads, PDF folders, and separate CO logs.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {metrics.map(([value, label]) => (
            <div key={value} className="metric-card min-w-[180px]">
              <p className="text-3xl font-semibold text-[var(--text)]">{value}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {logos.map((logo) => (
          <div key={logo} className="logo-pill select-ui-none">
            {logo}
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.name} className="surface-card flex h-full flex-col gap-5">
            <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent-strong)]">{testimonial.result}</span>
            <p className="text-base leading-7 text-[var(--text)]">&ldquo;{testimonial.quote}&rdquo;</p>
            <div className="mt-auto">
              <p className="text-sm font-semibold text-[var(--text)]">{testimonial.name}</p>
              <p className="mt-1 text-sm text-[var(--text-soft)]">
                {testimonial.role}, {testimonial.company}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
