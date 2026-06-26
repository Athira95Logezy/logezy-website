import React, { Suspense, lazy } from 'react';
import { Helmet } from 'react-helmet-async';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import SocialSidebar from './components/SocialSidebar';

const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Contact = lazy(() => import('./pages/Contact'));
const Resources = lazy(() => import('./pages/Resources'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const CaseStudiesList = lazy(() => import('./pages/CaseStudiesList'));
const CaseStudyDetail = lazy(() => import('./pages/CaseStudyDetail'));
const Pricing = lazy(() => import('./pages/Pricing'));
const ProductPage = lazy(() => import('./pages/product/ProductPage'));
const IndustryPage = lazy(() => import('./pages/industries/IndustryPage'));

function ScrollToTop() {
  const { pathname, key } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname, key]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <meta name="google-site-verification" content="2EVnfjmV-66Xl2OQ215CH-gPuDHlIRHBEpVmudO1QgI" />
      </Helmet>
      <ScrollProgress />
      <SocialSidebar />
      <Header />
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/blog" element={<BlogList />} />
          <Route path="/resources/blog/:slug" element={<BlogPost />} />
          <Route path="/resources/case-studies" element={<CaseStudiesList />} />
          <Route path="/resources/case-studies/:slug" element={<CaseStudyDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/product/:slug" element={<ProductPage />} />
          <Route path="/industries/:slug" element={<IndustryPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
