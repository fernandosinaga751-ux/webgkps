import { Users, Baby, UserCircle2, HeartHandshake, Music, BookOpen } from 'lucide-react';

const ministries = [
  {
    icon: Baby,
    name: 'Sekolah Minggu',
    description: 'Pelayanan khusus untuk anak-anak usia 3-12 tahun dengan metode pembelajaran yang menyenangkan dan interaktif.',
    image: '/sunday-school.jpg',
    members: '150+ Anak',
  },
  {
    icon: UserCircle2,
    name: 'Pemuda & Remaja',
    description: 'Komunitas pemuda yang aktif dalam pelayanan, pengajaran, dan kegiatan sosial untuk membangun karakter Kristiani.',
    image: '/youth.jpg',
    members: '200+ Pemuda',
  },
  {
    icon: Users,
    name: 'Persekutuan Pria',
    description: 'Wadah bagi para pria untuk bertumbuh dalam iman, saling mendukung, dan menjadi kepala keluarga yang takut akan Tuhan.',
    image: '/community.jpg',
    members: '100+ Anggota',
  },
  {
    icon: HeartHandshake,
    name: 'Pelayanan Sosial',
    description: 'Melayani masyarakat melalui berbagai program bakti sosial, bantuan kemanusiaan, dan pemberdayaan ekonomi.',
    image: '/charity.jpg',
    members: '50+ Relawan',
  },
  {
    icon: Music,
    name: 'Paduan Suara',
    description: 'Melayani Tuhan melalui pujian dan penyembahan dengan berbagai genre musik dari tradisional hingga kontemporer.',
    image: '/worship.jpg',
    members: '80+ Anggota',
  },
  {
    icon: BookOpen,
    name: 'Kelompok Sel',
    description: 'Pertemuan rumah tangga untuk mempelajari Alkitab, berdoa bersama, dan saling menguatkan dalam iman.',
    image: '/community.jpg',
    members: '30+ Kelompok',
  },
];

export default function Ministries() {
  return (
    <section id="ministries" className="py-20 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
            Pelayanan
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
            Pelayanan <span className="text-amber-700">Kami</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Bergabunglah dalam berbagai pelayanan kami dan temukan tempat di mana 
            Anda dapat berkontribusi dan bertumbuh bersama.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={ministry.image}
                  alt={ministry.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                    <ministry.icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <span className="text-sm text-stone-500 font-medium">
                    {ministry.members}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-800 mb-3">
                  {ministry.name}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {ministry.description}
                </p>
                <button className="mt-4 text-amber-600 font-medium text-sm hover:text-amber-700 transition-colors flex items-center gap-1">
                  Pelajari Lebih Lanjut
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
