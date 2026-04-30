'use client';

import React from 'react';

export const AdminTopbar = () => {
    return (
        <header className="admin-topbar">
            <div className="admin-search-box">
                <i className="fas fa-search"></i>
                <input 
                    type="text" 
                    className="admin-search-input"
                    placeholder="Search orders, products, customers..."
                />
            </div>
            
            <div className="admin-topbar-actions">
                <button className="topbar-btn">
                    <i className="far fa-bell"></i>
                    <span className="btn-badge">3</span>
                </button>
                
                <div className="admin-user-profile">
                    <img src="/img/admin-avatar.png" alt="Admin" onError={(e:any) => e.target.src = 'https://ui-avatars.com/api/?name=Admin+User&background=1B5B97&color=fff'} />
                    <div className="admin-user-info">
                        <span className="admin-user-name">Sadid Admin</span>
                        <span className="admin-user-role">Super Admin</span>
                    </div>
                    <i className="fas fa-chevron-down" style={{fontSize: '12px', color: '#94a3b8'}}></i>
                </div>
            </div>
        </header>
    );
};

export default AdminTopbar;
