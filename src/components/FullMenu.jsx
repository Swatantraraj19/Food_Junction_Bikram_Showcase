import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, ChevronRight, LayoutGrid, Leaf, UtensilsCrossed } from 'lucide-react';
import { fullMenuData } from '../data/fullMenuData';
import { useCart } from '../hooks/useCart';

const FullMenu = ({ isOpen, onClose }) => {
    const { addToCart } = useCart();
    const [activeTab, setActiveTab] = useState(0); // 0 is ALL, 1-7 are categories
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const scrollContainerRef = useRef(null);
    const sectionRefs = useRef([]);
    const tabsRef = useRef(null);

    // Body Scroll Lock & Back Button Intercept
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.history.pushState({ modal: 'fullmenu' }, '');
            const handlePopState = (e) => {
                if (e.state?.modal !== 'fullmenu') onClose();
            };
            window.addEventListener('popstate', handlePopState);
            
            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('popstate', handlePopState);
                if (window.history.state?.modal === 'fullmenu') {
                    window.history.back();
                }
            };
        } else {
            document.body.style.overflow = 'unset';
            return () => {
                document.body.style.overflow = 'unset';
            };
        }
    }, [isOpen]); // Stable trigger

    // Intersection Observer to highlight tabs on scroll
    useEffect(() => {
        const observerOptions = {
            root: scrollContainerRef.current,
            rootMargin: '-80px 0px -60% 0px', 
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = sectionRefs.current.indexOf(entry.target);
                    if (index !== -1) {
                        setActiveTab(index + 1);
                        // Auto-scroll the tab bar to keep active tab visible
                        if (tabsRef.current) {
                            const activeTabEl = tabsRef.current.children[index + 1];
                            if (activeTabEl) {
                                activeTabEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                            }
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        sectionRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    if (!isOpen) return null;

    const scrollToSection = (index) => {
        if (index === 'all') {
            scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveTab(0);
        } else {
            const target = sectionRefs.current[index];
            if (target) {
                const headerOffset = 140; // Height of sticky header + tabs
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                scrollContainerRef.current.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
        setIsMenuOpen(false);
    };

    const handleAdd = (item, size, categoryName) => {
        const isHalf = size === 'Half';
        const hasBoth = item.prices.half && item.prices.full;
        const skipLabel = ['Breads and Rice', 'More Dishes'].includes(categoryName);

        let finalName = item.name;
        if (isHalf) {
            finalName = `${item.name} (Half)`;
        } else if (hasBoth || !skipLabel) {
            finalName = `${item.name} (Full)`;
        }

        const cartItem = {
            id: isHalf ? `${item.id}-Half` : item.id,
            name: finalName,
            price: size ? item.prices[size.toLowerCase()] : (item.prices.full || item.prices.half),
            category: item.type === 'veg' ? 'Veg' : 'Non-Veg',
            image: item.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=500"
        };
        addToCart(cartItem);
    };

    const categories = ['ALL', ...fullMenuData.map(c => c.category)];

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-[200] bg-[#0c1117] w-full h-full flex flex-col"
        >
            {/* Sticky Header Section */}
            <div className="flex-shrink-0 z-[210] bg-[#0c1117]/95 backdrop-blur-xl border-b border-white/5 px-4 md:px-12">
                <div className="flex justify-between items-center h-[70px] md:h-[80px]">
                    <div className="flex flex-col">
                        <h2 className="text-lg md:text-2xl font-serif font-bold text-white tracking-wide flex items-center gap-2 md:gap-3">
                            Food <span className="text-[#d4af37]">Menu</span>
                            <div className="h-4 w-px bg-white/20 mx-1 hidden sm:block"></div>
                            <span className="text-white/40 font-sans text-xs md:text-sm font-medium tracking-widest hidden sm:inline-block">
                                EST. 2026
                            </span>
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Mobile Category Toggle (Only on Small Screens) */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="flex md:hidden items-center gap-2 bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/20 px-3 py-2 rounded-xl transition-all"
                        >
                            {activeTab !== 0 && (
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                    fullMenuData[activeTab - 1].category.includes('Non-Veg') ? 'bg-red-500' : 
                                    fullMenuData[activeTab - 1].category.includes('Veg') ? 'bg-green-500' : 'bg-amber-500'
                                } shadow-[0_0_5px_rgba(0,0,0,0.5)]`}></div>
                            )}
                            {activeTab === 0 && <LayoutGrid size={14} className="text-[#d4af37]" />}
                            <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-wider truncate max-w-[90px]">
                                {activeTab === 0 ? 'CATEGORIES' : fullMenuData[activeTab - 1].category}
                            </span>
                            <ChevronRight size={14} className={`text-[#d4af37]/50 transition-transform duration-300 ${isMenuOpen ? 'rotate-90' : ''}`} />
                        </button>

                        {/* More Compact Close Button */}
                        <button
                            onClick={onClose}
                            className="group flex items-center gap-2 bg-white/5 hover:bg-white/10 p-2 md:pl-4 md:pr-2 md:py-2 rounded-xl md:rounded-full border border-white/5 transition-all duration-300"
                        >
                            <span className="hidden md:block text-[10px] font-bold text-white/50 tracking-widest opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">CLOSE</span>
                            <div className="p-1 rounded-full bg-white/10 text-white group-hover:bg-red-500 transition-all">
                                <X size={18} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Selection Tabs - Horizontal Content (Desktop Only) */}
                <div className="hidden md:block pt-0 pb-4 border-t border-white/5 overflow-hidden">
                    <div 
                        ref={tabsRef}
                        className="flex overflow-x-auto no-scrollbar px-12 gap-4 items-center w-full mask-fade-right"
                    >
                        <button
                            onClick={() => scrollToSection('all')}
                            className={`whitespace-nowrap flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 border ${activeTab === 0 ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white/5 text-white/50 border-white/5 hover:border-[#d4af37]/30 hover:text-white'}`}
                        >
                            ALL ITEMS
                        </button>
                        {fullMenuData.map((cat, idx) => {
                            const isActive = activeTab === idx + 1;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => scrollToSection(idx)}
                                    className={`whitespace-nowrap flex-shrink-0 px-6 py-2 rounded-full text-xs font-bold tracking-[0.2em] transition-all duration-300 border flex items-center gap-2 ${isActive ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-white/5 text-white/50 border-white/5 hover:border-[#d4af37]/30 hover:text-white'}`}
                                >
                                    {cat.category.includes('Veg') && !cat.category.includes('Non') && <Leaf size={10} className={isActive ? 'text-black' : 'text-green-500/70'} />}
                                    {cat.category.includes('Non-Veg') && <UtensilsCrossed size={10} className={isActive ? 'text-black' : 'text-red-500/70'} />}
                                    {cat.category.split(' (')[0]}
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>

            {/* Menu Content Container */}
            <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto custom-scrollbar relative px-4 md:px-12"
            >
                <div className="flex flex-col items-center w-full py-8 md:py-12 pb-32">
                    <div className="w-full max-w-5xl space-y-24 md:space-y-32">
                    {fullMenuData.map((categoryGroup, index) => {
                        return (
                            <div 
                                key={index} 
                                ref={el => sectionRefs.current[index] = el}
                                className="w-full space-y-10 md:space-y-16 scroll-mt-[160px]"
                            >
                                
                                {/* Section Header - Refined Typography */}
                                <div className="flex flex-col items-center gap-4 w-full">
                                    <div className="flex items-center gap-4 w-full justify-center">
                                        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/40 to-[#d4af37] flex-grow"></div>
                                        <h3 className="text-xl md:text-3xl font-serif text-[#d4af37] text-center tracking-[0.2em] px-4 md:px-8 uppercase font-bold">
                                            {categoryGroup.category}
                                        </h3>
                                        <div className="h-[1px] bg-gradient-to-l from-transparent via-[#d4af37]/40 to-[#d4af37] flex-grow"></div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] tracking-[0.4em] text-white/30 uppercase font-medium">
                                        <span className="w-8 h-px bg-white/10"></span>
                                        Exquisite Selection
                                        <span className="w-8 h-px bg-white/10"></span>
                                    </div>
                                </div>

                                {/* Symmetric Compact Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-4 md:gap-y-6 w-full max-w-4xl mx-auto px-1 md:px-0">
                                    {categoryGroup.items.map((item) => {
                                        const hasBoth = item.prices.half && item.prices.full;
                                        const hideLabel = ['Breads and Rice', 'More Dishes'].includes(categoryGroup.category);

                                        return (
                                            <div key={item.id} className="flex flex-col items-center md:items-start gap-2.5 md:gap-3 group p-2 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-[#d4af37]/10 w-[94%] sm:w-full mx-auto">
                                                <div className="flex items-center gap-2 md:gap-2.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.type === 'veg' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.4)]' : 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.4)]'}`}></div>
                                                    <span className="text-white font-medium text-sm md:text-lg tracking-wide group-hover:text-[#d4af37] transition-colors text-center md:text-left leading-tight">
                                                        {item.name}
                                                    </span>
                                                </div>

                                                <div className="flex flex-wrap justify-center md:justify-start gap-2.5 mt-0.5">
                                                    {item.prices.half && (
                                                        <button onClick={() => handleAdd(item, 'Half', categoryGroup.category)} className="flex items-center gap-2.5 bg-[#1a2332] px-3 py-1 rounded-lg border border-white/5 hover:border-[#d4af37]/50 transition-all hover:bg-[#d4af37]/5 group/btn active:scale-95">
                                                            <div className="flex flex-col items-start text-left">
                                                                <span className="text-gray-400 text-[8px] uppercase font-bold tracking-widest group-hover/btn:text-[#d4af37]/70 transition-colors">Half</span>
                                                                <span className="text-white font-bold text-xs md:text-base tabular-nums">₹{item.prices.half}</span>
                                                            </div>
                                                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-black shadow-lg group-hover/btn:rotate-90 transition-transform duration-300">
                                                                <Plus size={14} strokeWidth={3} />
                                                            </div>
                                                        </button>
                                                    )}
                                                    {item.prices.full && (
                                                        <button onClick={() => handleAdd(item, 'Full', categoryGroup.category)} className="flex items-center gap-2.5 bg-[#1a2332] px-3 py-1 rounded-lg border border-white/5 hover:border-[#d4af37]/50 transition-all hover:bg-[#d4af37]/5 group/btn active:scale-95">
                                                            <div className="flex flex-col items-start text-left">
                                                                {(!hideLabel || hasBoth) && <span className="text-gray-400 text-[8px] uppercase font-bold tracking-widest group-hover/btn:text-[#d4af37]/70 transition-colors">Full</span>}
                                                                <span className="text-white font-bold text-xs md:text-base tabular-nums">₹{item.prices.full}</span>
                                                            </div>
                                                            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#d4af37] flex items-center justify-center text-black shadow-lg group-hover/btn:rotate-90 transition-transform duration-300">
                                                                <Plus size={14} strokeWidth={3} />
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Visual Footer */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#d4af37]/40"></div>
                        <div className="w-2 h-2 rotate-45 border border-[#d4af37]/40"></div>
                        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#d4af37]/40"></div>
                    </div>
                    <p className="text-[#d4af37]/60 text-[10px] uppercase tracking-[0.5em] font-medium italic">Hand-crafted with Passion</p>
                </div>
                </div>
            </div>

            {/* Floating Category Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="fixed top-[80px] right-4 left-4 md:left-auto md:right-12 z-[310] max-w-xs md:w-80 bg-[#121926]/98 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-[0_30px_70px_rgba(0,0,0,0.9)] ml-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-white text-sm font-bold tracking-widest uppercase opacity-50">Quick Jump</h4>
                            <button onClick={() => setIsMenuOpen(false)} className="text-white/40 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <div className="grid gap-2 overflow-y-auto max-h-[60vh] no-scrollbar">
                            <button
                                onClick={() => scrollToSection('all')}
                                className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-all group"
                            >
                                <span className={`text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === 0 ? 'text-[#d4af37]' : 'text-white/80'}`}>Back to top</span>
                                <ChevronRight size={14} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-all" />
                            </button>
                            {fullMenuData.map((cat, idx) => {
                                const isNonVeg = cat.category.includes('Non-Veg');
                                const isVeg = !isNonVeg && cat.category.includes('Veg');
                                return (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToSection(idx)}
                                        className="flex items-center justify-between p-3.5 rounded-xl hover:bg-white/5 transition-all group border-t border-white/5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${isNonVeg ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]' : isVeg ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'bg-amber-500'}`}></div>
                                            <span className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${activeTab === idx + 1 ? 'text-[#d4af37]' : 'text-white'}`}>
                                                {cat.category}
                                            </span>
                                        </div>
                                        <ChevronRight size={14} className="text-[#d4af37] opacity-0 group-hover:opacity-100 transition-all" />
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FullMenu;
