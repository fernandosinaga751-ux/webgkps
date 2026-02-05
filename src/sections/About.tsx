import { Heart, Users, BookOpen, HandHeart } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Kasih',
    description: 'Mencintai sesama seperti Kristus telah mengasihi kita.',
  },
  {
    icon: Users,
    title: 'Komunitas',
    description: 'Membangun persaudaraan yang kuat dalam iman.',
  },
  {
    icon: BookOpen,
    title: 'Firman',
    description: 'Meneguhkan iman melalui pengajaran Alkitab yang mendalam.',
  },
  {
    icon: HandHeart,
    title: 'Pelayanan',
    description: 'Melayani sesama dengan tulus dan penuh sukacita.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
            Tentang Kami
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
            Gereja yang Penuh <span className="text-amber-700">Kasih</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Gereja Kasih Karunia didirikan dengan visi untuk menjadi tempat di mana 
            setiap orang dapat mengalami kasih Tuhan dan menemukan tujuan hidup mereka.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/worship.jpg"
                alt="Ibadah di Gereja Kasih Karunia"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-amber-600 rounded-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-100 rounded-2xl -z-10" />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-800">
              Visi & Misi Kami
            </h3>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                <strong className="text-stone-800">Visi:</strong> Menjadi gereja yang 
                berdampak, memenangkan jiwa-jiwa untuk Kristus, dan membentuk murid-murid 
                yang setia dalam mengikuti Tuhan.
              </p>
              <p>
                <strong className="text-stone-800">Misi:</strong> Memuridkan umat 
                melalui pengajaran Firman Tuhan, membangun komunitas yang penuh kasih, 
                dan melayani sesama dengan tulus.
              </p>
            </div>
            <blockquote className="border-l-4 border-amber-600 pl-6 py-2 italic text-stone-700">
              "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah 
              mengaruniakan Anak-Nya yang tunggal."
              <footer className="text-sm text-stone-500 mt-2 not-italic">
                — Yohanes 3:16
              </footer>
            </blockquote>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
            >
              <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-5 group-hover:bg-amber-600 transition-colors">
                <value.icon className="w-7 h-7 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-serif font-bold text-stone-800 mb-2">
                {value.title}
              </h4>
              <p className="text-stone-600 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
