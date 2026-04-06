'use client';

import React, { useContext } from 'react';
import { HeroBanner, FeaturesBar, CategoryList, LatestBlogs } from '@/components/HomeComponents';
import { ProductCard } from '@/components/ProductComponents';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_PRODUCTS } from '@/data/products';
import { CartContext } from '@/components/ClientApplication';

export default function Home() {
    const { addToCart } = useContext(CartContext);

    return (
        <>
            <HeroBanner />
            <FeaturesBar />
            <CategoryList categories={MOCK_CATEGORIES} />
            
            <section className="products-section container">
                <div className="section-header">
                    <h2>Featured Products</h2>
                    <p>Check & Get Your Desired Product!</p>
                </div>
                <div className="products-grid">
                    {MOCK_PRODUCTS.map(prod => (
                        <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
                    ))}
                </div>
            </section>

            <LatestBlogs blogs={[]} />
        </>
    );
}
