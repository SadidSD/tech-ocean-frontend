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

const MOCK_CCTV_COMPONENTS = {
    cameraType: [
        { id: 'cctv_cam_1', title: 'Dahua HAC-B1A21P 2MP Bullet Camera',          specs: '2MP | HDCVI | IR 20m | IP67 | Bullet Type',           price: 1800,  imgIcon: 'fa-video' },
        { id: 'cctv_cam_2', title: 'Hikvision DS-2CE56D0T-IRPF 2MP Dome Camera',  specs: '2MP | HDTVI | IR 20m | IP66 | Dome Type',             price: 1600,  imgIcon: 'fa-video' },
        { id: 'cctv_cam_3', title: 'Dahua SD22204UE-GN 2MP PTZ Camera',           specs: '2MP | IP | 4x Optical Zoom | Pan/Tilt/Zoom',          price: 15500, imgIcon: 'fa-video' }
    ],
    recorder: [
        { id: 'cctv_rec_1', title: 'Dahua XVR1B04-I 4 Channel Penta-brid DVR',   specs: '4 Channel | 5-in-1 | H.265+ | 1x SATA | 1080P',      price: 3500,  imgIcon: 'fa-server' },
        { id: 'cctv_rec_2', title: 'Hikvision DS-7108HGHI-F1 8 Channel DVR',     specs: '8 Channel | Turbo HD | H.265 | 1x SATA | 1080P',     price: 5500,  imgIcon: 'fa-server' },
        { id: 'cctv_rec_3', title: 'Dahua NVR4116HS-4KS2 16 Channel NVR',        specs: '16 Channel | H.265+ | 4K | 2x SATA | PoE-capable', price: 12500, imgIcon: 'fa-server' }
    ],
    storage: [
        { id: 'cctv_st_1', title: 'Western Digital Purple 1TB Surveillance HDD', specs: '1TB | SATA 6Gb/s | 5400RPM | 64MB Cache | 24/7',    price: 5500,  imgIcon: 'fa-hdd' },
        { id: 'cctv_st_2', title: 'Seagate SkyHawk 2TB Surveillance Hard Drive', specs: '2TB | SATA 6Gb/s | 5900RPM | 256MB Cache | 24/7',   price: 7500,  imgIcon: 'fa-hdd' },
        { id: 'cctv_st_3', title: 'Western Digital Purple 4TB Surveillance HDD', specs: '4TB | SATA 6Gb/s | 5400RPM | 256MB Cache | 24/7',   price: 12000, imgIcon: 'fa-hdd' }
    ],
    powerSupply: [
        { id: 'cctv_ps_1', title: '12V 5A CCTV Power Supply Adapter',            specs: '12V DC | 5A | 60W | Single Output',                  price: 450,   imgIcon: 'fa-plug' },
        { id: 'cctv_ps_2', title: '12V 10A 9 Channel Central Power Supply Box',  specs: '12V DC | 10A | 9 Channel | Metal Housing',           price: 1500,  imgIcon: 'fa-plug' }
    ]
};

const CCTV_CONFIG = [
    { key: 'cameraType',  label: 'Camera Type',        reactIcon: 'FaVideo',  required: true },
    { key: 'recorder',    label: 'NVR / DVR Recorder', reactIcon: 'GiServerRack', required: true },
    { key: 'storage',     label: 'Surveillance HDD',   reactIcon: 'FaHdd',    required: true },
    { key: 'powerSupply', label: 'Power Supply',       reactIcon: 'FaPlug',   required: true },
];

const REQUIRED_KEYS = CCTV_CONFIG.filter(c => c.required).map(c => c.key);

export default function CCTVBuilderPage() {
    const { addToCart } = useContext(CartContext);
    const router = useRouter();
    const [selections, setSelections]       = useBuilderStorage<Record<string, any>>('cctvBuilderState', {});
    const [cameraCount, setCameraCount]     = useState(4);
    const [hideEmpty, setHideEmpty]         = useState(false);

    const totalPrice = Object.entries(selections).reduce((sum: number, [key, item]: [string, any]) => {
        if (!item) return sum;
        return sum + item.price * (key === 'cameraType' ? cameraCount : 1);
    }, 0) as number;

    const selectedRequired  = REQUIRED_KEYS.filter(k => !!selections[k]).length;
    const progressPct       = Math.round((selectedRequired / REQUIRED_KEYS.length) * 100);
    const totalSelectedCount = Object.values(selections).filter(Boolean).length;

    const handleRemove = (key: string) => {
        const n = {...selections}; 
        delete n[key]; 
        setSelections(n);
    };
    const handleAddToCart = () => {
        Object.entries(selections).forEach(([key, item]: [string, any]) => {
            if (item) addToCart(item, key === 'cameraType' ? cameraCount : 1, false);
        });
        alert('CCTV System components added to cart!');
    };

    const renderRow = (config: any) => {
        const sel        = selections[config.key];
        const multiplier = config.key === 'cameraType' ? cameraCount : 1;
        const finalPrice = sel ? sel.price * multiplier : 0;
        if (hideEmpty && !sel) return null;

        const Icon = getIconComponent(config.reactIcon);

        return (
            <div key={config.key} className={`component-row ${sel ? 'sr-row--selected' : ''}`}>
                <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                    <div className="component-icon">
                        {Icon && <Icon />}
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

    return (
        <div className="sr-page">
            {/* Header */}
            <div className="sr-header">
                <div>
                    <h1 className="sr-title">CCTV Quotation</h1>
                    <p className="sr-subtitle">Build your custom surveillance solution and get an instant quote.</p>
                </div>
                <div className="sr-header-stats">
                    <div className="sr-stat-pill sr-stat-pill--price">
                        <span className="sr-stat-val">৳{totalPrice.toLocaleString()}</span>
                        <span className="sr-stat-lbl">Total Quotation</span>
                    </div>
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

            {/* Camera count row */}
            <BrandSectionTitle 
                title="CCTV SYSTEM" 
                subtitle="Design your security solution"
            />
            <div className="sr-rows">
                <div className="component-row" style={{background:'#f8faff'}}>
                    <div className="sr-img" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80px'}}>
                        <div className="component-icon">
                            <FaIcons.FaVideo />
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

            {/* CCTV components */}
            <div className="sr-section-label" style={{marginTop:'16px'}}>Components</div>
            <div className="sr-rows">
                {CCTV_CONFIG.map(c => renderRow(c))}
            </div>

            {/* Summary bar */}
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
                    <button
                        className="sr-btn-primary"
                        onClick={handleAddToCart}
                        disabled={selectedRequired < 2}
                    >
                        <i className="fas fa-shopping-cart"></i> Add Quote to Cart
                    </button>
                </div>
            </div>


        </div>
    );
}
