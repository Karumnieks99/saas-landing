const faqs = [
  {
    question: 'What kind of teams are the best fit?',
    answer:
      'Usually startups, SaaS teams, agencies, and product-led businesses that need frontend-heavy work shipped with clear communication and strong finish quality.',
  },
  {
    question: 'Do you work fully remote?',
    answer:
      'Yes. I am optimized for remote collaboration, async updates, scoped calls, and clear written communication.',
  },
  {
    question: 'What do you usually build?',
    answer:
      'Landing pages, product interfaces, dashboards, onboarding flows, internal tools, and frontend refactors that improve product quality and speed of delivery.',
  },
  {
    question: 'Can you work short-term or ongoing?',
    answer:
      'Yes. I can support a defined project, help across a few focused sprints, or contribute on an ongoing remote basis depending on the team\'s needs.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">FAQ</p>
        <h2 className="text-3xl font-semibold text-[var(--ink)] sm:text-4xl">The usual questions before starting a conversation.</h2>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <details
            key={faq.question}
            open={index === 0}
            className="group rounded-[28px] border border-[var(--line)] bg-[linear-gradient(180deg,#fffdf9,#f6ede1)] p-6 shadow-[0_22px_50px_-40px_var(--shadow)]"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-[var(--ink)] marker:hidden">
              {faq.question}
              <span className="rounded-full border border-[var(--line)] bg-[rgba(255,253,249,0.8)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)] group-open:text-[var(--accent)]">
                Open
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[var(--ink-soft)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
