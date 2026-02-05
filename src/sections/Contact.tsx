import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Alamat',
    content: 'Jl Krakatau No 16 Medan',
  },
  {
    icon: Phone,
    title: 'Telepon',
    content: '085177005557',
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'gkpskrakataumedan@gmail.com',
  },
  {
    icon: Clock,
    title: 'Jam Operasional',
    content: 'Senin - Jumat: 08:00 - 17:00 WIB',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 text-sm font-medium rounded-full mb-4">
            Hubungi Kami
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-6">
            Mari <span className="text-amber-700">Terhubung</span>
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Ada pertanyaan atau ingin mengetahui lebih lanjut? Jangan ragu untuk 
            menghubungi kami. Kami siap membantu Anda.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100"
                >
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <h4 className="text-lg font-serif font-bold text-stone-800 mb-2">
                    {info.title}
                  </h4>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {info.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100">
              <div className="aspect-video bg-stone-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-stone-400 mx-auto mb-2" />
                  <p className="text-stone-500 text-sm">Peta Lokasi Gereja</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-stone-100">
            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-6">
              Kirim Pesan
            </h3>
            <form className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Nama Lengkap
                  </label>
                  <Input
                    placeholder="Masukkan nama Anda"
                    className="border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="email@anda.com"
                    className="border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Subjek
                </label>
                <Input
                  placeholder="Subjek pesan"
                  className="border-stone-200 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-2">
                  Pesan
                </label>
                <Textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={5}
                  className="border-stone-200 focus:border-amber-500 focus:ring-amber-500 resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6"
              >
                <Send className="w-4 h-4 mr-2" />
                Kirim Pesan
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
