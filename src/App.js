import React, {useState, useEffect, Suspense, lazy, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Cookies from 'js-cookie';

import CookieConsent from "react-cookie-consent";
import { lazyWithDelay } from './Utils/delayAndExecute';

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

const [Admin, PrivacyPolicy] = [
  'Admin',
  'PrivacyPolicy',
].map((page) =>
  // lazy(() => import(`./Pages/${page}/${page}`))
  lazyWithDelay(() => import(`./Pages/${page}/${page}`), 2000)

);

const App = () => {
  const MemoizedHome = useMemo(() => 
    lazyWithDelay(() => import('./Pages/Home/Home'), 1000), []

  );

  const location = useLocation();
  const [showCookieConsent, setShowCookieConsent] = useState(true);

  useEffect(() => {
    const myCookieValue = Cookies.get('useCookies');

    if (myCookieValue) {
      setShowCookieConsent(false);
    }

  }, []);

  const handleAcceptCookie = () => {
    setShowCookieConsent(false);
    Cookies.set('useCookies', 'true', { expires: 360 });
  };

    // Check if the user is on the PrivacyPolicy page
    const decodedPathname = decodeURIComponent(location.pathname);
    const isPrivacyPolicyPage = decodedPathname === '/سياسة-الخصوصية';

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
          <Route path="/سياسة-الخصوصية" element={<PrivacyPolicy />} />
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
        {showCookieConsent && !isPrivacyPolicyPage && (
          <CookieConsent
            debug={true}
            location="bottom"
            buttonText="نعم موافق"
            cookieName="useCookies"
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
              <a href="/سياسة-الخصوصية" target="_blank">اطّلع على سياسة الخصوصية</a> لمعرفة المزيد.
            </p>
          </CookieConsent>

        )}
    </Suspense>
  );
};

export default App;