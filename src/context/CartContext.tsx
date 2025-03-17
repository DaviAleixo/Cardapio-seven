import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, CartContextType, CustomerInfo } from '../types/menu';

const CartContext = createContext<CartContextType>({
  cart: [],
  customerInfo: { name: '', tableNumber: '' },
  updateCustomerInfo: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getCartTotal: () => 0,
  getCartCount: () => 0,
});

export const useCart = () => useContext(CartContext);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize cart as empty array without loading from localStorage
  const [cart, setCart] = useState<CartItem[]>([]);

  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>(() => {
    // Load customer info from localStorage if available
    const savedInfo = localStorage.getItem('customerInfo');
    return savedInfo ? JSON.parse(savedInfo) : { name: '', tableNumber: '' };
  });

  // Save customer info to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
  }, [customerInfo]);

  const updateCustomerInfo = (info: CustomerInfo) => {
    setCustomerInfo(info);
  };

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(cartItem => cartItem.item.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Item already exists in cart, increase quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity
        };
        return updatedCart;
      } else {
        // Item doesn't exist in cart, add it
        return [...prevCart, { item, quantity }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(prevCart => 
      prevCart.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity } 
          : cartItem
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, cartItem) => {
      return total + (cartItem.item.price * cartItem.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, cartItem) => count + cartItem.quantity, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        customerInfo,
        updateCustomerInfo,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        getCartTotal,
        getCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};