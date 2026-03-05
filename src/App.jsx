// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import Intro from './components/Intro';
import Process from './components/Process';
import WhyChoose from './components/WhyChoose';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <Navbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-20 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <Hero />
        <SocialProof />
        <Intro />
        <WhyChoose />
        <Process />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
