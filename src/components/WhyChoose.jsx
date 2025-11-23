// src/components/WhyChoose.jsx
const perks = [
  {
    title: 'Hands-on management',
    copy: 'One point of contact for sourcing, deliveries, installs, and punch lists.',
    gradient: 'from-[#f7f1e9] to-[#e9dccb]',
  },
  {
    title: 'Aftercare included',
    copy: 'Support for reorders, replacements, and maintenance plans to protect your investment.',
    gradient: 'from-[#f6efe6] to-[#e7d7c6]',
  },
  {
    title: 'Supplier flexibility',
    copy: 'Open vendor mix so we can match budget, lead times, and design intent.',
    gradient: 'from-[#b98961] to-[#8a5e3c]',
    dark: true,
  },
];

const showcase = [
  {
    title: 'Detail-first delivery',
    copy: 'QC checklists and white-glove installs to keep spaces guest-ready from day one.',
    image: 'https://images.pexels.com/photos/6585663/pexels-photo-6585663.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
  },
  {
    title: 'Custom requests',
    copy: 'Bespoke pieces and tailored sourcing when you need something unique.',
    image: 'https://images.pexels.com/photos/6585731/pexels-photo-6585731.jpeg?auto=compress&cs=tinysrgb&w=1100&h=750&dpr=1',
  },
];

export default function WhyChoose() {
  return (
    <section id="why" className="space-y-8">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8c7a6c]">Expertise</p>
        <h2 className="text-3xl font-semibold text-[#2f241c] sm:text-4xl">Why teams book me on Upwork</h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className={`flex flex-col gap-3 rounded-[22px] p-6 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.35)] ${
              perk.dark ? 'bg-gradient-to-br from-[#8a5e3c] to-[#4a3424] text-white' : `bg-gradient-to-br ${perk.gradient} text-[#2f241c]`
            }`}
          >
            <h3 className="text-xl font-semibold">{perk.title}</h3>
            <p className={`${perk.dark ? 'text-white/80' : 'text-[#4a3b30]'}`}>{perk.copy}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {showcase.map((item) => (
          <div key={item.title} className="relative overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_26px_70px_-45px_rgba(0,0,0,0.35)]">
            <img src={item.image} alt={item.title} className="h-64 w-full object-cover md:h-72" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f150f]/65 via-transparent to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.copy}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
