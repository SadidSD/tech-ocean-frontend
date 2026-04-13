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

export const ProductCard = ({ product, addToCart }: { product: any, addToCart?: (p: any, q: number, f: boolean) => void }) => {
    return (
        <div className="product-card">
            <div className={`product-status ${product.status === 'In Stock' || product.status.includes('Stock') ? 'instock' : 'out'}`}>
                {product.status}
            </div>
            <div className="product-img-wrap">
                <Link href={`/product/${product.id}`}>
                    {product.imgUrl ? (
                        <img src={product.imgUrl} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    ) : (
                        <i className={`fas ${product.imgIcon || 'fa-box'}`}></i>
                    )}
                </Link>
                <div className="actions">
                    <button className="btn-icon" title="Add to Cart" onClick={(e) => { e.preventDefault(); if(addToCart) addToCart(product, 1, false); }}>
                        <i className="fas fa-shopping-cart"></i>
                    </button>

                </div>
            </div>
            <Link href={`/product/${product.id}`} className="product-title">{product.title}</Link>
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
    );
};
