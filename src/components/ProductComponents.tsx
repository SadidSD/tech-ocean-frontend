'use client';

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { CompareContext, RecentContext } from '@/components/ClientApplication';

export const StarRating = ({ rating = 0, count = 0 }: { rating?: number, count?: number }) => {
    const normalizedRating = Math.round(rating * 2) / 2;
    return (
        <div className="star-rating">
            <div className="stars">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    if (normalizedRating >= starValue) {
                        return <i key={index} className="fas fa-star filled"></i>;
                    } else if (normalizedRating === starValue - 0.5) {
                        return <i key={index} className="fas fa-star-half-alt filled"></i>;
                    } else {
                        return <i key={index} className="far fa-star"></i>;
                    }
                })}
            </div>
            {count > 0 && <span className="review-count">({count})</span>}
        </div>
    );
};

const fmtBDT = (n: number) => `৳${Math.round(n).toLocaleString('en-IN')}`;

export const ProductCard = ({ product, addToCart }: { product: any, addToCart?: (p:any)=>void }) => {
    // Normalise API shape → display shape
    const imgUrl = product.imgUrl ?? product.images?.[0] ?? null;
    const price   = typeof product.price === 'number' ? fmtBDT(product.price) : product.price;
    const oldPrice = product.oldPrice ?? (product.salePrice ? fmtBDT(product.salePrice) : null);
    const status  = product.status ?? (product.stock > 0 ? 'In Stock' : 'Out of Stock');

    const { addToRecentlyViewed } = useContext(RecentContext);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (addToCart) {
            addToCart(product);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        }
    };

    const idNum = parseInt(product.id.toString().replace(/\D/g,'')) || 0;
    
    let badge = null;
    if (product.oldPrice && idNum % 3 === 0) {
        badge = <div className="dyn-badge flash-sale">⚡ FLASH SALE<div className="timer">Ends 0{idNum%10}:45:00</div></div>;
    } else if (idNum % 7 === 0) {
        badge = <div className="dyn-badge low-stock">⚠️ Only {idNum%4 + 1} left!</div>;
    } else if (idNum % 5 === 0) {
        badge = <div className="dyn-badge hot-item">🔥 {12 + idNum%10} sold today</div>;
    } else if (idNum % 11 === 0) {
        badge = <div className="dyn-badge best-seller">🏆 BEST SELLER</div>;
    } else if (idNum % 4 === 0) {
        badge = <div className="dyn-badge new-arrival">✨ NEW</div>;
    }

    return (
        <div className="product-card" style={{ position: 'relative' }}>
            <Link 
                href={`/product/${product.id}`} 
                className="product-card-link" 
                style={{ textDecoration: 'none', color: 'inherit', display: 'block', minHeight: '44px', cursor: 'pointer', zIndex: 1, position: 'relative' }}
                onClick={() => addToRecentlyViewed(product)}
            >
                <div className={`product-status ${status.includes('Stock') ? 'instock' : 'out'}`} style={{zIndex: 3}}>
                    {status}
                </div>

                {badge}

                <div className="product-img-wrap">
                    {imgUrl ? (
                        <img src={imgUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <i className={`fas ${product.imgIcon || 'fa-box'}`}></i>
                    )}
                    
                    {/* Modern Action Overlay */}
                    <div className="product-card-actions">
                        <button 
                            className="modern-action-btn big-btn" 
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); const event = new CustomEvent('openQuickView', { detail: product }); window.dispatchEvent(event); }}
                        >
                            <i className="fas fa-eye" style={{ display: 'block', color: '#333' }}></i>
                            <span>Quick Look</span>
                        </button>
                        <CompareBigButton product={product} />
                    </div>
                </div>
                <div className="product-title">{product.title}</div>
                <StarRating rating={product.rating} count={product.reviewCount || 15} />
                <ul className="product-features">
                    {product.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
                <div className="product-price-box">
                    <span className="current-price">{price}</span>
                    {oldPrice && <span className="old-price">{oldPrice}</span>}
                </div>
            </Link>
            
            <div className="desktop-add-to-cart" style={{ padding: '0 16px 16px', position: 'relative', zIndex: 2 }}>
                <button 
                    onClick={handleAddToCart} 
                    style={{ 
                        width: '100%', padding: '8px', 
                        background: isAdded ? '#10b981' : '#fff5f2', 
                        color: isAdded ? 'white' : '#db4b27', 
                        border: '1px solid ' + (isAdded ? '#10b981' : '#fca5a5'), 
                        borderRadius: '4px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', gap: '6px', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                    }}
                    onMouseOver={(e) => { if(!isAdded) { e.currentTarget.style.background = '#db4b27'; e.currentTarget.style.color = 'white'; } }}
                    onMouseOut={(e) => { if(!isAdded) { e.currentTarget.style.background = '#fff5f2'; e.currentTarget.style.color = '#db4b27'; } }}
                >
                    <i className={isAdded ? "fas fa-check" : "fas fa-cart-plus"}></i> 
                    {isAdded ? 'Added!' : 'Add to Cart'}
                </button>
            </div>

        </div>
    );
};

const CompareBigButton = ({ product }: { product: any }) => {
    const { isInCompare, addToCompare, removeFromCompare } = useContext(CompareContext);
    const selected = isInCompare(product.id);

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (selected) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
    };

    return (
        <button 
            className={`modern-action-btn big-btn ${selected ? 'active' : ''}`} 
            onClick={handleToggle}
        >
            <i className={selected ? "fas fa-check" : "fas fa-exchange-alt"} style={{ display: 'block', color: '#333' }}></i>
            <span>{selected ? 'Added' : 'Compare'}</span>
        </button>
    );
};

export const RecentlyViewedSection = () => {
    const { recentlyViewed } = useContext(RecentContext);
    
    if (recentlyViewed.length === 0) return null;

    return (
        <div className="recently-viewed-section" style={{ marginTop: '50px', paddingTop: '40px', borderTop: '1px solid #f1f5f9' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                    <div>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', marginBottom: '5px' }}>Recently Viewed</h2>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>Pick up where you left off</p>
                    </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                    {recentlyViewed.map(product => (
                        <div key={product.id} style={{ background: '#fff', borderRadius: '12px', padding: '15px', border: '1px solid #f1f5f9', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                            <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                                <div style={{ height: '120px', background: '#f8fafc', borderRadius: '8px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                                    <img src={product.imgUrl || '/images/placeholder.png'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} alt={product.title} />
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: '#1e293b', marginBottom: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '36px', lineHeight: 1.4 }}>{product.title}</div>
                                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ff6b00' }}>{typeof product.price === 'number' ? `৳${product.price.toLocaleString('en-IN')}` : product.price}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
