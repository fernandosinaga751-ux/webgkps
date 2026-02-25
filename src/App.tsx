import './App.css';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Ministries from './sections/Ministries';
import Events from './sections/Events';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

// Tentukan apakah URL adalah halaman admin
const isAdminRoute = window.location.pathname.startsWith('/admin');

function AdminGate() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <AdminLogin />;
  return <AdminDashboard />;
}

function MainWebsite() {
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

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        {isAdminRoute ? <AdminGate /> : <MainWebsite />}
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
