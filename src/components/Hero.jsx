// src/components/Hero.jsx
export default function Hero() {
  return (
    <section id="hero" className="mt-4 px-2 sm:px-4 lg:px-8">
      <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[34px] border border-white/70 bg-white shadow-[0_28px_80px_-40px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&dpr=1"
            alt="Curated lounge with layered seating and warm lighting"
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1f150f]/70 via-[#1f150f]/35 to-transparent" />
        </div>
        <div className="relative flex flex-col gap-6 px-6 py-14 sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-white ring-1 ring-white/20 backdrop-blur-md">
            Furniture / Fixtures / Equipment
          </div>
          <div className="max-w-3xl space-y-5 text-white">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Serene, guest-ready spaces without the chaos.</h1>
            <p className="text-lg text-white/80">Freelance FF&E lead delivering sourcing, styling, and installs for boutique rentals and hospitality teams--clear updates, zero overwhelm.</p>
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#process"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#2f241c] shadow-md transition hover:bg-[#f4ede4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c9a7] focus-visible:ring-offset-2 focus-visible:ring-offset-white/10"
            >
              Book a discovery call
            </a>
            <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/85 ring-1 ring-white/25">
              Remote-first, on-site ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
