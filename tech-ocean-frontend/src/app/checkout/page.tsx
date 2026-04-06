'use client';

import React, { useState, useContext } from 'react';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cartItems, cartCount, setCartItems } = useContext(CartContext);
    const cartTotal = cartItems.reduce((sum, item) => sum + (parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0) * item.quantity, 0);
    
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        email: '',
        address: '',
        city: 'Dhaka City',
        district: 'Dhaka',
        paymentMethod: 'Cash on Delivery',
    });

    const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckout = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Order Placed Successfully via ${formData.paymentMethod}! Order ID: #TXO-${Math.floor(Math.random() * 1000000)}`);
        setCartItems([]); // Clear cart
        window.location.href = '/';
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
        <div className="container mt-4" style={{minHeight: '70vh'}}>
            <div className="page-header">
                <h1 className="page-title">Checkout</h1>
            </div>

            <div className="checkout-layout" style={{display: 'flex', gap: '30px', flexWrap: 'wrap-reverse'}}>
                <div className="checkout-left" style={{flex: '1.5', minWidth: '350px'}}>
                    <div style={{background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
                        <h3 style={{marginTop: 0, marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>Shipping Details</h3>
                        <form onSubmit={handleCheckout}>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="customerName" className="form-control" value={formData.customerName} onChange={handleInput} required />
                            </div>
                            <div className="form-group">
                                <label>Email Address *</label>
                                <input type="email" name="email" className="form-control" value={formData.email} onChange={handleInput} required />
                            </div>
                            <div className="form-group" style={{display: 'flex', gap: '20px'}}>
                                <div style={{flex: 1}}>
                                    <label>Phone Number *</label>
                                    <input type="tel" name="phone" className="form-control" value={formData.phone} onChange={handleInput} required />
                                </div>
                                <div style={{flex: 1}}>
                                    <label>District *</label>
                                    <input type="text" name="district" className="form-control" value={formData.district} onChange={handleInput} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Address *</label>
                                <textarea name="address" className="form-control" rows={3} value={formData.address} onChange={handleInput} required></textarea>
                            </div>

                            <h3 style={{marginTop: '40px', marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px'}}>Payment Method</h3>
                            <div className="payment-methods" style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                <label className={`payment-option ${formData.paymentMethod === 'Cash on Delivery' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer'}}>
                                    <input type="radio" name="paymentMethod" value="Cash on Delivery" checked={formData.paymentMethod === 'Cash on Delivery'} onChange={handleInput} />
                                    <span>Cash on Delivery (COD)</span>
                                </label>
                                <label className={`payment-option ${formData.paymentMethod === 'SSLCommerz' ? 'active' : ''}`} style={{display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #eee', borderRadius: '8px', cursor: 'pointer'}}>
                                    <input type="radio" name="paymentMethod" value="SSLCommerz" checked={formData.paymentMethod === 'SSLCommerz'} onChange={handleInput} />
                                    <span>Online Payment (Debit/Credit Card/Mobile Banking)</span>
                                </label>
                            </div>

                            <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '40px', padding: '18px', fontSize: '1.2em'}}>Place Order</button>
                        </form>
                    </div>
                </div>

                <div className="checkout-right" style={{flex: '1', minWidth: '300px'}}>
                    <div style={{background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: '100px'}}>
                        <h3 style={{marginTop: 0, paddingBottom: '15px', borderBottom: '1px solid #eee'}}>Order Summary</h3>
                        <div className="checkout-items" style={{maxHeight: '300px', overflowY: 'auto', marginTop: '15px'}}>
                            {cartItems.map((item) => (
                                <div key={item.id} style={{display: 'flex', gap: '15px', marginBottom: '15px', borderBottom: '1px solid #fafafa', paddingBottom: '10px'}}>
                                    <img src={item.imgUrl || '/img/placeholder.png'} alt={item.title} style={{width: '50px', height: '50px', objectFit: 'contain'}} />
                                    <div style={{flex: 1}}>
                                        <div style={{fontSize: '0.9em', fontWeight: 500}}>{item.title}</div>
                                        <div style={{fontSize: '0.85em', color: '#666'}}>Qty: {item.quantity} × {item.price}</div>
                                    </div>
                                    <div style={{fontWeight: '500'}}>৳{((parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0) * item.quantity).toLocaleString()}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{paddingTop: '15px', borderTop: '2px solid #eee', marginTop: '15px'}}>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <span>Subtotal</span>
                                <strong>৳{cartTotal.toLocaleString()}</strong>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '1.2em'}}>
                                <span>Total Payable</span>
                                <strong style={{color: '#ef4a23'}}>৳{cartTotal.toLocaleString()}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
