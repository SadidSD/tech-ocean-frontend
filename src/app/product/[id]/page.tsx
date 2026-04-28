'use client';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { MOCK_PRODUCTS } from '@/data/products';
import { CartContext } from '@/components/ClientApplication';
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
        <div className="delivery-section">
            <h3 className="delivery-title"><i className="fas fa-truck" style={{color: '#ff6b00', marginRight: '8px'}}></i> Delivery Estimator</h3>
            <div className="delivery-row">
                <span className="delivery-label">Location</span>
                <select className="delivery-select" value={zone} onChange={(e) => setZone(e.target.value)} style={{ border: 'none', background: 'transparent', fontWeight: 600, color: '#1B5B97', textAlign: 'right', cursor: 'pointer' }}>
                    {zones.map(z => <option key={z.name} value={z.name}>{z.name}</option>)}
                </select>
            </div>
            <div className="delivery-row">
                <span className="delivery-label">Cost</span>
                <span className="delivery-value" style={{ fontWeight: 700, color: shippingCost === 0 ? '#28a745' : '#333' }}>
                    {shippingCost === 0 ? 'Free' : `৳${shippingCost}`}
                </span>
            </div>
            <div className="delivery-row">
                <span className="delivery-label">Estimated Delivery</span>
                <span className="delivery-value">{selectedZone.days}</span>
            </div>
        </div>
    );
};

export default function ProductDetail() {
    const params = useParams();
    const { addToCart } = useContext(CartContext);
    const product = MOCK_PRODUCTS.find(p => String(p.id) === String(params.id));
    const [qty, setQty] = useState(1);
    
    // UI Upgrade States
    const [showStickyCart, setShowStickyCart] = useState(false);
    const [activeTab, setActiveTab] = useState<'specs'|'reviews'|'qa'>('reviews');
    const [activeImage, setActiveImage] = useState(0);
    const cartTriggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (cartTriggerRef.current) {
                const rect = cartTriggerRef.current.getBoundingClientRect();
                setShowStickyCart(rect.top < 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!product) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><h2>Product Not found</h2></div>;
    }

    const imgUrl = product.imgUrl || '/img/placeholder.png';
    const mockGallery = [imgUrl, imgUrl, imgUrl, imgUrl];

    return (
        <div className="container product-detail-container" style={{paddingTop: '20px', paddingBottom: '100px'}}>
            <div className="pdp-container">
                <div className="pdp-left">
                    <div className="pdp-main-media" style={{position:'relative', overflow:'hidden', borderRadius:'12px', border:'1px solid #efefef', padding:'20px'}}>
                        <img src={mockGallery[activeImage]} alt={product.title} style={{width:'100%', objectFit:'contain', transition:'transform 0.3s ease'}} className="zoom-hover" />
                    </div>
                    {/* Image Gallery Thumbnails */}
                    <div className="pdp-gallery-thumbs" style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                        {mockGallery.map((img, idx) => (
                            <div key={idx} onClick={() => setActiveImage(idx)} style={{width:'80px', height:'80px', borderRadius:'8px', border: activeImage === idx ? '2px solid #1B5B97' : '1px solid #eee', cursor:'pointer', padding:'5px', opacity: activeImage === idx ? 1 : 0.6}}>
                                <img src={img} alt="thumb" style={{width:'100%', height:'100%', objectFit:'contain'}} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pdp-right">
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-rating">
                        <span className="stars">{'★'.repeat(Math.floor(product.rating || 4))}</span>
                        <span className="review-count">({product.reviewCount || 128} reviews)</span>
                    </div>

                    <div className="product-price-section">
                        <span className="current-price">{product.price}</span>
                        {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
                    </div>

                    <div className="quantity-section">
                        <label className="quantity-label">Quantity</label>
                        <div className="quantity-selector" ref={cartTriggerRef}>
                            <button className="quantity-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                            <span className="quantity-value">{qty}</span>
                            <button className="quantity-btn" onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="add-to-cart-btn" onClick={() => addToCart(product, qty, false)}>
                           <i className="fas fa-shopping-cart"></i> Add to Cart
                        </button>
                        <button className="buy-now-btn" onClick={() => addToCart(product, qty, true)}>
                           <i className="fas fa-bolt"></i> Buy Now
                        </button>
                    </div>

                    <DeliveryEstimator price={parseFloat(String(product.price).replace(/,/g,'').replace('৳','')) || 0} />
                </div>
            </div>

            {/* Comprehensive Detail Tabs */}
            <div className="product-tabs" style={{marginTop:'60px', background:'white', borderRadius:'12px', border:'1px solid #eee', overflow:'hidden'}}>
                <div className="tab-headers">
                    <button onClick={()=>setActiveTab('specs')} className={`tab-header ${activeTab==='specs'?'active':''}`}>Specifications</button>
                    <button onClick={()=>setActiveTab('reviews')} className={`tab-header ${activeTab==='reviews'?'active':''}`}>Reviews ({product.reviewCount || 128})</button>
                    <button onClick={()=>setActiveTab('qa')} className={`tab-header ${activeTab==='qa'?'active':''}`}>Q&A (15)</button>
                </div>
                <div className="tab-content" style={{padding:'30px'}}>
                    {activeTab === 'specs' && (
                        <div className="specifications">
                            <h3 className="delivery-title">Key Specifications</h3>
                            <ul style={{lineHeight: 1.8, color:'#555', marginTop:'15px', paddingLeft:'20px'}}>
                                {product.features?.map((f: string, i: number) => <li key={i}>{f}</li>)}
                                <li>Warranty: 3 Years Official</li>
                                <li>Compatibility Check passed for major builds.</li>
                            </ul>
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="reviews-section" style={{maxWidth:'800px'}}>
                            <div className="review-summary">
                                <div className="review-score">
                                    <div className="score">{product.rating || 4.8}</div>
                                    <div className="stars">{'★'.repeat(Math.floor(product.rating || 4))}</div>
                                    <div className="count">Based on {product.reviewCount || 128} verified purchases</div>
                                </div>
                                <button className="write-review-btn" style={{marginLeft:'auto'}}>Write a Review</button>
                            </div>
                            
                            <div className="review-card" style={{padding:'20px', border:'1px solid #eee', borderRadius:'12px', marginBottom:'15px', background: 'white'}}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div>
                                        <div className="stars">{'★'.repeat(5)}</div>
                                        <h4 style={{marginTop:'10px', fontSize: '16px', fontWeight: 600}}>Great performance for the price!</h4>
                                        <p style={{color:'#666', fontSize:'14px', marginTop:'5px'}}>Upgraded from my older setup and saw a massive difference instantly. Highly recommended.</p>
                                    </div>
                                    <div style={{textAlign:'right', color:'#888', fontSize:'12px', minWidth: '100px'}}>
                                        <div><strong>MD Rahim</strong> (Verified)</div>
                                        <div>2 days ago</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'qa' && (
                        <div className="qa-section">
                            <button className="buy-now-btn" style={{marginBottom:'20px', maxWidth: '200px'}}>Ask a Question</button>
                            <div className="qa-card" style={{padding:'20px', background:'#f8f9fa', borderRadius:'12px'}}>
                                <h4><span style={{color:'#1B5B97'}}>Q:</span> Is this compatible with older motherboards?</h4>
                                <p style={{marginTop:'10px', color:'#555'}}><span style={{color:'#ff6b00', fontWeight:'bold'}}>A:</span> It depends on the specific chipset. Please check the specification limits for your exact model.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Sticky Bottom Cart Bar */}
            <div className={`sticky-cart-bar ${showStickyCart ? 'visible' : ''}`}>
                <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:'1200px'}}>
                    <div className="sticky-cart-left" style={{display:'flex', alignItems:'center', gap:'15px'}}>
                        <img src={imgUrl} alt={product.title} style={{width:'40px', height:'40px', objectFit:'contain', background:'#fff', borderRadius:'4px', padding:'2px'}} />
                        <span style={{fontWeight:600, color:'#333'}} className="d-none-mobile">{product.title}</span>
                    </div>
                    <div className="sticky-cart-right" style={{display:'flex', alignItems:'center', gap:'20px'}}>
                        <span style={{fontSize:'20px', fontWeight:800, color:'#ff6b00'}}>{product.price}</span>
                        <div className="quantity-selector d-none-mobile" style={{margin:0, padding: '2px'}}>
                            <button className="quantity-btn" style={{width: '32px', height: '32px'}} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                            <span className="quantity-value" style={{fontSize: '14px', minWidth: '24px'}}>{qty}</span>
                            <button className="quantity-btn" style={{width: '32px', height: '32px'}} onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product, qty, false)} style={{padding: '10px 20px', fontSize: '14px'}}>Add to Cart</button>
                    </div>
                </div>
            </div>

        </div>
    );
}
