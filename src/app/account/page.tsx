'use client';

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/components/ClientApplication';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AccountPage() {
    const { userState, setUserState, showToast } = useContext(AuthContext);
    const router = useRouter();

    // ── Local UI States ─────────────────────────────────────────────────────────────
    const [activeTab, setActiveTab] = useState<'login' | 'signup' | 'forgot'>('login');
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showSignupPassword, setShowSignupPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ── Form Inputs ───────────────────────────────────────────────────────────────
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPhone, setSignupPhone] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirm, setSignupConfirm] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    // ── Dashboard States ──────────────────────────────────────────────────────────
    const [activeSubTab, setActiveSubTab] = useState<'dash' | 'orders' | 'wishlist' | 'pc' | 'cctv' | 'address' | 'profile'>('dash');

    // Handle query params for direct tab access
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const tab = params.get('tab');
            if (tab && ['dash', 'orders', 'wishlist', 'pc', 'cctv', 'address', 'profile'].includes(tab)) {
                setActiveSubTab(tab as any);
            }
        }
    }, []);

    // ── Handlers ──────────────────────────────────────────────────────────────────
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginEmail && loginPassword) {
            const mockUser = {
                id: "user_" + Math.floor(Math.random() * 1000),
                name: loginEmail.split('@')[0] || "User",
                email: loginEmail,
                phone: "017XXXXXXXX",
                avatar: "/images/avatar.png",
                joinDate: "2024-01-01"
            };
            const nextState = { isLoggedIn: true, user: mockUser, token: "mock_jwt_token_123" };
            setUserState(nextState);
            localStorage.setItem('user', JSON.stringify(nextState));
            showToast('Login successful! Redirecting...', 'success');
        } else {
            showToast('Invalid email or password', 'error');
        }
    };

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agreeTerms) return;
        if (signupPassword !== signupConfirm) {
            showToast('Passwords do not match!', 'error');
            return;
        }
        const mockUser = {
            id: "user_" + Math.floor(Math.random() * 1000),
            name: signupName || "New User",
            email: signupEmail,
            phone: signupPhone,
            avatar: "/images/avatar.png",
            joinDate: new Date().toISOString()
        };
        const nextState = { isLoggedIn: true, user: mockUser, token: "mock_jwt_token_123" };
        setUserState(nextState);
        localStorage.setItem('user', JSON.stringify(nextState));
        showToast('Account created successfully!', 'success');
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        showToast('Password reset link sent to your email', 'success');
        setActiveTab('login');
    };

    // ── Password Strength Logic ───────────────────────────────────────────────────
    const getPasswordStrength = (pass: string) => {
        if (!pass) return { class: '', label: '' };
        if (pass.length < 6) return { class: 'weak', label: 'Weak' };
        if (pass.length < 10) return { class: 'medium', label: 'Medium' };
        return { class: 'strong', label: 'Strong' };
    };
    const strength = getPasswordStrength(signupPassword);

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserState({ isLoggedIn: false, user: null, token: null });
        router.push('/');
        showToast('Logged out successfully', 'success');
    };

    // ── Sub-component Renders ─────────────────────────────────────────────────────
    const renderDashboard = () => (
        <>
            <div className="dash-stats">
                <div className="dash-stat-card" onClick={() => setActiveSubTab('orders')}>
                    <h4>Orders</h4>
                    <div className="val">3</div>
                </div>
                <div className="dash-stat-card" onClick={() => setActiveSubTab('wishlist')}>
                    <h4>Wishlist</h4>
                    <div className="val">5</div>
                </div>
                <div className="dash-stat-card" onClick={() => setActiveSubTab('pc')}>
                    <h4>Saved PC</h4>
                    <div className="val">2</div>
                </div>
                <div className="dash-stat-card" onClick={() => setActiveSubTab('address')}>
                    <h4>Addresses</h4>
                    <div className="val">2</div>
                </div>
            </div>
            <h3 style={{fontSize: '18px', marginBottom: '15px'}}>Recent Orders</h3>
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ST-20240401-001</td>
                        <td>Apr 01, 2024</td>
                        <td>৳12,500</td>
                        <td><span className="badge-status delivered">Delivered</span></td>
                        <td><button className="view-link">View Details</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );

    const renderOrders = () => (
        <div className="dash-content-area">
            <h2 className="content-title">My Orders</h2>
            <div className="orders-list">
                {[1,2,3].map(i => (
                    <div key={i} className="order-item-card">
                        <div className="order-info">
                            <div className="id">#ST-20240{i}-00{i}</div>
                            <div className="date">Placed on Oct {10+i}, 2024</div>
                        </div>
                        <div className="order-price">৳{ (i * 15400).toLocaleString() }</div>
                        <div className="order-status"><span className={`badge-status ${i === 2 ? 'shipped' : 'delivered'}`}>{i === 2 ? 'Shipped' : 'Delivered'}</span></div>
                        <button className="view-btn">Track Order</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderWishlist = () => (
        <div className="dash-content-area">
            <h2 className="content-title">My Wishlist</h2>
            <div className="wishlist-grid">
                {[1,2,3,4].map(i => (
                    <div key={i} className="wish-card">
                        <img src={`https://picsum.photos/200/200?random=${i}`} alt="product" />
                        <div className="info">
                            <h4>Premium Product {i}</h4>
                            <div className="price">৳1,200</div>
                            <button className="add-cart">Add to Cart</button>
                        </div>
                        <button className="remove-wish">&times;</button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSavedBuilds = (type: 'pc' | 'cctv') => (
        <div className="dash-content-area">
            <h2 className="content-title">Saved {type === 'pc' ? 'PC' : 'CCTV'} Builds</h2>
            <table className="dash-table">
                <thead>
                    <tr>
                        <th>Build Name</th>
                        <th>Est. Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>My {type === 'pc' ? 'Gaming' : 'Office'} Build</td>
                        <td>৳{type === 'pc' ? '85,000' : '45,000'}</td>
                        <td>
                            <div style={{display:'flex', gap:'10px'}}>
                                <button className="dash-action-btn load">Load</button>
                                <button className="dash-action-btn delete">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    const renderAddresses = () => (
        <div className="dash-content-area">
            <h2 className="content-title">Saved Addresses</h2>
            <div className="address-grid">
                <div className="address-card active">
                    <div className="type">Home</div>
                    <div className="details">House 12, Road 4, Sector 7, Uttara, Dhaka</div>
                    <div className="phone">01712345678</div>
                    <div className="actions">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </div>
                <div className="address-card add-new">
                    <i className="fas fa-plus"></i>
                    <span>Add New Address</span>
                </div>
            </div>
        </div>
    );

    const renderProfile = () => (
        <div className="dash-content-area">
            <h2 className="content-title">Profile Settings</h2>
            <form className="profile-form" onSubmit={(e) => { e.preventDefault(); showToast('Profile updated!', 'success'); }}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" defaultValue={userState.user?.name} />
                    </div>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" defaultValue={userState.user?.email} disabled />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" defaultValue="01712345678" />
                    </div>
                </div>
                <button type="submit" className="save-btn">Save Changes</button>
            </form>
        </div>
    );

    // ── Render Dashboard (If Logged In) ───────────────────────────────────────────
    if (userState.isLoggedIn) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <div className="sidebar-header">
                        <div className="avatar">{(userState.user?.name || "A")[0]}</div>
                        <h3>Hello, {userState.user?.name || "User"}</h3>
                    </div>
                    <div className="dashboard-menu">
                        <button className={`dashboard-menu-item ${activeSubTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveSubTab('dash')}><i className="fas fa-tachometer-alt"></i> Dashboard</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveSubTab('orders')}><i className="fas fa-box"></i> My Orders</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'wishlist' ? 'active' : ''}`} onClick={() => setActiveSubTab('wishlist')}><i className="fas fa-heart"></i> Wishlist</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'pc' ? 'active' : ''}`} onClick={() => setActiveSubTab('pc')}><i className="fas fa-desktop"></i> Saved PC Builds</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'cctv' ? 'active' : ''}`} onClick={() => setActiveSubTab('cctv')}><i className="fas fa-video"></i> Saved CCTV Builds</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'address' ? 'active' : ''}`} onClick={() => setActiveSubTab('address')}><i className="fas fa-map-marker-alt"></i> Saved Addresses</button>
                        <button className={`dashboard-menu-item ${activeSubTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveSubTab('profile')}><i className="fas fa-user-cog"></i> Profile Settings</button>
                        <div style={{borderTop:'1px solid #eee', margin: '10px 0'}}></div>
                        <button className="dashboard-menu-item logout" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
                    </div>
                </div>

                <div className="dashboard-main">
                    {activeSubTab === 'dash' && renderDashboard()}
                    {activeSubTab === 'orders' && renderOrders()}
                    {activeSubTab === 'wishlist' && renderWishlist()}
                    {activeSubTab === 'pc' && renderSavedBuilds('pc')}
                    {activeSubTab === 'cctv' && renderSavedBuilds('cctv')}
                    {activeSubTab === 'address' && renderAddresses()}
                    {activeSubTab === 'profile' && renderProfile()}
                </div>
            </div>
        );
    }

    // ── Render Auth Screens (If Logged Out) ───────────────────────────────────────
    return (
        <div className="account-page">
            <div className="account-container">
                <div className="account-split">
                    
                    <div className="account-illustration">
                        <h2>Welcome Back!</h2>
                        <p>Sign in to access your orders, wishlist, saved PC builds, and exclusive member offers.</p>
                    </div>

                    <div className="account-form-container">
                        
                        {activeTab === 'forgot' ? (
                            <form onSubmit={handleForgotPassword} className="login-form">
                                <h3 style={{marginBottom: '5px', fontSize: '20px'}}>Forgot Password</h3>
                                <p style={{fontSize: '13px', color: '#666', marginBottom: '25px'}}>Enter your email address and we'll send you a link to reset your password.</p>
                                
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" placeholder="your@email.com" required />
                                </div>
                                <button type="submit" className="login-btn">Send Reset Link</button>
                                
                                <div style={{textAlign: 'center', marginTop: '20px'}}>
                                    <button type="button" onClick={() => setActiveTab('login')} className="forgot-link">← Back to Login</button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <div className="account-tabs">
                                    <button className={`account-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => setActiveTab('login')}>LOGIN</button>
                                    <button className={`account-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>SIGN UP</button>
                                </div>

                                {activeTab === 'login' && (
                                    <form className="login-form" onSubmit={handleLogin}>
                                        <div className="form-group">
                                            <label>Email or Phone Number *</label>
                                            <input type="text" placeholder="your@email.com or 01XXXXXXXXX" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                        </div>

                                        <div className="form-group">
                                            <label>Password *</label>
                                            <div className="password-input-wrapper">
                                                <input type={showLoginPassword ? "text" : "password"} placeholder="Enter your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                                <button type="button" onClick={() => setShowLoginPassword(!showLoginPassword)}>
                                                    {showLoginPassword ? "Hide" : "Show"}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="form-options">
                                            <label className="checkbox-label">
                                                <input type="checkbox" /> Remember Me
                                            </label>
                                            <button type="button" onClick={() => setActiveTab('forgot')} className="forgot-link">Forgot Password?</button>
                                        </div>

                                        <button type="submit" className="login-btn">Login</button>

                                        <div className="social-login">
                                            <p>Or login with</p>
                                            <div className="social-buttons">
                                                <button type="button" className="google-btn"><i className="fab fa-google"></i> Google</button>
                                                <button type="button" className="facebook-btn"><i className="fab fa-facebook-f"></i> Facebook</button>
                                            </div>
                                        </div>
                                    </form>
                                )}

                                {activeTab === 'signup' && (
                                    <form className="signup-form" onSubmit={handleSignup}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Full Name *</label>
                                                <input type="text" placeholder="John Doe" value={signupName} onChange={(e) => setSignupName(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Email Address *</label>
                                                <input type="email" placeholder="your@email.com" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required />
                                            </div>
                                            <div className="form-group">
                                                <label>Phone Number *</label>
                                                <input type="tel" placeholder="01XXXXXXXXX" value={signupPhone} onChange={(e) => setSignupPhone(e.target.value)} required />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Password *</label>
                                                <div className="password-input-wrapper">
                                                    <input type={showSignupPassword ? "text" : "password"} placeholder="Create a password" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required />
                                                    <button type="button" onClick={() => setShowSignupPassword(!showSignupPassword)}>
                                                        {showSignupPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                                <div className="password-strength">
                                                    <div className={`strength-bar ${strength.class}`}></div>
                                                    <span style={{color: strength.class === 'weak' ? '#ff4444' : strength.class === 'medium' ? '#ffa500' : '#00c853'}}>{strength.label}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Confirm Password *</label>
                                                <div className="password-input-wrapper">
                                                    <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={signupConfirm} onChange={(e) => setSignupConfirm(e.target.value)} required />
                                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                                        {showConfirmPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-options">
                                            <label className="checkbox-label">
                                                <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                                                <span>I agree to the <button type="button" className="forgot-link" style={{margin:0, padding:0}}>Terms & Conditions</button> and <button type="button" className="forgot-link" style={{margin:0, padding:0}}>Privacy Policy</button></span>
                                            </label>
                                        </div>

                                        <button type="submit" className="signup-btn" disabled={!agreeTerms}>Create Account</button>
                                        
                                        <p style={{fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '15px', lineHeight: 1.5}}>
                                            By signing up, you'll get access to order tracking, wishlist, saved builds, and exclusive offers.
                                        </p>
                                    </form>
                                )}
                            </>
                        )}
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
