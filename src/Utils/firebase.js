import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, getDoc, onSnapshot, documentId, query, where, doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

// Add your Firebase configuration object here
const firebaseConfig = {
  apiKey: "AIzaSyDHGHrVx-F92gK2JTa3JPAIpP6U610zRWI",
  authDomain: "directmedia-6b77f.firebaseapp.com",
  projectId: "directmedia-6b77f",
  storageBucket: "directmedia-6b77f.appspot.com",
  messagingSenderId: "734279987662",
  appId: "1:734279987662:web:a8dc0c053dfb672d59bb9f",
  measurementId: "G-R4YDZXW30E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore instance
const db = getFirestore(app);

// Get Storage instance
const storage = getStorage(app);

// Other exports
export { storage, db, collection, addDoc, ref, uploadBytesResumable, getDownloadURL, getDocs, onSnapshot, documentId, query, where, doc, getDoc, updateDoc, arrayUnion, serverTimestamp };
