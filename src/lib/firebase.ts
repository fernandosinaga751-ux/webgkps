import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// ======================================================
// KONFIGURASI FIREBASE
// Ganti dengan konfigurasi Firebase project Anda!
// Cara mendapatkan:
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru atau pilih yang sudah ada
// 3. Klik "Add App" > Web
// 4. Copy konfigurasi di bawah ini
// ======================================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
