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
    <div className="page-shell min-h-screen overflow-x-clip bg-[var(--bg)] text-[var(--text)]">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 px-3 pb-24 pt-4 sm:px-4 lg:px-6 lg:pt-6"
      >
        <Hero />
        <SocialProof />
        <Intro />
        <WhyChoose />
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
