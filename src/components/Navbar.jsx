// src/components/Navbar.jsx
import { useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Expertise', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-b from-[#f5eee5]/95 to-transparent pb-3 pt-4 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 rounded-full border border-white/70 bg-white/90 px-4 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] sm:px-6">
        <a href="#hero" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#e5c9a7] via-[#d4b184] to-[#b98961] text-base font-semibold uppercase tracking-tight text-[#2f241c]">
            U
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold tracking-tight text-[#2f241c]">upwork studio</span>
            <span className="text-xs font-medium text-[#7a685b]">interiors & ff&e</span>
          </div>
        </a>
        <span className="hidden rounded-full border border-[#e6d6c5] bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7a685b] shadow-sm sm:inline-flex">
          Portfolio preview
        </span>
        <nav className="ml-6 hidden items-center gap-6 text-sm font-semibold text-[#4a3b30] md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="transition hover:text-[#b98961] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b88f] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-[#b98961] px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#a77553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c9a7] focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex"
          >
            Book intro call
          </a>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-[#2f241c] ring-1 ring-[#e7d7c6] transition hover:bg-[#f4ede4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b88f] focus-visible:ring-offset-2 focus-visible:ring-offset-white md:hidden"
            aria-expanded={open}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
      {open && (
        <div className="mx-auto mt-3 flex max-w-6xl flex-col gap-3 rounded-2xl border border-white/60 bg-white/95 px-4 py-4 text-sm shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2 font-semibold text-[#2f241c] transition hover:bg-[#f4ede4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8b88f] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#b98961] px-4 py-3 text-center font-semibold text-white shadow-sm transition hover:bg-[#a77553] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e5c9a7] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Book intro call
          </a>
        </div>
      )}
    </header>
  );
}
