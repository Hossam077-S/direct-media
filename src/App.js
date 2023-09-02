import React, {useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import CookieConsent from "react-cookie-consent";
import { lazyWithDelay } from './Utils/delayAndExecute'; // Import the utility functions

import { SuspenseFallback } from './Components/SuspenseFallback/SuspenseFallback';

import './App.css';


const [Header, Footer, NewsPage, NewsDetails, ProgramDetails, Writers, WriterDetails, ArticleDetails, PodcastDetails, Programs, Podcast ] = [
  'Header',
  'Footer',
  'NewsPage',
  'NewsDetails',
  'ProgramDetails',
  'Writers',
  'WriterDetails',
  'ArticleDetails',
  'PodcastDetails',
  'Programs',
  'Podcast',
].map((component) =>
  lazy(() => import(`./Components/${component}/${component}`))
);

const [Admin] = [
  'Admin',
].map((page) =>
  // lazy(() => import(`./Pages/${page}/${page}`))
  lazyWithDelay(() => import(`./Pages/${page}/${page}`), 2000) // 2-second delay

);

const App = () => {
  const MemoizedHome = useMemo(() => 
    // lazy(() => import('./Pages/Home/Home')), []
    lazyWithDelay(() => import('./Pages/Home/Home'), 1800), [] // 2-second delay

  );

  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsentAccepted");
    if (accepted === "true") {
      setShowCookieConsent(false);
    }

  }, []);

  const handleAcceptCookie = () => {
    setShowCookieConsent(false);
    localStorage.setItem("cookieConsentAccepted", "true");
  };

  return (
    <Suspense 
      fallback={
        <SuspenseFallback cName="dots"/>
      }
    >
      <div className="main-container">
        <Header />
        <Routes>

          {/* Render the MemoizedHome component */}
          <Route exact path="/" element={<MemoizedHome />} />

          {/* Other routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/newsPage/:category?" element={<NewsPage />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/program/:id" element={<Programs />} />
          <Route path="/programs" element={<ProgramDetails />} />
          <Route path="/writers" element={<Writers />} />
          <Route path="/writer/:id" element={<WriterDetails />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/podcast/:id" element={<PodcastDetails />} />
          <Route path="/podcasts" element={<Podcast />} />
        </Routes>
      </div>
        <Footer />
        {showCookieConsent && (
          <CookieConsent
            debug={true}
            location="bottom"
            buttonText="نعم موافق"
            cookieName="myAwesomeCookieName2"
            style={{
              background: "#FBAE3C",
              fontFamily: "GE_SS_Two_M",
              fontSize: "16px",
              textAlign: "center",
              lineHeight: "2",
            }}
            buttonStyle={{
              color: "white",
              background: "#2E3190",
              fontSize: "15px",
              borderRadius: "4px",
              padding: "6px 20px",
              cursor: "pointer",
            }}
            expires={150}
            onAccept={handleAcceptCookie}
          >
            <p>
              موقعنا يستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستخدام هذا الموقع، فإنك توافق على سياسة ملفات تعريف الارتباط.
              <a href="/سياسة-الخصوصية">اطّلع على سياسة الخصوصية</a> لمعرفة المزيد.
            </p>
          </CookieConsent>

      )}
    </Suspense>
  );
};

export default App;