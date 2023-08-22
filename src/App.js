import React, { Suspense, lazy, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

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
  lazy(() => import(`./Pages/${page}/${page}`))
);

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));

  // Use useMemo to memoize the Home component, preventing re-rendering on navigation
  const MemoizedHome = useMemo(() => lazy(() => import('./Pages/Home/Home')), []);

  return (
    <Suspense fallback={
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="loading-logo"></div>
      </div>
    }>
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
    </Suspense>
  );
};

export default App;