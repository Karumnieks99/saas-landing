import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import WhyChoose from './components/WhyChoose';
import Intro from './components/Intro';
import Process from './components/Process';
import Integrations from './components/Integrations';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="mx-auto flex max-w-[1200px] flex-col gap-16 px-4 pb-20 pt-6 sm:px-6 lg:gap-24 lg:px-8 lg:pt-8">
        <Hero />
        <SocialProof />
        <WhyChoose />
        <Intro />
        <Process />
        <Integrations />
        <Pricing />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
