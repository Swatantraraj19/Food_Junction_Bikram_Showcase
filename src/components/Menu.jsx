import { useState } from 'react';
import { menuData } from '../data/menuData';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/useCart';

const Menu = ({ onOpenFullMenu }) => {
    const { addToCart } = useCart();

    return (
        <section id="menu" className="py-16 bg-brand-light relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-20">
                    <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-xs mb-3 block">Handpicked Specialties</span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark mb-4 leading-tight">
                        Signature Dishes
                    </h2>
                    <div className="w-16 h-1 bg-brand-primary mx-auto rounded-full"></div>
                </div>



                {/* Premium Menu Grid */}
                <motion.div
                    layout
                    className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    <AnimatePresence>
                        {menuData.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.4 }}
                                key={item.id}
                                className="bg-white rounded-[1.5rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group border border-gray-100 flex flex-col h-full hover:-translate-y-2"
                            >
                                {/* Image Container - Optimized for mobile scannability */}
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={`${item.name} - Signature Dish at Food Junction Bikram, Patna`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    {/* Subtle Vignette */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                                    
                                    {/* Price Tag */}
                                    <div className="absolute top-5 right-5 bg-white/95 backdrop-blur px-4 py-1.5 rounded-full text-[10px] uppercase font-black shadow-lg text-brand-dark border border-gray-100 flex items-center gap-2">
                                        <span className="text-gray-400">Full</span>
                                        <span className="text-brand-primary font-bold tabular-nums">{item.price}</span>
                                    </div>
                                    
                                    {/* Premium Category Badge */}
                                    <div className={`absolute top-5 left-5 px-3 py-1.5 rounded-full text-[10px] font-bold text-white shadow-lg uppercase tracking-widest flex items-center gap-1.5 backdrop-blur-md ${
                                        item.category === 'Veg' ? 'bg-green-600/90 border border-green-400/30' :
                                        item.category === 'Non-Veg' ? 'bg-red-600/90 border border-red-400/30' :
                                        'bg-brand-secondary/90 border border-amber-400/30'
                                    }`}>
                                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                        {item.category}
                                    </div>
                                </div>
                                
                                {/* Content Container - Tighter horizontal/vertical spacing */}
                                <div className="p-5 md:p-6 flex flex-col flex-grow">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-lg md:text-xl font-bold text-brand-dark font-serif transition-colors leading-tight">{item.name}</h3>
                                    </div>
                                    <p className="text-gray-500 text-xs md:text-sm lg:text-base mb-4 line-clamp-2 leading-relaxed font-light flex-grow">{item.description}</p>
                                    
                                    <div className="mt-auto">
                                        <button
                                            onClick={() => {
                                                const skipLabel = ['Veg', 'Non-Veg', 'Fast Food'].includes(item.category) === false;
                                                const finalName = skipLabel ? item.name : `${item.name} (Full)`;
                                                addToCart({ ...item, name: finalName });
                                            }}
                                            className="w-full bg-brand-light text-brand-dark hover:bg-brand-primary hover:text-white font-bold tracking-wide py-3.5 rounded-xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-brand-primary/30 uppercase text-sm"
                                        >
                                            Add to Order
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View Full Menu Link */}
                <div className="text-center mt-16">
                    <button 
                        onClick={onOpenFullMenu} 
                        className="inline-flex items-center text-brand-dark font-bold tracking-wide uppercase text-sm hover:text-brand-primary transition-colors group cursor-pointer bg-transparent border-none"
                    >
                        <span className="border-b-2 border-brand-dark group-hover:border-brand-primary pb-1 transition-colors">View Full Menu</span>
                        <span className="ml-3 transform group-hover:translate-x-2 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Menu;
