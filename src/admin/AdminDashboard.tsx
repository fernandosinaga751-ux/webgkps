import { useState } from 'react';
import { Church, LogOut, Calendar, Clock, Users, Settings, Home, Edit2, Trash2, Plus, X, Check, Wifi, WifiOff } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useData, Event, Service, Ministry, HeroContent, ContactInfo } from '@/context/DataContext';

type Tab = 'hero' | 'events' | 'services' | 'ministries' | 'contact';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const { events, services, ministries, hero, contact, firestoreAvailable,
    addEvent, updateEvent, deleteEvent,
    addService, updateService, deleteService,
    addMinistry, updateMinistry, deleteMinistry,
    updateHero, updateContact } = useData();

  const [activeTab, setActiveTab] = useState<Tab>('events');

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'hero', label: 'Beranda', icon: Home },
    { id: 'events', label: 'Kegiatan', icon: Calendar },
    { id: 'services', label: 'Jadwal Ibadah', icon: Clock },
    { id: 'ministries', label: 'Pelayanan', icon: Users },
    { id: 'contact', label: 'Kontak', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-stone-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-amber-800 text-white px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Church className="w-6 h-6" />
          <span className="font-serif font-bold text-lg">GKPS Admin Panel</span>
          <span className={`ml-3 flex items-center gap-1 text-xs px-2 py-1 rounded-full ${firestoreAvailable ? 'bg-green-500/20 text-green-200' : 'bg-yellow-500/20 text-yellow-200'}`}>
            {firestoreAvailable ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
            {firestoreAvailable ? 'Tersinkron ke Firebase' : 'Mode Lokal (Firebase belum dikonfigurasi)'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-amber-200 hover:text-white text-sm transition-colors">
            Lihat Website →
          </a>
          <button onClick={logout} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-900 px-4 py-2 rounded-lg text-sm transition-colors">
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 bg-white shadow-sm p-4 flex flex-col gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-amber-100 text-amber-800' : 'text-stone-600 hover:bg-stone-100'}`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === 'hero' && <HeroEditor hero={hero} onSave={updateHero} />}
          {activeTab === 'events' && <EventsManager events={events} onAdd={addEvent} onUpdate={updateEvent} onDelete={deleteEvent} />}
          {activeTab === 'services' && <ServicesManager services={services} onAdd={addService} onUpdate={updateService} onDelete={deleteService} />}
          {activeTab === 'ministries' && <MinistriesManager ministries={ministries} onAdd={addMinistry} onUpdate={updateMinistry} onDelete={deleteMinistry} />}
          {activeTab === 'contact' && <ContactEditor contact={contact} onSave={updateContact} />}
        </main>
      </div>
    </div>
  );
}

// ======================================================
// HERO EDITOR
// ======================================================
function HeroEditor({ hero, onSave }: { hero: HeroContent; onSave: (h: HeroContent) => Promise<void> }) {
  const [form, setForm] = useState(hero);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-stone-800 mb-6">Edit Konten Beranda</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <Field label="Badge Teks" value={form.badge} onChange={v => setForm({ ...form, badge: v })} />
        <Field label="Judul Utama" value={form.title} onChange={v => setForm({ ...form, title: v })} />
        <Field label="Sub Judul" value={form.subtitle} onChange={v => setForm({ ...form, subtitle: v })} textarea />
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all ${saved ? 'bg-green-600' : 'bg-amber-700 hover:bg-amber-800'}`}>
          {saved ? <><Check className="w-4 h-4" /> Tersimpan!</> : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}

// ======================================================
// EVENTS MANAGER
// ======================================================
function EventsManager({ events, onAdd, onUpdate, onDelete }: {
  events: Event[];
  onAdd: (e: Omit<Event, 'id'>) => Promise<void>;
  onUpdate: (id: string, e: Partial<Event>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const empty: Omit<Event, 'id'> = { title: '', date: '', time: '', location: '', description: '', category: '', image: '/hero-church.jpg' };
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Event, 'id'>>(empty);

  const startEdit = (event: Event) => {
    setEditId(event.id);
    setForm({ title: event.title, date: event.date, time: event.time, location: event.location, description: event.description, category: event.category, image: event.image });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editId) {
      await onUpdate(editId, form);
    } else {
      await onAdd(form);
    }
    setShowForm(false);
    setEditId(null);
    setForm(empty);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">Manajemen Kegiatan</h2>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty); }} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Tambah Kegiatan
        </button>
      </div>

      {showForm && (
        <FormCard title={editId ? 'Edit Kegiatan' : 'Tambah Kegiatan'} onCancel={() => { setShowForm(false); setEditId(null); }} onSave={handleSave}>
          <Field label="Judul" value={form.title} onChange={v => setForm({ ...form, title: v })} />
          <Field label="Kategori" value={form.category} onChange={v => setForm({ ...form, category: v })} />
          <Field label="Tanggal" value={form.date} onChange={v => setForm({ ...form, date: v })} placeholder="e.g. 15-17 Maret 2024" />
          <Field label="Waktu" value={form.time} onChange={v => setForm({ ...form, time: v })} placeholder="e.g. 08:00 WIB" />
          <Field label="Lokasi" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          <Field label="Deskripsi" value={form.description} onChange={v => setForm({ ...form, description: v })} textarea />
          <Field label="URL Gambar" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="/hero-church.jpg" />
        </FormCard>
      )}

      <div className="space-y-3">
        {events.map(event => (
          <div key={event.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{event.category}</span>
                <span className="text-xs text-stone-400">{event.date} · {event.time}</span>
              </div>
              <h3 className="font-semibold text-stone-800">{event.title}</h3>
              <p className="text-sm text-stone-500 mt-0.5">{event.location}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(event)} className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors">
                <Edit2 className="w-4 h-4" />
              </button>
              <button onClick={() => onDelete(event.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================
// SERVICES MANAGER
// ======================================================
function ServicesManager({ services, onAdd, onUpdate, onDelete }: {
  services: Service[];
  onAdd: (s: Omit<Service, 'id'>) => Promise<void>;
  onUpdate: (id: string, s: Partial<Service>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const empty: Omit<Service, 'id'> = { day: '', name: '', time: '', location: '', description: '' };
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Service, 'id'>>(empty);

  const startEdit = (s: Service) => {
    setEditId(s.id);
    setForm({ day: s.day, name: s.name, time: s.time, location: s.location, description: s.description });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editId) await onUpdate(editId, form);
    else await onAdd(form);
    setShowForm(false); setEditId(null); setForm(empty);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">Jadwal Ibadah</h2>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty); }} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Tambah Jadwal
        </button>
      </div>

      {showForm && (
        <FormCard title={editId ? 'Edit Jadwal' : 'Tambah Jadwal'} onCancel={() => { setShowForm(false); setEditId(null); }} onSave={handleSave}>
          <Field label="Hari" value={form.day} onChange={v => setForm({ ...form, day: v })} placeholder="Minggu" />
          <Field label="Nama Ibadah" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <Field label="Waktu" value={form.time} onChange={v => setForm({ ...form, time: v })} placeholder="07:00 & 10:00 WIB" />
          <Field label="Lokasi" value={form.location} onChange={v => setForm({ ...form, location: v })} />
          <Field label="Deskripsi" value={form.description} onChange={v => setForm({ ...form, description: v })} textarea />
        </FormCard>
      )}

      <div className="space-y-3">
        {services.map(s => (
          <div key={s.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start justify-between gap-4">
            <div>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{s.day}</span>
              <h3 className="font-semibold text-stone-800 mt-1">{s.name}</h3>
              <p className="text-sm text-stone-500">{s.time} · {s.location}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(s)} className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(s.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================
// MINISTRIES MANAGER
// ======================================================
function MinistriesManager({ ministries, onAdd, onUpdate, onDelete }: {
  ministries: Ministry[];
  onAdd: (m: Omit<Ministry, 'id'>) => Promise<void>;
  onUpdate: (id: string, m: Partial<Ministry>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}) {
  const empty: Omit<Ministry, 'id'> = { name: '', description: '', members: '', image: '' };
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Ministry, 'id'>>(empty);

  const startEdit = (m: Ministry) => {
    setEditId(m.id);
    setForm({ name: m.name, description: m.description, members: m.members, image: m.image });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (editId) await onUpdate(editId, form);
    else await onAdd(form);
    setShowForm(false); setEditId(null); setForm(empty);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-800">Pelayanan / Ministri</h2>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(empty); }} className="flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="w-4 h-4" /> Tambah Pelayanan
        </button>
      </div>

      {showForm && (
        <FormCard title={editId ? 'Edit Pelayanan' : 'Tambah Pelayanan'} onCancel={() => { setShowForm(false); setEditId(null); }} onSave={handleSave}>
          <Field label="Nama Pelayanan" value={form.name} onChange={v => setForm({ ...form, name: v })} />
          <Field label="Jumlah Anggota" value={form.members} onChange={v => setForm({ ...form, members: v })} placeholder="150+ Anggota" />
          <Field label="Deskripsi" value={form.description} onChange={v => setForm({ ...form, description: v })} textarea />
          <Field label="URL Gambar" value={form.image} onChange={v => setForm({ ...form, image: v })} placeholder="/sunday-school.jpg" />
        </FormCard>
      )}

      <div className="space-y-3">
        {ministries.map(m => (
          <div key={m.id} className="bg-white rounded-xl p-4 shadow-sm flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-stone-800">{m.name}</h3>
              <p className="text-sm text-stone-500">{m.members}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => startEdit(m)} className="p-2 text-stone-400 hover:text-amber-700 hover:bg-amber-50 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => onDelete(m.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================================================
// CONTACT EDITOR
// ======================================================
function ContactEditor({ contact, onSave }: { contact: ContactInfo; onSave: (c: ContactInfo) => Promise<void> }) {
  const [form, setForm] = useState(contact);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    await onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-stone-800 mb-6">Edit Informasi Kontak</h2>
      <div className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
        <Field label="Alamat" value={form.address} onChange={v => setForm({ ...form, address: v })} />
        <Field label="Nomor Telepon" value={form.phone} onChange={v => setForm({ ...form, phone: v })} />
        <Field label="Email" value={form.email} onChange={v => setForm({ ...form, email: v })} />
        <Field label="Jam Operasional" value={form.hours} onChange={v => setForm({ ...form, hours: v })} />
        <button onClick={handleSave} className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-medium transition-all ${saved ? 'bg-green-600' : 'bg-amber-700 hover:bg-amber-800'}`}>
          {saved ? <><Check className="w-4 h-4" /> Tersimpan!</> : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  );
}

// ======================================================
// KOMPONEN HELPER
// ======================================================
function Field({ label, value, onChange, textarea, placeholder }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700 mb-1">{label}</label>
      {textarea ? (
        <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} placeholder={placeholder} className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm resize-none" />
      ) : (
        <input type="text" value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-800 text-sm" />
      )}
    </div>
  );
}

function FormCard({ title, children, onCancel, onSave }: { title: string; children: React.ReactNode; onCancel: () => void; onSave: () => void }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-stone-800">{title}</h3>
        <button onClick={onCancel} className="p-1 text-stone-400 hover:text-stone-600"><X className="w-5 h-5" /></button>
      </div>
      <div className="space-y-3">
        {children}
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={onSave} className="bg-amber-700 hover:bg-amber-800 text-white px-5 py-2 rounded-lg text-sm font-medium">Simpan</button>
        <button onClick={onCancel} className="bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 px-5 py-2 rounded-lg text-sm font-medium">Batal</button>
      </div>
    </div>
  );
}
