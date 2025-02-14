// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD_JaZDedb0-zpMC9E51FhVQlgnw7hAmt0",
    authDomain: "supermall-web-app-cb837.firebaseapp.com",
    projectId: "supermall-web-app-cb837",
    storageBucket: "supermall-web-app-cb837.firebasestorage.app",
    messagingSenderId: "47108581149",
    appId: "1:47108581149:web:a08f24c083a0a6fd5ca3f4",
    measurementId: "G-K04VSZVR7W"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, db, storage };
