import { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../hooks/useCart';

const Navbar = () => {
    const { cartCount, toggleCart } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const [deferredPrompt, setDeferredPrompt] = useState(null);

    // Intercept Mobile/PWA Back Button to close Menu instead of exiting App
    useEffect(() => {
        if (isOpen) {
            window.history.pushState({ modal: 'mobilemenu' }, '');
            const handlePopState = (e) => {
                if (e.state?.modal !== 'mobilemenu') setIsOpen(false);
            };
            window.addEventListener('popstate', handlePopState);
            return () => {
                window.removeEventListener('popstate', handlePopState);
                if (window.history.state?.modal === 'mobilemenu') {
                    window.history.back();
                }
            };
        }
    }, [isOpen]); // Stable trigger

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', () => {
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    // Advanced Scroll Navigation: Prevents native history pushing (Hash navigation) 
    // to keep the PWA history clean so users don't have to hit 'Back' 5 times.
    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const targetElement = document.querySelector(href);
        if (targetElement) {
            // setTimeout ensures the mobile menu close animation & history cleanup has time to process
            setTimeout(() => {
                const headerOffset = 80; // height of fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 50);
        }
    };

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Menu', href: '#menu' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-black/30 backdrop-blur-sm py-6'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center">
                            <img
                                src="/FJ_logo_optimized.png"
                                alt="Food Junction Bikram - Authentic Restaurant in Patna"
                                className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
                                decoding="async"
                            />
                        </a>
                        
                        {/* PWA Install Button (Right of Logo) */}
                        {deferredPrompt && (
                            <button 
                                onClick={handleInstallClick}
                                className={`ml-3 md:ml-6 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all text-[10px] md:text-xs font-bold tracking-wider whitespace-nowrap ${
                                    scrolled 
                                    ? 'border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white' 
                                    : 'border-white/40 text-white hover:bg-white hover:text-brand-primary'
                                }`}
                            >
                                <Download size={14} />
                                <span>INSTALL APP</span>
                            </button>
                        )}
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <ul className="flex space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className={`font-medium transition-colors duration-200 ${scrolled ? 'text-gray-700 hover:text-brand-primary' : 'text-white hover:text-brand-secondary'}`}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>

                         {/* Call to Action & Cart (Desktop) */}
                        <div className="flex items-center space-x-4">
                            {deferredPrompt && (
                                <button
                                    onClick={handleInstallClick}
                                    className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 ${scrolled ? 'bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white' : 'bg-white/10 text-white hover:bg-white hover:text-brand-dark border border-white/20 hover:border-white'}`}
                                >
                                    <Download size={18} />
                                    <span>Install App</span>
                                </button>
                            )}
                            <a href="#menu" onClick={(e) => handleNavClick(e, '#menu')} className="bg-brand-primary text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                Order Now
                            </a>

                             {/* Shopping Cart Icon (Desktop) */}
                             <button
                                 onClick={toggleCart}
                                 aria-label="Open Shopping Cart"
                                 className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-gray-700 hover:text-brand-primary hover:bg-gray-100' : 'text-white hover:text-brand-secondary hover:bg-white/10'}`}
                             >
                                 <ShoppingCart size={24} />
                                 {cartCount > 0 && (
                                     <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 rounded-full">
                                         {cartCount}
                                     </span>
                                 )}
                             </button>
                         </div>
                    </div>

                    {/* Mobile Menu Button & Cart Icon */}
                    <div className="md:hidden flex items-center space-x-4">
                        {deferredPrompt && (
                            <button
                                onClick={handleInstallClick}
                                className={`p-2 rounded-full ${scrolled ? 'text-brand-primary bg-brand-primary/10' : 'text-white bg-white/10'}`}
                                aria-label="Install App"
                            >
                                <Download size={20} />
                            </button>
                        )}
                        {/* Shopping Cart Icon (Mobile) */}
                        <button
                            onClick={toggleCart}
                            aria-label="Open Shopping Cart"
                            className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
                        >
                            <ShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-600 border-2 border-white rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Close Menu" : "Open Menu"}
                            aria-expanded={isOpen}
                            className={`${scrolled ? 'text-gray-800' : 'text-white'} p-1`}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden absolute w-full left-0 top-full bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100"
                >
                    <div className="px-6 pt-4 pb-8">
                        <ul className="flex flex-col">
                            {navLinks.map((link, index) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className={`block py-4 text-base font-semibold tracking-wide text-gray-800 hover:text-brand-primary transition-colors ${index !== navLinks.length - 1 ? 'border-b border-gray-100' : ''}`}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 space-y-4">
                            {deferredPrompt && (
                                <button
                                    onClick={handleInstallClick}
                                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold tracking-widest text-brand-primary uppercase transition bg-brand-primary/10 hover:bg-brand-primary hover:text-white rounded-xl border border-brand-primary/20"
                                >
                                    <Download size={18} />
                                    Install App
                                </button>
                            )}
                            <a
                                href="#menu"
                                className="flex justify-center w-full px-4 py-3 text-base font-bold tracking-wider text-white uppercase transition bg-brand-primary hover:bg-red-600 rounded-xl shadow-lg shadow-red-500/30"
                                onClick={(e) => handleNavClick(e, '#menu')}
                            >
                                Order Now
                            </a>
                        </div>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
