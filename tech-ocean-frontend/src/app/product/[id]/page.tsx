'use client';

import React, { useState, useContext } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { CartContext, CompareContext } from '@/components/ClientApplication';
import { StarRating } from '@/components/ProductComponents';
import Link from 'next/link';

const DeliveryEstimator = ({ price = 0 }) => {
    const [zone, setZone] = useState('Dhaka City');
    const zones = [
        { name: 'Dhaka City', days: '1-2 business days', cost: 60 },
        { name: 'Dhaka Suburbs', days: '2-3 business days', cost: 100 },
        { name: 'Major Cities (CTG, Khulna, Sylhet)', days: '2-4 business days', cost: 120 },
        { name: 'Other Districts', days: '3-6 business days', cost: 150 }
    ];
    const selectedZone = zones.find(z => z.name === zone) || zones[0];
    const shippingCost = price >= 5000 ? 0 : selectedZone.cost;
    return (
        <div className="delivery-estimator">
            <h4><i className="fas fa-truck" style={{color: '#ff6b00'}}></i> Delivery Estimator</h4>
            <div className="delivery-row">
                <select className="delivery-select" value={zone} onChange={(e) => setZone(e.target.value)}>
                    {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                </select>
            </div>
            <div className="delivery-result">
                <div className="delivery-result-item">
                    <span><i className="fas fa-money-bill-wave"></i> Cost</span>
                    <strong>{shippingCost === 0 ? <span style={{color:'#00C49F'}}>Free</span> : `৳${shippingCost}`}</strong>
                </div>
            </div>
        </div>
    );
};

export default function ProductDetail() {
    const params = useParams();
    const { addToCart } = useContext(CartContext);
    const { addToCompare, removeFromCompare, isInCompare } = useContext(CompareContext);
    const product = MOCK_PRODUCTS.find(p => String(p.id) === String(params.id));
    const [qty, setQty] = useState(1);
    const inCompare = product ? isInCompare(product.id) : false;

    if (!product) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><h2>Product Not found</h2></div>;
    }

    const imgUrl = product.imgUrl || '/img/placeholder.png';

    return (
        <div className="container mt-4">
            <div className="pdp-container">
                <div className="pdp-left">
                    <div className="pdp-main-media">
                        <img src={imgUrl} alt={product.title} />
                    </div>
                </div>
                <div className="pdp-right">
                    <h1 className="pdp-title">{product.title}</h1>
                    <div className="pdp-meta">
                        <StarRating rating={product.rating} count={product.reviewCount} />
                    </div>
                    <div className="pdp-price-box">
                        <span className="pdp-curr-price">{product.price}</span>
                        {product.oldPrice && <span className="pdp-old-price">{product.oldPrice}</span>}
                    </div>
                    <div className="pdp-actions">
                        <div className="qty-selector">
                            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                            <input type="number" className="qty-input" value={qty} readOnly />
                            <button className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                        <button className="btn-add-cart" onClick={() => addToCart(product, qty, false)}>Add to Cart</button>
                        <button className="btn-buy-now" onClick={() => addToCart(product, qty, true)}>Buy Now</button>
                    </div>
                    <div style={{marginTop:'12px', display:'flex', gap:'12px', flexWrap:'wrap'}}>
                        <button
                            className="action-icon-btn"
                            style={inCompare ? {borderColor:'#1B5B97', color:'#1B5B97', background:'#f0f7ff'} : {}}
                            onClick={() => inCompare ? removeFromCompare(product!.id) : addToCompare(product!)}
                        >
                            <i className={`fas ${inCompare ? 'fa-check-circle' : 'fa-sync-alt'}`}></i>
                            {inCompare ? 'Added to Compare' : '+ Add to Compare'}
                        </button>
                        {inCompare && (
                            <Link href="/compare" className="action-icon-btn" style={{color:'#1B5B97', borderColor:'#1B5B97'}}>
                                <i className="fas fa-columns"></i> View Comparison
                            </Link>
                        )}
                    </div>
                    <DeliveryEstimator price={parseFloat(String(product.price).replace(/,/g,'').replace('৳','')) || 0} />
                </div>
            </div>
        </div>
    );
}
