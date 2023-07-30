import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

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

const [Home, Admin] = [
  'Home',
  'Admin',
].map((page) =>
  lazy(() => import(`./Pages/${page}/${page}`))
);

const App = () => {
  // const user = JSON.parse(localStorage.getItem('profile'));
  return (
      <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
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
