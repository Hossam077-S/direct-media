import React, { useState, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import CookieConsent from "react-cookie-consent";

// Lazy loaded components
import { lazy } from "react";

import { SuspenseFallback2 } from "./Components/SuspenseFallback/SuspenseFallback2";

import "./App.css";

const Home = lazy(() => import("./Pages/Home/Home"));
const Admin = lazy(() => import(`./Pages/Admin/Admin`));
const PrivacyPolicy = lazy(() => import(`./Pages/PrivacyPolicy/PrivacyPolicy`));
const Header = lazy(() => import(`./Components/Header/Header`));
const Footer = lazy(() => import(`./Components/Footer/Footer`));
const NewsPage = lazy(() => import(`./Components/NewsPage/NewsPage`));

const NewsDetails = lazy(() => import(`./Components/NewsDetails/NewsDetails`));
const ProgramDetails = lazy(() =>
  import(`./Components/ProgramDetails/ProgramDetails`)
);
const Writers = lazy(() => import(`./Components/Writers/Writers`));
const WriterDetails = lazy(() =>
  import(`./Components/WriterDetails/WriterDetails`)
);
const ArticleDetails = lazy(() =>
  import(`./Components/ArticleDetails/ArticleDetails`)
);
const PodcastDetails = lazy(() =>
  import(`./Components/PodcastDetails/PodcastDetails`)
);
const Programs = lazy(() => import(`./Components/Programs/Programs`));
const Podcast = lazy(() => import(`./Components/Podcast/Podcast`));

const NotFoundPage = lazy(() =>
  import(`./Components/NotFoundPage/NotFoundPage`)
);

const App = () => {
  const location = useLocation();
  // Initialize state with the result of the cookie check
  const [showCookieConsent, setShowCookieConsent] = useState(
    () => !Cookies.get("useCookies")
  );

  const handleAcceptCookie = () => {
    setShowCookieConsent(false);
    Cookies.set("useCookies", "true", { expires: 360 });
  };

  // Check if the user is on the PrivacyPolicy page
  const decodedPathname = decodeURIComponent(location.pathname);
  const isPrivacyPolicyPage = decodedPathname === "/سياسة-الخصوصية";

  return (
    <Suspense fallback={<SuspenseFallback2 cName="dots" />}>
      <div className="main-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
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
              موقعنا يستخدم ملفات تعريف الارتباط لتحسين تجربتك. باستخدام هذا
              الموقع، فإنك توافق على سياسة ملفات تعريف الارتباط.
              <a
                href="/سياسة-الخصوصية"
                target="_blank"
                rel="noopener noreferrer"
              >
                اطّلع على سياسة الخصوصية
              </a>{" "}
              لمعرفة المزيد.
            </p>
          </CookieConsent>
        )}
      </div>
    </Suspense>
  );
};

export default App;
