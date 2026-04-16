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

export const ProductCard = ({ product }: { product: any }) => {
    return (
        <Link href={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block', minHeight: '44px', cursor: 'pointer' }}>
            <div className="product-card">
                <div className={`product-status ${product.status === 'In Stock' || product.status.includes('Stock') ? 'instock' : 'out'}`}>
                    {product.status}
                </div>
                <div className="product-img-wrap">
                    {product.imgUrl ? (
                        <img src={product.imgUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <i className={`fas ${product.imgIcon || 'fa-box'}`}></i>
                    )}
                </div>
                <div className="product-title">{product.title}</div>
                <StarRating rating={product.rating} count={product.reviewCount} />
                <ul className="product-features">
                    {product.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
                </ul>
                <div className="product-price-box">
                    <span className="price">
                        {product.price}
                        {product.oldPrice && <s>{product.oldPrice}</s>}
                    </span>
                </div>
            </div>
        </Link>
    );
};
