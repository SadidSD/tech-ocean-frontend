'use client';

import React, { useContext } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import FloatingIconsBackground from '@/components/FloatingIconsBackground';
import { CartContext, CompareContext } from '@/components/ClientApplication';
import { MOCK_CATEGORIES } from '@/data/categories';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');
    
    const { cartCount } = useContext(CartContext);
    const { compareItems } = useContext(CompareContext);

    if (isAdmin) {
        return <>{children}</>;
    }

    return (
        <>
            <FloatingIconsBackground />
            <Navigation 
                cartCount={cartCount} 
                compareCount={compareItems?.length || 0} 
                categories={MOCK_CATEGORIES} 
            />
            <main className="main-content" style={{ minHeight: '60vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
