'use client';

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import { MOCK_CATEGORIES } from '@/data/categories';

interface ClientApplicationProps {
  children: React.ReactNode;
}

const Toast = ({ msg, type }: { msg: string, type: string }) => (
    <div style={{position:'fixed', bottom:'20px', right:'20px', background: type==='success'?'#00C49F':'#dc3545', color:'#fff', padding:'15px 25px', borderRadius:'8px', boxShadow:'0 5px 15px rgba(0,0,0,0.2)', zIndex:9999}}>
        {msg}
    </div>
);

export default function ClientApplication({ children }: ClientApplicationProps) {
    const [cartItems, setCartItems]       = useState<any[]>([]);
    const [compareItems, setCompareItems] = useState<any[]>([]);
    const [toastData, setToastData]       = useState<{ msg: string, type: string } | null>(null);

    // ── Cart persistence ──────────────────────────────────────────────
    useEffect(() => {
        const saved = localStorage.getItem('techXocean_cart');
        if (saved) { try { setCartItems(JSON.parse(saved)); } catch {} }
    }, []);
    useEffect(() => {
        localStorage.setItem('techXocean_cart', JSON.stringify(cartItems));
    }, [cartItems]);

    // ── Compare persistence ───────────────────────────────────────────
    useEffect(() => {
        const saved = localStorage.getItem('techXocean_compare');
        if (saved) { try { setCompareItems(JSON.parse(saved)); } catch {} }
    }, []);
    useEffect(() => {
        localStorage.setItem('techXocean_compare', JSON.stringify(compareItems));
    }, [compareItems]);

    // ── Toast helper ──────────────────────────────────────────────────
    const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
        setToastData({ msg, type });
        setTimeout(() => setToastData(null), 3000);
    };

    // ── Cart actions ──────────────────────────────────────────────────
    const addToCart = (product: any, qty: number = 1, forceCheckout: boolean = false) => {
        setCartItems(prev => {
            const exists = prev.find(p => p.id === product.id);
            if (exists) return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + qty } : p);
            return [...prev, { ...product, quantity: qty }];
        });
        if (forceCheckout) {
            window.location.href = '/checkout';
        } else {
            showToast(`${qty}x ${product.title.substring(0, 22)}... added!`, 'success');
        }
    };

    // ── Compare actions ───────────────────────────────────────────────
    const addToCompare = (product: any) => {
        setCompareItems(prev => {
            if (prev.find(p => p.id === product.id)) {
                showToast('Already in compare list', 'error');
                return prev;
            }
            if (prev.length >= 2) {
                showToast('Maximum 2 products. Remove one to add another.', 'error');
                return prev;
            }
            if (prev.length > 0 && prev[0].category !== product.category) {
                showToast('Cannot compare. Products must be from the same category.', 'error');
                return prev;
            }
            showToast(`${product.title.substring(0,24)}... added to compare`, 'success');
            return [...prev, product];
        });
    };

    const removeFromCompare = (productId: any) => {
        setCompareItems(prev => prev.filter(p => p.id !== productId));
    };

    const clearCompare = () => setCompareItems([]);
    const isInCompare  = (productId: any) => compareItems.some(p => p.id === productId);

    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, cartCount }}>
        <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
            <div className="app-container">
                <Navigation cartCount={cartCount} compareCount={compareItems.length} categories={MOCK_CATEGORIES} />
                <main style={{ minHeight: '60vh' }}>
                    {children}
                </main>
                <Footer />

                {toastData && <Toast msg={toastData.msg} type={toastData.type} />}
            </div>
        </CompareContext.Provider>
        </CartContext.Provider>
    );
}

// ── Cart Context ──────────────────────────────────────────────────────────────
export const CartContext = React.createContext<{
    cartItems: any[],
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>,
    addToCart: (product: any, qty?: number, forceCheckout?: boolean) => void,
    cartCount: number
}>({
    cartItems: [],
    setCartItems: () => {},
    addToCart: () => {},
    cartCount: 0,
});

// ── Compare Context ───────────────────────────────────────────────────────────
export const CompareContext = React.createContext<{
    compareItems: any[],
    addToCompare: (product: any) => void,
    removeFromCompare: (id: any) => void,
    clearCompare: () => void,
    isInCompare: (id: any) => boolean,
}>({
    compareItems: [],
    addToCompare: () => {},
    removeFromCompare: () => {},
    clearCompare: () => {},
    isInCompare: () => false,
});
