import { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

// 1. Standalone CartFooter for clean architecture
const CartFooter = ({ cartTotal, cartItems, orderNotes, clearCart, toggleCart }) => {
  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;
    
    // Showcase Mode: Instead of opening WhatsApp, show a demo message
    toast.success('DEEMO MODE: In production, this would send the order to WhatsApp!', {
      duration: 4000,
      position: 'bottom-center',
      style: {
        background: '#1F2937',
        color: '#fff',
        borderRadius: '16px',
        border: '1px solid #EF4444'
      },
    });

    // Cleanup for better UX
    setTimeout(() => {
      toggleCart();
    }, 1000);
  };

  return (
    <div className="p-5 md:p-6 bg-white border-t border-gray-100 shadow-[0_-20px_50px_rgba(0,0,0,0.06)] sticky bottom-0 z-20">
      <div className="space-y-3 mb-6">
        <div className="flex justify-between items-center py-1 px-2 md:px-3">
          <span className="font-serif font-bold text-lg text-brand-dark tracking-tight">Total Amount</span>
          <span className="font-sans font-black text-3xl text-brand-primary tabular-nums tracking-tighter drop-shadow-sm">₹{cartTotal}</span>
        </div>
      </div>
      
      <button 
        onClick={handleConfirmOrder}
        className="w-full group relative bg-brand-dark hover:bg-brand-primary text-white py-4 px-8 rounded-2xl font-bold transition-all duration-500 transform active:scale-[0.98] shadow-2xl shadow-black/20 overflow-hidden"
      >
        <div className="relative z-10 flex items-center justify-between">
          <span className="tracking-[0.15em] uppercase text-[12px] font-black">Confirm Order</span>
          <div className="flex items-center gap-3">
            <div className="w-1 h-1 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
            <span className="text-xl font-sans font-black tabular-nums tracking-tighter">₹{cartTotal}</span>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
      </button>
      <p className="text-[10px] text-gray-500 mt-4 text-center uppercase tracking-[0.25em] font-black italic opacity-40">Taste that makes you smile</p>
    </div>
  );
};

const Cart = () => {
  const { isCartOpen, toggleCart, cartItems, updateQuantity, removeFromCart, cartTotal, clearCart, orderNotes, setOrderNotes } = useCart();

  // Intercept Mobile/PWA Back Button to close Cart instead of exiting App
  useEffect(() => {
    let pushed = false;
    if (isCartOpen) {
      window.history.pushState({ modal: 'cart' }, '');
      pushed = true;
      const handlePopState = (e) => {
        if (e.state?.modal !== 'cart') toggleCart();
      };
      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        if (pushed && window.history.state?.modal === 'cart') {
          window.history.back();
        }
      };
    }
  }, [isCartOpen]); // Only re-run when open/close changes, NOT on item updates

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] cursor-pointer"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-7 border-b border-gray-100 bg-white sticky top-0 z-30 pt-8 md:pt-7">
              <div className="flex items-center space-x-4">
                <div className="bg-brand-primary/10 p-3 rounded-2xl shadow-inner">
                  <ShoppingBag className="text-brand-primary" size={26} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold font-serif text-brand-dark tracking-tight">Your Order</h2>
                  {cartItems.length > 0 && (
                    <span className="text-[10px] text-gray-400 uppercase tracking-[0.15em] font-black block whitespace-nowrap">
                      {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {cartItems.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group lg:border lg:border-transparent lg:hover:border-red-100"
                    title="Clear Cart"
                  >
                    <Trash2 size={22} className="group-hover:scale-110 transition-transform" />
                  </button>
                )}
                <button 
                  onClick={toggleCart}
                  className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-2xl transition-all hover:rotate-90 duration-300"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Main Cart Content Area */}
            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar scroll-smooth">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-32 h-32 bg-gray-50 rounded-[2.5rem] flex items-center justify-center mb-8 relative"
                  >
                    <ShoppingBag size={48} className="text-gray-200" />
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-2 -right-2 bg-brand-primary/10 p-3 rounded-full"
                    >
                      <Plus size={20} className="text-brand-primary" />
                    </motion.div>
                  </motion.div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2">Your cart is empty</h3>
                  <p className="text-gray-400 text-sm max-w-[200px] mb-8">Looks like you haven't added anything to your order yet.</p>
                  <button 
                    onClick={() => {
                        toggleCart();
                        // Small delay to allow cart close and history.back() to settle 
                        // before attempting the smooth scroll navigation
                        setTimeout(() => {
                            const element = document.querySelector('#menu');
                            if (element) {
                                const headerOffset = 80;
                                const elementPosition = element.getBoundingClientRect().top;
                                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                            }
                        }, 150);
                    }}
                    className="px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-red-500/20 hover:shadow-xl hover:bg-red-600 transition-all active:scale-95 inline-block"
                  >
                    Explore Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4 p-6">
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="space-y-2.5"
                  >
                    {cartItems.map((item) => (
                      <motion.div 
                        layout
                        variants={itemVariants}
                        whileHover={{ scale: 1.01 }}
                        key={`${item.id}-${item.price}`} 
                        className="bg-white p-3.5 rounded-2xl border border-gray-50 shadow-sm hover:shadow-lg hover:border-brand-primary/10 transition-all duration-300 group relative"
                      >
                        <div className="flex flex-col space-y-2.5">
                          <div className="flex justify-between items-start gap-4">
                            <div className="min-w-0">
                              <h3 className="font-bold text-brand-dark text-sm md:text-base leading-tight transition-colors">{item.name}</h3>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.15em] mt-1 line-clamp-1">{item.category}</p>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-200 hover:text-red-500 transition-all p-1.5 hover:bg-red-50 rounded-lg flex-shrink-0"
                            >
                              <X size={16} />
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-between border-t border-gray-50 pt-2.5">
                            <p className="font-black text-brand-primary text-lg tracking-tight tabular-nums">
                              {typeof item.price === 'string' ? item.price : `₹${item.price}`}
                            </p>
                            
                            <div className="flex items-center gap-2 bg-gray-50/50 p-1 rounded-xl border border-gray-50 shadow-inner">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand-dark hover:bg-white transition-all shadow-sm active:scale-90"
                              >
                                <Minus size={12} />
                              </button>
                              <span className="font-bold text-sm min-w-[24px] text-center text-brand-dark">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-brand-dark hover:bg-white transition-all shadow-sm active:scale-90"
                              >
                                <Plus size={12} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                   <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100/50 shadow-inner">
                     <div className="flex items-center gap-2 mb-3 px-1">
                       <div className="w-1 h-3 bg-brand-primary rounded-full"></div>
                       <label className="text-[11px] font-black text-brand-dark/50 uppercase tracking-[0.15em] block">Full Delivery Address</label>
                     </div>
                      <textarea 
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                        placeholder="Enter your full delivery address and landmark..."
                        className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm focus:ring-4 focus:ring-brand-primary/10 focus:border-brand-primary/30 outline-none transition-all resize-none h-24 text-brand-dark shadow-sm placeholder:text-gray-400 font-medium"
                      ></textarea>
                   </div>
                </div>
              )}
            </div>

            {/* Footer Section with improved spacing and separation */}
            {cartItems.length > 0 && (
              <div className="mt-auto border-t border-gray-100 shadow-[0_-15px_30px_rgba(0,0,0,0.03)] bg-white pt-2">
                <CartFooter 
                  cartTotal={cartTotal} 
                  cartItems={cartItems} 
                  orderNotes={orderNotes} 
                  clearCart={clearCart} 
                  toggleCart={toggleCart} 
                />
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
