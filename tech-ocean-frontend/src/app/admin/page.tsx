'use client';

import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/data/products';
import { MOCK_CATEGORIES } from '@/data/categories';
import { StarRating } from '@/components/ProductComponents';
// Recharts needs to be imported carefully for Next.js SSR
import { 
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, 
    BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF19A3'];

const InsightsDashboard = ({ products, orders }: { products: any[], orders: any[] }) => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
    const totalProducts = products.length;

    const orderStatusData = [
        { name: 'Pending', value: 5 },
        { name: 'Processing', value: 3 },
        { name: 'Shipped', value: 8 },
        { name: 'Delivered', value: 12 },
    ];

    const productStatusData = [
        { name: 'In Stock', value: products.filter(p => p.status === 'In Stock').length },
        { name: 'Low Stock', value: 2 },
        { name: 'Out of Stock', value: 1 },
    ];

    return (
        <div style={{width: '100%'}}>
            <div className="dashboard-grid">
                <div className="stat-card">
                    <span className="stat-label">Total Orders</span>
                    <span className="stat-value">{totalOrders || 28}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total Revenue</span>
                    <span className="stat-value">৳{(totalRevenue || 452000).toLocaleString()}</span>
                </div>
                <div className="stat-card">
                    <span className="stat-label">Total Inventory Items</span>
                    <span className="stat-value">{totalProducts}</span>
                </div>
                <div className="stat-card" style={{borderLeftColor: '#dc3545'}}>
                    <span className="stat-label">Low Stock Alerts</span>
                    <span className="stat-value" style={{color: '#dc3545'}}>2</span>
                </div>
            </div>

            <div className="charts-grid">
                <div className="chart-card">
                    <div className="chart-header">Orders by Status</div>
                    <div style={{height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={orderStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" dataKey="value" label>
                                    {orderStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip /> <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="chart-card">
                    <div className="chart-header">Inventory Status</div>
                    <div style={{height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={productStatusData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#82ca9d" dataKey="value" label>
                                    {productStatusData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip /> <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentView, setCurrentView] = useState('insights');
    const [products, setProducts] = useState(MOCK_PRODUCTS);

    if (!isLoggedIn) {
        return (
            <div style={{width:'100%', display:'flex', alignItems:'center', justifyContent:'center', minHeight: '80vh', background: '#f4f7f6'}}>
                <div className="login-box" style={{background: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', width: '400px'}}>
                    <h2>Admin Portal</h2>
                    <p style={{marginBottom: '25px', color: '#666'}}>Please enter your credentials to continue</p>
                    <form onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
                        <input type="text" className="form-control" placeholder="Username" required />
                        <input type="password" className="form-control" placeholder="Password" required />
                        <button type="submit" className="btn-primary" style={{width: '100%', marginTop: '10px'}}>Login</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{display: 'flex', width: '100%', height: 'calc(100vh - 100px)', background: '#f4f7f6'}}>
             <aside className="sidebar" style={{width: '250px', background: '#01132d', color: '#fff', padding: '20px 0'}}>
                <div className="nav-items">
                    <div className={`nav-item ${currentView==='insights'?'active':''}`} onClick={() => setCurrentView('insights')} style={{padding: '15px 25px', cursor: 'pointer'}}>
                        <i className="fas fa-chart-pie" style={{marginRight: '12px'}}></i> Dashboard
                    </div>
                    <div className={`nav-item ${currentView==='inventory'?'active':''}`} onClick={() => setCurrentView('inventory')} style={{padding: '15px 25px', cursor: 'pointer'}}>
                        <i className="fas fa-boxes" style={{marginRight: '12px'}}></i> Inventory
                    </div>
                    <div className={`nav-item ${currentView==='orders'?'active':''}`} onClick={() => setCurrentView('orders')} style={{padding: '15px 25px', cursor: 'pointer'}}>
                        <i className="fas fa-shopping-cart" style={{marginRight: '12px'}}></i> Orders
                    </div>
                </div>
                <div style={{padding: '20px', marginTop: 'auto'}}>
                    <button className="btn-danger" style={{width: '100%', padding: '10px'}} onClick={() => setIsLoggedIn(false)}>Logout</button>
                </div>
            </aside>

            <div className="main-content" style={{flex: 1, padding: '40px', overflowY: 'auto'}}>
                {currentView === 'insights' && (
                    <InsightsDashboard products={products} orders={[]} />
                )}

                {currentView === 'inventory' && (
                    <div>
                        <h2 style={{marginTop: 0}}>Inventory Directory</h2>
                        <div className="container" style={{padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'}}>
                            <table style={{width: '100%', borderCollapse: 'collapse'}}>
                                <thead>
                                    <tr style={{borderBottom: '1px solid #eee', textAlign: 'left'}}>
                                        <th style={{padding: '12px'}}>ID</th>
                                        <th style={{padding: '12px'}}>Product</th>
                                        <th style={{padding: '12px'}}>Category</th>
                                        <th style={{padding: '12px'}}>Price</th>
                                        <th style={{padding: '12px'}}>Stock</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(p => (
                                        <tr key={p.id} style={{borderBottom: '1px solid #fafafa'}}>
                                            <td style={{padding: '12px'}}>#{p.id}</td>
                                            <td style={{padding: '12px'}}>{p.title}</td>
                                            <td style={{padding: '12px'}}>{p.category}</td>
                                            <td style={{padding: '12px'}}>{p.price}</td>
                                            <td style={{padding: '12px'}}>{p.status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {currentView === 'orders' && (
                    <div>
                        <h2 style={{marginTop: 0}}>Order List</h2>
                        <p style={{background: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px'}}>No orders received yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
