'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthContext, CartContext } from './ClientApplication';
import { FaDesktop, FaVideo } from 'react-icons/fa';
import { MOCK_PRODUCTS } from '@/data/products';

interface Category {
  id: number;
  name: string;
  icon?: string;
  slug: string;
  children?: { id: number; name: string; slug: string }[];
}

interface NavigationProps {
  cartCount: number;
  compareCount: number;
  categories: Category[];
}

export const MainHeader = ({ cartCount, compareCount, onMenuToggle }: { cartCount: number, compareCount: number, onMenuToggle: () => void }) => {
    const { userState, setUserState, showToast } = useContext(AuthContext);
    const { setIsCartDrawerOpen } = useContext(CartContext);
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSearch(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredProducts = MOCK_PRODUCTS.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4);

    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        localStorage.removeItem('user');
        setUserState({ isLoggedIn: false, user: null, token: null });
        showToast('Logged out successfully', 'success');
        router.push('/');
    };

    return (
        <header className="main-header" id="mainHeader">
            <div className="container main-header-inner">
                <button className="mobile-menu-toggler" onClick={onMenuToggle}>
                    <i className="fas fa-bars"></i>
                </button>
                <div style={{marginRight: '20px'}}>
                    <Link href="/" className="site-logo">
                        <picture>
                            <source media="(max-width: 768px)" srcSet="/images/logo/logo-icon.png" />
                            <img 
                                src="/images/logo/logo-full.png" 
                                alt="Tech X Ocean" 
                                onError={(e: any) => {
                                    e.target.onerror = null;
                                    e.target.src = "/images/logo/fallback-logo.png";
                                    e.target.outerHTML = '<span class="logo-text-fallback">Tech X Ocean</span>';
                                }}
                            />
                        </picture>
                    </Link>
                </div>
                <div className="search-wrap" style={{position: 'relative'}} ref={searchRef}>
                    <input type="text" className="search-input" placeholder="Search for Products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onFocus={() => setShowSearch(true)} />
                    <button className="search-btn"><i className="fas fa-search"></i></button>

                    {showSearch && searchQuery.length > 0 && (
                        <div className="search-autocomplete-dropdown" style={{position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 2000, marginTop: '5px', overflow: 'hidden', border: '1px solid #eee'}}>
                            {filteredProducts.length > 0 ? (
                                <>
                                    {filteredProducts.map(p => (
                                        <Link key={p.id} href={`/product/${p.id}`} onClick={() => setShowSearch(false)} style={{display: 'flex', alignItems: 'center', padding: '10px 15px', borderBottom: '1px solid #f5f5f5', textDecoration: 'none', color: '#333'}}>
                                            <div style={{width: '40px', height: '40px', background: '#f8f9fa', borderRadius: '4px', overflow: 'hidden', marginRight: '15px'}}>
                                                <img src={p.imgUrl || '/images/placeholder.png'} alt={p.title} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
                                            </div>
                                            <div style={{flex: 1}}>
                                                <div style={{fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px'}}>{p.title}</div>
                                                <div style={{fontSize: '11px', color: '#666'}}>
                                                    {p.features?.[0]?.substring(0,30)}...
                                                </div>
                                            </div>
                                            <div style={{fontSize: '14px', fontWeight: 800, color: '#ff6b00'}}>{p.price}</div>
                                        </Link>
                                    ))}
                                    <div style={{padding: '12px', textAlign: 'center', background: '#f8f9fa', fontSize: '12px', fontWeight: 600, color: '#1B5B97', cursor: 'pointer'}}>
                                        <i className="fas fa-search"></i> See all {searchQuery} results
                                    </div>
                                </>
                            ) : (
                                <div style={{padding: '20px', textAlign: 'center', color: '#888', fontSize: '13px'}}>
                                    No products found matching "{searchQuery}"
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
                                <Link href="/account" className="user-dropdown-item"><i className="fas fa-tachometer-alt" style={{width:'18px',textAlign:'center'}}></i> Dashboard</Link>
                                <Link href="/account" className="user-dropdown-item"><i className="fas fa-box" style={{width:'18px',textAlign:'center'}}></i> My Orders</Link>
                                <Link href="/account" className="user-dropdown-item"><i className="fas fa-heart" style={{width:'18px',textAlign:'center'}}></i> Wishlist</Link>
                                <a href="#" onClick={handleLogout} className="user-dropdown-item" style={{borderTop:'1px solid #eee'}}><i className="fas fa-sign-out-alt" style={{width:'18px',textAlign:'center'}}></i> Logout</a>
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
                    <a href="#" onClick={(e) => { e.preventDefault(); setIsCartDrawerOpen(true); }} className="action-item cart-item">
                        <div className="action-icon">
                            <i className="fas fa-shopping-bag"></i>
                            <span className="badge cart-badge">{cartCount}</span>
                        </div>
                        <div className="action-text d-none-mobile">
                            <span className="text-top">Cart</span>
                            <span className="text-bottom">0৳</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

export const MegaMenu = ({ isMobileMenuOpen, onCloseMobileMenu, categories }: { isMobileMenuOpen: boolean, onCloseMobileMenu: () => void, categories: Category[] }) => {
    return (
        <>
            <nav className={`mega-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`} style={{ display: isMobileMenuOpen ? 'block' : '' }}>
                <div className="container">
                    <ul className="mega-menu" id="megaMenu">
                        {categories.map((cat) => (
                            <li className={`menu-item ${cat.children && cat.children.length > 0 ? 'has-dropdown' : ''}`} key={cat.id}>
                                <Link href={`/category/${cat.id}`}>{cat.name}</Link>
                                {cat.children && cat.children.length > 0 && (
                                    <div className="dropdown-content">
                                        <div className="column">
                                            <Link href={`/category/${cat.id}`} className="dropdown-heading">All {cat.name}</Link>
                                            {cat.children.map(subCat => (
                                                <Link href={`/category/${subCat.id}`} key={subCat.id}>{subCat.name}</Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
            {isMobileMenuOpen && <div className="overlay" style={{ display: 'block' }} onClick={onCloseMobileMenu}></div>}
        </>
    );
};

export default function Navigation({ cartCount, compareCount, categories }: NavigationProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <>
            <MainHeader cartCount={cartCount} compareCount={compareCount} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <MegaMenu isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} categories={categories} />
        </>
    );
}
