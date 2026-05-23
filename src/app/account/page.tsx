'use client';

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '@/components/ClientApplication';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// ── Warranty Countdown Component ────────────────────────────────────────────
interface WarrantyCountdownProps {
    startDate: string;
    endDate: string;
    showToast: (msg: string, type: 'success' | 'error') => void;
}

const WarrantyCountdown: React.FC<WarrantyCountdownProps> = ({ startDate, endDate, showToast }) => {
    const [timeLeft, setTimeLeft] = useState({
        years: 0,
        months: 0,
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        percentRemaining: 100,
        isExpired: false
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            const now = new Date().getTime();
            const totalDuration = end - start;
            const remaining = end - now;

            if (remaining <= 0) {
                setTimeLeft(prev => ({ ...prev, percentRemaining: 0, isExpired: true }));
                return;
            }

            const years = Math.floor(remaining / (1000 * 60 * 60 * 24 * 365));
            const months = Math.floor((remaining % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
            const days = Math.floor((remaining % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
            const percentRemaining = Math.max(0, Math.min(100, (remaining / totalDuration) * 100));

            setTimeLeft({ years, months, days, hours, minutes, seconds, percentRemaining, isExpired: false });
        };

        calculateTimeLeft();
        const interval = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(interval);
    }, [startDate, endDate]);

    if (timeLeft.isExpired) {
        return (
            <div className="tech-warranty-expired">
                <div className="tech-expiry-status">
                    <span className="status-blink red"></span>
                    <span className="expired-text">WARRANTY EXPIRED</span>
                </div>
            </div>
        );
    }

    return (
        <div className="tech-countdown-container" style={{ width: '100%' }}>
            <div className="tech-digital-timer">
                <div className="tech-time-slot">
                    <span className="tech-digit">{timeLeft.years.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">YEARS</span>
                </div>
                <div className="tech-time-divider">:</div>
                <div className="tech-time-slot">
                    <span className="tech-digit">{timeLeft.months.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">MONTHS</span>
                </div>
                <div className="tech-time-divider">:</div>
                <div className="tech-time-slot">
                    <span className="tech-digit">{timeLeft.days.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">DAYS</span>
                </div>
                <div className="tech-time-divider tech-sub-divider">:</div>
                <div className="tech-time-slot tech-sub-time">
                    <span className="tech-digit small-digit">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">HOURS</span>
                </div>
                <div className="tech-time-divider tech-sub-divider">:</div>
                <div className="tech-time-slot tech-sub-time">
                    <span className="tech-digit small-digit">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">MINUTES</span>
                </div>
                <div className="tech-time-divider tech-sub-divider">:</div>
                <div className="tech-time-slot tech-sub-time">
                    <span className="tech-digit small-digit">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="tech-digit-label">SECONDS</span>
                </div>
            </div>
        </div>
    );
};

// ── Warranty End Date Calculator ─────────────────────────────────────────────
function calculateWarrantyEnd(purchaseDate: string, category: string, warrantyRules: any): string {
    const rules = warrantyRules || {};
    const cat = rules[category] || { standard: 1 };
    let years = parseInt(cat.standard) || 1;
    if (typeof cat.standard === 'string' && cat.standard.toLowerCase() === 'lifetime') {
        years = 25;
    }
    const end = new Date(purchaseDate);
    end.setFullYear(end.getFullYear() + years);
    return end.toISOString();
}

// ── MOCK ORDERS DATA ─────────────────────────────────────────────────────────
const MOCK_ORDERS_BASE = [
    {
        id: '#ST-20240401-001',
        status: 'delivered',
        statusLabel: 'Delivered',
        createdAt: '2024-04-01T10:00:00Z',
        totalAmount: 85000,
        primaryCategory: 'cpu',
        items: [
            { name: 'Intel Core i9-14900K Processor', image: '/images/cpu.png', quantity: 1, category: 'cpu' },
            { name: 'ASUS ROG STRIX Z790-E Motherboard', image: '/images/motherboard.png', quantity: 1, category: 'motherboard' },
            { name: 'Corsair Vengeance 32GB DDR5 RAM', image: '/images/ram.png', quantity: 2, category: 'ram' },
            { name: 'Samsung 980 Pro 2TB NVMe SSD', image: '/images/ssd.png', quantity: 1, category: 'ssd' },
        ]
    },
    {
        id: '#ST-20240215-002',
        status: 'delivered',
        statusLabel: 'Delivered',
        createdAt: '2024-02-15T14:30:00Z',
        totalAmount: 42500,
        primaryCategory: 'cctv_camera',
        items: [
            { name: 'Hikvision DS-2CD2143G2 4MP Camera', image: '/images/cctv.png', quantity: 4, category: 'cctv_camera' },
            { name: 'Dahua 16CH NVR Network Recorder', image: '/images/nvr.png', quantity: 1, category: 'nvr' },
        ]
    },
    {
        id: '#ST-20241010-003',
        status: 'shipped',
        statusLabel: 'Shipped',
        createdAt: '2024-10-10T09:15:00Z',
        totalAmount: 28900,
        primaryCategory: 'monitor',
        items: [
            { name: 'Dell UltraSharp 27" 4K Monitor', image: '/images/monitor.png', quantity: 1, category: 'monitor' },
            { name: 'Seasonic Focus GX 850W PSU', image: '/images/psu.png', quantity: 1, category: 'psu' },
        ]
    },
];

export default function AccountPage() {
    const { userState, setUserState, showToast } = useContext(AuthContext);
    const router = useRouter();

    const [warrantyRules, setWarrantyRules] = useState<any>(null);

    useEffect(() => {
        const fetchRules = async () => {
            try {
                const res = await fetch('/api/settings/warranty');
                if (res.ok) {
                    const data = await res.json();
                    setWarrantyRules(data);
                }
            } catch (err) {
                console.error('Failed to load warranty rules:', err);
            }
        };
        fetchRules();
    }, []);

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
                        <th>Warranty</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#ST-20240401-001</td>
                        <td>Apr 01, 2024</td>
                        <td>৳12,500</td>
                        <td><span className="badge-status delivered">Delivered</span></td>
                        <td><span className="badge-status warranty">1 Year Brand Warranty</span></td>
                        <td><button className="view-link">View Details</button></td>
                    </tr>
                </tbody>
            </table>
        </>
    );

    const renderOrders = () => {
        // Build orders with dynamic warranty end dates
        const orders = MOCK_ORDERS_BASE.map(order => ({
            ...order,
            warrantyEndDate: calculateWarrantyEnd(order.createdAt, order.primaryCategory, warrantyRules)
        }));

        return (
            <div className="dash-content-area">
                <h2 className="content-title">My Orders</h2>
                <div className="orders-list">
                    {orders.map((order, i) => (
                        <div key={i} className="order-card">
                            {/* Order Header */}
                            <div className="order-header">
                                <div className="order-header-left">
                                    <div className="order-id">{order.id}</div>
                                    <div className="order-date-small">
                                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </div>
                                </div>
                                <span className={`badge-status ${order.status}`}>{order.statusLabel}</span>
                            </div>

                            {/* Tech Telemetry Grid: Order Date | Warranty Till | Total Amount */}
                            <div className="tech-order-dashboard">
                                <div className="tech-telemetry-grid">
                                    {/* Block 1: Purchase Date */}
                                    <div className="tech-telemetry-block blue">
                                        <div className="block-accent"></div>
                                        <div className="block-header">
                                            <span className="block-code">[SYS_PURCHASE_DATE]</span>
                                            <i className="fas fa-calendar-alt block-icon"></i>
                                        </div>
                                        <div className="block-body">
                                            <span className="block-label">Order Date</span>
                                            <span className="block-value">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Block 2: Warranty Expiry */}
                                    <div className="tech-telemetry-block green">
                                        <div className="block-accent"></div>
                                        <div className="block-header">
                                            <span className="block-code">[SYS_WARRANTY_EXPIRY]</span>
                                            <i className="fas fa-shield-alt block-icon"></i>
                                        </div>
                                        <div className="block-body">
                                            <span className="block-label">Warranty Till</span>
                                            <span className="block-value">
                                                {new Date(order.warrantyEndDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Block 3: Total Amount */}
                                    <div className="tech-telemetry-block teal">
                                        <div className="block-accent"></div>
                                        <div className="block-header">
                                            <span className="block-code">[SYS_NET_TRANSACTION]</span>
                                            <i className="fas fa-wallet block-icon"></i>
                                        </div>
                                        <div className="block-body">
                                            <span className="block-label">Total Amount</span>
                                            <span className="block-value amount">৳{order.totalAmount.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Products in this order */}
                            <div className="order-products">
                                <h4>Products in this order:</h4>
                                <div className="products-mini-list">
                                    {order.items.slice(0, 3).map((item, idx) => (
                                        <div key={idx} className="mini-product">
                                            <img src={item.image} alt={item.name}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/64x64/f8fafc/94a3b8?text=IMG';
                                                }}
                                            />
                                            <div className="mini-product-info">
                                                <span className="mini-product-name">{item.name}</span>
                                                <span className="mini-product-qty">x{item.quantity}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {order.items.length > 3 && (
                                        <div className="more-products">+{order.items.length - 3} more item(s)</div>
                                    )}
                                </div>

                                {/* Live Warranty Countdown — below products */}
                                <div className="order-warranty-countdown-wrapper">
                                    <div className="countdown-header-label">
                                        <i className="fas fa-clock" style={{ color: '#db4b27' }}></i>
                                        <span>Time Remaining on Warranty:</span>
                                    </div>
                                    <WarrantyCountdown
                                        startDate={order.createdAt}
                                        endDate={order.warrantyEndDate}
                                        showToast={showToast}
                                    />
                                </div>
                            </div>

                            {/* Order Actions */}
                            <div className="tech-order-actions">
                                <button
                                    type="button"
                                    className="tech-action-btn track"
                                    onClick={() => showToast('Tracking info: Your order is on the way!', 'success')}
                                >
                                    <i className="fas fa-map-marker-alt"></i> Track Order
                                </button>
                                <button
                                    type="button"
                                    className="tech-action-btn invoice"
                                    onClick={() => showToast('Invoice download started!', 'success')}
                                >
                                    <i className="fas fa-file-invoice"></i> Download Invoice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

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
