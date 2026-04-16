'use client';

import React, { useState, useContext } from 'react';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cartItems, setCartItems } = useContext(CartContext);
    const router = useRouter();

    const cartSubtotal = cartItems.reduce((sum, item) => sum + (parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0) * item.quantity, 0);
    
    // States
    const [couponInput, setCouponInput] = useState('');
    const [discountAmt, setDiscountAmt] = useState(0);
    const [deliveryMode, setDeliveryMode] = useState('Express');
    const [paymentMode, setPaymentMode] = useState('COD');
    
    const [formData, setFormData] = useState({
        email: '', subscribe: false,
        firstName: '', lastName: '', country: 'Bangladesh', district: '', thana: '',
        address1: '', address2: '', postalCode: '', phone: '', saveAddress: false
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.currentTarget;
        const checked = (e.currentTarget as HTMLInputElement).checked;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    // Core Math
    let shippingCost = 0;
    if (deliveryMode === 'Standard') shippingCost = cartSubtotal >= 5000 ? 0 : 60;
    if (deliveryMode === 'Express') shippingCost = 120;
    if (deliveryMode === 'Same Day') shippingCost = 200;

    const taxAmount = cartSubtotal * 0.15; // 15% VAT
    const grandTotal = cartSubtotal + shippingCost + taxAmount - discountAmt;

    const handleApplyCoupon = (e: React.MouseEvent) => {
        e.preventDefault();
        const code = couponInput.trim().toUpperCase();
        if (code === 'SAVE10') {
            setDiscountAmt((cartSubtotal) * 0.10);
            alert('Coupon SAVE10 applied! 10% off subtotal.');
        } else if (code === 'FREESHIP') {
            setDiscountAmt(shippingCost);
            alert('Coupon FREESHIP applied! Free shipping allocated.');
        } else if (code === 'NEWUSER') {
            setDiscountAmt(500);
            alert('Welcome discount applied!');
        } else {
            alert('Invalid coupon code!');
        }
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Order Placed Successfully via ${paymentMode}! Order ID: #TXO-${Math.floor(Math.random() * 1000000)}`);
        setCartItems([]); // Clear cart
        router.push('/');
    };

    const handleRemoveItem = (id: string | number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    if (cartItems.length === 0) {
        return (
            <div className="container" style={{padding: '100px 0', textAlign: 'center'}}>
                <h2>Your cart is empty</h2>
                <Link href="/" className="btn-primary" style={{display: 'inline-block', marginTop: '20px'}}>Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-progress">
                <div className="progress-step completed">
                    <div className="step-number"><i className="fas fa-check"></i></div>
                    <div className="step-label">Cart</div>
                </div>
                <div className="progress-step active">
                    <div className="step-number">2</div>
                    <div className="step-label">Shipping</div>
                </div>
                <div className="progress-step">
                    <div className="step-number">3</div>
                    <div className="step-label">Payment</div>
                </div>
                <div className="progress-step">
                    <div className="step-number">4</div>
                    <div className="step-label">Confirmation</div>
                </div>
            </div>

            <form onSubmit={handleCheckout} className="checkout-grid">
                
                {/* LEFT COLUMN */}
                <div className="checkout-left">
                    
                    {/* SECTION 1: Contact */}
                    <div className="checkout-section">
                        <div className="checkout-section-title">
                            <div>Contact Information</div>
                            <span className="step-badge"><i className="fas fa-check"></i></span>
                        </div>
                        <div className="checkout-input-group">
                            <label>Email Address *</label>
                            <input type="email" name="email" autoComplete="email" className="checkout-input" value={formData.email} onChange={handleInput} placeholder="your@email.com" required />
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px'}}>
                            <input type="checkbox" name="subscribe" checked={formData.subscribe} onChange={handleInput} id="chk-newsletter" />
                            <label htmlFor="chk-newsletter" style={{fontSize: '13px', color: '#555', cursor: 'pointer', margin: 0}}>Sign up for newsletter (optional)</label>
                        </div>
                    </div>

                    {/* SECTION 2: Shipping */}
                    <div className="checkout-section">
                        <div className="checkout-section-title">
                            <div>Shipping Address</div>
                            <span className="step-badge">2</span>
                        </div>
                        
                        <div className="checkout-row">
                            <div className="checkout-input-group">
                                <label>First Name *</label>
                                <input type="text" name="firstName" autoComplete="given-name" className="checkout-input" value={formData.firstName} onChange={handleInput} required />
                            </div>
                            <div className="checkout-input-group">
                                <label>Last Name *</label>
                                <input type="text" name="lastName" autoComplete="family-name" className="checkout-input" value={formData.lastName} onChange={handleInput} required />
                            </div>
                        </div>

                        <div className="checkout-input-group">
                            <label>Country *</label>
                            <select name="country" autoComplete="country" className="checkout-input" value={formData.country} onChange={handleInput} required>
                                <option value="Bangladesh">Bangladesh</option>
                            </select>
                        </div>

                        <div className="checkout-row">
                            <div className="checkout-input-group">
                                <label>District/City *</label>
                                <input type="text" name="district" autoComplete="address-level2" className="checkout-input" value={formData.district} onChange={handleInput} required />
                            </div>
                            <div className="checkout-input-group">
                                <label>Thana/Upazila *</label>
                                <input type="text" name="thana" className="checkout-input" value={formData.thana} onChange={handleInput} required />
                            </div>
                        </div>

                        <div className="checkout-input-group">
                            <label>Address Line 1 *</label>
                            <input type="text" name="address1" autoComplete="address-line1" className="checkout-input" placeholder="House/Flat/Road No." value={formData.address1} onChange={handleInput} required />
                        </div>

                        <div className="checkout-input-group">
                            <label>Address Line 2 (Optional)</label>
                            <input type="text" name="address2" autoComplete="address-line2" className="checkout-input" placeholder="Apartment, Floor, Landmark" value={formData.address2} onChange={handleInput} />
                        </div>

                        <div className="checkout-row">
                            <div className="checkout-input-group">
                                <label>Postal Code *</label>
                                <input type="text" name="postalCode" autoComplete="postal-code" className="checkout-input" value={formData.postalCode} onChange={handleInput} required />
                            </div>
                            <div className="checkout-input-group">
                                <label>Phone Number *</label>
                                <input type="tel" name="phone" autoComplete="tel" className="checkout-input" value={formData.phone} onChange={handleInput} required />
                            </div>
                        </div>

                        <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginTop: '15px'}}>
                            <input type="checkbox" name="saveAddress" checked={formData.saveAddress} onChange={handleInput} id="chk-save" />
                            <label htmlFor="chk-save" style={{fontSize: '13px', color: '#555', cursor: 'pointer', margin: 0}}>Save this address for next time</label>
                        </div>
                    </div>

                    {/* SECTION 3: Delivery */}
                    <div className="checkout-section">
                        <div className="checkout-section-title">
                            <div>Delivery Method</div>
                            <span className="step-badge">3</span>
                        </div>
                        
                        <label className={`delivery-option ${deliveryMode === 'Standard' ? 'active' : ''}`}>
                            <input type="radio" name="deliveryMode" className="delivery-option-radio" value="Standard" checked={deliveryMode === 'Standard'} onChange={(e) => setDeliveryMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">Standard Delivery (3-5 business days)</div>
                                <div className="delivery-option-desc">Free shipping on orders over ৳5000</div>
                            </div>
                            <div className="delivery-option-price">{cartSubtotal >= 5000 ? 'Free' : '৳60'}</div>
                        </label>
                        
                        <label className={`delivery-option ${deliveryMode === 'Express' ? 'active' : ''}`}>
                            <input type="radio" name="deliveryMode" className="delivery-option-radio" value="Express" checked={deliveryMode === 'Express'} onChange={(e) => setDeliveryMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">Express Delivery (1-2 business days)</div>
                                <div className="delivery-option-desc">Priority handling and fast delivery</div>
                            </div>
                            <div className="delivery-option-price">৳120</div>
                        </label>
                        
                        <label className={`delivery-option ${deliveryMode === 'Same Day' ? 'active' : ''}`}>
                            <input type="radio" name="deliveryMode" className="delivery-option-radio" value="Same Day" checked={deliveryMode === 'Same Day'} onChange={(e) => setDeliveryMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">Same Day Delivery (Within Dhaka only)</div>
                                <div className="delivery-option-desc">Order before 12 PM for same day delivery</div>
                            </div>
                            <div className="delivery-option-price">৳200</div>
                        </label>
                    </div>

                    {/* SECTION 4: Payment */}
                    <div className="checkout-section">
                        <div className="checkout-section-title">
                            <div>Payment Method</div>
                            <span className="step-badge">4</span>
                        </div>

                        <label className={`delivery-option ${paymentMode === 'COD' ? 'active' : ''}`}>
                            <input type="radio" name="paymentMode" className="delivery-option-radio" value="COD" checked={paymentMode === 'COD'} onChange={(e) => setPaymentMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">Cash on Delivery (COD)</div>
                                <div className="delivery-option-desc">Pay when you receive your order</div>
                            </div>
                        </label>

                        <label className={`delivery-option ${paymentMode === 'Card' ? 'active' : ''}`} style={{alignItems: 'center'}}>
                            <input type="radio" name="paymentMode" className="delivery-option-radio" value="Card" checked={paymentMode === 'Card'} onChange={(e) => setPaymentMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title" style={{marginBottom: 0}}>Credit/Debit Card (Visa, Mastercard, Amex)</div>
                            </div>
                            <div style={{display: 'flex', gap: '5px'}}>
                                <i className="fab fa-cc-visa" style={{fontSize: '24px', color: '#1a1f71'}}></i>
                                <i className="fab fa-cc-mastercard" style={{fontSize: '24px', color: '#eb001b'}}></i>
                                <i className="fab fa-cc-amex" style={{fontSize: '24px', color: '#002663'}}></i>
                            </div>
                        </label>

                        <label className={`delivery-option ${paymentMode === 'Mobile' ? 'active' : ''}`}>
                            <input type="radio" name="paymentMode" className="delivery-option-radio" value="Mobile" checked={paymentMode === 'Mobile'} onChange={(e) => setPaymentMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">Mobile Banking (bKash, Nagad, Rocket)</div>
                            </div>
                        </label>

                        <label className={`delivery-option ${paymentMode === 'SSLCommerz' ? 'active' : ''}`}>
                            <input type="radio" name="paymentMode" className="delivery-option-radio" value="SSLCommerz" checked={paymentMode === 'SSLCommerz'} onChange={(e) => setPaymentMode(e.target.value)} />
                            <div className="delivery-option-details">
                                <div className="delivery-option-title">SSLCommerz (All cards & mobile banking)</div>
                            </div>
                        </label>
                    </div>
                </div>
                
                {/* RIGHT COLUMN */}
                <div className="checkout-right">
                    <div className="order-summary">
                        <h3 style={{marginTop: 0, paddingBottom: '15px', borderBottom: '1px solid #eef2f6', fontSize: '16px'}}>ORDER SUMMARY ({cartItems.length} items)</h3>
                        
                        <div style={{maxHeight: '350px', overflowY: 'auto'}}>
                            {cartItems.map((item) => {
                                const itemPx = parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0;
                                return (
                                    <div className="order-item" key={item.id}>
                                        <div className="order-item-image">
                                            <img src={item.imgUrl || '/img/placeholder.png'} alt={item.title} />
                                        </div>
                                        <div className="order-item-details">
                                            <div className="order-item-title">{item.title}</div>
                                            <div className="order-item-price">Qty: {item.quantity} × ৳{itemPx.toLocaleString()} = <strong>৳{(itemPx * item.quantity).toLocaleString()}</strong></div>
                                            <button type="button" className="order-item-remove" onClick={() => handleRemoveItem(item.id)}>[Remove] ✗</button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="coupon-box">
                            <input type="text" placeholder="Enter coupon code" value={couponInput} onChange={e => setCouponInput(e.target.value)} />
                            <button type="button" onClick={handleApplyCoupon}>Apply</button>
                        </div>
                        <div style={{fontSize: '11px', color: '#888', marginTop: '8px', paddingBottom: '15px', borderBottom: '1px solid #eef2f6'}}>Available: SAVE10, FREESHIP, NEWUSER</div>

                        <div className="order-totals">
                            <div className="total-row">
                                <span>Subtotal</span>
                                <span>৳{cartSubtotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="total-row">
                                <span>Shipping ({deliveryMode})</span>
                                <span>৳{shippingCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className="total-row">
                                <span>Tax (15% VAT)</span>
                                <span>৳{taxAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            {discountAmt > 0 && (
                                <div className="total-row discount">
                                    <span>Discount</span>
                                    <span>-৳{discountAmt.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                            )}
                            
                            <div className="total-row grand-total">
                                <span>TOTAL</span>
                                <span>৳{grandTotal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                        </div>

                        <button type="submit" className="place-order-btn">PLACE ORDER</button>
                        
                        <div className="secure-badge">
                            <i className="fas fa-lock"></i>
                            <div>
                                <strong>Secure Payment</strong>
                                <div style={{fontSize: '11px', color: '#666', fontWeight: 400}}>Payment information is encrypted and secure</div>
                            </div>
                        </div>

                        <div style={{textAlign: 'center', fontSize: '13px', color: '#666', marginTop: '15px'}}>
                            Need help? Call us: <strong>+880 16793</strong>
                        </div>
                    </div>

                    <div className="trust-badges">
                        <div className="trust-item"><i className="fas fa-shield-alt"></i> 100% Secure Payment</div>
                        <div className="trust-item"><i className="fas fa-undo"></i> Easy Returns (7 days)</div>
                        <div className="trust-item"><i className="fas fa-headset"></i> 24/7 Customer Support</div>
                        <div className="trust-item"><i className="fas fa-check-circle"></i> 100% Genuine Products</div>
                    </div>
                </div>
            </form>
        </div>
    );
}
