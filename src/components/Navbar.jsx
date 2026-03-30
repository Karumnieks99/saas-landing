import { useState } from 'react';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

function BrandMark() {
  return (
    <div className="grid h-10 w-10 grid-cols-2 gap-1 rounded-[14px] border border-[var(--line)] bg-[rgba(255,255,255,0.42)] p-1.5">
      <span className="rounded-[4px] bg-[var(--accent)]" />
      <span className="rounded-[4px] bg-[var(--text)]" />
      <span className="rounded-[4px] bg-[var(--text)]" />
      <span className="rounded-[4px] bg-[var(--accent)]" />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-3 pt-[env(safe-area-inset-top)] sm:px-4 lg:px-6">
      <div className="mx-auto max-w-[1440px] py-3">
        <div className="flex items-center gap-4 rounded-[20px] border border-[var(--line)] bg-[rgba(243,242,239,0.78)] px-4 py-3 backdrop-blur-md lg:px-6">
          <a href="#hero" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <BrandMark />
            <div className="min-w-0 leading-tight">
              <span className="block text-lg font-semibold text-[var(--text)]">ScopeBolt</span>
              <span className="hidden truncate font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] sm:block">
                revenue workflow layer
              </span>
            </div>
          </a>

          <nav
            aria-label="Primary"
            className="ml-6 hidden items-center gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted)] lg:flex"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="transition hover:text-[var(--text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-3">
            <a href="#demo" className="button-primary hidden sm:inline-flex">
              Book walkthrough
              <span className="button-icon" aria-hidden="true">
                &rarr;
              </span>
            </a>
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line)] px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)] transition hover:bg-[rgba(255,255,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {open ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {open && (
          <div
            id="mobile-nav"
            className="mt-3 flex flex-col gap-2 rounded-[18px] border border-[var(--line)] bg-[rgba(248,246,243,0.92)] px-4 py-4 shadow-[0_22px_40px_-36px_rgba(23,21,18,0.38)] lg:hidden"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[14px] px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text)] transition hover:bg-[rgba(255,255,255,0.42)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                {link.label}
              </a>
            ))}
            <a href="#demo" onClick={() => setOpen(false)} className="button-primary justify-center">
              Book walkthrough
              <span className="button-icon" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
