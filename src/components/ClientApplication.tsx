'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    const [userState, setUserState]       = useState<{ isLoggedIn: boolean, user: any, token: string | null }>({ isLoggedIn: false, user: null, token: null });

    // ── Auth persistence ──────────────────────────────────────────────
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) { try { setUserState(JSON.parse(savedUser)); } catch {} }
    }, []);

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

    const router = useRouter();

    // ── Cart actions ──────────────────────────────────────────────────
    const addToCart = (product: any, qty: number = 1, forceCheckout: boolean = false) => {
        setCartItems(prev => {
            const exists = prev.find(p => p.id === product.id);
            const nextList = exists 
                ? prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + qty } : p)
                : [...prev, { ...product, quantity: qty }];
            
            return nextList;
        });
        
        if (forceCheckout) {
            router.push('/checkout');
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
    const subtotal = cartItems.reduce((sum, item) => sum + (parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) * item.quantity), 0);

    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
    const [quickViewItem, setQuickViewItem] = useState<any>(null);

    useEffect(() => {
        const handleOpenQv = (e: any) => setQuickViewItem(e.detail);
        window.addEventListener('openQuickView', handleOpenQv);
        return () => window.removeEventListener('openQuickView', handleOpenQv);
    }, []);

    return (
        <AuthContext.Provider value={{ userState, setUserState, showToast }}>
        <CartContext.Provider value={{ cartItems, setCartItems, addToCart, cartCount, isCartDrawerOpen, setIsCartDrawerOpen }}>
        <CompareContext.Provider value={{ compareItems, addToCompare, removeFromCompare, clearCompare, isInCompare }}>
            <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
                <Navigation cartCount={cartCount} compareCount={compareItems.length} categories={MOCK_CATEGORIES} />
                <main className="main-content" style={{ minHeight: '60vh', background: 'transparent', position: 'relative', zIndex: 1 }}>
                    {children}
                </main>
                <Footer />

                {/* ─ Global Cart Drawer Overlay ─ */}
                <div className={`drawer-overlay ${isCartDrawerOpen ? 'visible' : ''}`} onClick={() => setIsCartDrawerOpen(false)}></div>
                <div className={`cart-drawer ${isCartDrawerOpen ? 'open' : ''}`} style={{position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '400px', height: '100%', background: 'white', zIndex: 1001, boxShadow: '-5px 0 25px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1)', transform: isCartDrawerOpen ? 'translateX(0)' : 'translateX(100%)'}}>
                    <div style={{padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h2 style={{fontSize: '20px', fontWeight: 700}}>Your Cart</h2>
                        <button onClick={() => setIsCartDrawerOpen(false)} style={{background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', color: '#666'}}>&times;</button>
                    </div>
                    <div style={{flex: 1, overflowY: 'auto', padding: '20px'}}>
                        {cartItems.length === 0 ? (
                            <div style={{textAlign: 'center', padding: '50px 0', color: '#888'}}>
                                <i className="fas fa-shopping-bag" style={{fontSize: '50px', color: '#eee', marginBottom: '20px'}}></i>
                                <p>Your cart is empty.</p>
                            </div>
                        ) : (
                            cartItems.map((item, idx) => (
                                <div key={idx} style={{display: 'flex', gap: '15px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #f5f5f5'}}>
                                    <img src={item.imgUrl || '/images/placeholder.png'} style={{width: '70px', height: '70px', objectFit: 'contain', background: '#f8f9fa', borderRadius: '8px'}} />
                                    <div style={{flex: 1}}>
                                        <div style={{fontSize: '13px', fontWeight: 600, color: '#333', lineHeight: 1.4, marginBottom: '5px'}}>{item.title}</div>
                                        <div style={{color: '#888', fontSize: '13px'}}>Qty: {item.quantity}  <button style={{background:'none', border:'none', color:'#e53935', fontSize:'13px', cursor:'pointer', float:'right'}} onClick={() => setCartItems(cartItems.filter(i => i.id !== item.id))}><i className="fas fa-trash"></i></button></div>
                                        <div style={{color: '#ff6b00', fontWeight: 700, marginTop: '5px'}}>৳{(parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) * item.quantity).toLocaleString()}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div style={{padding: '25px 20px', borderTop: '1px solid #eee', background: '#fafafa'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px'}}>
                            <span style={{fontSize: '16px', fontWeight: 600}}>Subtotal:</span>
                            <span style={{fontSize: '20px', fontWeight: 800, color: '#ff6b00'}}>৳{subtotal.toLocaleString()}</span>
                        </div>
                        <div style={{display: 'flex', gap: '10px'}}>
                            <Link href="/cart" onClick={() => setIsCartDrawerOpen(false)} style={{flex: 1, padding: '14px', textAlign: 'center', border: '1px solid #1B5B97', color: '#1B5B97', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>View Cart</Link>
                            <Link href="/checkout" onClick={() => setIsCartDrawerOpen(false)} style={{flex: 1, padding: '14px', textAlign: 'center', background: '#ff6b00', color: 'white', borderRadius: '8px', fontWeight: 600, textDecoration: 'none'}}>Checkout</Link>
                        </div>
                    </div>
                </div>

                {/* ─ Quick View Modal ─ */}
                {quickViewItem && (
                    <div className="drawer-overlay visible" style={{display:'flex', alignItems:'center', justifyContent:'center', padding:'20px'}}>
                        <div className="quickview-modal" style={{background: 'white', borderRadius: '24px', maxWidth: '800px', width: '100%', position: 'relative', overflow: 'hidden', padding: '40px', display: 'flex', gap: '30px', boxShadow: '0 25px 50px rgba(0,0,0,0.2)'}}>
                            <button onClick={() => setQuickViewItem(null)} style={{position: 'absolute', top: '20px', right: '20px', background: '#f5f5f5', border: 'none', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px'}}>&times;</button>
                            <div style={{width: '350px'}}>
                                <img src={quickViewItem.imgUrl || '/images/placeholder.png'} style={{width: '100%', objectFit: 'contain'}} />
                            </div>
                            <div style={{flex: 1}}>
                                <h1 style={{fontSize: '24px', fontWeight: 700, marginBottom: '10px'}}>{quickViewItem.title}</h1>
                                <div style={{color: '#ff6b00', fontSize: '26px', fontWeight: 800, marginBottom: '20px'}}>{quickViewItem.price}</div>
                                <ul style={{color: '#555', lineHeight: 1.8, marginBottom: '30px', paddingLeft: '20px', fontSize: '14px'}}>
                                    {quickViewItem.features?.map((f:string, i:number) => <li key={i}>{f}</li>)}
                                </ul>
                                <button className="btn-add-cart" onClick={() => {addToCart(quickViewItem, 1, false); setQuickViewItem(null);}} style={{width: '100%'}}>Add to Cart</button>
                                <div style={{textAlign: 'center', marginTop: '15px'}}><Link href={`/product/${quickViewItem.id}`} onClick={() => setQuickViewItem(null)} style={{color: '#1B5B97', fontSize: '14px', fontWeight: 600, textDecoration: 'none'}}>View Full Details &rarr;</Link></div>
                            </div>
                        </div>
                    </div>
                )}



                {toastData && <Toast msg={toastData.msg} type={toastData.type} />}
            </div>
        </CompareContext.Provider>
        </CartContext.Provider>
        </AuthContext.Provider>
    );
}

// ── Cart Context ──────────────────────────────────────────────────────────────
export const CartContext = React.createContext<{
    cartItems: any[],
    setCartItems: React.Dispatch<React.SetStateAction<any[]>>,
    addToCart: (product: any, qty?: number, forceCheckout?: boolean) => void,
    cartCount: number,
    isCartDrawerOpen: boolean,
    setIsCartDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}>({
    cartItems: [],
    setCartItems: () => {},
    addToCart: () => {},
    cartCount: 0,
    isCartDrawerOpen: false,
    setIsCartDrawerOpen: () => {}
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

// ── Auth Context ─────────────────────────────────────────────────────────────
export const AuthContext = React.createContext<{
    userState: { isLoggedIn: boolean, user: any, token: string | null },
    setUserState: React.Dispatch<React.SetStateAction<{ isLoggedIn: boolean, user: any, token: string | null }>>,
    showToast: (msg: string, type?: 'success' | 'error') => void
}>({
    userState: { isLoggedIn: false, user: null, token: null },
    setUserState: () => {},
    showToast: () => {}
});
