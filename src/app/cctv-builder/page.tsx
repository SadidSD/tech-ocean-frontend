'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStorage } from '@/hooks/useBuilderStorage';
import { CartContext } from '@/components/ClientApplication';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';

const getIconComponent = (iconName: string) => {
    if (!iconName) return FaIcons.FaBox;
    if (iconName.startsWith('Gi')) return (GiIcons as any)[iconName] || FaIcons.FaBox;
    return (FaIcons as any)[iconName] || FaIcons.FaBox;
};

const CCTV_CORE_CONFIG = [
    { key: 'cameraType',  label: 'Camera Type',        reactIcon: 'FaVideo',       required: true  },
    { key: 'recorder',    label: 'NVR / DVR Recorder', reactIcon: 'GiServerRack',  required: true  },
    { key: 'storage',     label: 'Surveillance HDD',   reactIcon: 'FaHdd',         required: true  },
    { key: 'powerSupply', label: 'Power Supply',       reactIcon: 'FaPlug',        required: true  },
];

const CCTV_OPTIONAL_CONFIG = [
    { key: 'monitor',    label: 'Monitor',          reactIcon: 'FaDesktop',     required: false },
    { key: 'installKit', label: 'Installation Kit', reactIcon: 'FaToolbox',     required: false },
];

const REQUIRED_KEYS = CCTV_CORE_CONFIG.filter(c => c.required).map(c => c.key);

export default function CCTVBuilderPage() {
    const { addToCart } = useContext(CartContext);
    const router = useRouter();
    const [selections, setSelections] = useBuilderStorage<Record<string, any>>('cctvBuilderState', {});
    const [cameraCount, setCameraCount] = useState(4);
    const [peripheralsOpen, setPeripheralsOpen] = useState(false);
    const [hideEmpty, setHideEmpty] = useState(false);

    const totalPrice = Object.entries(selections).reduce((sum: number, [key, item]: [string, any]) => {
        if (!item) return sum;
        return sum + item.price * (key === 'cameraType' ? cameraCount : 1);
    }, 0) as number;

    const selectedRequired = REQUIRED_KEYS.filter(k => !!selections[k]).length;
    const progressPct = Math.round((selectedRequired / REQUIRED_KEYS.length) * 100);
    const selectedOptionalCount = CCTV_OPTIONAL_CONFIG.filter(p => !!selections[p.key]).length;
    const totalSelectedCount = Object.values(selections).filter(Boolean).length;

    const handleRemove = (key: string) => {
        const n = { ...selections };
        delete n[key];
        setSelections(n);
    };

    const handleAddToCart = () => {
        Object.entries(selections).forEach(([key, item]: [string, any]) => {
            if (item) addToCart(item, key === 'cameraType' ? cameraCount : 1, false);
        });
        alert('CCTV System components added to cart!');
    };

    const renderDesktopRow = (config: any) => {
        const sel        = selections[config.key];
        const multiplier = config.key === 'cameraType' ? cameraCount : 1;
        const finalPrice = sel ? sel.price * multiplier : 0;
        if (hideEmpty && !sel) return null;
        const Icon = getIconComponent(config.reactIcon);

        return (
            <div key={config.key} className={`component-row ${sel ? 'sr-row--selected' : ''}`}>
                <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                    <div className="component-icon">
                        {Icon && <Icon color="#db4b27" size={28} />}
                    </div>
                </div>
                <div className="sr-details">
                    <div className="sr-comp-header">
                        <span className="sr-comp-label">{config.label}</span>
                        <span className={config.required ? 'required-badge' : 'optional-badge'}>
                            {config.required ? 'Required' : 'Optional'}
                        </span>
                    </div>
                    {sel ? (
                        <>
                            <div className="sr-product-name">
                                {sel.title}
                                {multiplier > 1 && <span style={{color:'#1B5B97', fontSize:'13px', marginLeft:'8px', fontWeight:600}}>×{multiplier}</span>}
                            </div>
                            {sel.specs && <div className="sr-product-specs">{sel.specs}</div>}
                        </>
                    ) : (
                        <div className="sr-not-selected">Not Selected</div>
                    )}
                </div>
                {sel && (
                    <div className="sr-stats">
                        <div className="sr-price">৳{finalPrice.toLocaleString()}</div>
                        {multiplier > 1 && (
                            <div className="sr-wattage">৳{sel.price.toLocaleString()} each</div>
                        )}
                    </div>
                )}
                <div className="sr-actions">
                    {sel ? (
                        <>
                            <button className="change-btn" onClick={() => router.push(`/cctv-builder/select/${config.key}`)}>Change</button>
                            <button className="sr-btn-remove" title="Remove" onClick={() => handleRemove(config.key)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </>
                    ) : (
                        <button className="select-btn" onClick={() => router.push(`/cctv-builder/select/${config.key}`)}>Select</button>
                    )}
                </div>
            </div>
        );
    };

    const renderMobileRow = (config: any) => {
        const sel = selections[config.key];
        const multiplier = config.key === 'cameraType' ? cameraCount : 1;
        const finalPrice = sel ? sel.price * multiplier : 0;
        const Icon = getIconComponent(config.reactIcon);
        return (
            <div key={config.key} className="component-row-compact">
                <div className="crc-icon">
                    {Icon && <Icon color="#db4b27" size={22} />}
                </div>
                <div className="component-info-compact">
                    <span className="component-name-compact">{config.label}</span>
                    {config.required !== undefined && (
                        <span className={config.required ? 'req-badge' : 'opt-badge'}>
                            {config.required ? 'Required' : 'Optional'}
                        </span>
                    )}
                </div>
                <div className={`component-status-compact ${sel ? 'selected' : ''}`}>
                    {sel ? (
                        <>
                            {sel.title}
                            {multiplier > 1 && <span style={{ color: '#1B5B97', marginLeft: '6px', fontWeight: 600 }}>×{multiplier}</span>}
                        </>
                    ) : 'Select a ' + config.label}
                </div>
                <div className="component-price-compact">
                    {sel ? `৳${finalPrice.toLocaleString()}` : '—'}
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {sel && (
                        <button className="crc-remove-btn" title="Remove" onClick={() => handleRemove(config.key)}>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                    <button
                        className={`choose-btn-compact ${sel ? 'selected' : ''}`}
                        onClick={() => router.push(`/cctv-builder/select/${config.key}`)}
                    >
                        {sel ? 'Change' : 'Select'}
                    </button>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* Desktop View */}
            <div className="builder-desktop-only">
                <div className="sr-page">
                    <div className="sr-header">
                        <div>
                            <h1 className="sr-title">CCTV Quotation</h1>
                            <p className="sr-subtitle">Build your custom surveillance solution and get an instant quote.</p>
                        </div>
                    </div>
                    <div className="sr-toolbar">
                        <div className="sr-progress-area">
                            <div className="sr-progress-label">
                                Required: <strong>{selectedRequired} / {REQUIRED_KEYS.length}</strong> selected
                            </div>
                            <div className="sr-progress-track">
                                <div className="sr-progress-fill" style={{width:`${progressPct}%`}}></div>
                            </div>
                        </div>
                        <label className="sr-toggle">
                            <input type="checkbox" checked={hideEmpty} onChange={e => setHideEmpty(e.target.checked)} />
                            <span className="sr-toggle-slider"></span>
                            <span className="sr-toggle-label">Hide Unconfigured</span>
                        </label>
                    </div>
                    <BrandSectionTitle title="CCTV SYSTEM" subtitle="Design your security solution" />
                    <div className="sr-rows">
                        <div className="component-row" style={{background:'#f8faff'}}>
                            <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                                <div className="component-icon">
                                    <FaIcons.FaVideo color="#db4b27" size={28} />
                                </div>
                            </div>
                            <div className="sr-details">
                                <div className="sr-comp-header">
                                    <span className="sr-comp-label">Number of Cameras</span>
                                    <span className="required-badge">Configure</span>
                                </div>
                                <div style={{fontSize:'13px', color:'#888', marginTop:'4px'}}>Set how many cameras you need — price will update automatically</div>
                            </div>
                            <div className="sr-stats">
                                <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                                    <button onClick={() => setCameraCount(c => Math.max(1, c-1))} style={{width:'32px', height:'32px', borderRadius:'8px', border:'1px solid #dde3ea', background:'#fff', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', color:'#555'}}>−</button>
                                    <span style={{fontWeight:800, fontSize:'22px', minWidth:'32px', textAlign:'center'}}>{cameraCount}</span>
                                    <button onClick={() => setCameraCount(c => c+1)} style={{width:'32px', height:'32px', borderRadius:'8px', border:'1px solid #dde3ea', background:'#fff', fontSize:'18px', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold', color:'#555'}}>+</button>
                                </div>
                            </div>
                            <div className="sr-actions" style={{minWidth:'100px'}}></div>
                        </div>
                    </div>
                    <div className="sr-section-label" style={{marginTop:'16px'}}>Components</div>
                    <div className="sr-rows">
                        {CCTV_CORE_CONFIG.map(c => renderDesktopRow(c))}
                        {CCTV_OPTIONAL_CONFIG.map(c => renderDesktopRow(c))}
                    </div>
                    <div className="sr-summary-bar">
                        <div className="sr-summary-stats">
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Cameras</span>
                                <span className="sr-summary-stat-val">{cameraCount}</span>
                            </div>
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Components</span>
                                <span className="sr-summary-stat-val">{totalSelectedCount}</span>
                            </div>
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Total Quotation</span>
                                <span className="sr-summary-stat-val sr-summary-stat-val--price">৳{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="sr-summary-actions">
                            <button className="sr-btn-secondary" onClick={() => window.print()}>
                                <i className="fas fa-print"></i> Print Quote
                            </button>
                            <button className="sr-btn-primary" onClick={handleAddToCart} disabled={selectedRequired < 2}>
                                <i className="fas fa-shopping-cart"></i> Add Quote to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="builder-mobile-only">
                <div className="pc-builder-page">
                    <div className="builder-header-compact">
                        <h1>CCTV Quotation</h1>
                        <p className="subtitle">Build your custom surveillance solution and get an instant quote.</p>
                    </div>
                    <div className="core-components-container" style={{ marginBottom: '0', borderRadius: '12px 12px 0 0' }}>
                        <div className="component-row-compact" style={{ background: '#f8faff' }}>
                            <div className="crc-icon">
                                <FaIcons.FaVideo color="#db4b27" size={22} />
                            </div>
                            <div className="component-info-compact">
                                <span className="component-name-compact">Number of Cameras</span>
                                <span className="req-badge">Configure</span>
                            </div>
                            <div className="component-status-compact selected">
                                Set how many cameras you need
                            </div>
                            <div className="component-price-compact"></div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <button onClick={() => setCameraCount(c => Math.max(1, c - 1))}
                                    style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #dde3ea', background: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#555' }}>−</button>
                                <span style={{ fontWeight: 800, fontSize: '18px', minWidth: '24px', textAlign: 'center' }}>{cameraCount}</span>
                                <button onClick={() => setCameraCount(c => c + 1)}
                                    style={{ width: '30px', height: '30px', borderRadius: '6px', border: '1px solid #dde3ea', background: '#fff', fontSize: '18px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#555' }}>+</button>
                            </div>
                        </div>
                        {CCTV_CORE_CONFIG.map(c => renderMobileRow(c))}
                    </div>
                    <div className="peripherals-section" style={{ marginTop: '0', borderRadius: '0 0 12px 12px', borderTop: 'none' }}>
                        <div className="peripherals-header" onClick={() => setPeripheralsOpen(!peripheralsOpen)}>
                            <i className={`fas fa-chevron-${peripheralsOpen ? 'down' : 'right'}`}></i>
                            <span>Optional Add-ons</span>
                            <span className="peripherals-count">
                                {selectedOptionalCount} / {CCTV_OPTIONAL_CONFIG.length} selected
                            </span>
                        </div>
                        {peripheralsOpen && (
                            <div className="peripherals-list">
                                {CCTV_OPTIONAL_CONFIG.map(c => renderMobileRow(c))}
                            </div>
                        )}
                    </div>
                    <div className="summary-bar-compact">
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="stat-label">Cameras:</span>
                                <span className="stat-value">{cameraCount}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Comp:</span>
                                <span className="stat-value">{selectedRequired}/{REQUIRED_KEYS.length}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Total:</span>
                                <span className="stat-value">৳{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="sr-btn-secondary" onClick={() => window.print()}>
                                <i className="fas fa-print"></i> Print
                            </button>
                            <button className="complete-build-btn" onClick={handleAddToCart} disabled={selectedRequired < 2}>
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
