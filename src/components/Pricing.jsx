const plans = [
  {
    name: 'Team',
    price: '$349',
    period: '/month',
    audience: 'Up to 10 active jobs',
    description: 'For one PM team that needs cleaner intake, aging control, and a billing-ready log without another bloated PM suite.',
    cta: 'Start with one live workflow',
    href: '#demo',
    features: [
      'Unlimited RFIs, submittals, and CO records',
      'Email and PDF capture inbox',
      'Weekly executive digest',
      '2 PM seats plus unlimited field viewers',
    ],
  },
  {
    name: 'Ops',
    price: '$890',
    period: '/month',
    audience: 'Up to 35 active jobs',
    description: 'For specialty contractors that need portfolio visibility, estimating handoff, and accounting export across multiple PMs.',
    cta: 'Book the ops walkthrough',
    href: '#demo',
    highlight: true,
    features: [
      'Everything in Team',
      'Procore and Autodesk Build sync',
      'Billing-ready workflows and exports',
      'Quarterly workflow reviews',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    audience: 'Multi-division contractors',
    description: 'For regional or national subs rolling ScopeBolt across several business units, ERP workflows, and executive review layers.',
    cta: 'Talk to sales',
    href: 'mailto:hello@scopebolt.com?subject=ScopeBolt%20Enterprise',
    features: [
      'Everything in Ops',
      'Division-level reporting and custom roles',
      'ERP workflow support',
      'SSO and security review support',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="deferred-section space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <div className="eyebrow select-ui-none">Pricing</div>
          <h2 className="section-heading max-w-3xl text-[var(--text)]">
            Pricing that fits project-driven teams, not per-seat software bloat.
          </h2>
        </div>
        <p className="section-copy max-w-xl">
          Every plan includes unlimited records, rollout help, and weekly digest reporting. Annual billing saves 15%.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`section-frame flex h-full flex-col px-5 py-5 ${plan.highlight ? 'border-[var(--line-strong)]' : ''}`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-2xl font-semibold text-[var(--text)]">{plan.name}</h3>
                <p className="mt-2 text-sm font-semibold text-[var(--accent-cyan)]">{plan.audience}</p>
              </div>
              {plan.highlight && <span className="tag-pill bg-[rgba(31,107,255,0.08)] text-[var(--accent)]">Most popular</span>}
            </div>

            <p className="mt-4 text-sm leading-7 text-[var(--text-soft)]">{plan.description}</p>

            <div className="mt-6 flex items-end gap-2">
              <span className="text-5xl font-semibold text-[var(--text)]">{plan.price}</span>
              <span className="pb-1 text-sm text-[var(--text-soft)]">{plan.period}</span>
            </div>

            <a
              href={plan.href}
              className={`mt-6 inline-flex w-full items-center justify-center text-sm font-semibold transition ${
                plan.highlight ? 'button-primary' : 'button-secondary'
              }`}
            >
              {plan.cta}
            </a>

            <div className="mt-6 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="rounded-[18px] border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3">
                  <span className="text-sm text-[var(--text)]">{feature}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="rounded-[18px] border border-[var(--line)] bg-[var(--surface-soft)] px-5 py-4 text-sm text-[var(--text-soft)]">
        <span className="font-semibold text-[var(--text)]">90-day payback plan.</span> If the rollout does not measurably
        reduce billing lag or project admin time inside 90 days, ScopeBolt extends implementation support at no extra cost.
      </div>
    </section>
  );
}
