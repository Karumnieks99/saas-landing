const heroSignals = [
  {
    title: 'Learns your current workflow',
    copy: 'Bring one live thread, one markup set, and one billing blocker. ScopeBolt mirrors the handoff pattern your team already uses.',
    kind: 'learn',
  },
  {
    title: 'Test before you commit',
    copy: 'PMs and accounting can verify the draft record, owner assignment, and backup trail before the workflow becomes standard.',
    kind: 'verify',
  },
  {
    title: 'Deploy without replacing everything',
    copy: 'Keep Procore, Autodesk Build, inboxes, and finance tools in place. ScopeBolt sits on top as the operating layer.',
    kind: 'deploy',
  },
];

const quickTags = ['10-business-day rollout', 'field-friendly capture', 'billing-ready handoff'];

function PixelIcon({ kind }) {
  if (kind === 'learn') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="8" width="4" height="16" fill="#2EB52E" />
        <rect x="12" y="8" width="20" height="4" fill="#2EB52E" />
        <rect x="32" y="12" width="4" height="20" fill="#2EB52E" />
        <rect x="12" y="32" width="24" height="4" fill="#2EB52E" />
        <rect x="20" y="16" width="4" height="12" fill="#2EB52E" />
        <rect x="24" y="24" width="8" height="4" fill="#2EB52E" />
      </svg>
    );
  }

  if (kind === 'verify') {
    return (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="8" y="10" width="24" height="4" fill="#2EB52E" />
        <rect x="8" y="18" width="18" height="4" fill="#2EB52E" />
        <rect x="8" y="26" width="14" height="4" fill="#2EB52E" />
        <rect x="28" y="22" width="4" height="8" fill="#2EB52E" />
        <rect x="32" y="18" width="4" height="12" fill="#2EB52E" />
        <rect x="36" y="14" width="4" height="16" fill="#2EB52E" />
        <rect x="28" y="30" width="12" height="4" fill="#2EB52E" />
      </svg>
    );
  }

  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <rect x="6" y="18" width="10" height="4" fill="#2EB52E" />
      <rect x="16" y="14" width="4" height="8" fill="#2EB52E" />
      <rect x="20" y="10" width="10" height="4" fill="#2EB52E" />
      <rect x="30" y="14" width="4" height="16" fill="#2EB52E" />
      <rect x="18" y="30" width="12" height="4" fill="#2EB52E" />
      <rect x="30" y="26" width="10" height="4" fill="#2EB52E" />
      <rect x="40" y="22" width="4" height="8" fill="#2EB52E" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="hero" className="deferred-section">
      <div className="section-frame hero-shell p-0">
        <div className="relative flex flex-col items-center px-4 pb-12 pt-20 text-center sm:px-8 lg:px-16 lg:pb-20 lg:pt-32">
          <div className="hero-badge">Live on one workflow in 10 business days</div>
          <div className="mt-6 eyebrow select-ui-none">Built for commercial subcontractors</div>

          <h1 className="mt-6 max-w-4xl text-balance text-[2.85rem] font-semibold leading-[0.94] text-[var(--text)] sm:text-5xl lg:text-[5rem]">
            Revenue workflows
            <br />
            <span className="hero-headline-accent">that fit how your jobs actually move.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--text-soft)] sm:text-[1.05rem]">
            Show ScopeBolt one live project thread. We match the job, route the next action, and keep billing backup attached
            before the cycle closes.
          </p>

          <div className="hero-cta-row mt-10">
            <a href="#demo" className="button-primary px-6">
              Book walkthrough
              <span className="button-icon" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <a href="#pricing" className="button-secondary px-6">
              Review pricing
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {quickTags.map((item) => (
              <span key={item} className="tag-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-signal-strip">
          {heroSignals.map((signal) => (
            <article key={signal.title} className="hero-signal-card text-left">
              <PixelIcon kind={signal.kind} />
              <h3 className="mt-5 text-xl font-semibold text-[var(--text)]">{signal.title}</h3>
              <p className="mt-3 max-w-sm text-sm leading-7 text-[var(--text-soft)]">{signal.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
