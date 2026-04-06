'use client';

import React from 'react';
import Link from 'next/link';

interface CompareBarProps {
    items: any[];
    onRemove: (id: any) => void;
    onClear: () => void;
}

export default function CompareBar({ items, onRemove, onClear }: CompareBarProps) {
    const visible = items.length > 0;

    return (
        <div className={`cmp-bar ${visible ? 'cmp-bar--visible' : ''}`}>
            <div className="cmp-bar-inner">
                {/* Left: label */}
                <div className="cmp-bar-label">
                    <i className="fas fa-sync-alt"></i>
                    <span>Compare <strong>({items.length}/2)</strong></span>
                </div>

                {/* Center: product slots */}
                <div className="cmp-bar-slots">
                    {[0, 1].map(i => {
                        const p = items[i];
                        return (
                            <div key={i} className={`cmp-slot ${p ? 'cmp-slot--filled' : ''}`}>
                                {p ? (
                                    <>
                                        <div className="cmp-slot-img">
                                            {p.imgUrl
                                                ? <img src={p.imgUrl} alt={p.title} />
                                                : <i className={`fas ${p.imgIcon || 'fa-box'}`}></i>
                                            }
                                        </div>
                                        <div className="cmp-slot-info">
                                            <div className="cmp-slot-name">{p.title.substring(0, 30)}{p.title.length > 30 ? '…' : ''}</div>
                                            <div className="cmp-slot-price">{p.price}</div>
                                        </div>
                                        <button className="cmp-slot-remove" onClick={() => onRemove(p.id)} title="Remove">
                                            <i className="fas fa-times"></i>
                                        </button>
                                    </>
                                ) : (
                                    <div className="cmp-slot-empty">
                                        <i className="fas fa-plus"></i>
                                        <span>Add product</span>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Right: actions */}
                <div className="cmp-bar-actions">
                    <button className="cmp-btn-clear" onClick={onClear}>
                        <i className="fas fa-trash-alt"></i> Clear
                    </button>
                    <Link
                        href="/compare"
                        className={`cmp-btn-compare ${items.length < 2 ? 'cmp-btn-compare--disabled' : ''}`}
                        onClick={e => items.length < 2 && e.preventDefault()}
                    >
                        <i className="fas fa-columns"></i> Compare Now
                    </Link>
                </div>
            </div>

            {/* "1 product" hint */}
            {items.length === 1 && (
                <div className="cmp-bar-hint">
                    <i className="fas fa-info-circle"></i> Select one more product from the same category to compare
                </div>
            )}
        </div>
    );
}
