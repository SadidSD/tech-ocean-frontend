'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { CompareContext } from '@/components/ClientApplication';
import { CartContext } from '@/components/ClientApplication';
import { StarRating } from '@/components/ProductComponents';

export default function ComparePage() {
    const { compareItems, removeFromCompare, clearCompare } = useContext(CompareContext);
    const { addToCart } = useContext(CartContext);

    const [A, B] = compareItems;

    // Shared spec rows — dynamically pull from features array
    const allFeatureKeys = Array.from(
        new Set([
            ...(A?.features || []).map((_: string, i: number) => i),
            ...(B?.features || []).map((_: string, i: number) => i),
        ])
    );

    if (compareItems.length === 0) {
        return (
            <div className="cmp-page-empty">
                <i className="fas fa-sync-alt"></i>
                <h2>No Products to Compare</h2>
                <p>Browse products and click the <strong>Compare</strong> button to add them here.</p>
                <Link href="/" className="cmp-btn-browse">Browse Products</Link>
            </div>
        );
    }

    return (
        <div className="cmp-page">
            {/* Header */}
            <div className="cmp-page-header">
                <div>
                    <h1 className="cmp-page-title">Compare Products</h1>
                    {compareItems.length < 2 && (
                        <p className="cmp-page-hint">
                            <i className="fas fa-info-circle"></i> Select one more product from the same category to compare.
                            <Link href="/" style={{color:'#1B5B97', marginLeft:'8px'}}>Browse products →</Link>
                        </p>
                    )}
                </div>
                <button className="cmp-btn-clear-page" onClick={clearCompare}>
                    <i className="fas fa-trash-alt"></i> Clear All
                </button>
            </div>

            <div className="cmp-table-wrap">
                <table className="cmp-table">
                    <colgroup>
                        <col style={{width:'22%'}} />
                        <col style={{width:'39%'}} />
                        {B && <col style={{width:'39%'}} />}
                    </colgroup>

                    {/* Product image & title header */}
                    <thead>
                        <tr className="cmp-tr-products">
                            <th className="cmp-th-label">Product</th>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <th key={p.id} className="cmp-th-product">
                                    <div className="cmp-product-col">
                                        <div className="cmp-product-img-wrap">
                                            {p.imgUrl
                                                ? <img src={p.imgUrl} alt={p.title} className="cmp-product-img" />
                                                : <i className={`fas ${p.imgIcon || 'fa-box'} cmp-product-icon`}></i>
                                            }
                                        </div>
                                        <Link href={`/product/${p.id}`} className="cmp-product-name">{p.title}</Link>
                                        <button className="cmp-remove-btn" onClick={() => removeFromCompare(p.id)}>
                                            <i className="fas fa-times"></i> Remove
                                        </button>
                                    </div>
                                </th>
                            ))}
                            {/* Empty slot if only 1 product */}
                            {compareItems.length === 1 && (
                                <th className="cmp-th-product">
                                    <div className="cmp-empty-slot">
                                        <i className="fas fa-plus-circle"></i>
                                        <p>Add a product to compare</p>
                                        <Link href="/" className="cmp-btn-browse" style={{fontSize:'13px', padding:'8px 16px'}}>Browse</Link>
                                    </div>
                                </th>
                            )}
                        </tr>
                    </thead>

                    <tbody>
                        {/* Price */}
                        <tr className="cmp-tr-highlight">
                            <td className="cmp-td-label">Price</td>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <td key={p.id} className="cmp-td-price">{p.price}</td>
                            ))}
                            {compareItems.length === 1 && <td className="cmp-td-na">—</td>}
                        </tr>

                        {/* Rating */}
                        <tr>
                            <td className="cmp-td-label">Rating</td>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <td key={p.id} className="cmp-td-center">
                                    <StarRating rating={p.rating} count={p.reviewCount} />
                                </td>
                            ))}
                            {compareItems.length === 1 && <td className="cmp-td-na">—</td>}
                        </tr>

                        {/* Status */}
                        <tr>
                            <td className="cmp-td-label">Availability</td>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <td key={p.id} className="cmp-td-center">
                                    <span className={`cmp-status-badge cmp-status-${p.status === 'In Stock' ? 'instock' : 'out'}`}>
                                        {p.status}
                                    </span>
                                </td>
                            ))}
                            {compareItems.length === 1 && <td className="cmp-td-na">—</td>}
                        </tr>

                        {/* Category */}
                        <tr>
                            <td className="cmp-td-label">Category</td>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <td key={p.id} className="cmp-td-center">{p.category}</td>
                            ))}
                            {compareItems.length === 1 && <td className="cmp-td-na">—</td>}
                        </tr>

                        {/* Features / Specs section */}
                        <tr className="cmp-tr-section-header">
                            <td colSpan={3} className="cmp-section-header">
                                <i className="fas fa-list-ul"></i> Key Features
                            </td>
                        </tr>

                        {allFeatureKeys.map((i: any) => {
                            const fA = A?.features?.[i];
                            const fB = B?.features?.[i];
                            if (!fA && !fB) return null;
                            return (
                                <tr key={i} className={i % 2 === 0 ? 'cmp-tr-even' : ''}>
                                    <td className="cmp-td-label">Feature {Number(i)+1}</td>
                                    <td className="cmp-td-center">{fA || '—'}</td>
                                    {B && <td className="cmp-td-center">{fB || '—'}</td>}
                                </tr>
                            );
                        })}

                        {/* Add to Cart row */}
                        <tr className="cmp-tr-actions">
                            <td className="cmp-td-label"></td>
                            {[A, B].filter(Boolean).map((p: any) => (
                                <td key={p.id} className="cmp-td-center">
                                    <button className="cmp-btn-atc" onClick={() => addToCart(p, 1, false)}>
                                        <i className="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                </td>
                            ))}
                            {compareItems.length === 1 && <td></td>}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
