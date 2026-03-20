import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Gallery = () => {
    const [selectedImg, setSelectedImg] = useState(null);

    // Intercept Mobile/PWA Back Button to close Lightbox instead of exiting App
    useEffect(() => {
        if (selectedImg) {
            window.history.pushState({ modal: 'gallery' }, '');
            const handlePopState = (e) => {
                if (e.state?.modal !== 'gallery') setSelectedImg(null);
            };
            window.addEventListener('popstate', handlePopState);
            return () => {
                window.removeEventListener('popstate', handlePopState);
                if (window.history.state?.modal === 'gallery') {
                    window.history.back();
                }
            };
        }
    }, [selectedImg]);

    const images = [
        { 
            src: "/Gallary_img1.webp", 
            category: "Celebration", 
            title: "Special Event", 
            alt: "Beautiful heart-shaped floral arch decoration for birthday parties and special events at Food Junction"
        },
        { 
            src: "/Gallary_img2.webp", 
            category: "Atmosphere", 
            title: "Elegant Lighting", 
            alt: "Close up of pink decorative flowers on dining table with elegant interior lighting at Food Junction"
        },
        { 
            src: "/Gallary_img3.webp", 
            category: "Main Branding", 
            title: "The Entrance", 
            alt: "Main entrance of Food Junction Cafe showing the illuminated heart logo and branding board"
        },
        { 
            src: "/Gallary_img4.webp", 
            category: "Interior", 
            title: "Reception Area", 
            alt: "Sophisticated and well-decorated reception area at Food Junction Bikram"
        },
        { 
            src: "/Gallary_img5.jpg", 
            category: "Fine Dining", 
            title: "Sophisticated Nights", 
            alt: "Wine glasses on a table in a dimly lit sophisticated dining area at Food Junction"
        },
        { 
            src: "/Gallary_img6.webp", 
            category: "Event Decor", 
            title: "Floral Grandeur", 
            alt: "Grand floral wall decoration and stage setup for events at Food Junction Bikram"
        },
    ];

    return (
        <section id="gallery" className="pt-20 pb-12 md:pt-28 md:pb-16 bg-[#faf9f6] relative overflow-hidden">
            {/* Senior Dev Background Detail */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none overflow-hidden w-full text-center z-0">
                <span className="text-[18vw] md:text-[15vw] font-serif font-black text-black/[0.015] leading-none uppercase tracking-tighter block transform -rotate-3 md:rotate-0">
                    Excellence
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-5"
                    >
                        <div className="w-10 h-[1px] bg-brand-primary/40"></div>
                        <span className="text-brand-primary font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">Visual Journey</span>
                        <div className="w-10 h-[1px] bg-brand-primary/40"></div>
                    </motion.div>
                    
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-8 leading-tight tracking-tight px-4"
                    >
                        The <span className="text-brand-primary italic">Gallery</span>
                    </motion.h2>
                    
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 1, ease: "circOut" }}
                        className="w-24 md:w-40 h-1 bg-gradient-to-r from-transparent via-brand-primary to-transparent mx-auto rounded-full"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 px-4 md:px-0">
                    {images.map((img, idx) => (
                        <motion.div
                            key={idx}
                            layoutId={`img-${img.src}`}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true, margin: "-20px" }}
                            transition={{ 
                                duration: 1, 
                                ease: [0.16, 1, 0.3, 1], // Custom cinematic cubic-bezier
                                delay: (idx % 3) * 0.1 // Stagger by column rather than absolute index
                            }}
                            whileHover={{ 
                                y: -10, 
                                transition: { duration: 0.4, ease: "circOut" }
                            }}
                            className="group relative cursor-pointer mx-auto w-full max-w-[340px] md:max-w-none"
                            onClick={() => setSelectedImg(img)}
                        >
                            {/* Ambient Glow */}
                            <div className="absolute inset-x-0 inset-y-10 bg-brand-primary/10 rounded-[2.5rem] blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10 shadow-[0_0_50px_rgba(212,175,55,0.2)]"></div>
                            
                            <div className="relative h-[360px] md:h-85 lg:h-96 w-full rounded-[2.5rem] overflow-hidden bg-white shadow-[0_15px_45px_-12px_rgba(0,0,0,0.12)] group-hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 p-2 lg:p-3">
                                <div className="absolute inset-4 border border-white/20 rounded-[1.8rem] z-10 pointer-events-none group-hover:border-brand-primary/40 transition-colors duration-500"></div>
                                
                                <div className="w-full h-full relative overflow-hidden rounded-[1.6rem] bg-gray-100">
                                    <motion.img
                                        src={img.src}
                                        alt={img.alt}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-[cubic-bezier(0.19,1,0.22,1)]"
                                        style={{ 
                                            objectPosition: img.src === '/Gallary_img3.webp' ? 'center 5%' : 'center'
                                        }}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    
                                    {/* Responsive Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-end pb-8">
                                        <div className="text-center px-6 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                            <span className="text-brand-primary font-bold tracking-[0.25em] uppercase text-[9px] mb-1 block">{img.category}</span>
                                            <span className="text-white font-serif text-2xl drop-shadow-md">{img.title}</span>
                                        </div>
                                    </div>

                                    {/* Mobile Tap Indicator */}
                                    <div className="md:hidden absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-[8px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-white/20">
                                        Tap to View
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImg && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-sm"
                        onClick={() => setSelectedImg(null)}
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-8 right-8 text-white hover:text-brand-primary transition-colors z-[110]"
                            onClick={() => setSelectedImg(null)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="relative max-w-5xl w-full h-full flex flex-col justify-center items-center gap-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative w-full overflow-hidden rounded-3xl bg-white/5 p-2 shadow-2xl border border-white/10">
                                <img 
                                    src={selectedImg.src} 
                                    alt={selectedImg.alt} 
                                    className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                                    decoding="async"
                                />
                            </div>
                            <div className="text-center text-white max-w-2xl">
                                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-2 block">{selectedImg.category}</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-4">{selectedImg.title}</h3>
                                <p className="text-gray-400 font-light italic text-sm md:text-base leading-relaxed">{selectedImg.alt}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="mt-16 md:mt-20 flex flex-col items-center opacity-40">
                <div className="flex items-center gap-5">
                    <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-brand-primary"></div>
                    <div className="w-2 h-2 rounded-full border border-brand-primary animate-pulse"></div>
                    <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-brand-primary"></div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
