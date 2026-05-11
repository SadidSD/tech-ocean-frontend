'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CompareContext } from '@/components/ClientApplication';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MOCK_CATEGORIES } from '@/data/categories';

export default function ComparePage() {
    const { compareItems, removeFromCompare, clearCompare } = useContext(CompareContext);
    const router = useRouter();

    const fmtBDT = (n: any) => {
        const val = typeof n === 'number' ? n : parseFloat(String(n).replace(/,/g,'').replace('৳',''));
        return `৳${Math.round(val).toLocaleString('en-IN')}`;
    };

    if (compareItems.length === 0) {
        return (
            <div className="compare-page-wrapper">
                <div className="container">
                    <div className="compare-empty-state">
                        <i className="fas fa-layer-group"></i>
                        <h2>Your comparison list is empty</h2>
                        <p>Add products from our shop to compare them side-by-side.</p>
                        <Link href="/" className="compare-back-btn">
                            Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Get all unique spec keys from all selected products
    const allSpecKeys = Array.from(new Set(
        compareItems.flatMap(p => Object.keys(p.specs || {}))
    ));

    // Formatter for spec labels (e.g., "panelType" -> "Panel Type")
    const formatLabel = (key: string) => {
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    };

    return (
        <div className="compare-page-wrapper">
            <div className="container compare-page">
                <div className="compare-header">
                    <h1>Compare Products</h1>
                    <div className="compare-controls">
                        <span style={{ fontWeight: 600, color: '#666' }}>
                            {compareItems.length} of 4 products selected
                        </span>
                        <button className="clear-all-btn" onClick={clearCompare}>
                            <i className="fas fa-trash-alt"></i> Clear All
                        </button>
                    </div>
                </div>

                <div className="compare-table-container">
                    <table className="compare-table">
                        <tbody>
                            {/* Product Headers Row */}
                            <tr className="compare-row">
                                <td className="compare-label-cell">Product</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="compare-value-cell">
                                        <div className="compare-product-card">
                                            <button 
                                                className="remove-compare-item" 
                                                onClick={() => removeFromCompare(product.id)}
                                                title="Remove"
                                            >
                                                &times;
                                            </button>
                                            <img src={product.imgUrl || product.images?.[0]} alt={product.title} className="compare-product-img" />
                                            <h3 className="compare-product-title">{product.title}</h3>
                                            <div className="compare-product-price">
                                                {typeof product.price === 'string' ? product.price : fmtBDT(product.price)}
                                            </div>
                                            <Link href={`/product/${product.id}`} className="compare-view-btn">
                                                View Details
                                            </Link>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Basic Info Rows */}
                            <tr className="compare-row">
                                <td className="compare-label-cell">Brand</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="compare-value-cell" style={{ fontWeight: 600 }}>
                                        {product.brand}
                                    </td>
                                ))}
                            </tr>
                            <tr className="compare-row">
                                <td className="compare-label-cell">Rating</td>
                                {compareItems.map(product => (
                                    <td key={product.id} className="compare-value-cell">
                                        <div style={{ color: '#f5a623' }}>
                                            <i className="fas fa-star"></i> {product.rating} 
                                            <span style={{ color: '#888', fontSize: '12px', marginLeft: '5px' }}>
                                                ({product.reviewCount || 0} Reviews)
                                            </span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Specification Section Header */}
                            <tr>
                                <td colSpan={compareItems.length + 1} className="compare-spec-header">
                                    Technical Specifications
                                </td>
                            </tr>

                            {/* Dynamic Spec Rows */}
                            {allSpecKeys.length > 0 ? allSpecKeys.map(key => (
                                <tr key={key} className="compare-row">
                                    <td className="compare-label-cell">{formatLabel(key)}</td>
                                    {compareItems.map(product => (
                                        <td key={product.id} className="compare-value-cell">
                                            {product.specs?.[key] || '—'}
                                        </td>
                                    ))}
                                </tr>
                            )) : (
                                <tr className="compare-row">
                                    <td className="compare-label-cell">Features</td>
                                    {compareItems.map(product => (
                                        <td key={product.id} className="compare-value-cell" style={{ textAlign: 'left', fontSize: '13px' }}>
                                            <ul style={{ margin: 0, paddingLeft: '15px' }}>
                                                {product.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
                                            </ul>
                                        </td>
                                    ))}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '40px', textAlign: 'center' }}>
                    <Link href="/" className="compare-back-btn" style={{ background: '#081621' }}>
                        + Add More Products
                    </Link>
                </div>
            </div>
        </div>
    );
}
