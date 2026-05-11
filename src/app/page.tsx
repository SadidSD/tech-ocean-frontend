'use client';

import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import { HeroBanner, DesktopFeaturesBar, MobileContactSection, CategoryList, LatestBlogs } from '@/components/HomeComponents';
import { ProductCard } from '@/components/ProductComponents';
import { MOCK_CATEGORIES } from '@/data/categories';
import { CartContext } from '@/components/ClientApplication';

import { MOCK_PRODUCTS } from '@/data/mockProducts';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default function Home() {
    const { addToCart } = useContext(CartContext);
    const [banners, setBanners] = useState<any>(null);
    const [products, setProducts] = useState<any[]>(MOCK_PRODUCTS); // Default to mock products

    useEffect(() => {
        fetch(`${API}/settings/banners`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { if (data) setBanners(data); })
            .catch(() => {});

        fetch(`${API}/products?limit=20&sort=newest`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { 
                if (data?.products && data.products.length > 0) {
                    setProducts(data.products); 
                }
            })
            .catch(() => {
                // Keep default MOCK_PRODUCTS
            });
    }, []);

    return (
        <div className="home-layout-wrapper">
            <HeroBanner banners={banners} />
            <DesktopFeaturesBar />
            <CategoryList categories={MOCK_CATEGORIES} />

            {products.length > 0 && (
                <div className="mobile-products-section">
                    <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center', background: 'white'}}>
                        <h3 className="section-title" style={{margin: 0}}>Featured Products</h3>
                        <a href="/search" className="view-all" style={{color: '#1B5B97', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>View All →</a>
                    </div>
                    <div className="products-grid" style={{ padding: '0 16px 24px' }}>
                        {products.slice(0, 6).map((product: any) => (
                            <Link href={`/product/${product.id}`} className="mobile-product-card" key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <img src={product.images?.[0] || '/img/placeholder.png'} alt={product.title} />
                                <h4 className="product-title">{product.title}</h4>
                                <div className="product-price">
                                    <span className="current">৳{Math.round(product.price).toLocaleString('en-IN')}</span>
                                    {product.salePrice && <span className="old">৳{Math.round(product.salePrice).toLocaleString('en-IN')}</span>}
                                </div>
                                <button className="add-to-cart" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {products.length > 0 && (
                <section className="products-section container desktop-only">
                    <BrandSectionTitle
                        title="FEATURED PRODUCTS"
                        subtitle="Check & get your desired product"
                    />
                    <div className="products-grid">
                        {products.map(prod => (
                            <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
                        ))}
                    </div>
                </section>
            )}

            <LatestBlogs blogs={[]} />
            <MobileContactSection />
        </div>
    );
}
