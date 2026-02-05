import { Clock, MapPin, Calendar, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    day: 'Minggu',
    name: 'Ibadah Utama',
    time: '07:00 & 10:00 WIB',
    location: 'Gedung Utama Gereja',
    description: 'Ibadah bersama seluruh jemaat dengan pujian dan pengajaran Firman.',
    icon: Calendar,
  },
  {
    day: 'Rabu',
    name: 'Doa Malam',
    time: '19:00 WIB',
    location: 'Ruang Doa Gereja',
    description: 'Persekutuan doa untuk memohon pertolongan dan berkat Tuhan.',
    icon: Clock,
  },
  {
    day: 'Jumat',
    name: 'Ibadah Pemuda',
    time: '19:00 WIB',
    location: 'Ruang Pemuda',
    description: 'Ibadah khusus untuk kaum muda dengan pujian kontemporer.',
    icon: Video,
  },
  {
    day: 'Sabtu',
    name: 'Sekolah Sabat',
    time: '16:00 WIB',
    location: 'Ruang Kelas Anak',
    description: 'Pembelajaran Alkitab untuk anak-anak dan remaja.',
    icon: MapPin,
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
            Jadwal Ibadah
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
            Bergabung dalam <span className="text-amber-700">Ibadah</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Kami mengadakan berbagai ibadah sepanjang minggu. Pilih waktu yang 
            paling sesuai untuk Anda dan keluarga.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-stone-50 rounded-2xl p-6 sm:p-8 hover:bg-amber-50 transition-all duration-300 border border-stone-100 hover:border-amber-200"
            >
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-amber-600 text-white text-xs font-medium rounded-full">
                      {service.day}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-stone-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-stone-600 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-stone-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <span>{service.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-amber-600" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Live Streaming CTA */}
        <div className="bg-gradient-to-r from-amber-700 to-amber-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <div className="max-w-2xl mx-auto">
            <Video className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
              Tidak Bisa Hadir Secara Fisik?
            </h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              Ikuti ibadah kami secara live streaming setiap hari Minggu pukul 
              07:00 dan 10:00 WIB melalui YouTube dan Facebook kami.
            </p>
            <Button
              size="lg"
              className="bg-white text-amber-700 hover:bg-white/90 px-8"
            >
              <Video className="w-5 h-5 mr-2" />
              Tonton Live Streaming
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
