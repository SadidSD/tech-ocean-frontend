'use client';

import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_CATEGORIES } from '@/data/categories';
import { MOCK_PRODUCTS } from '@/data/mockProducts';
import { ProductCard, RecentlyViewedSection } from '@/components/ProductComponents';
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
        <div className="container mt-4 category-page-container" style={{minHeight: '60vh'}}>
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
                        <div style={{position: 'relative', height: '6px', background: '#e2e8f0', borderRadius: '3px', marginBottom: '15px'}}>
                            <div style={{position: 'absolute', height: '100%', background: '#ff6b00', borderRadius: '3px', width: `${(priceMax/200000)*100}%`}}></div>
                            <input type="range" min="0" max="200000" step="1000" value={priceMax} onChange={e => { setPriceMax(Number(e.target.value)); setPage(1); }} style={{position: 'absolute', top: '-5px', width: '100%', opacity: 1, cursor: 'pointer', appearance: 'none', background: 'transparent', accentColor: '#ff6b00'}} />
                        </div>
                        <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748b', fontWeight: 600}}>
                            <span style={{padding: '4px 8px', background: '#f1f5f9', borderRadius: '4px'}}>৳0</span>
                            <span style={{padding: '4px 8px', background: '#fff5f2', color: '#db4b27', borderRadius: '4px'}}>৳{priceMax.toLocaleString()}</span>
                        </div>
                    </div>

                    {allBrands.length > 0 && (
                        <div style={{marginBottom: '25px'}}>
                            <strong style={{display: 'block', marginBottom: '12px', fontSize: '14px'}}>Brands</strong>
                            <div style={{maxHeight: '200px', overflowY: 'auto', paddingRight: '5px'}}>
                                {allBrands.map(brand => (
                                    <div key={brand} style={{marginBottom: '10px'}}>
                                        <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: selectedBrands.includes(brand) ? '#0f172a' : '#64748b', fontWeight: selectedBrands.includes(brand) ? 600 : 400}}>
                                            <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} style={{width: '16px', height: '16px', accentColor: '#ff6b00'}} /> 
                                            {brand}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{paddingTop: '15px', borderTop: '1px solid #f1f5f9'}}>
                        <strong style={{display: 'block', marginBottom: '12px', fontSize: '14px'}}>Stock Availability</strong>
                        <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '13px', color: inStockOnly ? '#0f172a' : '#64748b', fontWeight: inStockOnly ? 600 : 400}}>
                            <div style={{width: '34px', height: '18px', background: inStockOnly ? '#10b981' : '#e2e8f0', borderRadius: '10px', position: 'relative', transition: 'all 0.3s'}}>
                                <div style={{width: '14px', height: '14px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: inStockOnly ? '18px' : '2px', transition: 'all 0.3s'}}></div>
                                <input type="checkbox" checked={inStockOnly} onChange={e => { setInStockOnly(e.target.checked); setPage(1); }} style={{position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer'}} />
                            </div>
                            In Stock Only
                        </label>
                    </div>
                </aside>

                <div className="category-main" style={{flex: 1}}>
                    <div style={{background: '#fff', padding:'12px 20px', borderRadius:'12px', marginBottom:'20px', boxShadow:'0 2px 10px rgba(0,0,0,0.03)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <div style={{fontSize: '14px', color: '#64748b'}}>
                            {loading ? 'Analyzing inventory...' : (
                                <span>Found <strong>{total}</strong> products in {category.name}</span>
                            )}
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                            <span style={{fontSize: '13px', color: '#94a3b8'}}>Sort by:</span>
                            <select className="form-control" style={{width:'auto', margin:0, border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 600}} value={sort} onChange={e => { setSort(e.target.value); setPage(1); }}>
                                <option value="newest">Newest First</option>
                                <option value="price_asc">Price: Low → High</option>
                                <option value="price_desc">Price: High → Low</option>
                                <option value="rating">Top Rated</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedBrands.length > 0 || inStockOnly || priceMax < 200000) && (
                        <div style={{display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px', alignItems: 'center'}}>
                            <span style={{fontSize: '12px', color: '#94a3b8', marginRight: '5px', fontWeight: 700, textTransform: 'uppercase'}}>Active Filters:</span>
                            {selectedBrands.map(b => (
                                <button key={b} onClick={() => toggleBrand(b)} style={{padding: '5px 12px', background: '#eff6ff', color: '#1B5B97', border: '1px solid #bfdbfe', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'}}>
                                    {b} <i className="fas fa-times" style={{fontSize: '10px'}}></i>
                                </button>
                            ))}
                            {inStockOnly && (
                                <button onClick={() => setInStockOnly(false)} style={{padding: '5px 12px', background: '#ecfdf5', color: '#10b981', border: '1px solid #a7f3d0', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'}}>
                                    In Stock <i className="fas fa-times" style={{fontSize: '10px'}}></i>
                                </button>
                            )}
                            {priceMax < 200000 && (
                                <button onClick={() => setPriceMax(200000)} style={{padding: '5px 12px', background: '#fff7ed', color: '#ea580c', border: '1px solid #ffedd5', borderRadius: '20px', fontSize: '12px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer'}}>
                                    Max ৳{priceMax.toLocaleString()} <i className="fas fa-times" style={{fontSize: '10px'}}></i>
                                </button>
                            )}
                            <button onClick={() => { setSelectedBrands([]); setInStockOnly(false); setPriceMax(200000); }} style={{fontSize: '12px', color: '#db4b27', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, textDecoration: 'underline'}}>Clear All</button>
                        </div>
                    )}

                    {loading ? (
                        <div className="products-grid">
                            {[1,2,3,4,5,6,7,8].map(i => (
                                <div key={i} style={{background: '#fff', borderRadius: '16px', padding: '15px', height: '380px', boxShadow: '0 2px 10px rgba(0,0,0,0.03)', overflow: 'hidden'}}>
                                    <div style={{width: '100%', height: '180px', background: '#f1f5f9', borderRadius: '12px', animation: 'skeletonPulse 1.5s infinite'}}></div>
                                    <div style={{marginTop: '20px', height: '20px', width: '80%', background: '#f1f5f9', borderRadius: '4px', animation: 'skeletonPulse 1.5s infinite'}}></div>
                                    <div style={{marginTop: '10px', height: '14px', width: '40%', background: '#f1f5f9', borderRadius: '4px', animation: 'skeletonPulse 1.5s infinite'}}></div>
                                    <div style={{marginTop: '20px', height: '30px', width: '50%', background: '#f1f5f9', borderRadius: '4px', animation: 'skeletonPulse 1.5s infinite'}}></div>
                                    <div style={{marginTop: '25px', height: '40px', width: '100%', background: '#f1f5f9', borderRadius: '8px', animation: 'skeletonPulse 1.5s infinite'}}></div>
                                </div>
                            ))}
                        </div>
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
            <RecentlyViewedSection />
        </div>
    );
}
