import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  onSnapshot,
  documentId,
  query,
  where,
  startAfter,
  doc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  deleteDoc,
  arrayRemove,
  limit,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { getAnalytics, logEvent } from "firebase/analytics";

// Add your Firebase configuration object here
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Get Firestore instance
const db = getFirestore(app);

// Get Storage instance
const storage = getStorage(app);

// Get Auth instance
const auth = getAuth(app);

// Other exports
export {
  storage,
  db,
  collection,
  addDoc,
  ref,
  uploadBytesResumable,
  deleteObject,
  getDownloadURL,
  getDocs,
  onSnapshot,
  documentId,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  signInWithEmailAndPassword,
  deleteDoc,
  arrayRemove,
  auth,
  analytics,
  logEvent,
  limit,
  orderBy,
  startAfter,
  startAt,
  endAt,
};
