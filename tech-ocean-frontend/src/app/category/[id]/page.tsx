'use client';

import React, { useContext } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ProductComponents';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';

export default function CategoryPage() {
    const params = useParams();
    const { addToCart } = useContext(CartContext);
    
    const findCategory = (cats: any[], id: string): any => {
        for (let c of cats) {
            if (String(c.id) === String(id)) return c;
            if (c.children) {
                const sub = findCategory(c.children, id);
                if (sub) return sub;
            }
        }
        return null;
    };

    const category = findCategory(MOCK_CATEGORIES, params.id as string);
    
    if (!category) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><h2>Category Not Found</h2></div>;
    }

    const filteredProducts = MOCK_PRODUCTS.filter(p => p.category === category.name);

    return (
        <div className="container mt-4" style={{minHeight: '60vh'}}>
            <div className="page-header" style={{marginBottom: '20px'}}>
                <div className="breadcrumb"><Link href="/">Home</Link> / {category.name}</div>
                <h1 className="page-title">{category.name}</h1>
                <p>Browse the best products in {category.name}</p>
            </div>
            
            <div className="category-layout" style={{display: 'flex', gap: '20px'}}>
                <aside className="category-sidebar d-none-mobile" style={{width: '250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content'}}>
                    <h3>Filters</h3>
                    <div style={{marginTop: '15px'}}>
                        <strong>Availability</strong>
                        <div style={{marginTop: '10px'}}><label><input type="checkbox"/> In Stock</label></div>
                        <div style={{marginTop: '5px'}}><label><input type="checkbox"/> Pre Order</label></div>
                    </div>
                </aside>
                
                <div className="category-main" style={{flex: 1}}>
                    <div style={{background: '#fff', padding:'15px', borderRadius:'8px', marginBottom:'20px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span>Showing {filteredProducts.length} products</span>
                        <select className="form-control" style={{width:'auto', margin:0}}>
                            <option>Default Sorting</option>
                            <option>Price (Low &gt; High)</option>
                            <option>Price (High &gt; Low)</option>
                        </select>
                    </div>
                    
                    <div className="products-grid" style={{gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))'}}>
                        {filteredProducts.length === 0 ? (
                            <div style={{padding: '50px', textAlign: 'center', gridColumn: '1 / -1'}}>
                                <i className="fas fa-box-open" style={{fontSize: '40px', color: '#ccc', marginBottom:'15px'}}></i>
                                <h3>No products found</h3>
                                <p>We're adding products to this category soon!</p>
                            </div>
                        ) : (
                            filteredProducts.map(prod => (
                                <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
