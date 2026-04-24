'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStorage } from '@/hooks/useBuilderStorage';
import { CartContext } from '@/components/ClientApplication';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si';
import * as BsIcons from 'react-icons/bs';

import { COMPONENT_METADATA } from '@/data/component-structure';

const getIconComponent = (iconName: string) => {
    if (!iconName) return FaIcons.FaBox;
    if (iconName.startsWith('Gi')) return (GiIcons as any)[iconName] || FaIcons.FaBox;
    if (iconName.startsWith('Si')) return (SiIcons as any)[iconName] || FaIcons.FaBox;
    if (iconName.startsWith('Bs')) return (BsIcons as any)[iconName] || FaIcons.FaBox;
    return (FaIcons as any)[iconName] || FaIcons.FaBox;
};

// Derive configurations from COMPONENT_METADATA
const allMeta = Object.values(COMPONENT_METADATA).sort((a, b) => a.displayOrder - b.displayOrder);

const PC_CORE_CONFIG = allMeta
  .filter(m => m.builderGroup === 'core')
  .map(m => ({ key: m.id, label: m.name.replace(' (CPU)', '').replace(' (PSU)', ''), reactIcon: m.icon, required: m.requiredInBuilder }));

const PC_PERIPHERALS_CONFIG = allMeta
  .filter(m => m.builderGroup === 'peripherals')
  .map(m => ({ key: m.id, label: m.name, reactIcon: m.icon }));

const PC_ACCESSORIES_CONFIG = allMeta
  .filter(m => m.builderGroup === 'accessories')
  .map(m => ({ key: m.id, label: m.name, reactIcon: m.icon }));

// For mobile, we might want a specific order or subset
const PC_CORE_CONFIG_MOBILE = [...PC_CORE_CONFIG]; 

const REQUIRED_KEYS = PC_CORE_CONFIG.filter(c => c.required).map(c => c.key);

export default function PCBuilderPage() {
    const { addToCart } = useContext(CartContext);
    const router = useRouter();
    const [selections, setSelections] = useBuilderStorage<Record<string, any>>('pcBuilderState', {});
    const [peripheralsOpen, setPeripheralsOpen] = useState(false);
    const [accessoriesOpen, setAccessoriesOpen] = useState(false);
    const [hideEmpty, setHideEmpty] = useState(false);

    const totalPrice   = Object.values(selections).reduce((s: number, i: any) => s + (i?.price   || 0), 0) as number;
    const totalWattage = Object.values(selections).reduce((s: number, i: any) => s + (i?.wattage || 0), 0) as number;
    const selectedRequired = REQUIRED_KEYS.filter(k => !!selections[k]).length;
    const progressPct = Math.round((selectedRequired / REQUIRED_KEYS.length) * 100);
    const totalSelectedCount = Object.values(selections).filter(Boolean).length;

    const handleRemove = (key: string) => {
        const n = { ...selections };
        delete n[key];
        setSelections(n);
    };

    const handleAddToCart = () => {
        Object.values(selections).forEach((item: any) => { if (item) addToCart(item, 1, false); });
        alert('All selected components added to cart!');
    };

    const renderDesktopRow = (config: any) => {
        const sel = selections[config.key];
        if (hideEmpty && !sel) return null;
        const Icon = getIconComponent(config.reactIcon);
        return (
            <div key={config.key} className={`component-row ${sel ? 'sr-row--selected' : ''}`}>
                <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                    <div className="component-icon">
                        {config.imageSrc ? (
                            <img src={config.imageSrc} alt={config.label} style={{width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(34%) sepia(92%) saturate(687%) hue-rotate(345deg) brightness(97%) contrast(97%)'}} />
                        ) : (
                            Icon && <Icon color="#db4b27" size={28} />
                        )}
                    </div>
                </div>
                <div className="sr-details">
                    <div className="sr-comp-header">
                        <span className="sr-comp-label">{config.label}</span>
                        {config.required !== undefined && (
                            <span className={config.required ? 'required-badge' : 'optional-badge'}>
                                {config.required ? 'Required' : 'Optional'}
                            </span>
                        )}
                    </div>
                    {sel ? (
                        <>
                            <div className="sr-product-name">{sel.title}</div>
                            {sel.specs && <div className="sr-product-specs">{sel.specs}</div>}
                        </>
                    ) : (
                        <div className="sr-not-selected">Not Selected</div>
                    )}
                </div>
                {sel && (
                    <div className="sr-stats">
                        <div className="sr-price">৳{sel.price.toLocaleString()}</div>
                        {sel.wattage > 0 && (
                            <div className="sr-wattage">
                                <i className="fas fa-bolt"></i> {sel.wattage}W
                            </div>
                        )}
                    </div>
                )}
                <div className="sr-actions">
                    {sel ? (
                        <>
                            <button className="change-btn" onClick={() => router.push(`/pc-builder/select/${config.key}`)}>Change</button>
                            <button className="sr-btn-remove" title="Remove" onClick={() => handleRemove(config.key)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </>
                    ) : (
                        <button className="select-btn" onClick={() => router.push(`/pc-builder/select/${config.key}`)}>Select</button>
                    )}
                </div>
            </div>
        );
    };

    const renderMobileRow = (config: any) => {
        const sel = selections[config.key];
        const Icon = config.imageSrc ? null : getIconComponent(config.reactIcon);
        return (
            <div key={config.key} className="component-row-compact">
                <div className="crc-icon">
                    {config.imageSrc ? (
                        <img src={config.imageSrc} alt={config.label}
                            style={{ width: 22, height: 22, objectFit: 'contain',
                                filter: 'brightness(0) saturate(100%) invert(34%) sepia(92%) saturate(687%) hue-rotate(345deg) brightness(97%) contrast(97%)' }} />
                    ) : (
                        Icon && <Icon color="#db4b27" size={22} />
                    )}
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
                    {sel ? sel.title : 'Select a ' + config.label}
                </div>
                <div className="component-price-compact">
                    {sel ? `৳${sel.price.toLocaleString()}` : '—'}
                </div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    {sel && (
                        <button className="crc-remove-btn" title="Remove" onClick={() => handleRemove(config.key)}>
                            <i className="fas fa-times"></i>
                        </button>
                    )}
                    <button
                        className={`choose-btn-compact ${sel ? 'selected' : ''}`}
                        onClick={() => router.push(`/pc-builder/select/${config.key}`)}
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
                            <h1 className="sr-title">PC Builder</h1>
                            <p className="sr-subtitle">Build your custom PC — select components below.</p>
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
                    
                    <BrandSectionTitle title="CORE COMPONENTS" subtitle="Select essential parts for your build" />
                    <div className="sr-rows">
                        {PC_CORE_CONFIG.map(c => renderDesktopRow(c))}
                    </div>

                    <BrandSectionTitle title="PERIPHERALS" subtitle="Monitors, Keyboards, Audio & more" />
                    <div className="sr-rows">
                        {PC_PERIPHERALS_CONFIG.map(c => renderDesktopRow(c))}
                    </div>

                    <BrandSectionTitle title="ACCESSORIES & OTHERS" subtitle="Gaming chairs, Cables & Lighting" />
                    <div className="sr-rows">
                        {PC_ACCESSORIES_CONFIG.map(c => renderDesktopRow(c))}
                    </div>

                    <div className="sr-summary-bar">
                        <div className="sr-summary-stats">
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Total Items</span>
                                <span className="sr-summary-stat-val">{totalSelectedCount}</span>
                            </div>
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Est. Wattage</span>
                                <span className="sr-summary-stat-val">{totalWattage}W</span>
                            </div>
                            <div className="sr-summary-stat">
                                <span className="sr-summary-stat-lbl">Total Price</span>
                                <span className="sr-summary-stat-val sr-summary-stat-val--price">৳{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="sr-summary-actions">
                            <button className="sr-btn-secondary" onClick={() => window.print()}>
                                <i className="fas fa-print"></i> Print
                            </button>
                            <button className="sr-btn-primary" onClick={handleAddToCart} disabled={totalSelectedCount === 0}>
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View */}
            <div className="builder-mobile-only">
                <div className="pc-builder-page">
                    <div className="builder-header-compact">
                        <h1>PC Builder</h1>
                        <p className="subtitle">Select essential parts for your build — {selectedRequired}/{REQUIRED_KEYS.length} required components chosen</p>
                    </div>
                    <div className="core-components-container">
                        {PC_CORE_CONFIG_MOBILE.map(c => renderMobileRow(c))}
                    </div>
                    
                    {/* Peripherals Mobile */}
                    <div className="peripherals-section">
                        <div className="peripherals-header" onClick={() => setPeripheralsOpen(!peripheralsOpen)}>
                            <i className={`fas fa-chevron-${peripheralsOpen ? 'down' : 'right'}`}></i>
                            <span>Peripherals</span>
                            <span className="peripherals-count">
                                {PC_PERIPHERALS_CONFIG.filter(p => !!selections[p.key]).length} / {PC_PERIPHERALS_CONFIG.length}
                            </span>
                        </div>
                        {peripheralsOpen && (
                            <div className="peripherals-list">
                                {PC_PERIPHERALS_CONFIG.map(c => renderMobileRow(c))}
                            </div>
                        )}
                    </div>

                    {/* Accessories Mobile */}
                    <div className="peripherals-section" style={{marginTop: '10px'}}>
                        <div className="peripherals-header" onClick={() => setAccessoriesOpen(!accessoriesOpen)}>
                            <i className={`fas fa-chevron-${accessoriesOpen ? 'down' : 'right'}`}></i>
                            <span>Accessories & Others</span>
                            <span className="peripherals-count">
                                {PC_ACCESSORIES_CONFIG.filter(p => !!selections[p.key]).length} / {PC_ACCESSORIES_CONFIG.length}
                            </span>
                        </div>
                        {accessoriesOpen && (
                            <div className="peripherals-list">
                                {PC_ACCESSORIES_CONFIG.map(c => renderMobileRow(c))}
                            </div>
                        )}
                    </div>

                    <div className="summary-bar-compact">
                        <div className="summary-stats">
                            <div className="stat">
                                <span className="stat-label">Total:</span>
                                <span className="stat-value">৳{totalPrice.toLocaleString()}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Wattage:</span>
                                <span className="stat-value">{totalWattage}W</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Items:</span>
                                <span className="stat-value">{selectedRequired}/{REQUIRED_KEYS.length}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button className="sr-btn-secondary" onClick={() => window.print()}>
                                <i className="fas fa-print"></i> Print
                            </button>
                            <button className="complete-build-btn" onClick={handleAddToCart} disabled={Object.values(selections).filter(Boolean).length === 0}>
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
