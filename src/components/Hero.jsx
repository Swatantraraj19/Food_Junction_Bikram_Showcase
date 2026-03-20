import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const variants = {
        hidden: { opacity: 0, y: isMobile ? 10 : 20 },
        visible: (delay) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
        })
    };

    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const element = document.querySelector(targetId);
        if (element) {
            const headerOffset = 80; // Approximate navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0c1117]">
            {/* Background optimized via CSS for earlier LCP detection */}
            <div className="absolute inset-0 z-0 hero-bg-container transform scale-105 border-none">
                {/* Optimized gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/60 to-black/95"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-20">
                <motion.span
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                    variants={variants}
                    className="text-brand-secondary font-semibold tracking-[0.2em] text-sm md:text-base uppercase mb-6 block"
                >
                    Welcome to
                </motion.span>
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    custom={0.4}
                    variants={variants}
                    className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-3 leading-tight drop-shadow-2xl"
                >
                    Food Junction Bikram
                </motion.h1>
                <motion.p
                    initial="hidden"
                    animate="visible"
                    custom={0.6}
                    variants={variants}
                    className="text-2xl md:text-3xl lg:text-4xl font-light italic font-sans text-gray-200 mb-8 tracking-wide"
                >
                    Taste That Makes You Smile
                </motion.p>
                
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0.8}
                    variants={variants}
                    className="flex flex-wrap items-center justify-center gap-6 md:gap-8 text-gray-200 text-base md:text-lg mb-12 font-medium tracking-wide"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 border-2 border-green-500 bg-white/90 rounded-sm">
                            <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="uppercase text-xs md:text-sm tracking-wider font-semibold text-white">Pure Veg</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 border-2 border-red-500 bg-white/90 rounded-sm">
                            <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="uppercase text-xs md:text-sm tracking-wider font-semibold text-white">Non-Veg</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-5 h-5 border-2 border-yellow-500 bg-white/90 rounded-sm">
                            <div className="w-2.5 h-2.5 bg-yellow-500 rounded-sm"></div>
                        </div>
                        <span className="uppercase text-xs md:text-sm tracking-wider font-semibold text-white">Fast Food</span>
                    </div>
                </motion.div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={1.0}
                    variants={variants}
                    className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full"
                >
                    <a href="#menu" onClick={(e) => handleScroll(e, '#menu')} className="bg-brand-primary text-white border border-brand-primary px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold hover:bg-red-600 transition-all transform hover:scale-105 shadow-xl shadow-red-900/40 tracking-[0.1em] uppercase text-center min-w-[140px] md:min-w-[170px]">
                        Order Now
                    </a>
                    <a href="#contact" onClick={(e) => handleScroll(e, '#contact')} className="bg-white/10 text-white border border-white/40 px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-bold hover:bg-white hover:text-brand-dark transition-all transform hover:scale-105 backdrop-blur-md tracking-[0.1em] uppercase text-center min-w-[140px] md:min-w-[170px]">
                        Visit Us
                    </a>
                </motion.div>
            </div>

            {!isMobile && (
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="absolute bottom-8 left-0 right-0 flex justify-center pointer-events-none"
                >
                    <a 
                        href="#opening"
                        onClick={(e) => handleScroll(e, '#opening')}
                        aria-label="Scroll to next section"
                        className="flex justify-center pt-2 w-6 h-10 border-2 border-white/50 rounded-full text-white/50 hover:border-white hover:text-white transition-colors cursor-pointer pointer-events-auto"
                    >
                        <div className="w-1.5 h-1.5 bg-white/80 rounded-full"></div>
                    </a>
                </motion.div>
            )}
        </section>
    );
};

export default Hero;
