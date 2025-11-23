// src/App.jsx
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Process from './components/Process';
import WhyChoose from './components/WhyChoose';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f5eee5] via-[#f8f4ed] to-[#f5eee5] text-[#2f241c]">
      <Navbar />
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 pb-20 pt-6 sm:px-6 lg:px-8">
        <Hero />
        <Intro />
        <Process />
        <WhyChoose />
      </main>
      <Footer />
    </div>
  );
}
