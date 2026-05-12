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
    const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

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

    // ── Recently Viewed persistence ──────────────────────────────────
    useEffect(() => {
        const saved = localStorage.getItem('techXocean_recent');
        if (saved) { try { setRecentlyViewed(JSON.parse(saved)); } catch {} }
    }, []);
    useEffect(() => {
        localStorage.setItem('techXocean_recent', JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

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
            // 1. Check for duplicate
            if (prev.find(p => p.id === product.id)) {
                showToast('Product already in comparison list', 'error');
                return prev;
            }
            // 2. Check max limit
            if (prev.length >= 4) {
                showToast('Maximum 4 products can be compared. Remove one to add another.', 'error');
                return prev;
            }
            // 3. Check category compatibility
            // Note: product.category might be an object {id, name} or just a name. 
            // We should compare the name or ID consistently.
            const getCatName = (c: any) => typeof c === 'string' ? c : (c?.name || c?.id || 'Unknown');
            const newCat = getCatName(product.category);
            
            if (prev.length > 0) {
                const existingCat = getCatName(prev[0].category);
                if (newCat !== existingCat) {
                    showToast(`Cannot compare ${newCat} with ${existingCat}. Please remove existing selection first.`, 'error');
                    return prev;
                }
            }
            
            showToast(`${product.title.substring(0,24)}... added to compare`, 'success');
            return [...prev, product];
        });
    };

    const removeFromCompare = (productId: any) => {
        setCompareItems(prev => prev.filter(p => p.id !== productId));
        showToast('Product removed from comparison', 'success');
    };

    const clearCompare = () => {
        setCompareItems([]);
        showToast('Comparison list cleared', 'success');
    };
    const isInCompare  = (productId: any) => compareItems.some(p => p.id === productId);

    // ── Recently Viewed actions ───────────────────────────────────────
    const addToRecentlyViewed = (product: any) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            return [product, ...filtered].slice(0, 10); // Keep last 10
        });
    };

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
        <RecentContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>
            <div className="app-container" style={{ position: 'relative', zIndex: 1 }}>
                <main className="app-main-wrapper" style={{ minHeight: '60vh', position: 'relative', zIndex: 1 }}>
                    {children}
                </main>

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

                {/* ─ Quick View Side Panel ─ */}
                <div className={`drawer-overlay ${quickViewItem ? 'visible' : ''}`} onClick={() => setQuickViewItem(null)}></div>
                <div className={`quickview-drawer ${quickViewItem ? 'open' : ''}`} style={{
                    position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '500px', height: '100%', 
                    background: 'white', zIndex: 1002, boxShadow: '-10px 0 30px rgba(0,0,0,0.15)', 
                    display: 'flex', flexDirection: 'column', transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1)', 
                    transform: quickViewItem ? 'translateX(0)' : 'translateX(100%)',
                    overflowY: 'auto'
                }}>
                    {quickViewItem && (
                        <div style={{padding: '30px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
                                <span style={{background: '#fff5f2', color: '#db4b27', fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '4px', textTransform: 'uppercase'}}>Quick View</span>
                                <button onClick={() => setQuickViewItem(null)} style={{background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><i className="fas fa-times"></i></button>
                            </div>
                            
                            <div style={{background: '#f8fafc', borderRadius: '16px', padding: '20px', marginBottom: '25px', display: 'flex', justifyContent: 'center'}}>
                                <img src={quickViewItem.imgUrl || '/images/placeholder.png'} style={{width: '280px', height: '280px', objectFit: 'contain'}} alt={quickViewItem.title} />
                            </div>

                            <h1 style={{fontSize: '22px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '12px'}}>{quickViewItem.title}</h1>
                            
                            <div style={{display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '25px'}}>
                                <div style={{color: '#ff6b00', fontSize: '28px', fontWeight: 900}}>{quickViewItem.price}</div>
                                {quickViewItem.oldPrice && <div style={{color: '#94a3b8', fontSize: '18px', textDecoration: 'line-through'}}>৳{quickViewItem.oldPrice}</div>}
                            </div>

                            <div style={{marginBottom: '30px'}}>
                                <h4 style={{fontSize: '14px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '12px', letterSpacing: '0.5px'}}>Key Features</h4>
                                <ul style={{padding: 0, listStyle: 'none'}}>
                                    {quickViewItem.features?.map((f:string, i:number) => (
                                        <li key={i} style={{fontSize: '13px', color: '#334155', marginBottom: '10px', display: 'flex', gap: '10px'}}>
                                            <i className="fas fa-check-circle" style={{color: '#10b981', marginTop: '3px'}}></i>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px'}}>
                                <button className="btn-add-cart" onClick={() => {addToCart(quickViewItem, 1, false); setQuickViewItem(null);}} style={{width: '100%', padding: '16px', fontSize: '15px'}}>
                                    <i className="fas fa-shopping-cart" style={{marginRight: '10px'}}></i> Add to Shopping Cart
                                </button>
                                <div style={{display: 'flex', gap: '10px'}}>
                                    <button 
                                        onClick={() => {
                                            if (isInCompare(quickViewItem.id)) { removeFromCompare(quickViewItem.id); } 
                                            else { addToCompare(quickViewItem); }
                                        }}
                                        style={{
                                            flex: 1, padding: '12px', borderRadius: '10px', fontWeight: 700, cursor: 'pointer',
                                            background: isInCompare(quickViewItem.id) ? '#fff5f2' : '#f1f5f9',
                                            color: isInCompare(quickViewItem.id) ? '#db4b27' : '#475569',
                                            border: '1px solid ' + (isInCompare(quickViewItem.id) ? '#db4b27' : '#e2e8f0'),
                                            fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                        }}
                                    >
                                        <i className={isInCompare(quickViewItem.id) ? "fas fa-check" : "fas fa-exchange-alt"}></i>
                                        {isInCompare(quickViewItem.id) ? 'Selected' : 'Compare'}
                                    </button>
                                    <Link href={`/product/${quickViewItem.id}`} onClick={() => setQuickViewItem(null)} style={{
                                        flex: 1, padding: '12px', background: '#1B5B97', color: 'white', 
                                        borderRadius: '10px', fontWeight: 700, textDecoration: 'none', 
                                        fontSize: '13px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
                                    }}>
                                        <i className="fas fa-info-circle"></i> Full Details
                                    </Link>
                                </div>
                            </div>

                            <div style={{borderTop: '1px solid #f1f5f9', paddingTop: '20px', textAlign: 'center'}}>
                                <p style={{fontSize: '12px', color: '#94a3b8'}}>Secure transactions and fast shipping available on all orders.</p>
                            </div>
                        </div>
                    )}
                </div>



                {toastData && <Toast msg={toastData.msg} type={toastData.type} />}
            </div>
        </RecentContext.Provider>
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

// ── Recently Viewed Context ───────────────────────────────────────────
export const RecentContext = React.createContext<{
    recentlyViewed: any[],
    addToRecentlyViewed: (product: any) => void
}>({
    recentlyViewed: [],
    addToRecentlyViewed: () => {}
});
