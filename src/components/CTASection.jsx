const callItems = [
  'A fast audit of where RFIs, submittals, and COs are getting stuck',
  'A recommended routing flow for PMs, estimators, and accounting',
  'A payback estimate tied to billing lag and admin hours recovered',
];

export default function CTASection() {
  return (
    <section id="demo" className="deferred-section">
      <div className="section-frame">
        <div className="grid gap-8 lg:grid-cols-[1fr,0.82fr] lg:items-center">
          <div>
            <div className="eyebrow select-ui-none">Final CTA</div>
            <h2 className="mt-4 section-heading max-w-3xl text-[var(--text)]">
              Bring one active project. We&apos;ll show you where margin is slipping.
            </h2>
            <p className="mt-4 section-copy max-w-2xl">
              The walkthrough is built for real buying conversations. Bring one painful inbox thread, one slow CO, or one
              approval queue that keeps missing the billing cycle.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:hello@scopebolt.com?subject=ScopeBolt%20Walkthrough" className="button-primary px-6">
                Book walkthrough
              </a>
              <a href="#pricing" className="button-secondary px-6">
                Review pricing
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="tag-pill">No credit card</span>
              <span className="tag-pill">Implementation plan included</span>
              <span className="tag-pill">Live ROI worksheet</span>
            </div>
          </div>

          <div className="surface-card">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">What happens in the call</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--panel-text)]">
              You leave with a rollout plan tied to your current jobs.
            </h3>

            <div className="mt-5 space-y-3">
              {callItems.map((item, index) => (
                <div key={item} className="flex items-start gap-4 rounded-[18px] border border-[var(--panel-line)] bg-white px-4 py-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-[rgba(31,107,255,0.08)] text-sm font-semibold text-[var(--accent)]">
                    0{index + 1}
                  </div>
                  <p className="text-sm leading-6 text-[var(--panel-text)]">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">Average rollout</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--panel-text)]">10 days</p>
              </div>
              <div className="metric-card">
                <p className="text-xs uppercase tracking-[0.16em] text-[var(--panel-text-soft)]">Median first-month impact</p>
                <p className="mt-2 text-3xl font-semibold text-[var(--panel-text)]">$18.4k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
