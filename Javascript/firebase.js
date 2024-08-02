import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJZCiqQsHog4SDS8Ezk5BbuOoG5iEBJc4",
  authDomain: "my-app-3aba0.firebaseapp.com",
  projectId: "my-app-3aba0",
  storageBucket: "my-app-3aba0.appspot.com",
  messagingSenderId: "1096328887215",
  appId: "1:1096328887215:web:7469569882f31a5c65cd5a",
  measurementId: "G-ZWRV9SDY9C"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); 

export {
  app,
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setDoc,
  getDoc,
};
