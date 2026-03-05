export default function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-[36px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(241,232,219,0.9))] px-6 py-10 shadow-[0_30px_70px_-48px_var(--shadow)] sm:px-10 sm:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(186,142,90,0.12),transparent_24%),radial-gradient(circle_at_85%_75%,rgba(125,92,57,0.12),transparent_26%)]" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Need a remote developer?</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
            If your team needs someone who can think clearly and ship cleanly, we should talk.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--ink-soft)]">
            The best engagements are usually simple: clear scope, strong trust, direct communication, and work that matters.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#work-with-me"
            className="rounded-full bg-[var(--ink)] px-6 py-3 text-center text-sm font-semibold text-[var(--panel-strong)] shadow-[0_22px_36px_-22px_var(--shadow)] transition hover:bg-[#382c20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            Work with me
          </a>
          <a
            href="mailto:hello@eg-remote.dev"
            className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.84)] px-6 py-3 text-center text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--panel-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
          >
            hello@eg-remote.dev
          </a>
        </div>
      </div>
    </section>
  );
}
