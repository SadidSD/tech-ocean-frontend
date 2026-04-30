'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import { HeroBanner, FeaturesBar, CategoryList, LatestBlogs } from '@/components/HomeComponents';
import { ProductCard } from '@/components/ProductComponents';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_PRODUCTS } from '@/data/products';
import { CartContext } from '@/components/ClientApplication';

export default function Home() {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="home-layout-wrapper">
            <HeroBanner />
            <FeaturesBar />
            <CategoryList categories={MOCK_CATEGORIES} />
            
            <div className="mobile-products-section">
              <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', padding: '16px', alignItems: 'center', background: 'white'}}>
                <h3 className="section-title" style={{margin: 0}}>Featured Products</h3>
                <a href="#" className="view-all" style={{color: '#1B5B97', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>View All →</a>
              </div>
              
              <div className="products-grid" style={{ padding: '0 16px 24px' }}>
                {MOCK_PRODUCTS.slice(0, 6).map((product: any) => (
                  <Link href={`/product/${product.id}`} className="mobile-product-card" key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {product.badge && <div className="product-badge flash-sale" style={{background: product.badgeColor || '#db4b27'}}>{product.badge}</div>}
                    <img src={product.imgUrl} alt={product.title} />
                    <h4 className="product-title">{product.title}</h4>
                    <div className="product-price">
                      <span className="current">{product.price}</span>
                      {product.oldPrice && <span className="old">{product.oldPrice}</span>}
                    </div>
                    <button className="add-to-cart" onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}>Add to Cart</button>
                  </Link>
                ))}
              </div>
            </div>

            <section className="products-section container desktop-only">
                <BrandSectionTitle 
                    title="FEATURED PRODUCTS" 
                    subtitle="Check & get your desired product"
                />
                <div className="products-grid">
                    {MOCK_PRODUCTS.map(prod => (
                        <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
                    ))}
                </div>
            </section>

            <LatestBlogs blogs={[]} />
        </div>
    );
}
