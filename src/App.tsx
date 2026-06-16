import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import SocialSidebar from './components/SocialSidebar';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Resources from './pages/Resources';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import CaseStudiesList from './pages/CaseStudiesList';
import CaseStudyDetail from './pages/CaseStudyDetail';
import Pricing from './pages/Pricing';
import ProductPage from './pages/product/ProductPage';
import IndustryPage from './pages/industries/IndustryPage';

function ScrollToTop() {
  const { pathname, key } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname, key]);
  return null;
}

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <SocialSidebar />
      <Header />
      <ScrollToTop />
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
        {/* Product sub-pages */}
        <Route path="/product/:slug" element={<ProductPage />} />
        {/* Industry sub-pages */}
        <Route path="/industries/:slug" element={<IndustryPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
