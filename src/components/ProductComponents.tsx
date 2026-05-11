'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { CompareContext } from '@/components/ClientApplication';

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
            <Link href={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block', minHeight: '44px', cursor: 'pointer', zIndex: 1, position: 'relative' }}>
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
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (addToCart) addToCart(product); }} 
                    style={{ 
                        width: '100%', padding: '8px', background: '#fff5f2', color: '#db4b27', border: '1px solid #fca5a5', 
                        borderRadius: '4px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', 
                        justifyContent: 'center', gap: '6px', transition: 'all 0.2s' 
                    }}
                    onMouseOver={(e) => { e.currentTarget.style.background = '#db4b27'; e.currentTarget.style.color = 'white'; }}
                    onMouseOut={(e) => { e.currentTarget.style.background = '#fff5f2'; e.currentTarget.style.color = '#db4b27'; }}
                >
                    <i className="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
            <div className="product-actions-bar" style={{ display: 'flex', gap: '10px', padding: '0 16px 16px', marginTop: '-8px' }}>
                <button 
                    className="quick-spec-btn-inline" 
                    onClick={(e) => { e.preventDefault(); const event = new CustomEvent('openQuickView', { detail: product }); window.dispatchEvent(event); }}
                    style={{ flex: 1, padding: '8px', background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}
                >
                    <i className="fas fa-eye"></i> Quick Look
                </button>
                <CompareToggle product={product} />
            </div>
        </div>
    );
};

const CompareToggle = ({ product }: { product: any }) => {
    const { isInCompare, addToCompare, removeFromCompare } = useContext(CompareContext);
    const selected = isInCompare(product.id);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            addToCompare(product);
        } else {
            removeFromCompare(product.id);
        }
    };

    return (
        <label className={`compare-checkbox-wrap ${selected ? 'selected' : ''}`} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', padding: '8px', border: '1px solid #e0e0e0', borderRadius: '6px', background: selected ? '#fff5f2' : '#f8f9fa', color: selected ? '#db4b27' : '#555', transition: 'all 0.2s' }}>
            <input 
                type="checkbox" 
                checked={selected}
                onChange={handleToggle}
                style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: '#db4b27' }}
            />
            <span>Compare</span>
        </label>
    );
};
