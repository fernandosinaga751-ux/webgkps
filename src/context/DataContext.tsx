import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

// ======================================================
// TIPE DATA
// ======================================================
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  category: string;
  image: string;
}

export interface Service {
  id: string;
  day: string;
  name: string;
  time: string;
  location: string;
  description: string;
}

export interface Ministry {
  id: string;
  name: string;
  description: string;
  members: string;
  image: string;
}

export interface HeroContent {
  title: string;
  subtitle: string;
  badge: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

// ======================================================
// DATA DEFAULT (jika Firestore kosong atau belum disetup)
// ======================================================
const defaultEvents: Event[] = [
  {
    id: '1',
    title: 'Retreat Tahunan 2024',
    date: '15-17 Maret 2024',
    time: '08:00 WIB',
    location: 'Puncak, Bogor',
    description: 'Retreat tahunan untuk seluruh jemaat dengan tema "Berjalan bersama Tuhan".',
    image: '/hero-church.jpg',
    category: 'Retreat',
  },
  {
    id: '2',
    title: 'Konser Paskah',
    date: '30 Maret 2024',
    time: '18:00 WIB',
    location: 'Gedung Utama',
    description: 'Malam pujian dan penyembahan spesial perayaan Paskah bersama paduan suara.',
    image: '/worship.jpg',
    category: 'Konser',
  },
  {
    id: '3',
    title: 'Bakti Sosial Komunitas',
    date: '7 April 2024',
    time: '08:00 WIB',
    location: 'Lingkungan Sekitar Gereja',
    description: 'Pelayanan sosial berupa pembagian sembako dan pemeriksaan kesehatan gratis.',
    image: '/charity.jpg',
    category: 'Sosial',
  },
];

const defaultServices: Service[] = [
  { id: '1', day: 'Minggu', name: 'Ibadah Utama', time: '07:00 & 10:00 WIB', location: 'Gedung Utama Gereja', description: 'Ibadah bersama seluruh jemaat dengan pujian dan pengajaran Firman.' },
  { id: '2', day: 'Rabu', name: 'Doa Malam', time: '19:00 WIB', location: 'Ruang Doa Gereja', description: 'Persekutuan doa untuk memohon pertolongan dan berkat Tuhan.' },
  { id: '3', day: 'Jumat', name: 'Ibadah Pemuda', time: '19:00 WIB', location: 'Ruang Pemuda', description: 'Ibadah khusus untuk kaum muda dengan pujian kontemporer.' },
  { id: '4', day: 'Sabtu', name: 'Ibadah Sel', time: '18:00 WIB', location: 'Rumah Jemaat', description: 'Persekutuan kelompok kecil di rumah-rumah jemaat.' },
];

const defaultMinistries: Ministry[] = [
  { id: '1', name: 'Sekolah Minggu', description: 'Pelayanan khusus untuk anak-anak usia 3-12 tahun dengan metode pembelajaran yang menyenangkan.', members: '150+ Anak', image: '/sunday-school.jpg' },
  { id: '2', name: 'Pemuda & Remaja', description: 'Komunitas pemuda yang aktif dalam pelayanan, pengajaran, dan kegiatan sosial untuk membangun karakter Kristiani.', members: '200+ Pemuda', image: '/youth.jpg' },
  { id: '3', name: 'Persekutuan Pria', description: 'Wadah bagi para pria untuk bertumbuh dalam iman, saling mendukung, dan menjadi kepala keluarga yang takut akan Tuhan.', members: '100+ Anggota', image: '/community.jpg' },
  { id: '4', name: 'Paduan Suara', description: 'Melayani Tuhan melalui pujian dan penyembahan dengan berbagai genre musik.', members: '80+ Anggota', image: '/worship.jpg' },
];

const defaultHero: HeroContent = {
  title: 'Temukan Kedamaian dalam Kasih-Nya',
  subtitle: 'Gereja Kristen Protestan Simalungun adalah rumah spiritual bagi setiap orang yang mencari kedamaian, pertumbuhan iman, dan komunitas yang penuh kasih.',
  badge: 'Selamat Datang di Rumah Tuhan',
};

const defaultContact: ContactInfo = {
  address: 'Jl Krakatau No 16 Medan',
  phone: '085177005557',
  email: 'gkpskrakataumedan@gmail.com',
  hours: 'Senin - Jumat: 08:00 - 17:00 WIB',
};

// ======================================================
// CONTEXT
// ======================================================
interface DataContextType {
  events: Event[];
  services: Service[];
  ministries: Ministry[];
  hero: HeroContent;
  contact: ContactInfo;
  loading: boolean;
  firestoreAvailable: boolean;
  // Events
  addEvent: (event: Omit<Event, 'id'>) => Promise<void>;
  updateEvent: (id: string, event: Partial<Event>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  // Services
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateService: (id: string, service: Partial<Service>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  // Ministries
  addMinistry: (ministry: Omit<Ministry, 'id'>) => Promise<void>;
  updateMinistry: (id: string, ministry: Partial<Ministry>) => Promise<void>;
  deleteMinistry: (id: string) => Promise<void>;
  // Hero & Contact
  updateHero: (hero: HeroContent) => Promise<void>;
  updateContact: (contact: ContactInfo) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(defaultEvents);
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [ministries, setMinistries] = useState<Ministry[]>(defaultMinistries);
  const [hero, setHero] = useState<HeroContent>(defaultHero);
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [loading, setLoading] = useState(true);
  const [firestoreAvailable, setFirestoreAvailable] = useState(false);

  useEffect(() => {
    // Coba koneksi ke Firestore
    const tryConnect = async () => {
      try {
        // Test apakah Firestore terkonfigurasi dengan benar
        const testRef = collection(db, 'events');
        const unsub = onSnapshot(testRef, (snap) => {
          setFirestoreAvailable(true);
          if (!snap.empty) {
            const data = snap.docs.map(d => ({ id: d.id, ...d.data() } as Event));
            setEvents(data);
          }
        }, (err) => {
          console.warn('Firestore tidak tersedia, menggunakan data lokal:', err.message);
          setFirestoreAvailable(false);
          setLoading(false);
        });

        const unsubServices = onSnapshot(collection(db, 'services'), (snap) => {
          if (!snap.empty) {
            setServices(snap.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
          }
        });

        const unsubMinistries = onSnapshot(collection(db, 'ministries'), (snap) => {
          if (!snap.empty) {
            setMinistries(snap.docs.map(d => ({ id: d.id, ...d.data() } as Ministry)));
          }
        });

        const unsubHero = onSnapshot(doc(db, 'settings', 'hero'), (snap) => {
          if (snap.exists()) setHero(snap.data() as HeroContent);
        });

        const unsubContact = onSnapshot(doc(db, 'settings', 'contact'), (snap) => {
          if (snap.exists()) setContact(snap.data() as ContactInfo);
        });

        setLoading(false);
        return () => {
          unsub();
          unsubServices();
          unsubMinistries();
          unsubHero();
          unsubContact();
        };
      } catch (err) {
        console.warn('Firebase tidak terkonfigurasi, menggunakan data lokal');
        setFirestoreAvailable(false);
        setLoading(false);
      }
    };

    tryConnect();
  }, []);

  const genId = () => Date.now().toString();

  // ---- EVENTS ----
  const addEvent = async (event: Omit<Event, 'id'>) => {
    const id = genId();
    const newEvent = { ...event, id };
    if (firestoreAvailable) {
      await setDoc(doc(db, 'events', id), newEvent);
    } else {
      setEvents(prev => [...prev, newEvent]);
    }
  };

  const updateEvent = async (id: string, data: Partial<Event>) => {
    if (firestoreAvailable) {
      await updateDoc(doc(db, 'events', id), data);
    } else {
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...data } : e));
    }
  };

  const deleteEvent = async (id: string) => {
    if (firestoreAvailable) {
      await deleteDoc(doc(db, 'events', id));
    } else {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  };

  // ---- SERVICES ----
  const addService = async (service: Omit<Service, 'id'>) => {
    const id = genId();
    const newService = { ...service, id };
    if (firestoreAvailable) {
      await setDoc(doc(db, 'services', id), newService);
    } else {
      setServices(prev => [...prev, newService]);
    }
  };

  const updateService = async (id: string, data: Partial<Service>) => {
    if (firestoreAvailable) {
      await updateDoc(doc(db, 'services', id), data);
    } else {
      setServices(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    }
  };

  const deleteService = async (id: string) => {
    if (firestoreAvailable) {
      await deleteDoc(doc(db, 'services', id));
    } else {
      setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  // ---- MINISTRIES ----
  const addMinistry = async (ministry: Omit<Ministry, 'id'>) => {
    const id = genId();
    const newMinistry = { ...ministry, id };
    if (firestoreAvailable) {
      await setDoc(doc(db, 'ministries', id), newMinistry);
    } else {
      setMinistries(prev => [...prev, newMinistry]);
    }
  };

  const updateMinistry = async (id: string, data: Partial<Ministry>) => {
    if (firestoreAvailable) {
      await updateDoc(doc(db, 'ministries', id), data);
    } else {
      setMinistries(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    }
  };

  const deleteMinistry = async (id: string) => {
    if (firestoreAvailable) {
      await deleteDoc(doc(db, 'ministries', id));
    } else {
      setMinistries(prev => prev.filter(m => m.id !== id));
    }
  };

  // ---- HERO & CONTACT ----
  const updateHero = async (data: HeroContent) => {
    if (firestoreAvailable) {
      await setDoc(doc(db, 'settings', 'hero'), data);
    } else {
      setHero(data);
    }
  };

  const updateContact = async (data: ContactInfo) => {
    if (firestoreAvailable) {
      await setDoc(doc(db, 'settings', 'contact'), data);
    } else {
      setContact(data);
    }
  };

  return (
    <DataContext.Provider value={{
      events, services, ministries, hero, contact,
      loading, firestoreAvailable,
      addEvent, updateEvent, deleteEvent,
      addService, updateService, deleteService,
      addMinistry, updateMinistry, deleteMinistry,
      updateHero, updateContact,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
