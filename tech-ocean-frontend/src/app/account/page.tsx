'use client';

import React, { useState, useContext } from 'react';
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

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUserState({ isLoggedIn: false, user: null, token: null });
        router.push('/');
        showToast('Logged out successfully', 'success');
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

    // ── Render Dashboard (If Logged In) ───────────────────────────────────────────
    if (userState.isLoggedIn) {
        return (
            <div className="dashboard-container">
                <div className="dashboard-sidebar">
                    <h3>Hello, {userState.user?.name}</h3>
                    <div className="dashboard-menu">
                        <button className="dashboard-menu-item active"><i className="fas fa-tachometer-alt"></i> Dashboard</button>
                        <button className="dashboard-menu-item"><i className="fas fa-box"></i> My Orders</button>
                        <button className="dashboard-menu-item"><i className="fas fa-heart"></i> Wishlist</button>
                        <button className="dashboard-menu-item"><i className="fas fa-desktop"></i> Saved PC Builds</button>
                        <button className="dashboard-menu-item"><i className="fas fa-video"></i> Saved CCTV Builds</button>
                        <button className="dashboard-menu-item"><i className="fas fa-map-marker-alt"></i> Saved Addresses</button>
                        <button className="dashboard-menu-item"><i className="fas fa-user-cog"></i> Profile Settings</button>
                        <div style={{borderTop:'1px solid #eee', margin: '10px 0'}}></div>
                        <button className="dashboard-menu-item" onClick={handleLogout} style={{color: '#dc3545'}}><i className="fas fa-sign-out-alt" style={{color: '#dc3545'}}></i> Logout</button>
                    </div>
                </div>

                <div className="dashboard-main">
                    <div className="dash-stats">
                        <div className="dash-stat-card">
                            <h4>Orders</h4>
                            <div className="val">3</div>
                        </div>
                        <div className="dash-stat-card">
                            <h4>Wishlist</h4>
                            <div className="val">5</div>
                        </div>
                        <div className="dash-stat-card">
                            <h4>Saved PC</h4>
                            <div className="val">2</div>
                        </div>
                        <div className="dash-stat-card">
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
                                <td><button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>View Details</button></td>
                            </tr>
                            <tr>
                                <td>#ST-20240328-002</td>
                                <td>Mar 28, 2024</td>
                                <td>৳5,600</td>
                                <td><span className="badge-status shipped">Shipped</span></td>
                                <td><button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>View Details</button></td>
                            </tr>
                            <tr>
                                <td>#ST-20240315-003</td>
                                <td>Mar 15, 2024</td>
                                <td>৳2,500</td>
                                <td><span className="badge-status delivered">Delivered</span></td>
                                <td><button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>View Details</button></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <h3 style={{fontSize: '18px', marginBottom: '15px', marginTop: '40px'}}>Saved PC Builds</h3>
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
                                <td>Gaming PC Build 2024</td>
                                <td>৳85,000</td>
                                <td>
                                    <div style={{display:'flex', gap:'10px'}}>
                                        <button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>[Load]</button>
                                        <button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>[Edit]</button>
                                        <button style={{background:'none', border:'none', color:'#ff4444', cursor:'pointer', fontWeight:600}}>[Delete]</button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Office PC Build</td>
                                <td>৳35,000</td>
                                <td>
                                    <div style={{display:'flex', gap:'10px'}}>
                                        <button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>[Load]</button>
                                        <button style={{background:'none', border:'none', color:'#1B5B97', cursor:'pointer', fontWeight:600}}>[Edit]</button>
                                        <button style={{background:'none', border:'none', color:'#ff4444', cursor:'pointer', fontWeight:600}}>[Delete]</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
