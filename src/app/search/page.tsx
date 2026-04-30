'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SearchResultsContent = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('q');
    const [results, setResults] = useState<any>({ products: [], categories: [], blogs: [] });
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        if (query) {
            fetchResults();
        }
    }, [query]);

    const fetchResults = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query!)}`);
            const data = await response.json();
            setResults(data);
            setTotalCount(data.totalCount || 0);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
                <div className="search-spinner" style={{ margin: '0 auto 20px' }}></div>
                <h2 style={{ color: '#666' }}>Searching for "{query}"...</h2>
            </div>
        );
    }

    return (
        <div className="search-results-page container" style={{ padding: '40px 20px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '10px' }}>
                    Search Results for <span style={{ color: '#ff6b00' }}>"{query}"</span>
                </h1>
                <p style={{ color: '#666', fontSize: '18px' }}>{totalCount} results found</p>
            </div>
            
            {results.products?.length > 0 && (
                <section className="results-section" style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                        Products ({results.products.length})
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                        {results.products.map((product: any) => (
                            <div key={product.id} className="product-card" style={{ background: 'white', borderRadius: '12px', padding: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', transition: 'transform 0.2s' }}>
                                <div style={{ height: '180px', marginBottom: '15px', overflow: 'hidden', borderRadius: '8px' }}>
                                    <img src={product.image || '/images/placeholder.png'} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                </div>
                                <h3 style={{ fontSize: '14px', fontWeight: 600, height: '40px', overflow: 'hidden', marginBottom: '10px' }}>{product.title}</h3>
                                <div style={{ fontSize: '18px', fontWeight: 800, color: '#ff6b00', marginBottom: '15px' }}>{product.price}</div>
                                <Link href={`/product/${product.id}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: '#1B5B97', color: 'white', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '13px' }}>
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            {results.categories?.length > 0 && (
                <section className="results-section" style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                        Categories ({results.categories.length})
                    </h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                        {results.categories.map((category: any) => (
                            <Link key={category.id} href={category.url} style={{ padding: '12px 24px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '30px', textDecoration: 'none', color: '#1B5B97', fontWeight: 600, transition: 'all 0.2s' }}>
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </section>
            )}
            
            {results.blogs?.length > 0 && (
                <section className="results-section" style={{ marginBottom: '50px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '25px', borderBottom: '2px solid #f0f0f0', paddingBottom: '10px' }}>
                        Tech Articles ({results.blogs.length})
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
                        {results.blogs.map((blog: any) => (
                            <div key={blog.id} style={{ background: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: '#1e293b' }}>{blog.title}</h3>
                                <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{blog.excerpt}</p>
                                <Link href={blog.url} style={{ color: '#ff6b00', fontWeight: 700, textDecoration: 'none', fontSize: '14px' }}>
                                    Read More →
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
            {totalCount === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: '20px' }}>
                    <div style={{ fontSize: '60px', marginBottom: '20px' }}>🔍</div>
                    <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', marginBottom: '10px' }}>No results found</h2>
                    <p style={{ color: '#64748b' }}>Try searching for different keywords or check your spelling.</p>
                    <Link href="/" style={{ display: 'inline-block', marginTop: '20px', color: '#1B5B97', fontWeight: 600 }}>
                        Return to Homepage
                    </Link>
                </div>
            )}
        </div>
    );
};

export default function SearchResultsPage() {
    return (
        <Suspense fallback={<div className="container" style={{ padding: '100px', textAlign: 'center' }}>Loading...</div>}>
            <SearchResultsContent />
        </Suspense>
    );
}
