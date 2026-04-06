'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';

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

export const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-inner">
                <div className="top-bar-left">
                    <a href="#"><i className="LocationIcon fas fa-map-marker-alt"></i> Find a Store</a>
                    <a href="#"><i className="fas fa-phone-alt"></i> 16793</a>
                </div>
                <div className="top-bar-right">
                    <a href="#">Account <i className="fas fa-angle-down"></i></a>
                    <a href="#">Contact Us</a>
                    <div className="action-dropdown-wrapper right-align">
                        <a href="#">System Builder <i className="fas fa-angle-down" style={{marginLeft: '2px'}}></i></a>
                        <div className="system-builder-dropdown" style={{padding: '10px 0'}}>
                            <Link href="/pc-builder">
                                <i className="fas fa-desktop" style={{fontSize: '18px', color: '#333'}}></i> PC Builder
                            </Link>
                            <Link href="/cctv-builder">
                                <i className="fas fa-video" style={{fontSize: '18px', color: '#1B5B97'}}></i> CCTV Quotation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const MainHeader = ({ cartCount, compareCount, onMenuToggle }: { cartCount: number, compareCount: number, onMenuToggle: () => void }) => {
    return (
        <header className="main-header" id="mainHeader">
            <div className="container main-header-inner">
                <button className="mobile-menu-toggler" onClick={onMenuToggle}>
                    <i className="fas fa-bars"></i>
                </button>
                <div style={{marginRight: '20px'}}>
                    <Link href="/" className="logo">
                        <div className="logo-icon">
                            <i className="fas fa-water" style={{color: '#fff', fontSize: '18px'}}></i>
                        </div>
                        <span className="logo-text">Tech X Ocean</span>
                    </Link>
                </div>
                <div className="search-wrap">
                    <input type="text" className="search-input" placeholder="Search for Products..." />
                    <button className="search-btn"><i className="fas fa-search"></i></button>
                </div>
                <div className="header-actions">
                    <Link href="/" className="action-item">
                        <div className="action-icon"><i className="fas fa-home"></i></div>
                        <div className="action-text">
                            <span className="text-top">Home</span>
                            <span className="text-bottom">Front Page</span>
                        </div>
                    </Link>
                    <a href="#" className="action-item">
                        <div className="action-icon"><i className="fas fa-gift"></i></div>
                        <div className="action-text">
                            <span className="text-top">Offers</span>
                            <span className="text-bottom">Latest Promos</span>
                        </div>
                    </a>
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
                                <i className="fas fa-desktop" style={{color:'#1B5B97', fontSize:'18px', width:'22px'}}></i>
                                <div>
                                    <div style={{fontWeight:600, fontSize:'14px'}}>PC Builder</div>
                                    <div style={{fontSize:'12px', color:'#888'}}>Build your custom PC</div>
                                </div>
                            </Link>
                            <Link href="/cctv-builder" style={{display:'flex', alignItems:'center', gap:'12px', padding:'14px 18px', color:'#222', textDecoration:'none', transition:'background 0.2s'}} onMouseOver={e=>(e.currentTarget.style.background='#f8f9fa')} onMouseOut={e=>(e.currentTarget.style.background='transparent')}>
                                <i className="fas fa-video" style={{color:'#1B5B97', fontSize:'18px', width:'22px'}}></i>
                                <div>
                                    <div style={{fontWeight:600, fontSize:'14px'}}>CCTV Quotation</div>
                                    <div style={{fontSize:'12px', color:'#888'}}>Get a security quote</div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <a href="/compare" className="action-item d-none-mobile">
                        <div className="action-icon">
                            <i className="fas fa-sync-alt"></i>
                            {compareCount > 0 && <span className="badge" style={{background:'#1B5B97'}}>{compareCount}</span>}
                        </div>
                        <div className="action-text">
                            <span className="text-top">Compare</span>
                            <span className="text-bottom">Product</span>
                        </div>
                    </a>
                    <a href="#" className="action-item">
                        <div className="action-icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="action-text">
                            <span className="text-top">Account</span>
                            <span className="text-bottom">Login/Register</span>
                        </div>
                    </a>
                    <Link href="/cart" className="action-item cart-item">
                        <div className="action-icon">
                            <i className="fas fa-shopping-bag"></i>
                            <span className="badge cart-badge">{cartCount}</span>
                        </div>
                        <div className="action-text d-none-mobile">
                            <span className="text-top">Cart</span>
                            <span className="text-bottom">0৳</span>
                        </div>
                    </Link>
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
            <TopBar />
            <MainHeader cartCount={cartCount} compareCount={compareCount} onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
            <MegaMenu isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} categories={categories} />
        </>
    );
}
