import { useState, lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Opening from './components/Opening';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Lazy load heavy components for better initial performance
const Cart = lazy(() => import('./components/Cart'));
const Gallery = lazy(() => import('./components/Gallery'));
const FullMenu = lazy(() => import('./components/FullMenu'));

import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);

  // Implement Double-Back to Exit like native Android apps
  useEffect(() => {
    // Push the initial trap state
    window.history.pushState({ isHome: true }, '', window.location.href);
    
    let exitTimeout;
    let isToastActive = false;

    const handlePopState = (e) => {
      // If we popped to a state that has 'isHome' or any 'modal' tag, it means 
      // we are just navigating between sections or closing a modal. DO NOT EXIT.
      if (e.state && (e.state.isHome || e.state.modal)) {
          return;
      }

      // If they popped PAST our trap state to a null state, they are trying to exit
      if (!isToastActive) {
        isToastActive = true;
        
        toast('Press again to exit', {
          position: 'bottom-center',
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            borderRadius: '100px',
            fontSize: '13px',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '10px 24px',
            marginBottom: '40px',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.1)'
          },
          duration: 2000,
          id: 'exit-toast'
        });
        
        exitTimeout = setTimeout(() => {
            isToastActive = false;
            // Refill the trap state so they can't accidentally exit later
            window.history.pushState({ isHome: true }, '', window.location.href);
        }, 2000);
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      clearTimeout(exitTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white selection:bg-brand-primary selection:text-white">
      <Toaster position="top-right" />
      <Suspense fallback={null}>
        <Cart />
        <FullMenu isOpen={isFullMenuOpen} onClose={() => setIsFullMenuOpen(false)} />
      </Suspense>
      <Navbar />
      <Hero />
      <Opening />
      <About />
      <Menu onOpenFullMenu={() => setIsFullMenuOpen(true)} />
      <Suspense fallback={<div className="h-40 flex items-center justify-center"><div className="w-8 h-8 border-4 border-brand-primary border-t-transparent rounded-full animate-spin"></div></div>}>
        <Gallery />
      </Suspense>
      <Contact />
      <Footer />
    </div>
  )
}


export default App;
