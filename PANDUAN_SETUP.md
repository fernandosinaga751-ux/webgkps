# PANDUAN SETUP - Website GKPS

## Yang Sudah Dibuat

1. **Panel Admin** - akses di `https://resortmu.vercel.app/admin`
2. **Login Persisten** - refresh halaman admin tidak kembali ke login
3. **Database Firebase** - data tersimpan online dan real-time

---

## LANGKAH 1: Setup Firebase (Database Online)

1. Buka https://console.firebase.google.com
2. Klik **"Add project"** → beri nama misal `gkps-resort-mu`
3. Setelah project dibuat, klik ikon **Web** (`</>`) untuk tambah app
4. Beri nama app → klik **Register app**
5. **Copy** konfigurasi yang muncul:
   ```js
   const firebaseConfig = {
     apiKey: "...",
     authDomain: "...",
     projectId: "...",
     ...
   }
   ```

6. Di menu kiri → **Build → Firestore Database**
7. Klik **Create database** → pilih **Start in test mode** → pilih region → Done

---

## LANGKAH 2: Tambahkan Config ke Vercel

1. Buka https://vercel.com → pilih project **resortmu**
2. Klik **Settings → Environment Variables**
3. Tambahkan variabel berikut (ambil dari firebaseConfig tadi):

   | Name | Value |
   |------|-------|
   | `VITE_FIREBASE_API_KEY` | apiKey dari firebaseConfig |
   | `VITE_FIREBASE_AUTH_DOMAIN` | authDomain |
   | `VITE_FIREBASE_PROJECT_ID` | projectId |
   | `VITE_FIREBASE_STORAGE_BUCKET` | storageBucket |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | messagingSenderId |
   | `VITE_FIREBASE_APP_ID` | appId |

4. Klik **Redeploy** agar perubahan berlaku

---

## LANGKAH 3: Deploy Kode Terbaru ke Vercel

Upload ulang folder project ini ke Vercel, atau push ke GitHub yang terhubung ke Vercel.

---

## CARA AKSES ADMIN

- **URL Admin**: https://resortmu.vercel.app/admin
- **Username**: `admin`
- **Password**: `gkps2024`

> ⚠️ Ganti password di file `src/context/AuthContext.tsx` baris:
> ```ts
> const ADMIN_PASSWORD = 'gkps2024'; // ganti ini!
> ```

---

## YANG BISA DIEDIT DI ADMIN

| Menu | Keterangan |
|------|-----------|
| **Beranda** | Edit teks badge, judul, dan subtitle halaman utama |
| **Kegiatan** | Tambah/edit/hapus acara gereja |
| **Jadwal Ibadah** | Tambah/edit/hapus jadwal ibadah |
| **Pelayanan** | Tambah/edit/hapus unit pelayanan |
| **Kontak** | Edit alamat, telepon, email, jam operasional |

---

## CATATAN TEKNIS

- Jika Firebase **belum dikonfigurasi**, website tetap berjalan dengan data default
- Indikator status koneksi Firebase muncul di header admin panel
- Data disinkronkan secara **real-time** - semua pengunjung langsung melihat perubahan
