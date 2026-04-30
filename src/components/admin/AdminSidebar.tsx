'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin', section: 'main' },
    { icon: '🛒', label: 'Orders', path: '/admin/orders', section: 'main', badge: '12 new' },
    { icon: '📦', label: 'Products', path: '/admin/products', section: 'main' },
    { icon: '🔧', label: 'Builders', path: '/admin/builders', section: 'main' },
    { divider: true },
    { icon: '🏷️', label: 'Flash Sales', path: '/admin/flash-sales', section: 'marketing' },
    { icon: '⭐', label: 'Badges Manager', path: '/admin/badges', section: 'marketing' },
    { divider: true },
    { icon: '💬', label: 'Product Reviews', path: '/admin/reviews', section: 'feedback', badge: '4' },
    { icon: '❓', label: 'Q&A Management', path: '/admin/qa', section: 'feedback' },
    { divider: true },
    { icon: '⚙️', label: 'Settings', path: '/admin/settings', section: 'settings' },
    { icon: '🌐', label: 'Back to Website', path: '/', section: 'settings' },
];

export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-logo">
                <Link href="/">
                    <img 
                        src="/img/main website logo.png" 
                        alt="Tech X Ocean" 
                        style={{ height: '40px', width: 'auto', marginBottom: '8px', display: 'block' }} 
                    />
                </Link>
                <p>Admin Panel</p>
            </div>
            
            <nav className="sidebar-nav">
                {menuItems.map((item, index) => {
                    if (item.divider) {
                        return <div key={`div-${index}`} className="sidebar-divider" />;
                    }
                    const isActive = pathname === item.path;
                    return (
                        <Link 
                            key={item.path}
                            href={item.path}
                            className={`sidebar-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="sidebar-icon">{item.icon}</span>
                            <span className="sidebar-label">{item.label}</span>
                            {item.badge && <span className="sidebar-badge">{item.badge}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
