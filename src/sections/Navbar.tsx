import { useState, useEffect } from 'react';
import { Menu, X, Church } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang', href: '#about' },
  { name: 'Ibadah', href: '#services' },
  { name: 'Pelayanan', href: '#ministries' },
  { name: 'Kegiatan', href: '#events' },
  { name: 'Kontak', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <Church
              className={`w-8 h-8 transition-colors ${
                isScrolled ? 'text-amber-700' : 'text-white'
              }`}
            />
            <span
              className={`font-serif text-lg md:text-xl font-semibold transition-colors ${
                isScrolled ? 'text-amber-900' : 'text-white'
              }`}
            >
              Gereja Kristen Prostestan Simalungun (GKPS)
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                  isScrolled
                    ? 'text-amber-900 hover:bg-amber-50 hover:text-amber-700'
                    : 'text-white/90 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              className={`${
                isScrolled
                  ? 'bg-amber-700 hover:bg-amber-800 text-white'
                  : 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm'
              }`}
            >
              Jadwal Ibadah
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-amber-900 hover:bg-amber-50'
                : 'text-white hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white rounded-xl shadow-lg mt-2 p-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-amber-900 hover:bg-amber-50 rounded-lg font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <Button className="mt-2 bg-amber-700 hover:bg-amber-800 text-white w-full">
                Jadwal Ibadah
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
