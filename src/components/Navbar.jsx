import { useState } from 'react';

const navLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Proof', href: '#proof' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--bg)] px-4 py-2.5 shadow-[0_16px_40px_-36px_rgba(15,23,42,0.5)] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1200px] items-center gap-4">
        <a href="#hero" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--accent)] text-sm font-bold uppercase tracking-[0.12em] text-white">
            SB
          </div>
          <div className="min-w-0 flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-[var(--text)]">ScopeBolt</span>
            <span className="hidden truncate text-xs text-[var(--muted)] sm:block">subcontractor revenue control</span>
          </div>
        </a>

        <nav
          aria-label="Primary"
          className="ml-4 hidden items-center gap-6 text-sm font-semibold text-[var(--text-soft)] lg:flex"
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
          <a
            href="#pricing"
            className="hidden text-sm font-semibold text-[var(--text)] transition hover:text-[var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:inline-flex"
          >
            Pricing
          </a>
          <a href="#demo" className="button-primary hidden sm:inline-flex">
            Book walkthrough
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-white px-3.5 py-1.5 text-sm font-semibold text-[var(--text)] transition hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] lg:hidden"
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
          className="mx-auto mt-3 flex max-w-[1200px] flex-col gap-2 rounded-[20px] border border-[var(--line)] bg-white px-4 py-4 text-sm shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)] lg:hidden"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-[14px] px-3 py-2.5 font-semibold text-[var(--text)] transition hover:bg-[var(--surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              {link.label}
            </a>
          ))}
          <a href="#pricing" onClick={() => setOpen(false)} className="button-secondary justify-center">
            See pricing
          </a>
          <a href="#demo" onClick={() => setOpen(false)} className="button-primary justify-center">
            Book walkthrough
          </a>
        </div>
      )}
    </header>
  );
}
