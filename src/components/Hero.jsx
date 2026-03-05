const highlights = [
  ['Remote-first', 'async friendly and overlap-ready'],
  ['Frontend + product', 'React, UX, and shipping focus'],
  ['Clear execution', 'clean handoffs and low drama'],
];

export default function Hero() {
  return (
    <section id="hero" className="mt-4">
      <div className="relative overflow-hidden rounded-[40px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,253,249,0.98),rgba(241,232,219,0.9))] px-6 py-10 shadow-[0_36px_96px_-60px_var(--shadow)] sm:px-10 sm:py-14 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(186,142,90,0.18),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(125,92,57,0.12),transparent_22%),radial-gradient(circle_at_74%_82%,rgba(255,255,255,0.5),transparent_24%)]" />
        <div className="absolute -left-20 top-1/3 h-52 w-[36rem] rotate-[-10deg] bg-[linear-gradient(90deg,transparent,rgba(186,142,90,0.16),transparent)] blur-2xl" />
        <div className="absolute right-[-9rem] top-8 h-64 w-64 rounded-full bg-[rgba(255,255,255,0.4)] blur-3xl" />

        <div className="relative grid items-center gap-12 lg:grid-cols-[0.94fr,1.06fr]">
          <div className="flex flex-col gap-7">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.82)] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Independent remote developer
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-4xl font-semibold leading-[0.98] text-[var(--ink)] sm:text-5xl lg:text-7xl">
                Remote developer for startups and product teams that need clean execution.
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-[var(--ink-soft)] sm:text-xl">
                I help teams design, build, and ship product work without adding communication drag. Best fit for remote
                teams that want someone who can think, build, and deliver.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="#work-with-me"
                className="rounded-full bg-[var(--ink)] px-6 py-3 text-center text-sm font-semibold text-[var(--panel-strong)] shadow-[0_22px_36px_-24px_var(--shadow)] transition hover:bg-[#382c20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                Work with me
              </a>
              <a
                href="#services"
                className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.82)] px-6 py-3 text-center text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--panel-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]"
              >
                See what I do
              </a>
            </div>

            <div className="flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.82)] px-4 py-2">Remote collaboration</span>
              <span className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.82)] px-4 py-2">Product-minded development</span>
              <span className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.82)] px-4 py-2">Available for contract work</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-x-10 top-6 h-28 rounded-full bg-[rgba(186,142,90,0.18)] blur-3xl" />
            <div className="relative rounded-[34px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f4eadc)] p-5 shadow-[0_34px_70px_-46px_var(--shadow)]">
              <div className="flex items-center justify-between rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,249,0.9)] px-4 py-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">How I work</p>
                  <p className="mt-1 text-lg font-semibold text-[var(--ink)]">Remote delivery, without the overhead</p>
                </div>
                <span className="rounded-full bg-[rgba(186,142,90,0.14)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
                  Available
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {highlights.map(([value, label]) => (
                  <div key={value} className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
                    <p className="text-2xl font-semibold text-[var(--ink)]">{value}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--ink-soft)]">{label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-4 xl:grid-cols-[1.08fr,0.92fr]">
                <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Typical project support</p>
                      <p className="mt-1 text-lg font-semibold text-[var(--ink)]">From idea to shipped interface</p>
                    </div>
                    <span className="rounded-full bg-[var(--panel-soft)] px-3 py-1 text-xs font-semibold text-[var(--ink-soft)]">Async friendly</span>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      ['Landing pages', 'Marketing pages that feel sharp and intentional'],
                      ['Product UI', 'Features, dashboards, flows, and internal tooling'],
                      ['Frontend cleanup', 'Refactors, responsiveness, and performance fixes'],
                      ['Shipping support', 'Handoffs, QA, polish, and release help'],
                    ].map(([item, detail]) => (
                      <div key={item} className="flex items-center justify-between rounded-2xl border border-[var(--line)] bg-[rgba(239,228,214,0.6)] px-3 py-3">
                        <div>
                          <p className="text-sm font-medium text-[var(--ink)]">{item}</p>
                          <p className="text-xs uppercase tracking-[0.15em] text-[var(--muted)]">{detail}</p>
                        </div>
                        <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-[24px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">What teams value</p>
                    <div className="mt-4 space-y-3">
                      {[
                        ['Fast, clear communication'],
                        ['Strong UI judgment'],
                        ['Ownership without hand-holding'],
                      ].map(([item]) => (
                        <div key={item} className="rounded-2xl border border-[var(--line)] bg-[rgba(239,228,214,0.56)] px-3 py-3">
                          <p className="text-sm font-semibold text-[var(--ink)]">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[24px] border border-[rgba(125,92,57,0.16)] bg-[linear-gradient(180deg,rgba(186,142,90,0.12),rgba(255,253,249,0.92))] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Working style</p>
                      <span className="rounded-full bg-[rgba(255,253,249,0.86)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
                        Calm + direct
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-soft)]">
                      I work best with teams that value clarity, trust async communication, and want output they can actually
                      ship.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-[24px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <input
                    type="email"
                    placeholder="Enter your work email"
                    className="min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[rgba(239,228,214,0.56)] px-4 py-3 text-sm text-[var(--ink)] outline-none placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
                  />
                  <button
                    type="button"
                    className="rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-[var(--panel-strong)] transition hover:bg-[#382c20]"
                  >
                    Start a conversation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
