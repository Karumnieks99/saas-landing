// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#e6d6c5] bg-white/80 py-12 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#e6d6c5] bg-slate-100">
              <img
                src="https://images.pexels.com/photos/6585667/pexels-photo-6585667.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1"
                alt="Finished hospitality lounge"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-[#2f241c]">upwork studio</p>
              <p className="text-sm text-[#7a685b]">Freelance FF&E and interior support for hospitality and rentals.</p>
            </div>
          </div>
          <a
            href="mailto:hello@upwork-studio.test"
            className="rounded-full bg-[#b98961] px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#a77553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c9a7] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            hello@upwork-studio.test
          </a>
        </div>
        <div className="flex flex-col gap-3 border-t border-[#e6d6c5] pt-4 text-sm text-[#7a685b] sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} Upwork portfolio preview.</p>
          <div className="flex gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <a className="hover:text-[#2f241c]" href="#about">About</a>
            <span aria-hidden>|</span>
            <a className="hover:text-[#2f241c]" href="#process">Process</a>
            <span aria-hidden>|</span>
            <a className="hover:text-[#2f241c]" href="#why">Expertise</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
