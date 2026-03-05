const fit = ['Startups', 'SaaS teams', 'Agencies', 'Founders', 'Product leads', 'Remote-first teams'];

const points = [
  {
    title: 'Built for remote teams',
    copy: 'I work well inside async environments where updates need to be clear, decisions documented, and momentum maintained without constant calls.',
  },
  {
    title: 'Product and implementation',
    copy: 'The value is not just writing code. It is making the right tradeoffs, keeping the UI sharp, and finishing the work properly.',
  },
];

export default function SocialProof() {
  return (
    <section id="about" className="space-y-8">
      <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,253,249,0.96),rgba(241,232,219,0.82))] p-7 shadow-[0_26px_60px_-42px_var(--shadow)]">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
          Best fit for teams like
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {fit.map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-[var(--line)] bg-[rgba(255,253,249,0.84)] px-4 py-4 text-center text-sm font-semibold text-[var(--ink-soft)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.88fr,1.12fr]">
        <div className="rounded-[30px] border border-[var(--line)] bg-[var(--panel)] p-7 shadow-[0_26px_60px_-42px_var(--shadow)]">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Positioning</p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">I am most useful when a team needs someone who can quietly take responsibility and ship.</h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
            That usually means moving quickly, communicating clearly, and making thoughtful decisions without creating more
            process than the team needs.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ['Remote', 'comfortable with async work and overlap windows'],
              ['Frontend', 'React, UI systems, landing pages, product surfaces'],
              ['Reliable', 'clean delivery, strong finish, low noise'],
            ].map(([value, label]) => (
              <div key={value} className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
                <p className="text-2xl font-semibold text-[var(--ink)]">{value}</p>
                <p className="mt-2 text-sm text-[var(--ink-soft)]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {points.map((point) => (
            <div
              key={point.title}
              className="rounded-[30px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f4eadc)] p-7 shadow-[0_26px_60px_-44px_var(--shadow)]"
            >
              <div className="inline-flex rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.76)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                Why it works
              </div>
              <p className="mt-5 text-lg leading-relaxed text-[var(--ink)]">{point.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--ink-soft)]">{point.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
