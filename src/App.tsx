import './App.css';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Ministries from './sections/Ministries';
import Events from './sections/Events';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Ministries />
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
