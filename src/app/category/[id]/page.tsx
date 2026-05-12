'use client';

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { ProductCard } from '@/components/ProductComponents';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default function CategoryPage() {
    const params = useParams();
    const { addToCart } = useContext(CartContext);

    const [products, setProducts] = useState<any[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState('newest');
    const [priceMax, setPriceMax] = useState(200000);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [allBrands, setAllBrands] = useState<string[]>([]);

    const findCategory = (cats: any[], idOrSlug: string): any => {
        for (const c of cats) {
            if (String(c.id) === String(idOrSlug) || c.slug === idOrSlug) return c;
            if (c.children) { const sub = findCategory(c.children, idOrSlug); if (sub) return sub; }
        }
        return null;
    };

    const category = findCategory(MOCK_CATEGORIES, params.id as string);

    const fetchProducts = useCallback(() => {
        if (!category) return;
        setLoading(true);

        // Demo logic: Use mock products for Laptop category if API is unavailable or for testing
        if (params.id === '101' || params.id === '1' || params.id === 'laptop' || params.id === 'all-laptop') {
            const filtered = MOCK_PRODUCTS.filter(p => p.category.id === 1 || p.category.id === 101);
            setProducts(filtered);
            setTotal(filtered.length);
            setAllBrands(Array.from(new Set(filtered.map(p => p.brand))));
            setLoading(false);
            return;
        }

        const qs = new URLSearchParams({
            category: category.slug,
            page: String(page),
            limit: '20',
            sort,
            maxPrice: String(priceMax),
        });
        if (inStockOnly) qs.set('inStock', 'true');
        selectedBrands.forEach(b => qs.append('brand', b));

        fetch(`${API}/products?${qs}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => {
                if (data) {
                    setProducts(data.products ?? []);
                    setTotal(data.total ?? 0);
                    const brands = Array.from(new Set((data.products ?? []).map((p: any) => p.brand).filter(Boolean))) as string[];
                    if (allBrands.length === 0 && brands.length > 0) setAllBrands(brands);
                } else {
                    // Fallback to mock products if API fails
                    const filtered = MOCK_PRODUCTS.filter(p => p.category.id === Number(params.id));
                    setProducts(filtered);
                    setTotal(filtered.length);
                }
            })
            .catch(() => {
                // Fallback to mock products on error
                const filtered = MOCK_PRODUCTS.filter(p => p.category.id === Number(params.id));
                setProducts(filtered);
                setTotal(filtered.length);
            })
            .finally(() => setLoading(false));
    }, [category, params.id, page, sort, priceMax, inStockOnly, selectedBrands]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    if (!category) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><h2>Category Not Found</h2></div>;
    }

    const toggleBrand = (b: string) => {
        setSelectedBrands(prev => prev.includes(b) ? prev.filter(x => x !== b) : [...prev, b]);
        setPage(1);
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
                        <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Max Price</strong>
                        <input type="range" min="0" max="200000" step="1000" value={priceMax} onChange={e => { setPriceMax(Number(e.target.value)); setPage(1); }} style={{width: '100%', accentColor: '#ff6b00'}} />
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px'}}>
                            <span>৳0</span><span>৳{priceMax.toLocaleString('en-IN')}</span>
                        </div>
                    </div>

                    {allBrands.length > 0 && (
                        <div style={{marginBottom: '25px'}}>
                            <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Brand</strong>
                            {allBrands.slice(0, 8).map(brand => (
                                <div key={brand} style={{marginBottom: '8px', fontSize: '13px'}}>
                                    <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer'}}>
                                        <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} /> {brand}
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}

                    <div>
                        <strong style={{display: 'block', marginBottom: '10px', fontSize: '14px'}}>Availability</strong>
                        <label style={{display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px'}}>
                            <input type="checkbox" checked={inStockOnly} onChange={e => { setInStockOnly(e.target.checked); setPage(1); }} /> In Stock Only
                        </label>
                    </div>
                </aside>

                <div className="category-main" style={{flex: 1}}>
                    <div style={{background: '#fff', padding:'15px', borderRadius:'8px', marginBottom:'20px', boxShadow:'0 2px 4px rgba(0,0,0,0.05)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <span>{loading ? 'Loading…' : `Showing ${products.length} of ${total} products`}</span>
                        <select className="form-control" style={{width:'auto', margin:0}} value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                            <option value="newest">Newest First</option>
                            <option value="price_asc">Price: Low → High</option>
                            <option value="price_desc">Price: High → Low</option>
                            <option value="rating">Top Rated</option>
                        </select>
                    </div>

                    {loading ? (
                        <div style={{textAlign:'center', padding:'60px'}}><i className="fas fa-spinner fa-spin" style={{fontSize:'32px', color:'#1B5B97'}}></i></div>
                    ) : products.length === 0 ? (
                        <div style={{padding:'50px', textAlign:'center', gridColumn:'1/-1'}}>
                            <i className="fas fa-box-open" style={{fontSize:'40px', color:'#ccc', marginBottom:'15px'}}></i>
                            <h3>No products found</h3>
                            <p>We&apos;re adding products to this category soon!</p>
                        </div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products.map(prod => (
                                    <ProductCard key={prod.id} product={prod} addToCart={addToCart} />
                                ))}
                            </div>
                            {total > 20 && (
                                <div style={{display:'flex', justifyContent:'center', gap:'8px', marginTop:'30px'}}>
                                    {Array.from({length: Math.ceil(total / 20)}, (_, i) => i + 1).map(p => (
                                        <button key={p} onClick={() => setPage(p)} style={{padding:'8px 14px', borderRadius:'6px', border:'1px solid #ddd', background: p === page ? '#1B5B97' : 'white', color: p === page ? 'white' : '#333', cursor:'pointer', fontWeight: p === page ? 600 : 400}}>
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
