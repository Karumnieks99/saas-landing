const productLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
];

const companyLinks = [
  { label: 'Book walkthrough', href: 'mailto:hello@scopebolt.com?subject=ScopeBolt%20Walkthrough' },
  { label: 'Contact sales', href: 'mailto:hello@scopebolt.com' },
  { label: 'Support', href: 'mailto:support@scopebolt.com' },
  { label: 'Security review', href: 'mailto:security@scopebolt.com' },
];

const legalLinks = [
  { label: 'Privacy request', href: 'mailto:legal@scopebolt.com?subject=Privacy%20Request' },
  { label: 'DPA request', href: 'mailto:legal@scopebolt.com?subject=DPA%20Request' },
  { label: 'Insurance cert', href: 'mailto:security@scopebolt.com?subject=Insurance%20Certificate' },
  { label: 'Data retention', href: 'mailto:security@scopebolt.com?subject=Data%20Retention' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="deferred-section mt-8 border-t border-[var(--line)] bg-[var(--bg)]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.15fr,0.75fr,0.8fr,1fr] lg:px-8">
        <div className="space-y-5">
          <a href="#hero" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.12em] text-white">
              SB
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--text)]">ScopeBolt</p>
              <p className="text-sm text-[var(--text-soft)]">Margin control for specialty contractors.</p>
            </div>
          </a>

          <p className="max-w-md text-sm leading-7 text-[var(--text-soft)]">
            ScopeBolt helps subcontractors move project communication from inbox chaos to clean records, faster approvals,
            and billing-ready backup.
          </p>

          <div className="space-y-2 text-sm text-[var(--text-soft)]">
            <p>
              <a className="transition hover:text-[var(--text)]" href="mailto:hello@scopebolt.com">
                hello@scopebolt.com
              </a>
            </p>
            <p>
              <a className="transition hover:text-[var(--text)]" href="tel:+15125550146">
                +1 (512) 555-0146
              </a>
            </p>
            <p>301 Congress Ave, Suite 1220, Austin, TX 78701</p>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            {['GC-ready audit trail', 'Accounting handoff', '10-day rollout'].map((item) => (
              <span key={item} className="tag-pill">
                {item}
              </span>
            ))}
          </div>
        </div>

        <nav aria-label="Product links">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Product</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-soft)]">
            {productLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition hover:text-[var(--text)]">
                {link.label}
              </a>
            ))}
          </div>
        </nav>

        <div className="space-y-8">
          <nav aria-label="Company links">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Company</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-soft)]">
              {companyLinks.map((link) => (
                <a key={link.label} href={link.href} className="transition hover:text-[var(--text)]">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>

          <nav aria-label="Legal links">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Legal</p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-[var(--text-soft)]">
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className="transition hover:text-[var(--text)]">
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="section-frame px-5 py-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[var(--panel-text-soft)]">Talk to the team</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--panel-text)]">
            Want to see how ScopeBolt would fit your current jobs?
          </h3>
          <p className="mt-3 text-sm leading-6 text-[var(--panel-text-soft)]">
            Bring one live workflow and we&apos;ll show you the cleanest place to start first.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <a href="mailto:hello@scopebolt.com?subject=ScopeBolt%20Walkthrough" className="button-primary w-full">
              Book walkthrough
            </a>
            <a href="mailto:hello@scopebolt.com?subject=ScopeBolt%20Rollout%20Question" className="button-secondary w-full">
              Ask about rollout
            </a>
          </div>

          <p className="mt-4 text-sm text-[var(--panel-text-soft)]">Replies from a human within one business day.</p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-col gap-4 border-t border-[var(--line)] px-4 py-5 text-sm text-[var(--muted)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>&copy; {currentYear} ScopeBolt. All rights reserved.</p>
        <div className="flex flex-wrap gap-4">
          <a className="transition hover:text-[var(--text)]" href="#hero">
            Home
          </a>
          <a className="transition hover:text-[var(--text)]" href="#demo">
            Book walkthrough
          </a>
          <a className="transition hover:text-[var(--text)]" href="#pricing">
            Pricing
          </a>
        </div>
      </div>
    </footer>
  );
}
