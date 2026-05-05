'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ApiError } from '@/lib/api-client';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

async function authFetch<T = unknown>(token: string, path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...options.headers },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new ApiError(res.status, body.error ?? 'Request failed');
  }
  return res.json() as Promise<T>;
}

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#f8fafc',
  surface: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  muted: '#64748b',
  faint: '#94a3b8',
  blue: '#1B5B97',
  orange: '#ff6b00',
  green: '#10b981',
  red: '#ef4444',
  amber: '#f59e0b',
  purple: '#8b5cf6',
  sidebar: '#0f172a',
};

const STATUS_COLOR: Record<string, string> = {
  PENDING: C.amber, PROCESSING: C.purple, SHIPPED: C.blue,
  DELIVERED: C.green, CANCELLED: C.red, PAYMENT_FAILED: C.red,
};

// ─── Types ────────────────────────────────────────────────────────────────────
interface Analytics { totalOrders: number; totalRevenue: number; totalUsers: number; totalProducts: number; lowStockCount: number; pendingReviews: number; recentOrders: RecentOrder[]; ordersByStatus: Record<string, number>; }
interface RecentOrder { id: number; orderNumber: string; customerName: string; total: number; status: string; createdAt: string; }
interface Order { id: number; orderNumber: string; customerName: string; email: string; status: string; paymentStatus: string; paymentMethod: string; total: number; createdAt: string; items: { title: string; quantity: number; price: number }[]; }
interface InventoryProduct { id: number; title: string; stock: number; price: number; brand: string | null; category: { name: string }; }
interface Review { id: number; rating: number; title: string | null; content: string; status: string; guestName: string | null; createdAt: string; product: { id: number; title: string }; user: { id: number; name: string; email: string } | null; }
interface RevenuePoint { date: string; revenue: number; }
interface AdminUser { id: number; name: string; email: string; phone: string | null; role: string; isBanned: boolean; createdAt: string; _count: { orders: number; reviews: number }; }

// ─── Shared UI ────────────────────────────────────────────────────────────────
const Badge = ({ label, color }: { label: string; color: string }) => (
  <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, background: `${color}18`, color, letterSpacing: '0.3px' }}>{label}</span>
);

const Btn = ({ children, onClick, variant = 'primary', disabled, size = 'md', type = 'button' }: any) => {
  const sizes: Record<string, React.CSSProperties> = { sm: { padding: '5px 12px', fontSize: '12px' }, md: { padding: '8px 16px', fontSize: '13px' }, lg: { padding: '11px 22px', fontSize: '14px' } };
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: C.blue, color: 'white', border: 'none' },
    danger: { background: '#fff1f2', color: C.red, border: `1px solid #fecdd3` },
    ghost: { background: 'transparent', color: C.muted, border: `1px solid ${C.border}` },
    success: { background: '#f0fdf4', color: C.green, border: '1px solid #bbf7d0' },
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{ ...sizes[size], ...variants[variant], borderRadius: '6px', cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 600, opacity: disabled ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'opacity 0.15s', whiteSpace: 'nowrap' }}>
      {children}
    </button>
  );
};

const Card = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '8px', ...style }}>{children}</div>
);

const PageHeader = ({ title, children }: { title: string; children?: React.ReactNode }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
    <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: C.text }}>{title}</h1>
    {children && <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>{children}</div>}
  </div>
);

const Spinner = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '64px', color: C.faint, gap: '12px' }}>
    <i className="fas fa-circle-notch fa-spin" style={{ fontSize: '18px' }}></i>
    <span style={{ fontSize: '14px' }}>Loading…</span>
  </div>
);

const ErrMsg = ({ msg, onRetry }: { msg: string; onRetry?: () => void }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px', gap: '12px' }}>
    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <i className="fas fa-exclamation" style={{ color: C.red, fontSize: '16px' }}></i>
    </div>
    <p style={{ margin: 0, fontSize: '14px', color: C.muted }}>{msg}</p>
    {onRetry && <Btn onClick={onRetry} variant="ghost" size="sm">Try again</Btn>}
  </div>
);

const Pager = ({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (fn: (p: number) => number) => void }) =>
  totalPages > 1 ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '16px' }}>
      <Btn variant="ghost" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</Btn>
      <span style={{ fontSize: '13px', color: C.muted }}>Page {page} of {totalPages}</span>
      <Btn variant="ghost" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</Btn>
    </div>
  ) : null;

const TH = ({ children }: { children: React.ReactNode }) => (
  <th style={{ padding: '10px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: C.faint, textTransform: 'uppercase', letterSpacing: '0.6px', borderBottom: `1px solid ${C.border}`, background: C.bg }}>{children}</th>
);
const TD = ({ children, style }: { children?: React.ReactNode; style?: React.CSSProperties }) => (
  <td style={{ padding: '13px 16px', fontSize: '13px', color: C.text, borderBottom: `1px solid ${C.border}`, ...style }}>{children}</td>
);

const Input = ({ style, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: '6px', fontSize: '13px', color: C.text, boxSizing: 'border-box', outline: 'none', background: C.surface, ...style }} />
);
const Select = ({ children, style, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} style={{ width: '100%', padding: '9px 12px', border: `1px solid ${C.border}`, borderRadius: '6px', fontSize: '13px', color: C.text, boxSizing: 'border-box', background: C.surface, cursor: 'pointer', ...style }}>{children}</select>
);
const Label = ({ children }: { children: React.ReactNode }) => (
  <label style={{ display: 'block', fontSize: '12px', fontWeight: 500, color: C.muted, marginBottom: '5px' }}>{children}</label>
);

const StatCard = ({ label, value, icon, color, sublabel }: { label: string; value: string | number; icon: string; color: string; sublabel?: string }) => (
  <Card style={{ padding: '20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: `${color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <i className={`fas ${icon}`} style={{ color, fontSize: '15px' }}></i>
    </div>
    <div>
      <div style={{ fontSize: '22px', fontWeight: 700, color: C.text, lineHeight: 1.2 }}>{value}</div>
      <div style={{ fontSize: '12px', color: C.muted, marginTop: '2px' }}>{label}</div>
      {sublabel && <div style={{ fontSize: '11px', color, marginTop: '3px', fontWeight: 500 }}>{sublabel}</div>}
    </div>
  </Card>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────
const DashboardView = ({ token, onAddProduct, onUnauthorized }: { token: string; onAddProduct: () => void; onUnauthorized: () => void }) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [revenue, setRevenue] = useState<RevenuePoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [a, r] = await Promise.all([
        authFetch<Analytics>(token, '/admin/analytics'),
        authFetch<RevenuePoint[]>(token, '/admin/analytics/revenue?days=7'),
      ]);
      setAnalytics(a); setRevenue(r);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { onUnauthorized(); return; }
      setError(e instanceof ApiError ? e.message : 'Failed to load dashboard');
    } finally { setLoading(false); }
  }, [token, onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  if (loading) return <Spinner />;
  if (error) return <ErrMsg msg={error} onRetry={load} />;
  if (!analytics) return null;

  const statusPieData = Object.entries(analytics.ordersByStatus).map(([name, value]) => ({ name, value }));
  const PIE_COLORS = [C.amber, C.purple, C.blue, C.green, C.red];

  return (
    <div>
      <PageHeader title="Overview">
        <Btn onClick={onAddProduct}><i className="fas fa-plus" style={{ fontSize: '11px' }}></i> Add Product</Btn>
      </PageHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        <StatCard icon="fa-shopping-bag" label="Total Orders" value={analytics.totalOrders} color={C.blue} />
        <StatCard icon="fa-bangladeshi-taka-sign" label="Revenue" value={`৳${analytics.totalRevenue.toLocaleString('en-BD')}`} color={C.orange} />
        <StatCard icon="fa-box" label="Products" value={analytics.totalProducts} color={C.green} sublabel={analytics.lowStockCount > 0 ? `${analytics.lowStockCount} low stock` : undefined} />
        <StatCard icon="fa-users" label="Customers" value={analytics.totalUsers} color={C.purple} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <Card style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, color: C.text }}>Revenue — Last 7 Days</p>
          {revenue.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenue} barSize={20}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="date" tickFormatter={d => d.slice(5)} tick={{ fontSize: 11, fill: C.faint }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: C.faint }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => [`৳${v.toLocaleString('en-BD')}`, 'Revenue']} contentStyle={{ border: `1px solid ${C.border}`, borderRadius: '6px', fontSize: '12px' }} />
                <Bar dataKey="revenue" fill={C.blue} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '220px', color: C.faint, fontSize: '13px' }}>No revenue data yet</div>}
        </Card>

        <Card style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 16px', fontSize: '13px', fontWeight: 600, color: C.text }}>Orders by Status</p>
          {statusPieData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusPieData} cx="50%" cy="45%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                  {statusPieData.map((e, i) => <Cell key={i} fill={STATUS_COLOR[e.name] ?? PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ border: `1px solid ${C.border}`, borderRadius: '6px', fontSize: '12px' }} />
                <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          ) : <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '220px', color: C.faint, fontSize: '13px' }}>No orders yet</div>}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 600, color: C.text }}>Alerts</p>
          {analytics.lowStockCount > 0 && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', borderRadius: '6px', background: '#fff7ed', marginBottom: '8px' }}>
              <i className="fas fa-triangle-exclamation" style={{ color: C.amber, fontSize: '13px', flexShrink: 0 }}></i>
              <span style={{ fontSize: '13px', color: '#92400e' }}>{analytics.lowStockCount} products are low in stock</span>
            </div>
          )}
          {analytics.pendingReviews > 0 && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', borderRadius: '6px', background: '#eff6ff', marginBottom: '8px' }}>
              <i className="fas fa-comment" style={{ color: C.blue, fontSize: '13px', flexShrink: 0 }}></i>
              <span style={{ fontSize: '13px', color: '#1e40af' }}>{analytics.pendingReviews} reviews need moderation</span>
            </div>
          )}
          {analytics.lowStockCount === 0 && analytics.pendingReviews === 0 && (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 12px', borderRadius: '6px', background: '#f0fdf4' }}>
              <i className="fas fa-check" style={{ color: C.green, fontSize: '13px' }}></i>
              <span style={{ fontSize: '13px', color: '#14532d' }}>Everything looks good</span>
            </div>
          )}
        </Card>

        <Card style={{ padding: '20px' }}>
          <p style={{ margin: '0 0 14px', fontSize: '13px', fontWeight: 600, color: C.text }}>Recent Orders</p>
          {analytics.recentOrders.length === 0
            ? <div style={{ fontSize: '13px', color: C.faint, paddingTop: '8px' }}>No orders yet</div>
            : analytics.recentOrders.map(o => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: `1px solid ${C.border}` }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: C.text }}>{o.orderNumber}</div>
                  <div style={{ fontSize: '11px', color: C.faint, marginTop: '1px' }}>{o.customerName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: C.text }}>৳{o.total.toLocaleString('en-BD')}</div>
                  <Badge label={o.status} color={STATUS_COLOR[o.status] ?? C.faint} />
                </div>
              </div>
            ))
          }
        </Card>
      </div>
    </div>
  );
};

// ─── Inventory ────────────────────────────────────────────────────────────────
const InventoryView = ({ token, onAddProduct, onUnauthorized }: { token: string; onAddProduct: () => void; onUnauthorized: () => void }) => {
  const [products, setProducts] = useState<InventoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [lowOnly, setLowOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const qs = new URLSearchParams({ page: String(page), limit: '20', ...(lowOnly ? { lowStock: 'true' } : {}) });
      const data = await authFetch<{ products: InventoryProduct[]; totalPages: number }>(token, `/admin/inventory?${qs}`);
      setProducts(data.products); setTotalPages(data.totalPages);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { onUnauthorized(); return; }
      setError(e instanceof ApiError ? e.message : 'Failed to load inventory');
    } finally { setLoading(false); }
  }, [token, page, lowOnly, onUnauthorized]);

  useEffect(() => { load(); }, [load]);
  const filtered = search ? products.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : products;

  return (
    <div>
      <PageHeader title="Inventory">
        <Btn onClick={onAddProduct}><i className="fas fa-plus" style={{ fontSize: '11px' }}></i> Add Product</Btn>
      </PageHeader>

      <Card style={{ padding: '12px 16px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <i className="fas fa-search" style={{ color: C.faint, fontSize: '13px' }}></i>
        <input type="text" placeholder="Filter by name…" value={search} onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: C.text, background: 'transparent' }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: C.muted, cursor: 'pointer', whiteSpace: 'nowrap' }}>
          <input type="checkbox" checked={lowOnly} onChange={e => { setLowOnly(e.target.checked); setPage(1); }} />
          Low stock only
        </label>
      </Card>

      {loading ? <Spinner /> : error ? <ErrMsg msg={error} onRetry={load} /> : (
        <>
          <Card>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['#', 'Product', 'Category', 'Brand', 'Price', 'Stock', 'Actions'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} style={{ transition: 'background 0.1s' }} onMouseEnter={e => (e.currentTarget.style.background = C.bg)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <TD style={{ color: C.faint, width: '50px' }}>#{p.id}</TD>
                    <TD style={{ fontWeight: 500, maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</TD>
                    <TD style={{ color: C.muted }}>{p.category.name}</TD>
                    <TD style={{ color: C.muted }}>{p.brand ?? '—'}</TD>
                    <TD style={{ fontWeight: 600 }}>৳{p.price.toLocaleString('en-BD')}</TD>
                    <TD>
                      <Badge label={p.stock <= 5 ? `Low · ${p.stock}` : String(p.stock)} color={p.stock <= 5 ? C.red : C.green} />
                    </TD>
                    <TD><Btn size="sm" variant="ghost">Edit</Btn></TD>
                  </tr>
                ))}
                {filtered.length === 0 && <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: C.faint }}>No products found</td></tr>}
              </tbody>
            </table>
          </Card>
          <Pager page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

// ─── Orders ───────────────────────────────────────────────────────────────────
const OrdersView = ({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [newStatus, setNewStatus] = useState<Record<number, string>>({});

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const qs = new URLSearchParams({ page: String(page), limit: '20', ...(statusFilter ? { status: statusFilter } : {}) });
      const data = await authFetch<{ orders: Order[]; totalPages: number }>(token, `/orders?${qs}`);
      setOrders(data.orders); setTotalPages(data.totalPages);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { onUnauthorized(); return; }
      setError(e instanceof ApiError ? e.message : 'Failed to load orders');
    } finally { setLoading(false); }
  }, [token, page, statusFilter, onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  const updateStatus = async (orderId: number) => {
    const status = newStatus[orderId]; if (!status) return;
    setUpdatingId(orderId);
    try { await authFetch(token, `/orders/${orderId}/status`, { method: 'PUT', body: JSON.stringify({ status }) }); await load(); }
    catch (e) { alert(e instanceof ApiError ? e.message : 'Update failed'); }
    finally { setUpdatingId(null); }
  };

  return (
    <div>
      <PageHeader title="Orders">
        <Select style={{ width: 'auto', padding: '8px 12px', fontSize: '13px' }} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          {['', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => <option key={s} value={s}>{s || 'All Statuses'}</option>)}
        </Select>
      </PageHeader>

      {loading ? <Spinner /> : error ? <ErrMsg msg={error} onRetry={load} /> : (
        <>
          <Card>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Order', 'Customer', 'Total', 'Payment', 'Date', 'Status', 'Update'].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
              <tbody>
                {orders.map(o => (
                  <tr key={o.id} onMouseEnter={e => (e.currentTarget.style.background = C.bg)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <TD style={{ fontWeight: 500 }}>{o.orderNumber}</TD>
                    <TD>
                      <div style={{ fontWeight: 500 }}>{o.customerName}</div>
                      <div style={{ fontSize: '11px', color: C.faint, marginTop: '1px' }}>{o.email}</div>
                    </TD>
                    <TD style={{ fontWeight: 600 }}>৳{o.total.toLocaleString('en-BD')}</TD>
                    <TD>
                      <div style={{ fontSize: '12px', color: C.muted, marginBottom: '3px' }}>{o.paymentMethod}</div>
                      <Badge label={o.paymentStatus} color={o.paymentStatus === 'PAID' ? C.green : C.red} />
                    </TD>
                    <TD style={{ color: C.muted }}>{new Date(o.createdAt).toLocaleDateString()}</TD>
                    <TD><Badge label={o.status} color={STATUS_COLOR[o.status] ?? C.faint} /></TD>
                    <TD>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <Select style={{ width: 'auto', padding: '5px 8px', fontSize: '12px' }} value={newStatus[o.id] ?? ''} onChange={e => setNewStatus(prev => ({ ...prev, [o.id]: e.target.value }))}>
                          <option value="">Set…</option>
                          {['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map(s => <option key={s} value={s}>{s}</option>)}
                        </Select>
                        <Btn size="sm" disabled={!newStatus[o.id] || updatingId === o.id} onClick={() => updateStatus(o.id)}>{updatingId === o.id ? '…' : 'Save'}</Btn>
                      </div>
                    </TD>
                  </tr>
                ))}
                {orders.length === 0 && <tr><td colSpan={7} style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: C.faint }}>No orders found</td></tr>}
              </tbody>
            </table>
          </Card>
          <Pager page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

// ─── Reviews ──────────────────────────────────────────────────────────────────
const ReviewsView = ({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('PENDING');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [working, setWorking] = useState<number | null>(null);
  const REVIEW_COLOR: Record<string, string> = { PENDING: C.amber, APPROVED: C.green, REJECTED: C.red };

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const qs = new URLSearchParams({ page: String(page), limit: '20', ...(filter !== 'all' ? { status: filter } : {}) });
      const data = await authFetch<{ reviews: Review[]; totalPages: number }>(token, `/reviews?${qs}`);
      setReviews(data.reviews); setTotalPages(data.totalPages);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { onUnauthorized(); return; }
      setError(e instanceof ApiError ? e.message : 'Failed to load reviews');
    } finally { setLoading(false); }
  }, [token, page, filter, onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  const setStatus = async (id: number, status: string) => {
    setWorking(id);
    try { await authFetch(token, `/reviews/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }); setReviews(prev => prev.filter(r => r.id !== id)); }
    catch (e) { alert(e instanceof ApiError ? e.message : 'Action failed'); }
    finally { setWorking(null); }
  };

  const deleteReview = async (id: number) => {
    if (!confirm('Delete this review permanently?')) return;
    setWorking(id);
    try { await authFetch(token, `/reviews/${id}`, { method: 'DELETE' }); setReviews(prev => prev.filter(r => r.id !== id)); }
    catch (e) { alert(e instanceof ApiError ? e.message : 'Delete failed'); }
    finally { setWorking(null); }
  };

  return (
    <div>
      <PageHeader title="Reviews" />
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {[{ label: 'Pending', value: 'PENDING' }, { label: 'Approved', value: 'APPROVED' }, { label: 'Rejected', value: 'REJECTED' }, { label: 'All', value: 'all' }].map(f => (
          <button key={f.value} onClick={() => { setFilter(f.value); setPage(1); }}
            style={{ padding: '7px 16px', borderRadius: '6px', border: `1px solid ${filter === f.value ? C.blue : C.border}`, cursor: 'pointer', fontWeight: 500, fontSize: '13px', background: filter === f.value ? C.blue : C.surface, color: filter === f.value ? 'white' : C.muted, transition: 'all 0.15s' }}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? <Spinner /> : error ? <ErrMsg msg={error} onRetry={load} /> : (
        <>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {reviews.map(r => (
              <Card key={r.id} style={{ padding: '16px 20px', borderLeft: `3px solid ${REVIEW_COLOR[r.status] ?? C.border}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" style={{ color: i < r.rating ? '#fbbf24' : C.border, fontSize: '12px' }}></i>)}
                      </div>
                      <Badge label={r.status} color={REVIEW_COLOR[r.status] ?? C.faint} />
                    </div>
                    {r.title && <div style={{ fontWeight: 600, fontSize: '13px', color: C.text, marginBottom: '4px' }}>{r.title}</div>}
                    <div style={{ fontSize: '13px', color: C.muted, marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.content}</div>
                    <div style={{ fontSize: '11px', color: C.faint }}>
                      <strong style={{ color: C.muted }}>{r.user?.name ?? r.guestName ?? 'Anonymous'}</strong>
                      {' · '}<span style={{ color: C.blue }}>{r.product.title}</span>
                      {' · '}{new Date(r.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    {r.status === 'PENDING' && <>
                      <Btn size="sm" variant="success" disabled={working === r.id} onClick={() => setStatus(r.id, 'APPROVED')}>{working === r.id ? '…' : 'Approve'}</Btn>
                      <Btn size="sm" variant="ghost" disabled={working === r.id} onClick={() => setStatus(r.id, 'REJECTED')}>Reject</Btn>
                    </>}
                    <Btn size="sm" variant="danger" disabled={working === r.id} onClick={() => deleteReview(r.id)}>Delete</Btn>
                  </div>
                </div>
              </Card>
            ))}
            {reviews.length === 0 && (
              <Card style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '13px', color: C.faint }}>No {filter !== 'all' ? filter.toLowerCase() : ''} reviews</p>
              </Card>
            )}
          </div>
          <Pager page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

// ─── Users ────────────────────────────────────────────────────────────────────
const UsersView = ({ token, onUnauthorized }: { token: string; onUnauthorized: () => void }) => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [working, setWorking] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const qs = new URLSearchParams({ page: String(page), limit: '20', ...(search ? { q: search } : {}) });
      const data = await authFetch<{ users: AdminUser[]; totalPages: number }>(token, `/admin/users?${qs}`);
      setUsers(data.users); setTotalPages(data.totalPages);
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) { onUnauthorized(); return; }
      setError(e instanceof ApiError ? e.message : 'Failed to load users');
    } finally { setLoading(false); }
  }, [token, page, search, onUnauthorized]);

  useEffect(() => { load(); }, [load]);

  const toggleBan = async (user: AdminUser) => {
    setWorking(user.id);
    try { await authFetch(token, `/admin/users/${user.id}/ban`, { method: 'PUT', body: JSON.stringify({ ban: !user.isBanned }) }); setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isBanned: !u.isBanned } : u)); }
    catch (e) { alert(e instanceof ApiError ? e.message : 'Action failed'); }
    finally { setWorking(null); }
  };

  return (
    <div>
      <PageHeader title="Users" />
      <Card style={{ padding: '12px 16px', marginBottom: '16px', display: 'flex', gap: '12px', alignItems: 'center' }}>
        <i className="fas fa-search" style={{ color: C.faint, fontSize: '13px' }}></i>
        <input type="text" placeholder="Search by name or email…" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ flex: 1, border: 'none', outline: 'none', fontSize: '13px', color: C.text, background: 'transparent' }} />
      </Card>

      {loading ? <Spinner /> : error ? <ErrMsg msg={error} onRetry={load} /> : (
        <>
          <Card>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead><tr>{['Name', 'Email', 'Phone', 'Role', 'Orders', 'Joined', 'Status', ''].map(h => <TH key={h}>{h}</TH>)}</tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id} style={{ opacity: u.isBanned ? 0.55 : 1 }} onMouseEnter={e => (e.currentTarget.style.background = C.bg)} onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                    <TD style={{ fontWeight: 500 }}>{u.name}</TD>
                    <TD style={{ color: C.muted }}>{u.email}</TD>
                    <TD style={{ color: C.muted }}>{u.phone ?? '—'}</TD>
                    <TD><Badge label={u.role} color={u.role === 'ADMIN' ? C.blue : C.faint} /></TD>
                    <TD style={{ color: C.muted }}>{u._count.orders}</TD>
                    <TD style={{ color: C.muted }}>{new Date(u.createdAt).toLocaleDateString()}</TD>
                    <TD><Badge label={u.isBanned ? 'Banned' : 'Active'} color={u.isBanned ? C.red : C.green} /></TD>
                    <TD>
                      <Btn size="sm" variant={u.isBanned ? 'success' : 'danger'} disabled={working === u.id} onClick={() => toggleBan(u)}>
                        {working === u.id ? '…' : u.isBanned ? 'Unban' : 'Ban'}
                      </Btn>
                    </TD>
                  </tr>
                ))}
                {users.length === 0 && <tr><td colSpan={8} style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: C.faint }}>No users found</td></tr>}
              </tbody>
            </table>
          </Card>
          <Pager page={page} totalPages={totalPages} setPage={setPage} />
        </>
      )}
    </div>
  );
};

// ─── Add Product ──────────────────────────────────────────────────────────────
interface Category { id: number; name: string; children?: Category[]; }
const AddProductView = ({ token, onDone }: { token: string; onDone: () => void }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { authFetch<Category[]>(token, '/categories').then(setCategories).catch(() => {}); }, [token]);

  const flatCategories = (cats: Category[], depth = 0): { id: number; name: string }[] =>
    cats.flatMap(c => [{ id: c.id, name: `${'  '.repeat(depth)}${depth > 0 ? '↳ ' : ''}${c.name}` }, ...flatCategories(c.children ?? [], depth + 1)]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setSaving(true); setError('');
    const f = e.currentTarget;
    const get = (name: string) => (f.elements.namedItem(name) as HTMLInputElement)?.value.trim();
    const body: Record<string, unknown> = {
      title: get('title'), categoryId: parseInt(get('categoryId')),
      brand: get('brand') || undefined, price: parseFloat(get('price')),
      salePrice: get('salePrice') ? parseFloat(get('salePrice')) : undefined,
      stock: parseInt(get('stock')), featured: (f.elements.namedItem('featured') as HTMLInputElement)?.checked,
      componentType: get('componentType') || undefined,
    };
    try { await authFetch(token, '/products', { method: 'POST', body: JSON.stringify(body) }); onDone(); }
    catch (err) { setError(err instanceof ApiError ? err.message : 'Failed to create product'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={onDone} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.faint, padding: '4px', display: 'flex' }}>
          <i className="fas fa-arrow-left" style={{ fontSize: '14px' }}></i>
        </button>
        <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: C.text }}>Add Product</h1>
      </div>

      <Card style={{ padding: '28px', maxWidth: '720px' }}>
        {error && (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', padding: '10px 14px', borderRadius: '6px', background: '#fff1f2', border: `1px solid #fecdd3`, marginBottom: '20px' }}>
            <i className="fas fa-exclamation-circle" style={{ color: C.red, fontSize: '13px' }}></i>
            <span style={{ fontSize: '13px', color: C.red }}>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div style={{ gridColumn: '1 / -1' }}>
              <Label>Product title *</Label>
              <Input name="title" required placeholder="e.g. ASUS ROG Strix B760-F Gaming WiFi" />
            </div>
            <div>
              <Label>Category *</Label>
              <Select name="categoryId" required>
                <option value="">Select a category…</option>
                {flatCategories(categories).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
            </div>
            <div>
              <Label>Brand</Label>
              <Input name="brand" placeholder="e.g. ASUS, Intel, Samsung" />
            </div>
            <div>
              <Label>Price (BDT) *</Label>
              <Input name="price" type="number" min="0" step="0.01" required placeholder="15000" />
            </div>
            <div>
              <Label>Sale price (BDT)</Label>
              <Input name="salePrice" type="number" min="0" step="0.01" placeholder="Leave blank if no sale" />
            </div>
            <div>
              <Label>Stock *</Label>
              <Input name="stock" type="number" min="0" required defaultValue="0" />
            </div>
            <div>
              <Label>Component type</Label>
              <Select name="componentType">
                <option value="">None</option>
                {['cpu', 'gpu', 'ram', 'storage', 'psu', 'cooler', 'casing', 'motherboard', 'monitor', 'keyboard', 'mouse', 'headphone', 'cameraType', 'recorder', 'powerSupply'].map(t => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
              <input name="featured" type="checkbox" id="featured" style={{ width: '15px', height: '15px', cursor: 'pointer', accentColor: C.blue }} />
              <label htmlFor="featured" style={{ fontSize: '13px', color: C.muted, cursor: 'pointer' }}>Mark as featured</label>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', paddingTop: '16px', borderTop: `1px solid ${C.border}` }}>
            <Btn type="button" variant="ghost" onClick={onDone}>Cancel</Btn>
            <Btn type="submit" disabled={saving}>{saving ? 'Creating…' : 'Create Product'}</Btn>
          </div>
        </form>
      </Card>
    </div>
  );
};

// ─── Sidebar nav item ─────────────────────────────────────────────────────────
const NavItem = ({ icon, label, section, current, onClick, badge }: { icon: string; label: string; section: string; current: string; onClick: (s: string) => void; badge?: number }) => {
  const active = current === section || (section === 'inventory' && current === 'add-product');
  return (
    <div onClick={() => onClick(section)}
      style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', margin: '1px 8px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, background: active ? 'rgba(255,255,255,0.1)' : 'transparent', color: active ? '#ffffff' : '#94a3b8', transition: 'all 0.15s' }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}>
      <i className={`fas ${icon}`} style={{ width: '14px', textAlign: 'center', fontSize: '13px' }}></i>
      <span style={{ flex: 1 }}>{label}</span>
      {badge ? <span style={{ background: C.red, color: 'white', fontSize: '10px', fontWeight: 700, padding: '1px 6px', borderRadius: '10px', lineHeight: '16px' }}>{badge}</span> : null}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [pendingReviews, setPendingReviews] = useState(0);

  useEffect(() => {
    const restore = async () => {
      try {
        const stored = localStorage.getItem('adminSession');
        if (!stored) return;
        const parsed = JSON.parse(stored);
        if (!parsed?.token || parsed?.role !== 'ADMIN') return;
        await authFetch(parsed.token, '/auth/me');
        setToken(parsed.token); setIsLoggedIn(true);
      } catch { localStorage.removeItem('adminSession'); }
    };
    restore();
  }, []);

  useEffect(() => {
    if (!token) return;
    authFetch<{ total: number }>(token, '/reviews?status=PENDING&limit=1')
      .then(d => setPendingReviews(d.total ?? 0)).catch(() => {});
  }, [token]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setLoginError(''); setLoginLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    try {
      const res = await fetch(`${API_BASE}/auth/login`, { method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const result = await res.json();
      if (!res.ok) { setLoginError(result.error ?? 'Login failed'); return; }
      if (result.user?.role !== 'ADMIN') { setLoginError('Access denied — admin only'); return; }
      localStorage.setItem('adminSession', JSON.stringify({ token: result.accessToken, role: result.user.role }));
      setToken(result.accessToken); setIsLoggedIn(true);
    } catch { setLoginError('Network error — is the backend running?'); }
    finally { setLoginLoading(false); }
  };

  const handleLogout = () => {
    if (token) authFetch(token, '/auth/logout', { method: 'POST' }).catch(() => {});
    localStorage.removeItem('adminSession');
    setToken(''); setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: C.sidebar }}>
        <div style={{ margin: 'auto', width: '360px', padding: '40px' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: C.orange, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '6px' }}>Tech X Ocean</div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 600, color: 'white' }}>Admin Portal</h1>
            <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#64748b' }}>Sign in to manage your store</p>
          </div>
          {loginError && (
            <div style={{ padding: '10px 14px', borderRadius: '6px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#fca5a5' }}>{loginError}</span>
            </div>
          )}
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <Label><span style={{ color: '#64748b' }}>Email</span></Label>
              <input name="email" type="email" required placeholder="admin@techxocean.com"
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '14px', color: 'white', background: '#1e293b', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <div>
              <Label><span style={{ color: '#64748b' }}>Password</span></Label>
              <input name="password" type="password" required placeholder="••••••••"
                style={{ width: '100%', padding: '11px 14px', border: '1px solid #1e293b', borderRadius: '6px', fontSize: '14px', color: 'white', background: '#1e293b', boxSizing: 'border-box', outline: 'none' }} />
            </div>
            <button type="submit" disabled={loginLoading}
              style={{ marginTop: '8px', padding: '12px', background: loginLoading ? '#334155' : C.blue, color: 'white', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '14px', cursor: loginLoading ? 'not-allowed' : 'pointer' }}>
              {loginLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const navItems = [
    { icon: 'fa-chart-bar', label: 'Overview', section: 'dashboard' },
    { icon: 'fa-box', label: 'Inventory', section: 'inventory' },
    { icon: 'fa-shopping-bag', label: 'Orders', section: 'orders' },
    { icon: 'fa-star', label: 'Reviews', section: 'reviews', badge: pendingReviews > 0 ? pendingReviews : undefined },
    { icon: 'fa-users', label: 'Users', section: 'users' },
  ];

  return (
    <div style={{ display: 'flex', width: '100%', minHeight: '100vh', background: C.bg }}>
      <aside style={{ width: '220px', background: C.sidebar, flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 16px 16px' }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: C.orange, letterSpacing: '1.5px', textTransform: 'uppercase' }}>Tech X Ocean</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '2px' }}>Admin</div>
        </div>
        <div style={{ height: '1px', background: '#1e293b', margin: '0 16px' }} />
        <nav style={{ flex: 1, padding: '12px 0' }}>
          {navItems.map(item => <NavItem key={item.section} {...item} current={currentView} onClick={setCurrentView} />)}
        </nav>
        <div style={{ height: '1px', background: '#1e293b', margin: '0 16px' }} />
        <div style={{ padding: '16px' }}>
          <button onClick={handleLogout}
            style={{ width: '100%', padding: '9px', background: 'transparent', color: '#64748b', border: '1px solid #1e293b', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'all 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#64748b'; }}>
            <i className="fas fa-sign-out-alt" style={{ fontSize: '12px' }}></i> Sign out
          </button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '32px 40px', overflowY: 'auto', maxHeight: '100vh' }}>
        {currentView === 'dashboard' && <DashboardView token={token} onAddProduct={() => setCurrentView('add-product')} onUnauthorized={handleLogout} />}
        {currentView === 'inventory' && <InventoryView token={token} onAddProduct={() => setCurrentView('add-product')} onUnauthorized={handleLogout} />}
        {currentView === 'add-product' && <AddProductView token={token} onDone={() => setCurrentView('inventory')} />}
        {currentView === 'orders' && <OrdersView token={token} onUnauthorized={handleLogout} />}
        {currentView === 'reviews' && <ReviewsView token={token} onUnauthorized={handleLogout} />}
        {currentView === 'users' && <UsersView token={token} onUnauthorized={handleLogout} />}
      </main>
    </div>
  );
}
