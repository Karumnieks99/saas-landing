export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--line)] bg-[rgba(255,253,249,0.6)] py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2f2419,#7d5c39)] text-sm font-bold uppercase tracking-[0.2em] text-[var(--panel-strong)]">
              EG
            </div>
            <div>
              <p className="text-lg font-semibold text-[var(--ink)]">EG</p>
              <p className="text-sm text-[var(--ink-soft)]">Remote product developer for startups and SaaS teams.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-[var(--ink-soft)]">
            <a className="transition hover:text-[var(--ink)]" href="#about">About</a>
            <a className="transition hover:text-[var(--ink)]" href="#services">Services</a>
            <a className="transition hover:text-[var(--ink)]" href="#process">Process</a>
            <a className="transition hover:text-[var(--ink)]" href="#faq">FAQ</a>
            <a className="transition hover:text-[var(--ink)]" href="mailto:hello@eg-remote.dev">Contact</a>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[var(--line)] pt-5 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} EG. All rights reserved.</p>
          <div className="flex gap-4">
            <a className="transition hover:text-[var(--ink)]" href="#hero">Home</a>
            <a className="transition hover:text-[var(--ink)]" href="#work-with-me">Work with me</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
