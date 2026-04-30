'use client';

import React, { useContext } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { CartContext, CompareContext } from '@/components/ClientApplication';
import { MOCK_CATEGORIES } from '@/data/categories';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cartCount, compareItems } = useContext(CompareContext) as any; // Using context to get counts
  // Wait, I need to get cartCount from CartContext and compareCount from CompareContext
  
  return (
    <CustomerLayoutContent>{children}</CustomerLayoutContent>
  );
}

function CustomerLayoutContent({ children }: { children: React.ReactNode }) {
    const { cartCount } = useContext(CartContext);
    const { compareItems } = useContext(CompareContext);

    return (
        <>
            <Navigation 
                cartCount={cartCount} 
                compareCount={compareItems.length} 
                categories={MOCK_CATEGORIES} 
            />
            <main className="main-content" style={{ minHeight: '60vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
