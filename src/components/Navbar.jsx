import { useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[rgba(245,239,230,0.96)] via-[rgba(245,239,230,0.84)] to-transparent pb-3 pt-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.78)] px-4 py-3 shadow-[0_22px_44px_-30px_var(--shadow)] sm:px-6">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2f2419,#7d5c39)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--panel-strong)] shadow-[0_16px_26px_-16px_var(--shadow)]">
            EG
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-[var(--ink)]">EG</span>
            <span className="text-xs font-medium text-[var(--muted)]">remote product developer</span>
          </div>
        </a>

        <span className="hidden rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.78)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--muted)] sm:inline-flex">
          Available for select remote work
        </span>

        <nav className="ml-6 hidden items-center gap-6 text-sm font-semibold text-[var(--ink-soft)] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-4 focus-visible:ring-offset-[var(--bg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[rgba(255,253,249,0.86)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:inline-flex"
          >
            Contact
          </a>
          <a
            href="#work-with-me"
            className="hidden rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-semibold text-[var(--panel-strong)] shadow-[0_18px_30px_-20px_var(--shadow)] transition hover:bg-[#382c20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] sm:inline-flex"
          >
            Work with me
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.84)] px-3 py-2 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--panel-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] md:hidden"
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
          className="mx-auto mt-3 flex max-w-7xl flex-col gap-3 rounded-3xl border border-[var(--line)] bg-[rgba(255,253,249,0.96)] px-4 py-4 text-sm shadow-[0_24px_55px_-28px_var(--shadow)] md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-2 font-semibold text-[var(--ink)] transition hover:bg-[var(--panel-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#work-with-me"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[var(--ink)] px-4 py-3 text-center font-semibold text-[var(--panel-strong)] shadow-[0_18px_30px_-20px_var(--shadow)] transition hover:bg-[#382c20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            Work with me
          </a>
        </div>
      )}
    </header>
  );
}
