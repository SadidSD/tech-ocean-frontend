'use client';

import React, { useState, useContext, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';
import { ProductCard } from '@/components/ProductComponents';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';

export default function CategoryPage() {
    const params = useParams();
    const { addToCart } = useContext(CartContext);

    // Advanced Filter States
    const [priceRange, setPriceRange] = useState(100000);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    
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

    const rawProducts = MOCK_PRODUCTS.filter(p => p.category === category.name);
    
    // Dynamically map unique brands based on first word of Title if brand undefined
    const uniqueBrands = useMemo(() => Array.from(new Set(rawProducts.map(p => p.title.split(' ')[0]))), [rawProducts]);

    const filteredProducts = rawProducts.filter(p => {
        const rawPrice = parseFloat(String(p.price).replace(/,/g,'').replace('৳',''));
        if (rawPrice > priceRange) return false;
        
        const brand = p.title.split(' ')[0];
        if (selectedBrands.length > 0 && !selectedBrands.includes(brand)) return false;
        
        if (inStockOnly && !(p.status === 'In Stock' || p.status.includes('Stock'))) return false;

        return true;
    });

    const toggleBrand = (b: string) => {
        if (selectedBrands.includes(b)) setSelectedBrands(selectedBrands.filter(x => x !== b));
        else setSelectedBrands([...selectedBrands, b]);
    };

    return (
        <div className="container mt-4" style={{minHeight: '60vh'}}>
            <div className="page-header" style={{marginBottom: '20px'}}>
                <div className="breadcrumb"><Link href="/">Home</Link> / {category.name}</div>
                <h1 className="page-title">{category.name}</h1>
                <p>Browse the best products in {category.name}</p>
            </div>
            
            <div className="category-layout" style={{display: 'flex', gap: '20px'}}>
                <aside className="category-sidebar d-none-mobile" style={{width: '250px', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', height: 'fit-content'}}>
                    <h3 style={{fontSize: '16px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px'}}>Filters</h3>
                    
                    <div style={{marginBottom: '25px'}}>
                        <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Price Range</strong>
                        <input type="range" min="0" max="100000" step="1000" value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} style={{width: '100%', accentColor: '#ff6b00'}} />
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px'}}>
                            <span>৳0</span>
                            <span>৳{priceRange.toLocaleString()}</span>
                        </div>
                    </div>

                    <div style={{marginBottom: '25px'}}>
                        <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Brands</strong>
                        {uniqueBrands.slice(0, 6).map((brand, i) => (
                            <div key={i} style={{marginBottom: '8px', fontSize: '13px'}}>
                                <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                    <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} /> {brand}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div>
                        <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Availability</strong>
                        <div style={{fontSize: '13px'}}><label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}><input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)}/> In Stock Only</label></div>
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
                    
                    <div className="products-grid">
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
