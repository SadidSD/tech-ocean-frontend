'use client';

import React, { useContext } from 'react';
import { CartContext } from '@/components/ClientApplication';
import Link from 'next/link';

export default function CartPage() {
    const { cartItems, setCartItems, cartCount } = useContext(CartContext);
    const cartTotal = cartItems.reduce((sum, item) => sum + (parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0) * item.quantity, 0);

    const updateQty = (id: number, delta: number) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                return { ...item, quantity: Math.max(1, item.quantity + delta) };
            }
            return item;
        }));
    };

    const removeItem = (id: number) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="container mt-4" style={{minHeight: '60vh'}}>
            <div className="page-header">
                <h1 className="page-title">Shopping Cart</h1>
            </div>
            
            {cartItems.length === 0 ? (
                <div style={{textAlign: 'center', padding: '100px 0'}}>
                    <i className="fas fa-shopping-basket" style={{fontSize:'60px', color:'#eee', marginBottom:'20px'}}></i>
                    <h3>Your cart is empty</h3>
                    <p>Go back to the <Link href="/">Shop</Link> and find something awesome!</p>
                </div>
            ) : (
                <div className="cart-layout" style={{display: 'flex', gap: '30px', flexWrap: 'wrap'}}>
                    <div className="cart-left" style={{flex: '2'}}>
                        <div className="cart-table-wrap" style={{background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead style={{background: '#f8f9fa'}}>
                                    <tr>
                                        <th style={{padding: '15px', textAlign: 'left'}}>Image</th>
                                        <th style={{padding: '15px', textAlign: 'left'}}>Product</th>
                                        <th style={{padding: '15px', textAlign: 'center'}}>Price</th>
                                        <th style={{padding: '15px', textAlign: 'center'}}>Quantity</th>
                                        <th style={{padding: '15px', textAlign: 'right'}}>Total</th>
                                        <th style={{padding: '15px', textAlign: 'center'}}>Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id} style={{borderTop: '1px solid #eee'}}>
                                            <td style={{padding: '15px'}}>
                                                <img src={item.imgUrl || '/img/placeholder.png'} alt={item.title} style={{width: '60px', height: '60px', objectFit: 'contain'}} />
                                            </td>
                                            <td style={{padding: '15px'}}>
                                                <Link href={`/product/${item.id}`} style={{fontWeight: '500', color: '#111'}}>{item.title}</Link>
                                            </td>
                                            <td style={{padding: '15px', textAlign: 'center'}}>{item.price}</td>
                                            <td style={{padding: '15px', textAlign: 'center'}}>
                                                <div className="qty-selector" style={{display: 'inline-flex'}}>
                                                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                                                    <input type="text" className="qty-input" value={item.quantity} readOnly style={{width: '40px', textAlign: 'center'}} />
                                                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                                                </div>
                                            </td>
                                            <td style={{padding: '15px', textAlign: 'right'}}>
                                                ৳{((parseFloat(String(item.price).replace(/,/g,'').replace('৳','')) || 0) * item.quantity).toLocaleString()}
                                            </td>
                                            <td style={{padding: '15px', textAlign: 'center'}}>
                                                <button onClick={() => removeItem(item.id)} style={{background: 'none', border: 'none', color: '#dc3545', cursor: 'pointer', fontSize: '18px'}}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="cart-right" style={{flex: '1', minWidth: '300px'}}>
                        <div className="cart-summary" style={{background: '#fff', padding: '25px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)'}}>
                            <h3 style={{marginTop: 0, borderBottom: '1px solid #eee', paddingBottom: '15px'}}>Cart Summary</h3>
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                                <span>Subtotal</span>
                                <strong>৳{cartTotal.toLocaleString()}</strong>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '20px 0'}}>
                                <span>Shipping</span>
                                <span>Calculated at checkout</span>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'space-between', margin: '25px 0', borderTop: '2px solid #eee', paddingTop: '20px', fontSize: '1.2em'}}>
                                <span>Total</span>
                                <strong style={{color: '#ef4a23'}}>৳{cartTotal.toLocaleString()}</strong>
                            </div>
                            <Link href="/checkout" className="btn-primary" style={{display: 'block', textAlign: 'center', padding: '15px', fontSize: '1.1em'}}>Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
