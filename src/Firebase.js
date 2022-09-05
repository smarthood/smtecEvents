// JavaScript
// src.firebase.js
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDTFEflYN4CohzXPBBrM7NnE0I1fG8k2ls",
    authDomain: "events-college.firebaseapp.com",
    projectId: "events-college",
    storageBucket: "events-college.appspot.com",
    messagingSenderId: "22376328148",
    appId: "1:22376328148:web:70fe51436510e81c35c441"
}

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app)