'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext, CartContext, CompareContext } from './ClientApplication';
import { FaDesktop, FaVideo } from 'react-icons/fa';
import { COMPONENT_METADATA } from '@/data/component-structure';

interface Category {
  id: number;
  name: string;
  icon?: string;
  slug: string;
  children?: { id: number; name: string; slug: string; subItems?: (string | { name: string; dropdown: string[] })[] }[];
}

interface NavigationProps {
  cartCount: number;
  compareCount: number;
  categories: Category[];
}

export const MainHeader = ({ cartCount, compareCount, onMenuToggle }: { cartCount: number, compareCount: number, onMenuToggle: () => void }) => {
    const { userState, setUserState, showToast } = useContext(AuthContext);
    const { setIsCartDrawerOpen } = useContext(CartContext);
    const { compareItems } = useContext(CompareContext);
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Debounce effect
    useEffect(() => {
        const timer = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setIsLoading(true);
                try {
                    const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}&limit=6`);
                    const data = await response.json();
                    setSuggestions(data.results || []);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUserState({ isLoggedIn: false, user: null, token: null });
        showToast('Logged out successfully', 'success');
        router.push('/');
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setShowSearch(false);
        }
    };

    const handleSuggestionClick = (url: string) => {
        router.push(url);
        setShowSearch(false);
        setSearchQuery('');
    };

    return (
        <header className="main-header" id="mainHeader">
            {/* Mobile Header */}
            <div className="mobile-header-container">
              <div className="mobile-header-row">
                <button className="hamburger-menu" onClick={onMenuToggle}>
                  <i className="fas fa-bars"></i>
                </button>
                
                <div className="mobile-logo-wrapper">
                  <Link href="/">
                    <img 
                      src="/img/main website logo.png" 
                      alt="Tech X Ocean" 
                      className="mobile-logo"
                    />
                  </Link>
                </div>
                
                <button id="mobileCartIcon" className="mobile-cart-icon" onClick={() => setIsCartDrawerOpen(true)}>
                  <i className="fas fa-shopping-cart"></i>
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
              </div>
              
              <div className="mobile-search-row">
                <form onSubmit={handleSearchSubmit} className="search-wrapper">
                  <i className="fas fa-search search-icon-left"></i>
                  <input 
                    type="text" 
                    placeholder="Search for Products..." 
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                  />
                  {isLoading && <div className="search-loader"></div>}
                </form>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="container main-header-inner desktop-header">
                <div style={{marginRight: '20px'}}>
                    <Link href="/" className="logo-link">
                        <img 
                            src="/img/main website logo.png" 
                            alt="Tech X Ocean" 
                            className="site-logo"
                            onError={(e: any) => {
                                e.target.src = "/img/logo.png";
                            }}
                        />
                    </Link>
                </div>
                <div className="search-wrap" style={{position: 'relative'}} ref={searchRef}>
                    <form onSubmit={handleSearchSubmit} style={{display: 'flex', width: '100%'}}>
                        <input 
                            type="text" 
                            className="search-input" 
                            placeholder="Search for products, categories, blogs..." 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            onFocus={() => setShowSearch(true)} 
                        />
                        <button type="submit" className="search-btn"><i className="fas fa-search"></i></button>
                        {isLoading && <div className="search-spinner-inline" style={{position: 'absolute', right: '60px', top: '50%', transform: 'translateY(-50%)'}}></div>}
                    </form>

                    {showSearch && searchQuery.length >= 2 && (
                        <div className="search-autocomplete-dropdown" style={{position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.18)', zIndex: 2000, marginTop: '10px', overflow: 'hidden', border: '1px solid #eee', animation: 'searchFadeIn 0.2s ease-out'}}>
                            {suggestions.length > 0 ? (
                                <div style={{maxHeight: '450px', overflowY: 'auto'}}>
                                    <div style={{padding: '12px 18px', background: '#f8fafc', fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid #f1f5f9'}}>
                                        Quick Suggestions
                                    </div>
                                    {suggestions.map((item, index) => (
                                        <div 
                                            key={index} 
                                            onClick={() => handleSuggestionClick(item.url)} 
                                            style={{display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', transition: 'all 0.2s'}}
                                            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f2'; e.currentTarget.style.paddingLeft = '22px'; }}
                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.paddingLeft = '18px'; }}
                                        >
                                            <div style={{width: '50px', height: '50px', background: '#f1f5f9', borderRadius: '10px', overflow: 'hidden', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e2e8f0'}}>
                                                {item.image ? (
                                                    <img src={item.image} alt={item.title} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                                                ) : (
                                                    <i className={item.type === 'category' ? 'fas fa-folder' : 'fas fa-file-alt'} style={{fontSize: '20px', color: '#94a3b8'}}></i>
                                                )}
                                            </div>
                                            <div style={{flex: 1, minWidth: 0}}>
                                                <div style={{fontSize: '14px', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{item.title}</div>
                                                <div style={{display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px'}}>
                                                    <span style={{fontSize: '10px', color: 'white', background: item.type === 'category' ? '#1B5B97' : '#db4b27', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.3px'}}>{item.type}</span>
                                                    {item.brand && <span style={{fontSize: '11px', color: '#64748b'}}>in {item.brand}</span>}
                                                </div>
                                            </div>
                                            {item.price && (
                                                <div style={{textAlign: 'right', marginLeft: '12px'}}>
                                                    <div style={{fontSize: '15px', fontWeight: 800, color: '#ff6b00'}}>৳{parseFloat(String(item.price).replace(/[^\d.]/g, '')).toLocaleString()}</div>
                                                    <div style={{fontSize: '10px', color: '#10b981', fontWeight: 700}}>In Stock</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    <div 
                                        onClick={handleSearchSubmit}
                                        style={{padding: '16px', textAlign: 'center', background: '#f8fafc', fontSize: '14px', fontWeight: 700, color: '#1B5B97', cursor: 'pointer', transition: 'color 0.2s'}}
                                        onMouseEnter={e => e.currentTarget.style.color = '#db4b27'}
                                        onMouseLeave={e => e.currentTarget.style.color = '#1B5B97'}
                                    >
                                        <i className="fas fa-search" style={{marginRight: '8px'}}></i> See all results for "{searchQuery}"
                                    </div>
                                </div>
                            ) : !isLoading && (
                                <div style={{padding: '40px 20px', textAlign: 'center'}}>
                                    <i className="fas fa-search-minus" style={{fontSize: '40px', color: '#e2e8f0', marginBottom: '15px'}}></i>
                                    <div style={{color: '#64748b', fontSize: '15px', fontWeight: 600}}>No results matching "{searchQuery}"</div>
                                    <div style={{color: '#94a3b8', fontSize: '13px', marginTop: '5px'}}>Try a different keyword or check spelling</div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="header-actions">
                    <Link href="/" className="action-item">
                        <div className="action-icon"><i className="fas fa-home"></i></div>
                        <div className="action-text">
                            <span className="text-top">Home</span>
                            <span className="text-bottom">Front Page</span>
                        </div>
                    </Link>

                    <div className="action-item action-pc-builder d-none-mobile" style={{position: 'relative', cursor: 'pointer'}} tabIndex={0}
                        onMouseEnter={e => { const d = e.currentTarget.querySelector('.sys-builder-dropdown') as HTMLElement; if(d) d.style.display='block'; }}
                        onMouseLeave={e => { const d = e.currentTarget.querySelector('.sys-builder-dropdown') as HTMLElement; if(d) d.style.display='none'; }}
                        onFocus={e => { const d = e.currentTarget.querySelector('.sys-builder-dropdown') as HTMLElement; if(d) d.style.display='block'; }}
                        onBlur={e => { const d = e.currentTarget.querySelector('.sys-builder-dropdown') as HTMLElement; if(d) d.style.display='none'; }}
                    >
                        <div className="action-icon"><i className="fas fa-tools"></i></div>
                        <div className="action-text">
                            <span className="text-top">System Builder <i className="fas fa-angle-down" style={{fontSize:'10px'}}></i></span>
                            <span className="text-bottom">PC &amp; CCTV</span>
                        </div>
                        <div className="sys-builder-dropdown" style={{
                            display: 'none',
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            background: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                            minWidth: '200px',
                            zIndex: 9999,
                            overflow: 'hidden',
                            border: '1px solid #eaeaea'
                        }}>
                            <Link href="/pc-builder" style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', color:'#222', textDecoration:'none', borderBottom:'1px solid #f0f0f0', transition:'background 0.2s'}} onMouseOver={e=>(e.currentTarget.style.background='#f8f9fa')} onMouseOut={e=>(e.currentTarget.style.background='transparent')}>
                                <FaDesktop color="#1B5B97" size={18} style={{width: '22px'}} />
                                <div>
                                    <div style={{fontWeight:600, fontSize:'14px'}}>PC Builder</div>
                                    <div style={{fontSize:'12px', color:'#888'}}>Build your custom PC</div>
                                </div>
                            </Link>
                            <Link href="/cctv-builder" style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', color:'#222', textDecoration:'none', transition:'background 0.2s'}} onMouseOver={e=>(e.currentTarget.style.background='#f8f9fa')} onMouseOut={e=>(e.currentTarget.style.background='transparent')}>
                                <FaVideo color="#1B5B97" size={18} style={{width: '22px'}} />
                                <div>
                                    <div style={{fontWeight:600, fontSize:'14px'}}>CCTV Quotation</div>
                                    <div style={{fontSize:'12px', color:'#888'}}>Get a security quote</div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {userState.isLoggedIn ? (
                        <div className="action-item">
                            <div className="action-icon">
                                <i className="fas fa-user-circle" style={{color: '#1B5B97'}}></i>
                            </div>
                            <div className="action-text">
                                <span className="text-top">Hello,</span>
                                <span className="text-bottom" style={{textTransform:'capitalize', fontWeight:600}}>{userState.user?.name?.split(' ')[0] || 'User'}</span>
                            </div>
                            
                            {/* Hover Dropdown */}
                            <div className="user-dropdown">
                                 <Link href="/account?tab=dash" className="user-dropdown-item"><i className="fas fa-tachometer-alt"></i> Dashboard</Link>
                                 <Link href="/account?tab=orders" className="user-dropdown-item"><i className="fas fa-box"></i> My Orders</Link>
                                 <Link href="/account?tab=wishlist" className="user-dropdown-item"><i className="fas fa-heart"></i> Wishlist</Link>
                                 <Link href="/account?tab=pc" className="user-dropdown-item"><i className="fas fa-desktop"></i> Saved PC Builds</Link>
                                 <Link href="/account?tab=cctv" className="user-dropdown-item"><i className="fas fa-video"></i> Saved CCTV Builds</Link>
                                 <Link href="/account?tab=address" className="user-dropdown-item"><i className="fas fa-map-marker-alt"></i> Saved Addresses</Link>
                                 <Link href="/account?tab=profile" className="user-dropdown-item"><i className="fas fa-user-cog"></i> Profile Settings</Link>
                                 <a href="#" onClick={handleLogout} className="user-dropdown-item logout-link" style={{borderTop:'1px solid #eee'}}><i className="fas fa-sign-out-alt"></i> Logout</a>
                             </div>
                        </div>
                    ) : (
                        <Link href="/account" className="action-item">
                            <div className="action-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="action-text">
                                <span className="text-top">Account</span>
                                <span className="text-bottom">Login/Register</span>
                            </div>
                        </Link>
                    )}
                    <Link href="/compare" className="action-item compare-item">
                        <div className="action-icon" style={{position:'relative'}}>
                            <i className="fas fa-exchange-alt"></i>
                            {compareItems.length > 0 && <span className="cart-badge compare-badge-desktop">{compareItems.length}</span>}
                        </div>
                        <div className="action-text">
                            <span className="text-top">Compare</span>
                            <span className="text-bottom">Product</span>
                        </div>
                    </Link>
                    <a href="#" id="desktopCartIcon" onClick={(e) => { e.preventDefault(); setIsCartDrawerOpen(true); }} className="action-item cart-item">
                        <div className="action-icon" style={{position:'relative'}}>
                            <i className="fas fa-shopping-cart"></i>
                            {cartCount > 0 && <span className="cart-badge desktop-cart-badge">{cartCount}</span>}
                        </div>
                        <div className="action-text">
                            <span className="text-top">Cart</span>
                            <span className="text-bottom">Details</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

export const MegaMenu = ({ isMobileMenuOpen, onCloseMobileMenu, categories }: { isMobileMenuOpen: boolean, onCloseMobileMenu: () => void, categories: Category[] }) => {
    const [activeId, setActiveId] = useState<number | null>(null);
    const [activeSubId, setActiveSubId] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveId(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveId(null);
            setActiveSubId(null);
        }, 300); // 300ms delay
    };

    const handleSubMouseEnter = (id: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveSubId(id);
    };

    const handleSubMouseLeave = () => {
        // No delay for sub-items
    };

    // Helper to get brands for a category from COMPONENT_METADATA
    const getCategoryBrands = (catName: string) => {
        const metadata = Object.values(COMPONENT_METADATA).find(
            m => m.name.toLowerCase().includes(catName.toLowerCase()) || 
                 catName.toLowerCase().includes(m.name.toLowerCase())
        );
        return metadata?.brands || [];
    };

    return (
        <>
            <nav className={`mega-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`} style={{ display: isMobileMenuOpen ? 'block' : '' }}>
                <div className="container">
                    <ul className="mega-menu" id="megaMenu">
                        {categories.map((cat) => {
                            const brands = getCategoryBrands(cat.name);
                            const hasDropdown = brands.length > 0 || (cat.children && cat.children.length > 0);
                            const isComponents = cat.name.toLowerCase().includes('component');
                            
                            return (
                                <li 
                                    className={`menu-item ${hasDropdown ? 'has-dropdown' : ''} ${activeId === cat.id ? 'active-dropdown' : ''}`}
                                    key={cat.id}
                                    onMouseEnter={() => handleMouseEnter(cat.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <Link href={`/category/${cat.slug || cat.id}`}>{cat.name}</Link>

                                    {/* ── TWO-LEVEL DROPDOWN for Components ── */}
                                    {isComponents && cat.children && cat.children.length > 0 && (
                                        <div
                                            className="dropdown-content two-level-dropdown"
                                            style={{
                                                opacity: activeId === cat.id ? 1 : 0,
                                                visibility: activeId === cat.id ? 'visible' : 'hidden',
                                                transform: activeId === cat.id ? 'translateY(0)' : 'translateY(10px)',
                                                display: 'flex',
                                                flexDirection: 'row',
                                                padding: 0,
                                                gap: 0,
                                                minWidth: '520px',
                                            }}
                                        >
                                            <div style={{ width: '220px', borderRight: '1px solid #f0f0f0', padding: '8px 0' }}>
                                                <div style={{ padding: '10px 16px 8px', fontSize: '11px', fontWeight: 700, color: '#db4b27', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                                    PC Components
                                                </div>
                                                {cat.children.map(sub => (
                                                    <div
                                                        key={sub.id}
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                            alignItems: 'center',
                                                            padding: '9px 16px',
                                                            background: activeSubId === sub.id ? '#fff5f3' : 'transparent',
                                                            cursor: 'pointer',
                                                            transition: 'background 0.15s',
                                                            borderLeft: activeSubId === sub.id ? '3px solid #db4b27' : '3px solid transparent',
                                                        }}
                                                        onMouseEnter={() => handleSubMouseEnter(sub.id)}
                                                        onMouseLeave={handleSubMouseLeave}
                                                    >
                                                        <Link
                                                            href={`/category/${sub.slug}`}
                                                            style={{ fontSize: '13px', color: activeSubId === sub.id ? '#db4b27' : '#444', fontWeight: activeSubId === sub.id ? 600 : 400 }}
                                                        >
                                                            {sub.name}
                                                        </Link>
                                                        <i className="fas fa-chevron-right" style={{ fontSize: '10px', color: '#ccc' }}></i>
                                                    </div>
                                                ))}
                                                <div style={{ padding: '10px 16px', marginTop: '4px', borderTop: '1px solid #f0f0f0' }}>
                                                    <Link href="/category/components" style={{ fontSize: '12px', fontWeight: 600, color: '#db4b27' }}>
                                                        View All Components →
                                                    </Link>
                                                </div>
                                            </div>

                                            <div style={{ flex: 1, padding: '16px 20px', minWidth: '280px' }}>
                                                {activeSubId ? (() => {
                                                    const activeSub = cat.children!.find(s => s.id === activeSubId);
                                                    const subBrands = activeSub ? getCategoryBrands(activeSub.name) : [];
                                                    return activeSub ? (
                                                        <>
                                                            <div style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #f0f0f0' }}>
                                                                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#db4b27', textTransform: 'uppercase' }}>
                                                                    {activeSub.name} — Brands
                                                                </h4>
                                                            </div>
                                                            <div style={{ display: 'grid', gridTemplateColumns: subBrands.length > 6 ? 'repeat(2, 1fr)' : '1fr', gap: '6px' }}>
                                                                {subBrands.map(brand => (
                                                                    <Link
                                                                        key={brand}
                                                                        href={`/category/${activeSub.slug}?brand=${brand.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        style={{ fontSize: '13px', color: '#555', padding: '6px 10px', borderRadius: '6px', display: 'block', transition: 'all 0.15s' }}
                                                                        onMouseEnter={e => { e.currentTarget.style.background = '#fff5f3'; e.currentTarget.style.color = '#db4b27'; e.currentTarget.style.paddingLeft = '14px'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.paddingLeft = '10px'; }}
                                                                    >
                                                                        {brand}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                                                                <Link href={`/category/${activeSub.slug}`} style={{ fontSize: '12px', fontWeight: 600, color: '#db4b27' }}>
                                                                    View All {activeSub.name} →
                                                                </Link>
                                                            </div>
                                                        </>
                                                    ) : null;
                                                })() : (
                                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#bbb', textAlign: 'center' }}>
                                                        <i className="fas fa-mouse-pointer" style={{ fontSize: '28px', marginBottom: '10px' }}></i>
                                                        <p style={{ fontSize: '13px', margin: 0 }}>Hover a category<br/>to see brands</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* ── CUSTOM GROUP DROPDOWN (For categories like Laptop with subItems) ── */}
                                    {!isComponents && cat.children && cat.children.length > 0 && cat.children.some(c => c.subItems) && (
                                        <div className="dropdown-content" style={{
                                            opacity: activeId === cat.id ? 1 : 0,
                                            visibility: activeId === cat.id ? 'visible' : 'hidden',
                                            transform: activeId === cat.id ? 'translateY(0)' : 'translateY(10px)',
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                            gap: '30px 40px',
                                            width: '100%',
                                            padding: '30px 40px',
                                        }}>
                                            {cat.children.map(group => (
                                                <div key={group.id} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                                    <div style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
                                                        <Link href={`/category/${cat.slug || cat.id}?group=${group.slug || group.name.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none' }}>
                                                            <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#333', transition: 'color 0.2s', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.color = '#db4b27'} onMouseLeave={e => e.currentTarget.style.color = '#333'}>{group.name}</h4>
                                                        </Link>
                                                    </div>
                                                    <div style={{ 
                                                        display: 'grid', 
                                                        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
                                                        gap: '8px 15px'
                                                    }}>
                                                        {(group.subItems || []).map((item, idx) => {
                                                            if (typeof item === 'string') {
                                                                return (
                                                                    <Link
                                                                        key={item}
                                                                        href={`/category/${cat.slug || cat.id}?filter=${item.toLowerCase().replace(/\s+/g, '-')}`}
                                                                        style={{ fontSize: '13px', color: '#555', padding: '6px 12px 6px 0', borderRadius: '6px', transition: 'all 0.15s', display: 'block', textAlign: 'left', position: 'relative' }}
                                                                        onMouseEnter={e => { e.currentTarget.style.background = '#fff5f3'; e.currentTarget.style.color = '#db4b27'; e.currentTarget.style.paddingLeft = '8px'; }}
                                                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.paddingLeft = '0px'; }}
                                                                    >
                                                                        {item}
                                                                    </Link>
                                                                );
                                                            } else {
                                                                return (
                                                                    <div 
                                                                        key={item.name} 
                                                                        className="nested-dropdown-wrapper" 
                                                                        style={{ position: 'relative' }}
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="nested-btn"
                                                                            style={{ display: 'block', textAlign: 'left', position: 'relative', fontSize: '13px', color: '#555', padding: '6px 25px 6px 0', borderRadius: '6px', transition: 'all 0.15s' }}
                                                                            onClick={e => {
                                                                                e.preventDefault();
                                                                                // Close all other nested menus in this dropdown
                                                                                const allMenus = e.currentTarget.closest('.dropdown-content')?.querySelectorAll('.nested-menu') as NodeListOf<HTMLElement>;
                                                                                allMenus?.forEach(m => {
                                                                                    if (m !== e.currentTarget.nextElementSibling) {
                                                                                        m.style.opacity = '0';
                                                                                        m.style.visibility = 'hidden';
                                                                                        m.style.transform = 'translateY(5px)';
                                                                                    }
                                                                                });
                                                                                
                                                                                const menu = e.currentTarget.nextElementSibling as HTMLElement;
                                                                                if (menu) {
                                                                                    if (menu.style.visibility === 'visible') {
                                                                                        menu.style.opacity = '0';
                                                                                        menu.style.visibility = 'hidden';
                                                                                        menu.style.transform = 'translateY(5px)';
                                                                                    } else {
                                                                                        // Calculate position to prevent screen overflow
                                                                                        const rect = e.currentTarget.getBoundingClientRect();
                                                                                        if (rect.left < window.innerWidth / 2) {
                                                                                            // Button is on left half of screen -> open menu to the right
                                                                                            menu.style.right = 'auto';
                                                                                            menu.style.left = '100%';
                                                                                            menu.style.marginLeft = '5px';
                                                                                            menu.style.marginRight = '0';
                                                                                        } else {
                                                                                            // Button is on right half of screen -> open menu to the left
                                                                                            menu.style.left = 'auto';
                                                                                            menu.style.right = '100%';
                                                                                            menu.style.marginRight = '5px';
                                                                                            menu.style.marginLeft = '0';
                                                                                        }

                                                                                        menu.style.opacity = '1';
                                                                                        menu.style.visibility = 'visible';
                                                                                        menu.style.transform = 'translateY(0)';
                                                                                    }
                                                                                }
                                                                            }}
                                                                            onMouseEnter={e => { e.currentTarget.style.background = '#fff5f3'; e.currentTarget.style.color = '#db4b27'; }}
                                                                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; }}
                                                                        >
                                                                            {item.name}
                                                                            <i className="fas fa-chevron-right" style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '10px', color: '#ccc' }}></i>
                                                                        </Link>
                                                                        
                                                                        <div 
                                                                            className="nested-menu"
                                                                            style={{ 
                                                                                position: 'absolute', top: 0, right: '100%', marginRight: '5px',
                                                                                background: 'white', borderRadius: '8px', padding: '10px',
                                                                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)', border: '1px solid #eee',
                                                                                opacity: 0, visibility: 'hidden', transform: 'translateY(5px)',
                                                                                transition: 'all 0.2s', minWidth: '180px', zIndex: 100,
                                                                                display: 'flex', flexDirection: 'column', gap: '4px',
                                                                                maxHeight: '300px', overflowY: 'auto'
                                                                            }}
                                                                        >
                                                                            {item.dropdown.map(subItem => (
                                                                                <Link
                                                                                    key={subItem}
                                                                                    href={`/category/${cat.slug || cat.id}?brand=${subItem.toLowerCase().replace(/\s+/g, '-')}`}
                                                                                    style={{ fontSize: '13px', color: '#555', padding: '6px 10px', borderRadius: '4px', transition: 'all 0.15s', display: 'block', textAlign: 'center' }}
                                                                                    onMouseEnter={e => { e.currentTarget.style.background = '#fff5f3'; e.currentTarget.style.color = '#db4b27'; }}
                                                                                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; }}
                                                                                >
                                                                                    {subItem}
                                                                                </Link>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ── STANDARD BRAND DROPDOWN for other categories ── */}
                                    {!isComponents && brands.length > 0 && (!cat.children || !cat.children.some(c => c.subItems)) && (
                                        <div className="dropdown-content" style={{
                                            opacity: activeId === cat.id ? 1 : 0,
                                            visibility: activeId === cat.id ? 'visible' : 'hidden',
                                            transform: activeId === cat.id ? 'translateY(0)' : 'translateY(10px)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            minWidth: brands.length > 8 ? '800px' : '500px',
                                        }}>
                                            <div style={{ marginBottom: '14px', paddingBottom: '10px', borderBottom: '2px solid #f0f0f0' }}>
                                                <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#db4b27', textTransform: 'uppercase' }}>Shop by Brand</h4>
                                            </div>
                                            <div style={{
                                                display: 'grid',
                                                gridTemplateColumns: brands.length > 12 ? 'repeat(4, 1fr)' : brands.length > 8 ? 'repeat(3, 1fr)' : 'repeat(2, 1fr)',
                                                gap: '6px'
                                            }}>
                                                {brands.map(brand => (
                                                    <Link
                                                        key={brand}
                                                        href={`/category/${cat.slug || cat.id}?brand=${brand.toLowerCase().replace(/\s+/g, '-')}`}
                                                        style={{ fontSize: '13px', color: '#555', padding: '6px 20px 6px 0', borderRadius: '6px', transition: 'all 0.15s', textAlign: 'left', position: 'relative' }}
                                                        onMouseEnter={e => { e.currentTarget.style.background = '#fff5f3'; e.currentTarget.style.color = '#db4b27'; e.currentTarget.style.paddingLeft = '10px'; }}
                                                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#555'; e.currentTarget.style.paddingLeft = '0px'; }}
                                                    >
                                                        {brand}
                                                    </Link>
                                                ))}
                                            </div>
                                            <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
                                                <Link href={`/category/${cat.slug || cat.id}`} style={{ fontSize: '12px', fontWeight: 600, color: '#db4b27' }}>
                                                    View All {cat.name} →
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
            {isMobileMenuOpen && <div className="overlay" style={{ display: 'block' }} onClick={onCloseMobileMenu}></div>}
        </>
    );
};

export const MobileBottomNav = () => {
    const pathname = usePathname();
    const isActive = (path: string) => pathname === path ? 'active' : '';
    const [showBuilderModal, setShowBuilderModal] = useState(false);
    
    return (
        <>
            <div className="mobile-bottom-nav">
              <Link href="/" className={`nav-item ${isActive('/')}`}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
              
              <button 
                className={`nav-item builder-trigger ${pathname?.includes('builder') ? 'active' : ''}`}
                onClick={() => setShowBuilderModal(true)}
              >
                <i className="fas fa-tools"></i>
                <span>System Builder</span>
              </button>
              
              <Link href="/cart" className={`nav-item ${isActive('/cart')}`}>
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
              </Link>
              
              <Link href="/account" className={`nav-item ${isActive('/account')}`}>
                <i className="fas fa-user"></i>
                <span>Profile</span>
              </Link>
            </div>

            {showBuilderModal && (
              <div className="builder-modal-overlay" onClick={() => setShowBuilderModal(false)}>
                <div className="builder-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="builder-modal-header">
                    <h3>System Builder</h3>
                    <button onClick={() => setShowBuilderModal(false)}>✕</button>
                  </div>
                  <div className="builder-modal-options">
                    <Link href="/pc-builder" className="builder-option" onClick={() => setShowBuilderModal(false)}>
                      <div className="builder-icon">🖥️</div>
                      <div className="builder-info">
                        <h4>PC Builder</h4>
                        <p>Build your custom computer</p>
                      </div>
                      <i className="fas fa-chevron-right"></i>
                    </Link>
                    <Link href="/cctv-builder" className="builder-option" onClick={() => setShowBuilderModal(false)}>
                      <div className="builder-icon">📹</div>
                      <div className="builder-info">
                        <h4>CCTV Quotation</h4>
                        <p>Design your security system</p>
                      </div>
                      <i className="fas fa-chevron-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}
        </>
    );
};

export const MobileDrawer = ({ isOpen, onClose, categories }: { isOpen: boolean, onClose: () => void, categories: Category[] }) => {
    const [expandedCat, setExpandedCat] = useState<number | null>(null);
    const [expandedSub, setExpandedSub] = useState<number | null>(null);

    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <Link href="/" onClick={onClose}>
                        <img src="/img/main website logo.png" alt="Tech X Ocean" style={{ height: '35px' }} />
                    </Link>
                    <button className="drawer-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                
                <div className="drawer-content-scroll">
                    <div style={{ padding: '15px 20px', fontSize: '14px', fontWeight: 700, color: '#ef4a23', borderBottom: '1px solid #f0f0f0', background: '#fff' }}>
                        CATEGORY
                    </div>
                    
                    <ul className="drawer-menu-compact">
                        {categories.map(cat => (
                            <li key={cat.id} style={{ borderBottom: '1px solid #f8f8f8' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Link 
                                        href={`/category/${cat.slug || cat.id}`} 
                                        onClick={onClose}
                                        style={{ flex: 1, padding: '14px 20px', color: '#ef4a23', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}
                                    >
                                        {cat.name}
                                    </Link>
                                    {cat.children && cat.children.length > 0 && (
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setExpandedCat(expandedCat === cat.id ? null : cat.id); }}
                                            style={{ padding: '14px 20px', background: 'transparent', border: 'none', color: '#ef4a23' }}
                                        >
                                            <i className={`fas fa-chevron-${expandedCat === cat.id ? 'down' : 'right'}`} style={{ fontSize: '12px' }}></i>
                                        </button>
                                    )}
                                </div>

                                {expandedCat === cat.id && cat.children && (
                                    <ul style={{ background: '#fcfcfc', listStyle: 'none', padding: 0 }}>
                                        {cat.children.map(sub => (
                                            <li key={sub.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '15px' }}>
                                                    <Link 
                                                        href={`/category/${sub.slug}`} 
                                                        onClick={onClose}
                                                        style={{ flex: 1, padding: '12px 20px', color: '#555', fontSize: '13.5px' }}
                                                    >
                                                        {sub.name}
                                                    </Link>
                                                    {sub.subItems && sub.subItems.length > 0 && (
                                                        <button 
                                                            onClick={(e) => { e.stopPropagation(); setExpandedSub(expandedSub === sub.id ? null : sub.id); }}
                                                            style={{ padding: '12px 20px', background: 'transparent', border: 'none', color: '#ef4a23' }}
                                                        >
                                                            <i className={`fas fa-chevron-${expandedSub === sub.id ? 'down' : 'right'}`} style={{ fontSize: '11px' }}></i>
                                                        </button>
                                                    )}
                                                </div>

                                                {expandedSub === sub.id && sub.subItems && (
                                                    <ul style={{ background: '#fff', listStyle: 'none', padding: '0 0 10px 35px' }}>
                                                        {sub.subItems.map((item, idx) => {
                                                            const name = typeof item === 'string' ? item : item.name;
                                                            return (
                                                                <li key={idx}>
                                                                    <Link 
                                                                        href={`/category/${sub.slug}?q=${encodeURIComponent(name)}`} 
                                                                        onClick={onClose}
                                                                        style={{ display: 'block', padding: '8px 20px', color: '#777', fontSize: '13px' }}
                                                                    >
                                                                        {name}
                                                                    </Link>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                    
                    <div style={{ marginTop: '20px', borderTop: '4px solid #f4f4f4', paddingTop: '10px' }}>
                        <Link href="/pc-builder" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', color: '#333', fontSize: '14px' }}>
                            <i className="fas fa-tools" style={{ color: '#ef4a23' }}></i> PC Builder
                        </Link>
                        <Link href="/cctv-builder" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', color: '#333', fontSize: '14px' }}>
                            <i className="fas fa-video" style={{ color: '#ef4a23' }}></i> CCTV Builder
                        </Link>
                        <Link href="/offers" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', color: '#333', fontSize: '14px' }}>
                            <i className="fas fa-tags" style={{ color: '#ef4a23' }}></i> Offers
                        </Link>
                    </div>
                </div>

                <div className="drawer-footer" style={{ borderTop: '1px solid #eee' }}>
                    <i className="fas fa-phone-alt"></i> Call +8801332437029 (09AM-08PM)
                </div>
            </div>
        </>
    );
};

export default function Navigation({ cartCount, compareCount, categories }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <MainHeader cartCount={cartCount} compareCount={compareCount} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <MegaMenu isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} categories={categories} />
            <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} categories={categories} />
            <MobileBottomNav />
        </>
    );
}
