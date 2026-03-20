import { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

// 1. Create the Context
export const CartContext = createContext();

// 2. The Provider Component
export const CartProvider = ({ children }) => {
  // 4. Initialize state from LocalStorage (The Notebook)
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('fj_cart_items');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [orderNotes, setOrderNotes] = useState(() => {
    const savedNotes = localStorage.getItem('fj_order_notes');
    return savedNotes || '';
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  // 5. Save to LocalStorage whenever items or notes change
  useEffect(() => {
    localStorage.setItem('fj_cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('fj_order_notes', orderNotes);
  }, [orderNotes]);

  // A function to add an item to the order list
  const addToCart = (item) => {
    setCartItems((prevList) => {
      const existingItem = prevList.find((i) => i.id === item.id);
      if (existingItem) {
        return prevList.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevList, { ...item, quantity: 1 }];
    });

    // Showcase Notification
    toast.success(`${item.name} added to cart!`, {
      duration: 1500,
      style: { background: '#1F2937', color: '#fff', borderRadius: '12px' },
      iconTheme: { primary: '#EF4444', secondary: '#fff' },
    });
  };

  // A function to remove an item completely
  const removeFromCart = (itemId) => {
    setCartItems((prevList) => prevList.filter((item) => item.id !== itemId));
    toast.error('Item removed', { duration: 1000, style: { background: '#1F2937', color: '#fff' } });
  };

  // A function to increase/decrease quantity (+ or - buttons)
  const updateQuantity = (itemId, changeAmount) => {
    setCartItems((prevList) => {
      return prevList
        .map((item) => {
          if (item.id === itemId) {
            return { ...item, quantity: item.quantity + changeAmount };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };


  // A function to clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    setOrderNotes('');
    toast.error('Cart cleared', { duration: 1000, style: { background: '#1F2937', color: '#fff' } });
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  // Math helper: count total items (e.g., 2 burgers + 1 fry = 3 items)
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  // Math helper: calculate total bill amount
  const cartTotal = cartItems.reduce((total, item) => {
    // Convert "₹280" string into the number 280
    const priceNumber = parseInt(item.price.replace(/[^0-9]/g, ''), 10);
    return total + (priceNumber * item.quantity);
  }, 0);

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        isCartOpen, 
        toggleCart, 
        cartTotal, 
        cartCount,
        clearCart,
        orderNotes,
        setOrderNotes
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
