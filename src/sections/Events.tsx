import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    title: 'Retreat Tahunan 2024',
    date: '15-17 Maret 2024',
    time: '08:00 WIB',
    location: 'Puncak, Bogor',
    description: 'Retreat tahunan untuk seluruh jemaat dengan tema "Berjalan bersama Tuhan".',
    image: '/hero-church.jpg',
    category: 'Retreat',
  },
  {
    title: 'Konser Paskah',
    date: '30 Maret 2024',
    time: '18:00 WIB',
    location: 'Gedung Utama',
    description: 'Malam pujian dan penyembahan spesial perayaan Paskah bersama paduan suara.',
    image: '/worship.jpg',
    category: 'Konser',
  },
  {
    title: 'Bakti Sosial Komunitas',
    date: '7 April 2024',
    time: '08:00 WIB',
    location: 'Lingkungan Sekitar Gereja',
    description: 'Pelayanan sosial berupa pembagian sembako dan pemeriksaan kesehatan gratis.',
    image: '/charity.jpg',
    category: 'Sosial',
  },
];

export default function Events() {
  return (
    <section id="events" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
              Kegiatan Mendatang
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800">
              Acara <span className="text-amber-700">Kami</span>
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-amber-600 text-amber-700 hover:bg-amber-50 w-fit"
          >
            Lihat Semua Acara
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event, index) => (
            <div
              key={index}
              className="group bg-stone-50 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-stone-100"
            >
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-1/3 aspect-video lg:aspect-auto overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-stone-800 mb-3 group-hover:text-amber-700 transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-stone-600 mb-4 leading-relaxed">
                    {event.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="lg:w-auto p-6 lg:p-8 flex items-center justify-center lg:border-l border-stone-200">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                    Daftar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
