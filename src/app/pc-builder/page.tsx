'use client';

import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useBuilderStorage } from '@/hooks/useBuilderStorage';
import { MOCK_PC_COMPONENTS } from '@/data/products';
import { CartContext } from '@/components/ClientApplication';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si';
import * as BsIcons from 'react-icons/bs';

const getIconComponent = (iconName: string) => {
    if (!iconName) return FaIcons.FaBox;
    if (iconName.startsWith('Gi')) return (GiIcons as any)[iconName] || FaIcons.FaBox;
    if (iconName.startsWith('Si')) return (SiIcons as any)[iconName] || FaIcons.FaBox;
    if (iconName.startsWith('Bs')) return (BsIcons as any)[iconName] || FaIcons.FaBox;
    return (FaIcons as any)[iconName] || FaIcons.FaBox;
};

const PC_BUILDER_CONFIG = [
    { key: 'cpu',         label: 'CPU',          reactIcon: 'BsCpu',       required: true  },
    { key: 'motherboard', label: 'Motherboard',  reactIcon: 'GiCircuitry', required: true  },
    { key: 'gpu',         label: 'GPU',          reactIcon: 'BsGpuCard',   required: false },
    { key: 'ram',         label: 'RAM',          reactIcon: 'FaMemory',    required: true  },
    { key: 'storage',     label: 'Storage',      reactIcon: 'FaHdd',       required: true  },
    { key: 'psu',         label: 'Power Supply', reactIcon: '', imageSrc: '/img/psu_logo.png', required: true  },
    { key: 'cooler',      label: 'CPU Cooler',   reactIcon: 'GiComputerFan', required: false },
    { key: 'casing',      label: 'Casing',       reactIcon: 'BsPc',        required: true  },
];

const PC_PERIPHERALS_CONFIG = [
    { key: 'monitor',   label: 'Monitor',   reactIcon: 'FaDesktop'    },
    { key: 'keyboard',  label: 'Keyboard',  reactIcon: 'FaKeyboard'   },
    { key: 'mouse',     label: 'Mouse',     reactIcon: 'FaMouse'      },
    { key: 'headphone', label: 'Headphone', reactIcon: 'FaHeadphones' },
];

const REQUIRED_KEYS = PC_BUILDER_CONFIG.filter(c => c.required).map(c => c.key);

export default function PCBuilderPage() {
    const { addToCart } = useContext(CartContext);
    const router = useRouter();
    const [selections, setSelections] = useBuilderStorage<Record<string, any>>('pcBuilderState', {});
    const [hideEmpty, setHideEmpty]         = useState(false);

    const totalPrice      = Object.values(selections).reduce((s: number, i: any) => s + (i?.price   || 0), 0) as number;
    const totalWattage    = Object.values(selections).reduce((s: number, i: any) => s + (i?.wattage || 0), 0) as number;
    const selectedRequired = REQUIRED_KEYS.filter(k => !!selections[k]).length;
    const progressPct      = Math.round((selectedRequired / REQUIRED_KEYS.length) * 100);
    const totalSelectedCount = Object.values(selections).filter(Boolean).length;

    const handleRemove = (key: string) => {
        const n = {...selections}; 
        delete n[key]; 
        setSelections(n);
    };
    const handleAddToCart = () => {
        Object.values(selections).forEach((item: any) => { if (item) addToCart(item, 1, false); });
        alert('All selected components added to cart!');
    };

    const renderRow = (config: any) => {
        const sel = selections[config.key];
        if (hideEmpty && !sel) return null;
        const Icon = getIconComponent(config.reactIcon);
        return (
            <div key={config.key} className={`component-row ${sel ? 'sr-row--selected' : ''}`}>
                {/* Image / Icon column */}
                <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                    <div className="component-icon">
                        {config.imageSrc ? (
                            <img src={config.imageSrc} alt={config.label} style={{width: 28, height: 28, objectFit: 'contain', filter: 'brightness(0) saturate(100%) invert(34%) sepia(92%) saturate(687%) hue-rotate(345deg) brightness(97%) contrast(97%)'}} />
                        ) : (
                            Icon && <Icon color="#db4b27" size={28} />
                        )}
                    </div>
                </div>

                {/* Details column */}
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

                {/* Stats column */}
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

                {/* Actions column */}
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

    const currentConfig = [...PC_BUILDER_CONFIG, ...PC_PERIPHERALS_CONFIG];

    return (
        <div className="sr-page">
            {/* Page header */}
            <div className="sr-header">
                <div>
                    <h1 className="sr-title">PC Builder</h1>
                    <p className="sr-subtitle">Build your custom PC — select components below.</p>
                </div>

            </div>

            {/* Progress + toggle */}
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

            {/* Core components section */}
            <BrandSectionTitle 
                title="CORE COMPONENTS" 
                subtitle="Select essential parts for your build"
            />
            <div className="sr-rows">
                {PC_BUILDER_CONFIG.map(c => renderRow(c))}
            </div>

            {/* Peripherals section */}
            <BrandSectionTitle 
                title="PERIPHERALS & OTHERS" 
                subtitle="Complete your setup with accessories"
            />
            <div className="sr-rows">
                {PC_PERIPHERALS_CONFIG.map(c => renderRow(c))}
            </div>

            {/* Summary bar */}
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
                    <button
                        className="sr-btn-primary"
                        onClick={handleAddToCart}
                        disabled={totalSelectedCount === 0}
                    >
                        <i className="fas fa-shopping-cart"></i> Add to Cart
                    </button>
                </div>
            </div>


        </div>
    );
}
