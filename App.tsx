import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Founders from './pages/Founders';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Payments from './pages/Payments';
import Blogs from './pages/Blogs';
import BlogPost from './pages/blog/[slug]';
import ScrollToTop from './components/ScrollToTop';
import FooterBanner from './components/FooterBanner';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/founders" element={<Founders />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
          <FooterBanner />
          <Chatbot />
        </div>
      </HashRouter>
    </ThemeProvider>
  );
};

export default App;