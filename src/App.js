import React, { Suspense, lazy, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

// import { Header, Footer, NewsDetails, Programs, ProgramDetails, WriterDetails, ArticleDetails, PodcastDetails } from './Components';
// import { Home, Admin } from './Pages';

const [Header, Footer, NewsDetails, ProgramDetails, WriterDetails, ArticleDetails, PodcastDetails, Programs ] = [
  'Header',
  'Footer',
  'NewsDetails',
  'ProgramDetails',
  'WriterDetails',
  'ArticleDetails',
  'PodcastDetails',
  'Programs',
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
    <Suspense fallback={<div className="loading-logo"></div>}>
      <Header />
      <Routes>
        {/* Render the MemoizedHome component */}
        <Route exact path="/" element={<MemoizedHome />} />

        {/* Other routes */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path="/programs/:id" element={<Programs />} />
        <Route path="/program/:id" element={<ProgramDetails />} />
        <Route path="/writer/:id" element={<WriterDetails />} />
        <Route path="/article/:id" element={<ArticleDetails />} />
        <Route path="/podcast/:id" element={<PodcastDetails />} />
      </Routes>
      <Footer />
    </Suspense>
  );
};

export default App;