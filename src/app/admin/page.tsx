'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// ─── Mock Data ───────────────────────────────────────────────────────────────
const salesData = [
    { day: 'Mon', sales: 12500 }, { day: 'Tue', sales: 18000 }, { day: 'Wed', sales: 9000 },
    { day: 'Thu', sales: 22000 }, { day: 'Fri', sales: 31000 }, { day: 'Sat', sales: 28000 }, { day: 'Sun', sales: 15000 },
];

const categoryData = [
    { name: 'Gaming PC', value: 35 },
    { name: 'CCTV & IP Camera', value: 25 },
    { name: 'Office Equipment', value: 15 },
    { name: 'Laptop', value: 15 },
    { name: 'Desktop PC', value: 10 },
];

const COLORS = ['#1B5B97', '#ff6b00', '#10b981', '#ef4444', '#9c27b0'];

const alerts = [
    { type: 'danger', icon: '⚠️', message: '2 products are low in stock', time: '10 mins ago', link: '/admin/products' },
    { type: 'warning', icon: '💬', message: '4 reviews pending moderation', time: '2 hours ago', link: '/admin/reviews' },
    { type: 'info', icon: '📦', message: '8 orders awaiting processing', time: '4 hours ago', link: '/admin/orders' }
];

// ─── Components ──────────────────────────────────────────────────────────────

const StatCard = ({ title, value, icon, trend, trendValue, color }: any) => (
    <div className="stat-card">
        <div className="stat-header">
            <span className="stat-title">{title}</span>
            <div className="stat-icon-wrapper" style={{ background: `${color}15`, color: color }}>
                <i className={`fas ${icon}`}></i>
            </div>
        </div>
        <div className="stat-value">{value}</div>
        <div className={`stat-footer ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
            <i className={`fas fa-arrow-${trend}`}></i>
            <span>{trendValue}</span>
            <span style={{color: '#94a3b8', fontWeight: 500}}>since last month</span>
        </div>
    </div>
);

const QuickActions = () => (
    <section className="quick-actions-section">
        <h3 className="section-title">Quick Actions</h3>
        <div className="action-btns-grid">
            <button className="action-button">
                <span>➕</span> Add New Product
            </button>
            <button className="action-button">
                <span>📦</span> Process Orders
            </button>
            <button className="action-button">
                <span>⚡</span> Create Flash Sale
            </button>
            <button className="action-button">
                <span>📝</span> Write Blog Post
            </button>
        </div>
    </section>
);

export default function AdminPage() {
    return (
        <div className="admin-dashboard">
            <h1 style={{fontSize: '24px', fontWeight: 800, color: '#1e293b', marginBottom: '24px'}}>Dashboard Overview</h1>
            
            <div className="stats-grid">
                <StatCard title="Total Orders" value="28" icon="fa-shopping-cart" trend="up" trendValue="+15%" color="#1B5B97" />
                <StatCard title="Total Revenue" value="৳4,52,000" icon="fa-money-bill-wave" trend="up" trendValue="+12%" color="#ff6b00" />
                <StatCard title="Total Products" value="156" icon="fa-boxes" trend="down" trendValue="-2%" color="#10b981" />
                <StatCard title="Avg. Rating" value="4.8★" icon="fa-star" trend="up" trendValue="+0.5%" color="#9c27b0" />
            </div>

            <QuickActions />

            <div className="dashboard-row">
                <div className="card">
                    <h3 className="card-title"><i className="fas fa-chart-bar" style={{color: '#1B5B97'}}></i> Weekly Sales Revenue</h3>
                    <div style={{width: '100%', height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                                <Tooltip 
                                    contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
                                    cursor={{fill: '#f8fafc'}}
                                />
                                <Bar dataKey="sales" fill="#1B5B97" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title"><i className="fas fa-chart-pie" style={{color: '#ff6b00'}}></i> Products by Category</h3>
                    <div style={{width: '100%', height: '300px'}}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie 
                                    data={categoryData} 
                                    cx="50%" 
                                    cy="50%" 
                                    innerRadius={60} 
                                    outerRadius={80} 
                                    paddingAngle={5} 
                                    dataKey="value"
                                >
                                    {categoryData.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} iconType="circle" />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="dashboard-row" style={{gridTemplateColumns: '1fr 1fr'}}>
                <div className="card">
                    <h3 className="card-title"><i className="fas fa-wrench" style={{color: '#10b981'}}></i> Builder Insights</h3>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px'}}>
                        <div style={{padding: '16px', background: '#f8fafc', borderRadius: '12px'}}>
                            <span style={{fontSize: '12px', color: '#64748b', fontWeight: 600}}>Avg. PC Build Value</span>
                            <div style={{fontSize: '20px', fontWeight: 800, color: '#1B5B97', marginTop: '4px'}}>৳85,000</div>
                        </div>
                        <div style={{padding: '16px', background: '#f8fafc', borderRadius: '12px'}}>
                            <span style={{fontSize: '12px', color: '#64748b', fontWeight: 600}}>Most Selected CPU</span>
                            <div style={{fontSize: '16px', fontWeight: 700, color: '#1e293b', marginTop: '4px'}}>i5-13600K</div>
                        </div>
                        <div style={{padding: '16px', background: '#f8fafc', borderRadius: '12px'}}>
                            <span style={{fontSize: '12px', color: '#64748b', fontWeight: 600}}>Abandoned Builds</span>
                            <div style={{fontSize: '20px', fontWeight: 800, color: '#ef4444', marginTop: '4px'}}>23</div>
                        </div>
                        <div style={{padding: '16px', background: '#f8fafc', borderRadius: '12px'}}>
                            <span style={{fontSize: '12px', color: '#64748b', fontWeight: 600}}>CCTV Build Value</span>
                            <div style={{fontSize: '20px', fontWeight: 800, color: '#ff6b00', marginTop: '4px'}}>৳35,000</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="card-title"><i className="fas fa-bell" style={{color: '#ef4444'}}></i> Recent Alerts</h3>
                    <div className="alert-list">
                        {alerts.map((alert, i) => (
                            <a key={i} href={alert.link} className="alert-item">
                                <div className={`alert-indicator alert-${alert.type}`}>
                                    {alert.icon}
                                </div>
                                <div className="alert-content">
                                    <span className="alert-msg">{alert.message}</span>
                                    <span className="alert-time">{alert.time}</span>
                                </div>
                                <div className="alert-arrow"><i className="fas fa-chevron-right"></i></div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
