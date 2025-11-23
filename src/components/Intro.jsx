// src/components/Intro.jsx
const stats = [
  { value: '120+', label: 'Rooms delivered' },
  { value: '12 yrs', label: 'Hospitality focus' },
];

const trustedBy = ['Sonder', 'GuestReady', 'Locale', 'Boutique independents'];

export default function Intro() {
  return (
    <section id="about" className="grid gap-6 md:grid-cols-[1.05fr,1fr]">
      <div className="rounded-[28px] bg-gradient-to-br from-[#dcbc96] via-[#c8a173] to-[#b98961] p-8 text-white shadow-[0_26px_70px_-40px_rgba(0,0,0,0.45)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-base font-semibold uppercase tracking-tight text-white">
            FF
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Independent specialist</p>
            <h3 className="text-2xl font-semibold">FF&E without the chaos</h3>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
              <p className="text-3xl font-semibold">{item.value}</p>
              <p className="text-sm text-white/80">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/85">
          From sourcing to styling, I manage vendor coordination, lead times, and installs so you can keep guests happy and launches on schedule.
        </p>
        <div className="mt-5 space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">How I work</p>
          <div className="flex flex-wrap gap-2">
            {['Budget guardrails', 'Supplier comparisons', 'Weekly updates', 'Install supervision'].map((item) => (
              <span key={item} className="rounded-full bg-white/15 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur-sm">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-[28px] border border-white/80 bg-white p-8 shadow-[0_26px_70px_-45px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0e6d9] text-sm font-semibold text-[#2f241c] ring-1 ring-[#e6d6c5]">
            Who
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7a685b]">Who we are</p>
            <h3 className="text-2xl font-semibold text-[#2f241c]">Your Upwork partner</h3>
          </div>
        </div>
        <p className="mt-5 text-base leading-relaxed text-[#4a3b30]">
          I specialize in boutique stays, short-term rentals, and hospitality interiors--pairing calm communication with meticulous execution for owners, operators, and designers.
        </p>
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8c7a6c]">Trusted by operators and hosts</p>
          <div className="flex flex-wrap gap-2">
            {trustedBy.map((name) => (
              <span key={name} className="rounded-full bg-[#f4ede4] px-3 py-2 text-xs font-semibold text-[#2f241c] ring-1 ring-[#e6d6c5]">
                {name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-[#f0e6d9]">
            <img
              src="https://images.pexels.com/photos/3771838/pexels-photo-3771838.jpeg?auto=compress&cs=tinysrgb&w=240&h=240&dpr=1"
              alt="Reviewing mood boards at a desk"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#2f241c]">Hands-on and responsive</p>
            <p className="text-xs text-[#7a685b]">You get clear updates and fast decisions</p>
          </div>
        </div>
        <div className="mt-6 rounded-2xl border border-[#f0e6d9] bg-[#fdf9f3] p-5 shadow-[0_12px_35px_-30px_rgba(0,0,0,0.4)]">
          <p className="text-sm leading-relaxed text-[#4a3b30]">
            "We opened two floors ahead of schedule because she handled sourcing, vendors, and installs without us chasing a single update."
          </p>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a685b]">Operations lead, boutique rental brand</p>
        </div>
      </div>
    </section>
  );
}
