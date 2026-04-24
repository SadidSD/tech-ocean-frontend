'use client';

import React, { useState, useContext, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
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
                
                <button className="mobile-cart-icon" onClick={() => setIsCartDrawerOpen(true)}>
                  <i className="fas fa-shopping-cart"></i>
                  <span className="cart-badge">{cartCount}</span>
                </button>
              </div>
              
              <div className="mobile-search-row">
                <div className="search-wrapper">
                  <i className="fas fa-search search-icon-left"></i>
                  <input 
                    type="text" 
                    placeholder="Search for Products..." 
                    className="mobile-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSearch(true)}
                  />
                </div>
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
    const [activeId, setActiveId] = useState<number | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (id: number) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveId(id);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setActiveId(null);
        }, 300); // 300ms delay
    };

    return (
        <>
            <nav className={`mega-menu-wrapper ${isMobileMenuOpen ? 'open' : ''}`} style={{ display: isMobileMenuOpen ? 'block' : '' }}>
                <div className="container">
                    <ul className="mega-menu" id="megaMenu">
                        {categories.map((cat) => (
                            <li 
                                className={`menu-item ${cat.children && cat.children.length > 0 ? 'has-dropdown' : ''} ${activeId === cat.id ? 'active-dropdown' : ''}`} 
                                key={cat.id}
                                onMouseEnter={() => handleMouseEnter(cat.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link href={`/category/${cat.id}`}>{cat.name}</Link>
                                {cat.children && cat.children.length > 0 && (
                                    <div className="dropdown-content" style={{ 
                                        opacity: activeId === cat.id ? 1 : 0,
                                        visibility: activeId === cat.id ? 'visible' : 'hidden',
                                        transform: activeId === cat.id ? 'translateY(0)' : 'translateY(10px)',
                                        display: 'flex' 
                                    }}>
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

export const MobileDrawer = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    return (
        <>
            <div className={`drawer-overlay ${isOpen ? 'visible' : ''}`} onClick={onClose}></div>
            <div className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <Link href="/">
                        <img src="/img/main website logo.png" alt="Tech X Ocean" style={{ height: '35px' }} />
                    </Link>
                    <button className="drawer-close" onClick={onClose}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                <ul className="drawer-menu">
                    <li><Link href="/account"><i className="fas fa-user-circle"></i> Login / Register</Link></li>
                    <li><Link href="/"><i className="fas fa-home"></i> Home</Link></li>
                    <li><Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Link></li>
                    <li><Link href="/pc-builder"><i className="fas fa-tools"></i> PC Builder</Link></li>
                    <li><Link href="/cctv-builder"><i className="fas fa-video"></i> CCTV Builder</Link></li>
                    <li><Link href="/categories"><i className="fas fa-box"></i> Products</Link></li>
                    <li><Link href="/offers"><i className="fas fa-tags"></i> Offers</Link></li>
                    <li><Link href="/contact"><i className="fas fa-phone"></i> Contact Us</Link></li>
                </ul>
                <div className="drawer-footer">
                    <i className="fas fa-phone-alt"></i> Call 16793 (09AM-08PM)
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
            <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
            <MobileBottomNav />
        </>
    );
}
