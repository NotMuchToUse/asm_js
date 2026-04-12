import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/12.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4y_AiG99Tp1S1fpSM3xa_dwP0DXGCFAs",
  authDomain: "asm-js-ecommerce.firebaseapp.com",
  projectId: "asm-js-ecommerce",
  storageBucket: "asm-js-ecommerce.firebasestorage.app",
  messagingSenderId: "798049463610",
  appId: "1:798049463610:web:4a419e895b3427e703b403",
  measurementId: "G-JSWC9RQNYW",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};

export {
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
};
