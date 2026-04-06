'use client';

import React, { useState, useContext } from 'react';
import { MOCK_PC_COMPONENTS } from '@/data/products';
import { CartContext } from '@/components/ClientApplication';

const PC_BUILDER_CONFIG = [
    { key: 'cpu',         label: 'CPU',          icon: 'fa-microchip', required: true  },
    { key: 'motherboard', label: 'Motherboard',   icon: 'fa-server',   required: true  },
    { key: 'gpu',         label: 'GPU',           icon: 'fa-tv',       required: false },
    { key: 'ram',         label: 'RAM',           icon: 'fa-memory',   required: true  },
    { key: 'storage',     label: 'Storage',       icon: 'fa-hdd',      required: true  },
    { key: 'psu',         label: 'Power Supply',  icon: 'fa-plug',     required: true  },
    { key: 'cooler',      label: 'CPU Cooler',    icon: 'fa-fan',      required: false },
    { key: 'casing',      label: 'Casing',        icon: 'fa-desktop',  required: true  },
];

const PC_PERIPHERALS_CONFIG = [
    { key: 'monitor',   label: 'Monitor',   icon: 'fa-tv'         },
    { key: 'keyboard',  label: 'Keyboard',  icon: 'fa-keyboard'   },
    { key: 'mouse',     label: 'Mouse',     icon: 'fa-mouse'      },
    { key: 'headphone', label: 'Headphone', icon: 'fa-headphones' },
];

const REQUIRED_KEYS = PC_BUILDER_CONFIG.filter(c => c.required).map(c => c.key);

export default function PCBuilderPage() {
    const { addToCart } = useContext(CartContext);
    const [selections, setSelections]       = useState<any>({});
    const [showSelection, setShowSelection] = useState<string | null>(null);
    const [hideEmpty, setHideEmpty]         = useState(false);

    const totalPrice      = Object.values(selections).reduce((s: number, i: any) => s + (i?.price   || 0), 0) as number;
    const totalWattage    = Object.values(selections).reduce((s: number, i: any) => s + (i?.wattage || 0), 0) as number;
    const selectedRequired = REQUIRED_KEYS.filter(k => !!selections[k]).length;
    const progressPct      = Math.round((selectedRequired / REQUIRED_KEYS.length) * 100);
    const totalSelectedCount = Object.values(selections).filter(Boolean).length;

    const handleSelect = (category: string, item: any) => {
        setSelections((prev: any) => ({ ...prev, [category]: item }));
        setShowSelection(null);
    };
    const handleRemove = (key: string) => {
        setSelections((prev: any) => { const n = {...prev}; delete n[key]; return n; });
    };
    const handleAddToCart = () => {
        Object.values(selections).forEach((item: any) => { if (item) addToCart(item, 1, false); });
        alert('All selected components added to cart!');
    };

    const renderRow = (config: any) => {
        const sel = selections[config.key];
        if (hideEmpty && !sel) return null;
        return (
            <div key={config.key} className={`sr-row ${sel ? 'sr-row--selected' : ''}`}>
                {/* Image / Icon column */}
                <div className="sr-img">
                    {sel
                        ? <div className="sr-img-selected"><i className={`fas ${sel.imgIcon || config.icon}`}></i></div>
                        : <div className="sr-img-placeholder"><i className={`fas ${config.icon}`}></i></div>
                    }
                </div>

                {/* Details column */}
                <div className="sr-details">
                    <div className="sr-comp-header">
                        <span className="sr-comp-label">{config.label}</span>
                        {config.required !== undefined && (
                            <span className={config.required ? 'sr-badge sr-badge--req' : 'sr-badge sr-badge--opt'}>
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
                            <button className="sr-btn-change" onClick={() => setShowSelection(config.key)}>Change</button>
                            <button className="sr-btn-remove" title="Remove" onClick={() => handleRemove(config.key)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </>
                    ) : (
                        <button className="sr-btn-select" onClick={() => setShowSelection(config.key)}>Select</button>
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
                <div className="sr-header-stats">
                    <div className="sr-stat-pill">
                        <i className="fas fa-bolt" style={{color:'#f59e0b'}}></i>
                        <span className="sr-stat-val">{totalWattage}W</span>
                        <span className="sr-stat-lbl">Est. Wattage</span>
                    </div>
                    <div className="sr-stat-pill sr-stat-pill--price">
                        <span className="sr-stat-val">৳{totalPrice.toLocaleString()}</span>
                        <span className="sr-stat-lbl">{totalSelectedCount} item{totalSelectedCount !== 1 ? 's' : ''}</span>
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

            {/* Core components section */}
            <div className="sr-section-label">Core Components</div>
            <div className="sr-rows">
                {PC_BUILDER_CONFIG.map(c => renderRow(c))}
            </div>

            {/* Peripherals section */}
            <div className="sr-section-label" style={{marginTop:'24px'}}>
                Peripherals &amp; Others
                <span className="sr-section-note">(Optional)</span>
            </div>
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

            {/* Modal */}
            {showSelection && (
                <div className="sr-modal-overlay" onClick={() => setShowSelection(null)}>
                    <div className="sr-modal" onClick={e => e.stopPropagation()}>
                        <div className="sr-modal-hdr">
                            <div>
                                <h3 className="sr-modal-title">
                                    Select {currentConfig.find(c => c.key === showSelection)?.label}
                                </h3>
                                <p className="sr-modal-subtitle">
                                    {((MOCK_PC_COMPONENTS as any)[showSelection] || []).length} options available
                                </p>
                            </div>
                            <button className="sr-modal-close" onClick={() => setShowSelection(null)}>
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div className="sr-modal-list">
                            {((MOCK_PC_COMPONENTS as any)[showSelection] || []).map((item: any) => {
                                const isCurrentlySelected = selections[showSelection!]?.id === item.id;
                                return (
                                    <div
                                        key={item.id}
                                        className={`sr-modal-item ${isCurrentlySelected ? 'sr-modal-item--active' : ''}`}
                                        onClick={() => handleSelect(showSelection!, item)}
                                    >
                                        <div className="sr-modal-item-icon">
                                            <i className={`fas ${item.imgIcon || 'fa-box'}`}></i>
                                        </div>
                                        <div className="sr-modal-item-info">
                                            <strong>{item.title}</strong>
                                            {item.specs && <span>{item.specs}</span>}
                                        </div>
                                        <div className="sr-modal-item-right">
                                            {item.wattage > 0 && (
                                                <div className="sr-modal-item-wattage">
                                                    <i className="fas fa-bolt"></i> {item.wattage}W
                                                </div>
                                            )}
                                            <div className="sr-modal-item-price">৳{item.price.toLocaleString()}</div>
                                        </div>
                                        {isCurrentlySelected
                                            ? <button className="sr-btn-selected"><i className="fas fa-check"></i> Selected</button>
                                            : <button className="sr-btn-select" onClick={e => { e.stopPropagation(); handleSelect(showSelection!, item); }}>Select</button>
                                        }
                                    </div>
                                );
                            })}
                            {((MOCK_PC_COMPONENTS as any)[showSelection] || []).length === 0 && (
                                <div style={{textAlign:'center', padding:'50px 20px', color:'#aaa'}}>
                                    <i className="fas fa-box-open" style={{fontSize:'48px', marginBottom:'12px', display:'block'}}></i>
                                    No components available for this category.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
