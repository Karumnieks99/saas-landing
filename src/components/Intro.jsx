const problems = [
  'The team needs frontend work finished without constant follow-up.',
  'Design exists, but turning it into a polished product experience is lagging.',
  'There is too much communication overhead around otherwise straightforward work.',
];

const approach = [
  'I pick up context quickly and turn it into clear, shippable work.',
  'I focus on interfaces, responsiveness, polish, and implementation quality.',
  'I communicate directly so the team always knows what is moving and what is blocked.',
];

export default function Intro() {
  return (
    <section id="solution" className="grid gap-6 lg:grid-cols-[0.88fr,1.12fr]">
      <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f4eadc)] p-7 shadow-[0_26px_60px_-42px_var(--shadow)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">What I solve</p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--ink)] sm:text-4xl">
          Good teams do not usually need more meetings. They need someone who can turn direction into finished work.
        </h2>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--ink-soft)]">
          My value is strongest when the product team already knows what it wants but needs a remote developer who can move
          cleanly from scope to delivery.
        </p>

        <div className="mt-8 rounded-[28px] border border-[var(--line)] bg-[rgba(239,228,214,0.64)] p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-[var(--ink)]">Typical engagement outcome</p>
            <span className="rounded-full bg-[rgba(255,253,249,0.84)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              Better delivery
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">Before</p>
              <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">More noise</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">unclear ownership, patchy polish, slow frontend iteration</p>
            </div>
            <div className="rounded-[22px] border border-[var(--line)] bg-[rgba(255,253,249,0.88)] p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">After</p>
              <p className="mt-3 text-3xl font-semibold text-[var(--ink)]">Cleaner output</p>
              <p className="mt-1 text-sm text-[var(--ink-soft)]">shipped work, clearer updates, and a better user-facing result</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-[32px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f6ede1)] p-7 shadow-[0_22px_50px_-42px_var(--shadow)]">
          <div className="inline-flex rounded-full border border-[rgba(125,92,57,0.16)] bg-[rgba(125,92,57,0.08)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            Team pain
          </div>
          <div className="mt-5 space-y-4">
            {problems.map((problem) => (
              <div key={problem} className="rounded-[24px] border border-[var(--line)] bg-[rgba(239,228,214,0.56)] p-4">
                <p className="text-sm leading-relaxed text-[var(--ink-soft)]">{problem}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] border border-[rgba(125,92,57,0.16)] bg-[linear-gradient(180deg,rgba(186,142,90,0.1),rgba(255,253,249,0.92))] p-7 shadow-[0_22px_50px_-42px_var(--shadow)]">
          <div className="inline-flex rounded-full border border-[rgba(125,92,57,0.16)] bg-[rgba(255,253,249,0.76)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            My approach
          </div>
          <div className="mt-5 space-y-4">
            {approach.map((item) => (
              <div key={item} className="rounded-[24px] border border-[rgba(125,92,57,0.14)] bg-[rgba(255,253,249,0.86)] p-4">
                <p className="text-sm leading-relaxed text-[var(--ink)]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
