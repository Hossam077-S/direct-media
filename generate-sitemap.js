const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs } = require("firebase/firestore");

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

// Get Firestore instance
const db = getFirestore(app);

const fs = require("fs");

const generateSitemap = async () => {
  try {
    // Fetch news IDs from Firestore
    const newsSnapshot = await getDocs(collection(db, "News"));
    const newsIds = newsSnapshot.docs.map((doc) => doc.id);

    // Generate news URLs based on IDs
    const generateNewsUrls = () => {
      return newsIds.map(
        (newsId) => `https://www.directmedialb.com/news/${newsId}`
      );
    };

    // Write URLs to sitemap.txt
    const sitemapContent = generateNewsUrls().join("\n");
    fs.writeFileSync("public/sitemap.txt", sitemapContent);
    console.log("Sitemap generated successfully.");
  } catch (error) {
    console.error("Error generating sitemap:", error);
    console.error("Firestore Error Details:", error.details);
  }
};

generateSitemap();

// node generate-sitemap.js
