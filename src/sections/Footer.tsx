import { Church, Facebook, Instagram, Youtube, Music } from 'lucide-react';

const quickLinks = [
  { name: 'Beranda', href: '#home' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Jadwal Ibadah', href: '#services' },
  { name: 'Pelayanan', href: '#ministries' },
  { name: 'Kegiatan', href: '#events' },
  { name: 'Kontak', href: '#contact' },
];

const services = [
  { name: 'Ibadah Minggu', time: '07:00 & 10:00 WIB' },
  { name: 'Doa Malam', time: 'Rabu, 19:00 WIB' },
  { name: 'Ibadah Pemuda', time: 'Jumat, 19:00 WIB' },
  { name: 'Sekolah Sabat', time: 'Sabtu, 16:00 WIB' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Music, href: '#', label: 'TikTok' },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-6">
              <Church className="w-8 h-8 text-amber-500" />
              <span className="font-serif text-xl font-bold">
                Gereja Kasih Karunia
              </span>
            </a>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Menjadi gereja yang berdampak, memenangkan jiwa-jiwa untuk Kristus, 
              dan membentuk murid-murid yang setia.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-stone-800 rounded-lg flex items-center justify-center hover:bg-amber-600 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-stone-400 hover:text-amber-500 transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Jadwal Ibadah</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-sm">
                  <span className="text-white font-medium">{service.name}</span>
                  <span className="text-stone-500 block">{service.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif text-lg font-bold mb-6">Berlangganan</h4>
            <p className="text-stone-400 text-sm mb-4">
              Dapatkan informasi terbaru tentang kegiatan dan pengajaran gereja.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email Anda"
                className="w-full px-4 py-3 bg-stone-800 border border-stone-700 rounded-lg text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Berlangganan
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-stone-500">
            <p>
              © {new Date().getFullYear()} Gereja Kasih Karunia. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-amber-500 transition-colors">
                Kebijakan Privasi
              </a>
              <a href="#" className="hover:text-amber-500 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
