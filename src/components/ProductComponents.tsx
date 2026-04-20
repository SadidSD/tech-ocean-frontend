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

export const ProductCard = ({ product, addToCart }: { product: any, addToCart?: (p:any)=>void }) => {
    // Generate deterministic mock badge tags based on ID
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
                <div className={`product-status ${product.status === 'In Stock' || product.status.includes('Stock') ? 'instock' : 'out'}`} style={{zIndex: 3}}>
                    {product.status}
                </div>
                
                {badge}

                <div className="product-img-wrap">
                    {product.imgUrl ? (
                        <img src={product.imgUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
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
                    <span className="price">
                        {product.price}
                        {product.oldPrice && <s>{product.oldPrice}</s>}
                    </span>
                </div>
            </Link>
            
            <button className="quick-spec-btn" onClick={(e) => { e.preventDefault(); const event = new CustomEvent('openQuickView', { detail: product }); window.dispatchEvent(event); }}>
                <i className="fas fa-eye"></i> Quick Look
            </button>
        </div>
    );
};
