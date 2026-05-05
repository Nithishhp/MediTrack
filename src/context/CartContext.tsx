import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Medicine, Pharmacy } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (medicine: Medicine, pharmacy: Pharmacy, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((medicine: Medicine, pharmacy: Pharmacy, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.medicine.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.medicine.id === medicine.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { medicine, pharmacy, quantity, price: medicine.discountPrice || medicine.price }];
    });
  }, []);

  const removeItem = useCallback((medicineId: string) => {
    setItems(prev => prev.filter(item => item.medicine.id !== medicineId));
  }, []);

  const updateQuantity = useCallback((medicineId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.medicine.id !== medicineId));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.medicine.id === medicineId ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
