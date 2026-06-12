import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import AboutProgram from './components/AboutProgram/AboutProgram';
import CallToAction from './components/CallToAction/CallToAction';
import Footer from './components/Footer';

/**
 * Main application — assembles all landing page sections.
 * Full light theme throughout. tasteskill 4.11: one consistent theme.
 */
export default function App() {
  return (
    <div className="min-h-dvh bg-white">
      <Navbar />
      <main>
        <Hero />
        <AboutProgram />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
