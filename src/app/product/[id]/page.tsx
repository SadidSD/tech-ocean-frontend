'use client';

import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { CartContext } from '@/components/ClientApplication';
import { StarRating } from '@/components/ProductComponents';
import Link from 'next/link';
import { MOCK_PRODUCTS } from '@/data/mockProducts';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
const fmtBDT = (n: number) => `৳${Math.round(n).toLocaleString('en-IN')}`;

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
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [showStickyCart, setShowStickyCart] = useState(false);
    const [activeTab, setActiveTab] = useState<'specs'|'reviews'|'qa'>('specs');
    const [activeImage, setActiveImage] = useState(0);
    const [reviewForm, setReviewForm] = useState({ rating: 5, title: '', content: '' });
    const [questionForm, setQuestionForm] = useState('');
    const cartTriggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Try API first
        fetch(`${API}/products/${params.id}`)
            .then(r => r.ok ? r.json() : null)
            .then(data => { 
                if (data) {
                    setProduct(data);
                    setLoading(false);
                } else {
                    // Check MOCK_PRODUCTS
                    const mock = MOCK_PRODUCTS.find(p => p.id === params.id);
                    setProduct(mock || null);
                    setLoading(false);
                }
            })
            .catch(() => {
                const mock = MOCK_PRODUCTS.find(p => p.id === params.id);
                setProduct(mock || null);
                setLoading(false);
            });
    }, [params.id]);

    useEffect(() => {
        const handleScroll = () => {
            if (cartTriggerRef.current) {
                setShowStickyCart(cartTriggerRef.current.getBoundingClientRect().top < 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (loading) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><i className="fas fa-spinner fa-spin" style={{fontSize:'32px', color:'#1B5B97'}}></i></div>;
    }

    if (!product) {
        return <div className="container" style={{padding:'100px 0', textAlign:'center'}}><h2>Product not found</h2><Link href="/">← Back to home</Link></div>;
    }

    const images: string[] = product.images?.length ? product.images : ['/img/placeholder.png'];
    const priceDisplay = fmtBDT(product.price);
    const salePriceDisplay = product.salePrice ? fmtBDT(product.salePrice) : null;
    const specs: Record<string, string> = product.specs ?? {};

    return (
        <div className="container product-detail-container" style={{paddingTop: '20px', paddingBottom: '100px'}}>
            <div className="pdp-container">
                <div className="pdp-left">
                    <div className="pdp-main-media" style={{position:'relative', overflow:'hidden', borderRadius:'12px', border:'1px solid #efefef', padding:'20px'}}>
                        <img src={images[activeImage]} alt={product.title} style={{width:'100%', objectFit:'contain', transition:'transform 0.3s ease'}} className="zoom-hover" />
                    </div>
                    {images.length > 1 && (
                        <div className="pdp-gallery-thumbs" style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                            {images.map((img: string, idx: number) => (
                                <div key={idx} onClick={() => setActiveImage(idx)} style={{width:'80px', height:'80px', borderRadius:'8px', border: activeImage === idx ? '2px solid #1B5B97' : '1px solid #eee', cursor:'pointer', padding:'5px', opacity: activeImage === idx ? 1 : 0.6}}>
                                    <img src={img} alt="thumb" style={{width:'100%', height:'100%', objectFit:'contain'}} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="pdp-right">
                    {product.category && (
                        <Link href={`/category/${product.category.id}`} style={{fontSize:'12px', color:'#1B5B97', textDecoration:'none', marginBottom:'8px', display:'block'}}>
                            {product.category.name}
                        </Link>
                    )}
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-rating">
                        <span className="stars">{'★'.repeat(Math.floor(product.rating || 4))}</span>
                        <span className="review-count">({product.reviewCount || 0} reviews)</span>
                    </div>

                    <div className="product-price-section">
                        <span className="current-price">{priceDisplay}</span>
                        {salePriceDisplay && <span className="old-price">{salePriceDisplay}</span>}
                    </div>

                    {product.brand && (
                        <p style={{fontSize:'13px', color:'#666', margin:'4px 0 12px'}}>Brand: <strong>{product.brand}</strong></p>
                    )}

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

                    <DeliveryEstimator price={product.price} />
                </div>
            </div>

            <div className="product-tabs" style={{marginTop:'60px', background:'white', borderRadius:'12px', border:'1px solid #eee', overflow:'hidden'}}>
                <div className="tab-headers">
                    <button onClick={()=>setActiveTab('specs')} className={`tab-header ${activeTab==='specs'?'active':''}`}>Specifications</button>
                    <button onClick={()=>setActiveTab('reviews')} className={`tab-header ${activeTab==='reviews'?'active':''}`}>Reviews ({product.reviewCount || 0})</button>
                    <button onClick={()=>setActiveTab('qa')} className={`tab-header ${activeTab==='qa'?'active':''}`}>Q&A</button>
                </div>
                <div className="tab-content" style={{padding:'30px'}}>
                    {activeTab === 'specs' && (
                        <div className="specifications">
                            <h3 className="delivery-title">Key Specifications</h3>
                            {Object.keys(specs).length > 0 ? (
                                <table style={{width:'100%', borderCollapse:'collapse', marginTop:'15px', fontSize:'14px'}}>
                                    <tbody>
                                        {Object.entries(specs).map(([key, val]) => (
                                            <tr key={key} style={{borderBottom:'1px solid #f0f0f0'}}>
                                                <td style={{padding:'10px 12px', color:'#888', width:'40%', textTransform:'capitalize'}}>{key.replace(/([A-Z])/g,' $1').trim()}</td>
                                                <td style={{padding:'10px 12px', color:'#333', fontWeight:500}}>{val}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p style={{color:'#888', marginTop:'15px'}}>No specifications available for this product.</p>
                            )}
                        </div>
                    )}
                    {activeTab === 'reviews' && (
                        <div className="reviews-section" style={{maxWidth:'800px'}}>
                            <div className="review-summary" style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
                                <div className="review-score">
                                    <div className="score">{product.rating || 0}</div>
                                    <StarRating rating={product.rating || 0} />
                                    <div className="count">Based on {product.reviewCount || 0} reviews</div>
                                </div>
                                <button className="quick-spec-btn" style={{position:'static', transform:'none', opacity:1, pointerEvents:'auto'}} onClick={() => document.getElementById('review-form-scroll')?.scrollIntoView({ behavior: 'smooth' })}>Write a Review</button>
                            </div>

                            {/* Review Form */}
                            <div id="review-form-scroll" style={{padding:'25px', background:'#fbfbfb', borderRadius:'12px', border:'1px solid #eee', marginBottom:'40px'}}>
                                <h3 style={{fontSize:'18px', fontWeight:700, marginBottom:'20px'}}>Write a Review</h3>
                                <div style={{marginBottom:'15px'}}>
                                    <label style={{display:'block', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Rating</label>
                                    <div style={{display:'flex', gap:'5px', fontSize:'24px', color:'#ccc', cursor:'pointer'}}>
                                        {[1,2,3,4,5].map(s => (
                                            <span key={s} onClick={() => setReviewForm({...reviewForm, rating: s})} style={{color: s <= reviewForm.rating ? '#ff6b00' : '#ccc'}}>★</span>
                                        ))}
                                    </div>
                                </div>
                                <div style={{marginBottom:'15px'}}>
                                    <label style={{display:'block', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Review Title</label>
                                    <input type="text" style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #ddd'}} value={reviewForm.title} onChange={e => setReviewForm({...reviewForm, title: e.target.value})} placeholder="Example: Great product!" />
                                </div>
                                <div style={{marginBottom:'20px'}}>
                                    <label style={{display:'block', fontSize:'13px', fontWeight:600, marginBottom:'8px'}}>Your Review</label>
                                    <textarea style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #ddd', minHeight:'100px'}} value={reviewForm.content} onChange={e => setReviewForm({...reviewForm, content: e.target.value})} placeholder="Tell us about your experience..."></textarea>
                                </div>
                                <button className="add-to-cart-btn" style={{width:'auto', padding:'10px 25px'}} onClick={() => { alert('Thank you for your review! It has been submitted for moderation.'); setReviewForm({rating:5, title:'', content:''})}}>Submit Review</button>
                            </div>

                            <div className="reviews-list">
                                {product.reviews?.length > 0 ? product.reviews.map((r: any) => (
                                    <div key={r.id} className="review-card" style={{padding:'20px', border:'1px solid #eee', borderRadius:'12px', marginBottom:'15px', background:'white'}}>
                                        <div style={{display:'flex', justifyContent:'space-between'}}>
                                            <div>
                                                <StarRating rating={r.rating} />
                                                {r.title && <h4 style={{marginTop:'10px', fontSize:'16px', fontWeight:600}}>{r.title}</h4>}
                                                <p style={{color:'#666', fontSize:'14px', marginTop:'5px'}}>{r.content}</p>
                                            </div>
                                            <div style={{textAlign:'right', color:'#888', fontSize:'12px', minWidth:'100px'}}>
                                                <div><strong>{r.user?.name || r.guestName || 'Anonymous'}</strong>{r.verifiedPurchase && ' ✓'}</div>
                                                <div>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Recently'}</div>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <p style={{color:'#888', marginTop:'20px'}}>No reviews yet. Be the first to review this product!</p>
                                )}
                            </div>
                        </div>
                    )}
                    {activeTab === 'qa' && (
                        <div className="qa-section" style={{maxWidth:'800px'}}>
                            <div style={{padding:'25px', background:'#fbfbfb', borderRadius:'12px', border:'1px solid #eee', marginBottom:'40px'}}>
                                <h3 style={{fontSize:'18px', fontWeight:700, marginBottom:'20px'}}>Ask a Question</h3>
                                <div style={{marginBottom:'20px'}}>
                                    <textarea style={{width:'100%', padding:'10px', borderRadius:'6px', border:'1px solid #ddd', minHeight:'100px'}} value={questionForm} onChange={e => setQuestionForm(e.target.value)} placeholder="Type your question here..."></textarea>
                                </div>
                                <button className="add-to-cart-btn" style={{width:'auto', padding:'10px 25px'}} onClick={() => { alert('Your question has been submitted. We will answer it soon!'); setQuestionForm('')}}>Ask Question</button>
                            </div>
                            
                            <div className="qa-list">
                                <p style={{color:'#888'}}>No questions yet. Have a doubt? Ask away!</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className={`sticky-cart-bar ${showStickyCart ? 'visible' : ''}`}>
                <div className="container" style={{display:'flex', alignItems:'center', justifyContent:'space-between', maxWidth:'1200px'}}>
                    <div className="sticky-cart-left" style={{display:'flex', alignItems:'center', gap:'15px'}}>
                        <img src={images[0]} alt={product.title} style={{width:'40px', height:'40px', objectFit:'contain', background:'#fff', borderRadius:'4px', padding:'2px'}} />
                        <span style={{fontWeight:600, color:'#333'}} className="d-none-mobile">{product.title}</span>
                    </div>
                    <div className="sticky-cart-right" style={{display:'flex', alignItems:'center', gap:'20px'}}>
                        <span style={{fontSize:'20px', fontWeight:800, color:'#ff6b00'}}>{priceDisplay}</span>
                        <div className="quantity-selector d-none-mobile" style={{margin:0, padding:'2px'}}>
                            <button className="quantity-btn" style={{width:'32px', height:'32px'}} onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                            <span className="quantity-value" style={{fontSize:'14px', minWidth:'24px'}}>{qty}</span>
                            <button className="quantity-btn" style={{width:'32px', height:'32px'}} onClick={() => setQty(qty + 1)}>+</button>
                        </div>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product, qty, false)} style={{padding:'10px 20px', fontSize:'14px'}}>Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
