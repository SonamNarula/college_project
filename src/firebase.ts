// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAoONIkw_nJj2pE2zlQNzvufkuUDNuBNdY",
  authDomain: "trackify-cfb8e.firebaseapp.com",
  projectId: "trackify-cfb8e",
  storageBucket: "trackify-cfb8e.firebasestorage.app",
  messagingSenderId: "575946831425",
  appId: "1:575946831425:web:817e5644199b7e124278c0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();