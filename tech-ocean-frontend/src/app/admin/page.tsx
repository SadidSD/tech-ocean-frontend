'use client';

import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '@/data/products';
import { StarRating } from '@/components/ProductComponents';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';

const COLORS = ['#1B5B97', '#ff6b00', '#00c853', '#e53935', '#9c27b0', '#009688'];

// ─── Mock Data ───────────────────────────────────────────────────────────────
const MOCK_ORDERS = [
    { id: 'ST-2024-001', customer: 'MD Rahim', items: 3, total: 45000, status: 'Delivered', date: '2024-04-15' },
    { id: 'ST-2024-002', customer: 'Karim Hossain', items: 1, total: 32500, status: 'Shipped', date: '2024-04-14' },
    { id: 'ST-2024-003', customer: 'Sadia Islam', items: 2, total: 12000, status: 'Processing', date: '2024-04-13' },
    { id: 'ST-2024-004', customer: 'Nasir Ahmed', items: 5, total: 78000, status: 'Pending', date: '2024-04-12' },
    { id: 'ST-2024-005', customer: 'Rokeya Begum', items: 1, total: 8500, status: 'Delivered', date: '2024-04-11' },
];

const MOCK_REVIEWS = [
    { id: 1, product: 'Intel Core i5-13600K', reviewer: 'MD Rahim', rating: 5, text: 'Great processor, massive performance jump from my old CPU!', date: '2024-04-14', status: 'approved' },
    { id: 2, product: 'Corsair Vengeance RAM', reviewer: 'Anonymous', rating: 2, text: 'One of the sticks arrived defective, waiting for replacement.', date: '2024-04-12', status: 'pending' },
    { id: 3, product: 'ASUS RTX 4070', reviewer: 'Karim H.', rating: 4, text: 'Excellent GPU for 1440p gaming, runs cool and quiet.', date: '2024-04-10', status: 'approved' },
    { id: 4, product: 'Samsung 980 Pro SSD', reviewer: 'Sadia I.', rating: 5, text: 'Blazing fast! Boot time is under 10 seconds now.', date: '2024-04-09', status: 'pending' },
];

const MOCK_QA = [
    { id: 1, product: 'Corsair Vengeance DDR5', question: 'Does this RAM work with Ryzen 7000?', asker: 'Karim H.', date: '2024-04-13', answered: false, answer: '' },
    { id: 2, product: 'Intel Core i5-13600K', question: 'What is the warranty period?', asker: 'Nasir A.', date: '2024-04-11', answered: true, answer: '3 years official warranty from Intel Bangladesh.' },
    { id: 3, product: 'ASUS RTX 4070', question: 'Can this run 4K games at 60fps?', asker: 'Rahim R.', date: '2024-04-10', answered: false, answer: '' },
];

const MOCK_FLASH_SALES = [
    { id: 1, name: 'Summer Tech Sale', discount: 15, products: 12, status: 'active', endsIn: '2d 4h 32m' },
    { id: 2, name: 'Friday Flash Sale', discount: 20, products: 8, status: 'upcoming', startsIn: '1d 8h 0m' },
    { id: 3, name: 'Weekend Clearance', discount: 10, products: 5, status: 'ended', endsIn: '-' },
];

const PC_COMPONENTS = [
    { type: 'CPU', name: 'Intel Core i5-13600K', socket: 'LGA1700', price: '৳32,500', stock: 12 },
    { type: 'CPU', name: 'AMD Ryzen 7 7800X3D', socket: 'AM5', price: '৳45,000', stock: 8 },
    { type: 'GPU', name: 'ASUS RTX 4070', vram: '12GB GDDR6X', price: '৳75,000', stock: 4 },
    { type: 'RAM', name: 'Corsair Vengeance 16GB DDR5', speed: '5600MHz', price: '৳12,500', stock: 22 },
    { type: 'Storage', name: 'Samsung 980 Pro 1TB', interface: 'NVMe Gen 4', price: '৳14,000', stock: 15 },
];

// ─── Sub-components ──────────────────────────────────────────────────────────
const SideNavItem = ({ icon, label, section, current, onClick, badge }: any) => (
    <div
        onClick={() => onClick(section)}
        style={{
            padding: '12px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
            fontSize: '13px', fontWeight: 500, borderRadius: '6px', margin: '2px 8px',
            background: current === section ? 'rgba(255,107,0,0.15)' : 'transparent',
            color: current === section ? '#ff6b00' : '#aab4be',
            transition: 'all 0.2s',
            position: 'relative'
        }}
    >
        <i className={`fas ${icon}`} style={{ width: '16px', textAlign: 'center' }}></i>
        {label}
        {badge && <span style={{ marginLeft: 'auto', background: '#e53935', color: 'white', fontSize: '10px', padding: '2px 6px', borderRadius: '10px' }}>{badge}</span>}
    </div>
);

const SideNavGroup = ({ label }: { label: string }) => (
    <div style={{ padding: '15px 20px 5px', fontSize: '10px', fontWeight: 700, color: '#4a5568', textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</div>
);

const StatCard = ({ label, value, icon, color = '#1B5B97', sublabel }: any) => (
    <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: `4px solid ${color}`, display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ width: '50px', height: '50px', background: `${color}18`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', color }}>
            <i className={`fas ${icon}`}></i>
        </div>
        <div>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#111' }}>{value}</div>
            <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>{label}</div>
            {sublabel && <div style={{ fontSize: '11px', color: color, marginTop: '2px' }}>{sublabel}</div>}
        </div>
    </div>
);

// ─── Section Views ────────────────────────────────────────────────────────────

const DashboardView = ({ products }: any) => {
    const salesData = [
        { day: 'Mon', sales: 12500 }, { day: 'Tue', sales: 18000 }, { day: 'Wed', sales: 9000 },
        { day: 'Thu', sales: 22000 }, { day: 'Fri', sales: 31000 }, { day: 'Sat', sales: 28000 }, { day: 'Sun', sales: 15000 },
    ];
    const categoryData = products.reduce((acc: any, p: any) => {
        acc[p.category] = (acc[p.category] || 0) + 1;
        return acc;
    }, {});
    const pieData = Object.entries(categoryData).map(([name, value]) => ({ name, value }));
    const reviewDist = [
        { stars: '5★', count: 145 }, { stars: '4★', count: 98 }, { stars: '3★', count: 48 }, { stars: '2★', count: 23 }, { stars: '1★', count: 14 },
    ];

    return (
        <div>
            <h2 style={{ marginTop: 0, fontSize: '22px', fontWeight: 700, color: '#111', marginBottom: '25px' }}>Dashboard Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
                <StatCard icon="fa-shopping-cart" label="Total Orders" value="28" color="#1B5B97" sublabel="+5 this week" />
                <StatCard icon="fa-money-bill-wave" label="Total Revenue" value="৳4,52,000" color="#ff6b00" sublabel="+12% vs last month" />
                <StatCard icon="fa-boxes" label="Products" value={products.length} color="#00c853" sublabel="3 low stock" />
                <StatCard icon="fa-star" label="Avg. Rating" value="4.2★" color="#9c27b0" sublabel="328 reviews" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Weekly Sales Revenue</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={salesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Bar dataKey="sales" fill="#1B5B97" radius={[4,4,0,0]} /></BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Products by Category</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart><Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" label>{pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /><Legend /></PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Review Distribution</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={reviewDist} layout="vertical"><CartesianGrid strokeDasharray="3 3" /><XAxis type="number" /><YAxis dataKey="stars" type="category" width={30}/><Tooltip /><Bar dataKey="count" fill="#ff6b00" radius={[0,4,4,0]} /></BarChart>
                    </ResponsiveContainer>
                </div>
                <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>Recent Alerts</h3>
                    {[
                        { icon: 'fa-exclamation-triangle', color: '#e53935', text: '2 products are low in stock' },
                        { icon: 'fa-comment', color: '#ff6b00', text: '4 reviews pending moderation' },
                        { icon: 'fa-question-circle', color: '#9c27b0', text: '3 unanswered customer questions' },
                        { icon: 'fa-bolt', color: '#1B5B97', text: 'Flash Sale ending in 2d 4h' },
                    ].map((a, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '8px', background: '#f8f9fa', marginBottom: '8px' }}>
                            <i className={`fas ${a.icon}`} style={{ color: a.color, width: '20px' }}></i>
                            <span style={{ fontSize: '13px', color: '#444' }}>{a.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const InventoryView = ({ products }: any) => {
    const [search, setSearch] = useState('');
    const enriched = products.map((p: any, i: number) => ({
        ...p, stock: 5 + (i * 7) % 30, soldToday: (i * 3) % 15, flash: i % 4 === 0,
        badge: i % 5 === 0 ? '🔥 Hot' : i % 7 === 0 ? '🏆 Best Seller' : i % 4 === 0 ? '✨ New' : null,
    }));
    const filtered = enriched.filter((p: any) => p.title.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>Product Inventory</h2>
                <button style={{ background: '#ff6b00', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>+ Add Product</button>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', gap: '15px' }}>
                <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: '10px 15px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px' }} />
                <select style={{ padding: '10px 15px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px' }}>
                    <option>All Categories</option>
                    <option>Components</option>
                    <option>Laptops</option>
                    <option>CCTV</option>
                </select>
                <select style={{ padding: '10px 15px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px' }}>
                    <option>All Stock</option>
                    <option>In Stock</option>
                    <option>Low Stock</option>
                    <option>Out of Stock</option>
                </select>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #eee' }}>
                            {['#', 'Product', 'Category', 'Price', 'Stock', 'Sold Today', 'Flash Sale', 'Badges', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '14px 12px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((p: any) => (
                            <tr key={p.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '14px 12px', fontSize: '13px', color: '#888' }}>#{p.id}</td>
                                <td style={{ padding: '14px 12px', fontSize: '13px', fontWeight: 600, color: '#111', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</td>
                                <td style={{ padding: '14px 12px', fontSize: '12px', color: '#666' }}>{p.category}</td>
                                <td style={{ padding: '14px 12px', fontSize: '13px', fontWeight: 700, color: '#ff6b00' }}>{p.price}</td>
                                <td style={{ padding: '14px 12px' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: p.stock < 5 ? '#ffeeee' : '#eefff4', color: p.stock < 5 ? '#e53935' : '#00c853' }}>
                                        {p.stock < 5 ? `⚠️ Low (${p.stock})` : p.stock}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 12px', fontSize: '13px' }}>{p.soldToday}</td>
                                <td style={{ padding: '14px 12px' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: p.flash ? '#fff0e6' : '#f5f5f5', color: p.flash ? '#ff6b00' : '#999' }}>
                                        {p.flash ? '⚡ Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td style={{ padding: '14px 12px', fontSize: '12px' }}>{p.badge || '—'}</td>
                                <td style={{ padding: '14px 12px' }}>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Edit</button>
                                        <button style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>Del</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const FlashSalesView = () => {
    const salesData = [
        { day: 'Mon', revenue: 8000 }, { day: 'Tue', revenue: 14000 }, { day: 'Wed', revenue: 6000 },
        { day: 'Thu', revenue: 18000 }, { day: 'Fri', revenue: 25000 }, { day: 'Sat', revenue: 21000 }, { day: 'Sun', revenue: 11000 },
    ];
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>Flash Sales & Promotions</h2>
                <button style={{ background: '#ff6b00', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>+ Create Flash Sale</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
                <StatCard icon="fa-bolt" label="Active Flash Sales" value="1" color="#ff6b00" />
                <StatCard icon="fa-money-bill-wave" label="Flash Sale Revenue" value="৳1,25,000" color="#00c853" />
                <StatCard icon="fa-percent" label="Avg. Conversion Rate" value="8.5%" color="#1B5B97" sublabel="vs 3.2% regular" />
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Flash Sale Revenue (Last 7 Days)</h3>
                <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={salesData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="day" /><YAxis /><Tooltip /><Line type="monotone" dataKey="revenue" stroke="#ff6b00" strokeWidth={2} dot={{ r: 5, fill: '#ff6b00' }} /></LineChart>
                </ResponsiveContainer>
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>All Flash Sales</h3>
                {MOCK_FLASH_SALES.map(sale => (
                    <div key={sale.id} style={{ border: '1px solid #eee', borderRadius: '10px', padding: '18px', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <span style={{ fontSize: '22px' }}>{sale.status === 'active' ? '🏃' : sale.status === 'upcoming' ? '🎉' : '✅'}</span>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: '15px' }}>{sale.name}</div>
                                <div style={{ color: '#666', fontSize: '13px', marginTop: '3px' }}>
                                    {sale.discount}% off · {sale.products} products ·{' '}
                                    <span style={{ color: sale.status === 'active' ? '#e53935' : sale.status === 'upcoming' ? '#1B5B97' : '#888', fontWeight: 600 }}>
                                        {sale.status === 'active' ? `Ends in ${sale.endsIn}` : sale.status === 'upcoming' ? `Starts in ${sale.startsIn}` : 'Ended'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            {sale.status === 'active' && <button style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>End Now</button>}
                            <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Edit</button>
                            <button style={{ background: '#f5f5f5', color: '#555', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>View Products</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ReviewsView = () => {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [filter, setFilter] = useState('all');
    const filtered = reviews.filter(r => filter === 'all' || r.status === filter);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>Product Reviews</h2>
                <button style={{ background: '#1B5B97', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Export CSV</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
                <StatCard icon="fa-star" label="Average Rating" value="4.2★" color="#ff6b00" />
                <StatCard icon="fa-comments" label="Total Reviews" value="328" color="#1B5B97" />
                <StatCard icon="fa-clock" label="Pending" value={reviews.filter(r => r.status === 'pending').length} color="#e53935" sublabel="Need moderation" />
                <StatCard icon="fa-check-circle" label="Approved" value={reviews.filter(r => r.status === 'approved').length} color="#00c853" />
            </div>
            <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px', display: 'flex', gap: '10px' }}>
                {['all', 'pending', 'approved'].map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 18px', borderRadius: '20px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', background: filter === f ? '#1B5B97' : '#f5f5f5', color: filter === f ? 'white' : '#555' }}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filtered.map(r => (
                    <div key={r.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: `4px solid ${r.status === 'pending' ? '#ff6b00' : '#00c853'}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                                    {[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star`} style={{ color: i < r.rating ? '#ffba00' : '#eee', fontSize: '14px' }}></i>)}
                                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: 700, marginLeft: '8px', background: r.status === 'pending' ? '#fff0e6' : '#eefff4', color: r.status === 'pending' ? '#ff6b00' : '#00c853' }}>
                                        {r.status.toUpperCase()}
                                    </span>
                                </div>
                                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>"{r.text}"</div>
                                <div style={{ fontSize: '12px', color: '#888' }}>By <strong>{r.reviewer}</strong> on <span style={{ color: '#1B5B97' }}>{r.product}</span> · {r.date}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                {r.status === 'pending' && <button onClick={() => setReviews(reviews.map(x => x.id === r.id ? { ...x, status: 'approved' } : x))} style={{ background: '#eefff4', color: '#00c853', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Approve</button>}
                                <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Reply</button>
                                <button onClick={() => setReviews(reviews.filter(x => x.id !== r.id))} style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const QAView = () => {
    const [qa, setQA] = useState(MOCK_QA);
    const [answerDraft, setAnswerDraft] = useState<{ [k: number]: string }>({});

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>Product Q&A</h2>
                <button style={{ background: '#1B5B97', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Export CSV</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' }}>
                <StatCard icon="fa-question-circle" label="Unanswered" value={qa.filter(q => !q.answered).length} color="#e53935" sublabel="Need response" />
                <StatCard icon="fa-check-circle" label="Answered" value={qa.filter(q => q.answered).length} color="#00c853" />
                <StatCard icon="fa-inbox" label="Total Questions" value={qa.length} color="#1B5B97" />
            </div>

            <h3 style={{ fontSize: '16px', marginBottom: '15px', color: '#e53935' }}>Unanswered Questions ({qa.filter(q => !q.answered).length})</h3>
            {qa.filter(q => !q.answered).map(q => (
                <div key={q.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #e53935', marginBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '5px' }}>❓ {q.question}</div>
                            <div style={{ fontSize: '12px', color: '#888' }}>Asked by <strong>{q.asker}</strong> on <span style={{ color: '#1B5B97' }}>{q.product}</span> · {q.date}</div>
                        </div>
                        <button onClick={() => setQA(qa.filter(x => x.id !== q.id))} style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px', height: 'fit-content' }}>Delete</button>
                    </div>
                    <div style={{ marginTop: '15px', display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="Type your answer..." value={answerDraft[q.id] || ''} onChange={e => setAnswerDraft({ ...answerDraft, [q.id]: e.target.value })} style={{ flex: 1, padding: '10px', border: '1px solid #eee', borderRadius: '8px', fontSize: '13px' }} />
                        <button onClick={() => { setQA(qa.map(x => x.id === q.id ? { ...x, answered: true, answer: answerDraft[q.id] || '' } : x)); }} style={{ background: '#1B5B97', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>Submit Answer</button>
                    </div>
                </div>
            ))}

            <h3 style={{ fontSize: '16px', margin: '25px 0 15px', color: '#00c853' }}>Answered Questions</h3>
            {qa.filter(q => q.answered).map(q => (
                <div key={q.id} style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '4px solid #00c853', marginBottom: '15px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>❓ {q.question}</div>
                    <div style={{ background: '#f0fff4', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#333', marginBottom: '8px' }}>
                        <strong style={{ color: '#00c853' }}>Admin:</strong> {q.answer}
                    </div>
                    <div style={{ fontSize: '12px', color: '#888' }}>Asked by {q.asker} · {q.date}</div>
                </div>
            ))}
        </div>
    );
};

const BuildersView = () => {
    const [componentType, setComponentType] = useState('CPU');
    const types = ['CPU', 'GPU', 'RAM', 'Storage'];
    const filtered = PC_COMPONENTS.filter(c => c.type === componentType);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>PC & CCTV Builder Components</h2>
                <button style={{ background: '#ff6b00', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>+ Add Component</button>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                {types.map(t => (
                    <button key={t} onClick={() => setComponentType(t)} style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', background: componentType === t ? '#1B5B97' : '#f5f5f5', color: componentType === t ? 'white' : '#555' }}>{t}</button>
                ))}
            </div>
            <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '25px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: '#f8f9fa' }}>
                            {['Component', 'Spec', 'Price', 'Stock', 'Actions'].map(h => (
                                <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '14px' }}>{c.name}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#666' }}>{(c as any).socket || (c as any).vram || (c as any).speed || (c as any).interface}</td>
                                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ff6b00' }}>{c.price}</td>
                                <td style={{ padding: '14px 16px' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, background: c.stock < 6 ? '#ffeeee' : '#eefff4', color: c.stock < 6 ? '#e53935' : '#00c853' }}>{c.stock} units</span>
                                </td>
                                <td style={{ padding: '14px 16px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Edit</button>
                                        <button style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ background: 'white', borderRadius: '12px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '20px' }}>Compatibility Rules</h3>
                {[
                    { rule: 'LGA1700 CPUs are compatible with LGA1700 Motherboards only', type: 'CPU ↔ MB' },
                    { rule: 'AM5 CPUs are compatible with AM5 Motherboards only', type: 'CPU ↔ MB' },
                    { rule: 'Minimum 500W PSU required for mid-range GPU builds', type: 'PSU Rule' },
                    { rule: 'Minimum 650W PSU required for high-end GPU builds', type: 'PSU Rule' },
                ].map((r, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 15px', background: '#f8f9fa', borderRadius: '8px', marginBottom: '8px' }}>
                        <div>
                            <span style={{ padding: '2px 8px', background: '#e0efff', color: '#1B5B97', borderRadius: '4px', fontSize: '11px', fontWeight: 700, marginRight: '10px' }}>{r.type}</span>
                            <span style={{ fontSize: '13px', color: '#444' }}>{r.rule}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Edit</button>
                            <button style={{ background: '#ffeeee', color: '#e53935', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Delete</button>
                        </div>
                    </div>
                ))}
                <button style={{ background: '#f5f5f5', color: '#555', border: '1px dashed #ccc', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px', marginTop: '10px', width: '100%' }}>+ Add Rule</button>
            </div>
        </div>
    );
};

const OrdersView = () => (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
            <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 700, color: '#111' }}>Order Management</h2>
            <button style={{ background: '#1B5B97', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', fontSize: '14px' }}>Export CSV</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', marginBottom: '25px' }}>
            <StatCard icon="fa-shopping-cart" label="Total Orders" value="28" color="#1B5B97" />
            <StatCard icon="fa-clock" label="Pending" value="5" color="#ff6b00" />
            <StatCard icon="fa-truck" label="Shipped" value="8" color="#9c27b0" />
            <StatCard icon="fa-check-circle" label="Delivered" value="12" color="#00c853" />
        </div>
        <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ background: '#f8f9fa' }}>
                        {['Order ID', 'Customer', 'Items', 'Total', 'Date', 'Status', 'Actions'].map(h => (
                            <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#555', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {MOCK_ORDERS.map(o => {
                        const statusColor: any = { Delivered: '#00c853', Shipped: '#1B5B97', Processing: '#9c27b0', Pending: '#ff6b00' };
                        return (
                            <tr key={o.id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '14px 16px', fontWeight: 600, fontSize: '13px', color: '#1B5B97' }}>#{o.id}</td>
                                <td style={{ padding: '14px 16px', fontSize: '14px' }}>{o.customer}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#666' }}>{o.items} items</td>
                                <td style={{ padding: '14px 16px', fontWeight: 700, color: '#ff6b00' }}>৳{o.total.toLocaleString()}</td>
                                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#888' }}>{o.date}</td>
                                <td style={{ padding: '14px 16px' }}>
                                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, background: `${statusColor[o.status]}22`, color: statusColor[o.status] }}>{o.status}</span>
                                </td>
                                <td style={{ padding: '14px 16px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button style={{ background: '#e0efff', color: '#1B5B97', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>View</button>
                                        <button style={{ background: '#f5f5f5', color: '#555', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '12px' }}>Update</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    </div>
);

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const products = MOCK_PRODUCTS;

    if (!isLoggedIn) {
        return (
            <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', background: 'linear-gradient(135deg, #01132d 0%, #1B5B97 100%)' }}>
                <div style={{ background: 'white', padding: '50px 40px', borderRadius: '16px', boxShadow: '0 25px 50px rgba(0,0,0,0.3)', textAlign: 'center', width: '420px' }}>
                    <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #1B5B97, #ff6b00)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', color: 'white' }}>
                        <i className="fas fa-lock"></i>
                    </div>
                    <h2 style={{ marginBottom: '5px', fontSize: '22px', color: '#111' }}>Admin Portal</h2>
                    <p style={{ marginBottom: '30px', color: '#888', fontSize: '14px' }}>Enter credentials to access the dashboard</p>
                    <form onSubmit={e => { e.preventDefault(); setIsLoggedIn(true); }}>
                        <input type="text" placeholder="Username" required style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', marginBottom: '12px', boxSizing: 'border-box' }} />
                        <input type="password" placeholder="Password" required style={{ width: '100%', padding: '12px 15px', border: '1px solid #eee', borderRadius: '8px', fontSize: '14px', marginBottom: '20px', boxSizing: 'border-box' }} />
                        <button type="submit" style={{ width: '100%', padding: '14px', background: 'linear-gradient(135deg, #1B5B97, #ff6b00)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '15px', cursor: 'pointer' }}>
                            Login to Dashboard
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const navs = [
        { group: 'Overview', items: [{ icon: 'fa-chart-pie', label: 'Dashboard', section: 'dashboard' }] },
        { group: 'Products', items: [
            { icon: 'fa-boxes', label: 'All Products', section: 'inventory' },
            { icon: 'fa-sliders-h', label: 'Specifications', section: 'specs' },
        ]},
        { group: 'Marketing', items: [
            { icon: 'fa-bolt', label: 'Flash Sales', section: 'flashsales' },
            { icon: 'fa-tag', label: 'Badges Manager', section: 'badges' },
        ]},
        { group: 'Customer Feedback', items: [
            { icon: 'fa-star', label: 'Product Reviews', section: 'reviews', badge: 4 },
            { icon: 'fa-question-circle', label: 'Q&A Management', section: 'qa', badge: 3 },
        ]},
        { group: 'Builders', items: [
            { icon: 'fa-desktop', label: 'PC & CCTV Components', section: 'builders' },
        ]},
        { group: 'Store', items: [
            { icon: 'fa-shopping-cart', label: 'Orders', section: 'orders' },
        ]},
    ];

    return (
        <div style={{ display: 'flex', width: '100%', minHeight: 'calc(100vh - 80px)', background: '#f0f4f8' }}>
            {/* Sidebar */}
            <aside style={{ width: '240px', background: '#01132d', color: '#fff', padding: '20px 0', flexShrink: 0, overflowY: 'auto' }}>
                <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: '12px', color: '#4a5568', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Tech X Ocean</div>
                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>Admin Panel</div>
                </div>
                {navs.map(g => (
                    <div key={g.group}>
                        <SideNavGroup label={g.group} />
                        {g.items.map(item => <SideNavItem key={item.section} {...item} current={currentView} onClick={setCurrentView} />)}
                    </div>
                ))}
                <div style={{ padding: '20px 8px 10px' }}>
                    <button onClick={() => setIsLoggedIn(false)} style={{ width: '100%', padding: '10px', background: 'rgba(229,57,53,0.15)', color: '#e53935', border: '1px solid rgba(229,57,53,0.3)', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '13px' }}>
                        <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i>Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '35px 40px', overflowY: 'auto' }}>
                {currentView === 'dashboard' && <DashboardView products={products} />}
                {currentView === 'inventory' && <InventoryView products={products} />}
                {currentView === 'flashsales' && <FlashSalesView />}
                {currentView === 'reviews' && <ReviewsView />}
                {currentView === 'qa' && <QAView />}
                {currentView === 'builders' && <BuildersView />}
                {currentView === 'orders' && <OrdersView />}
                {(currentView === 'specs' || currentView === 'badges') && (
                    <div style={{ background: 'white', borderRadius: '12px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                        <i className="fas fa-tools" style={{ fontSize: '50px', color: '#ddd', marginBottom: '20px' }}></i>
                        <h2 style={{ color: '#888', fontWeight: 600 }}>{currentView === 'specs' ? 'Specification Templates' : 'Badges Manager'}</h2>
                        <p style={{ color: '#aaa', fontSize: '14px' }}>This module is ready and will connect to your backend API.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
