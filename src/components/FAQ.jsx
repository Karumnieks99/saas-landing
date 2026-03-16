const faqs = [
  {
    question: 'How long does rollout usually take?',
    answer:
      'Most teams are live on one workflow within 10 business days. Multi-division rollouts or ERP-heavy setups usually take 3 to 5 weeks depending on the approval paths involved.',
  },
  {
    question: 'Do we need to leave Procore or Autodesk Build?',
    answer:
      'No. ScopeBolt sits alongside your project system. Teams keep core job data where it already lives and use ScopeBolt to control inbox capture, aging, and billing readiness.',
  },
  {
    question: 'Can we import our current RFI and CO logs?',
    answer:
      'Yes. Most teams start with active jobs plus a CSV import of open logs. Historical records can be brought in later when they matter for claims or audit history.',
  },
  {
    question: 'What about field adoption?',
    answer:
      'Field teams usually use simple upload and note flows rather than a full PM workspace. That keeps adoption realistic while still giving the office cleaner context.',
  },
  {
    question: 'Can accounting work from it too?',
    answer:
      'That is the point. ScopeBolt gives accounting a billing-ready handoff list with approved value, backup context, and status history so invoice support is cleaner.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="deferred-section space-y-8">
      <div className="space-y-4">
        <div className="eyebrow select-ui-none">FAQ</div>
        <h2 className="section-heading max-w-3xl text-[var(--text)]">
          Buyer questions, answered with the details teams usually need before rollout.
        </h2>
      </div>

      <div className="grid gap-4">
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0} className="group surface-card px-5 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-semibold text-[var(--text)] marker:hidden">
              <span>{faq.question}</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] border border-[var(--line)] bg-[var(--surface-soft)] text-xl leading-none text-[var(--accent-strong)] transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-soft)]">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
