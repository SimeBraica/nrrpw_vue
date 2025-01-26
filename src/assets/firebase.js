import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA0iCqXcIodo2rNyWeUJ8r1A84kwKBMXyk",
  authDomain: "nrrpw-vue.firebaseapp.com",
  projectId: "nrrpw-vue",
  storageBucket: "nrrpw-vue.firebasestorage.app",
  messagingSenderId: "128265588708",
  appId: "1:128265588708:web:c31d77373ccadd088341f1",
  measurementId: "G-8QDTGFR0B2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
