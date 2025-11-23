// src/components/Process.jsx

const layers = [
  {
    image: 'https://images.pexels.com/photos/271619/pexels-photo-271619.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    offset: 0,
    z: 30,
  },
  {
    image: 'https://images.pexels.com/photos/6585619/pexels-photo-6585619.jpeg?auto=compress&cs=tinysrgb&w=1100&h=760&dpr=1',
    offset: 18,
    z: 20,
  },
  {
    image: 'https://images.pexels.com/photos/6585756/pexels-photo-6585756.jpeg?auto=compress&cs=tinysrgb&w=1000&h=720&dpr=1',
    offset: 36,
    z: 10,
  },
];

export default function Process() {
  return (
    <section id="process" className="grid items-center gap-12 lg:grid-cols-[1.05fr,1fr]">
      <div className="space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c7a6c]">Process</p>
        <h2 className="text-3xl font-semibold leading-tight text-[#2f241c] sm:text-4xl">How I manage FF&E from brief to handover</h2>
        <p className="max-w-xl text-base leading-relaxed text-[#4a3b30]">
          Clear checkpoints keep you informed: budgets, sourcing, delivery windows, installs, and post-launch support--all handled with a single point of contact.
        </p>
        <div className="mt-6 grid gap-4 rounded-[28px] border border-[#f0e6d9] bg-white p-6 shadow-[0_24px_65px_-45px_rgba(0,0,0,0.35)]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f4ede4] text-lg font-semibold text-[#b98961] ring-1 ring-[#e6d6c5]">
              5
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8c7a6c]">Aftercare</p>
              <h3 className="text-xl font-semibold text-[#2f241c]">Support and maintenance</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#4a3b30]">
                Warranty tracking, spare sets, and maintenance reminders so rooms stay guest-ready. I remain available for refresh cycles and reorders.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full bg-[#f4ede4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a685b] ring-1 ring-[#e6d6c5]">
              Logistics and delivery
            </span>
            <span className="rounded-full bg-[#f4ede4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a685b] ring-1 ring-[#e6d6c5]">
              Installation
            </span>
            <span className="rounded-full bg-[#f4ede4] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a685b] ring-1 ring-[#e6d6c5]">
              Post-handover
            </span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
        <div className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-white via-[#f9f3ec] to-[#e6d6c5] shadow-[0_26px_70px_-45px_rgba(0,0,0,0.35)]" />
        <div className="absolute left-6 top-6 right-6 h-[360px] overflow-visible">
          {layers.map((layer, idx) => (
            <div
              key={layer.offset}
              className="absolute inset-0 overflow-hidden rounded-[24px] border border-white shadow-[0_16px_50px_-35px_rgba(0,0,0,0.55)]"
              style={{
                transform: `translateY(${layer.offset}px)`,
                zIndex: layer.z,
              }}
            >
              <img
                src={layer.image}
                alt="Hospitality interior"
                className={`h-full w-full object-cover ${idx === 0 ? 'animate-kenburns' : ''}`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-[#1f150f]/25" />
            </div>
          ))}
        </div>
        <div className="absolute bottom-6 right-6 rounded-[18px] bg-white/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a685b] ring-1 ring-[#e6d6c5] backdrop-blur">
          Sample spec boards
        </div>
      </div>
    </section>
  );
}
