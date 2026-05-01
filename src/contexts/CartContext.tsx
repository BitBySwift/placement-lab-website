'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Course } from '@/types';

interface CartItem {
  course: Course;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (course: Course) => void;
  removeItem: (courseId: string) => void;
  clearCart: () => void;
  totalAmount: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext must be used within CartContextProvider');
  }
  return context;
}

export default function CartContextProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((course: Course) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.course.id === course.id);
      if (existing) return prev;
      return [...prev, { course, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((courseId: string) => {
    setItems((prev) => prev.filter((item) => item.course.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalAmount = items.reduce(
    (sum, item) => sum + item.course.discountedPrice * item.quantity,
    0
  );

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, totalAmount, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}
