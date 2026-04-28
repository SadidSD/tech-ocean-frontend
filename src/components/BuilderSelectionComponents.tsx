'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';

// ==========================================
// Toast Notification
// ==========================================
export const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">✓</span>
      <span>{message}</span>
      <button onClick={onClose} style={{background:'transparent', border:'none', color:'white', fontSize:'16px', cursor:'pointer'}}>×</button>
    </div>
  );
};

// ==========================================
// Selection Page Header
// ==========================================
export const SelectionPageHeader = ({ componentName, onBack, productCount = 0 }: { componentName: string, onBack: () => void, productCount?: number }) => {
  return (
    <div className="selection-header">
      <button className="back-btn" onClick={onBack}>
        ← Back to PC Builder
      </button>
      <div className="breadcrumb">
        <span>PC Builder</span>
        <span> / </span>
        <span className="active">Select {componentName}</span>
      </div>
      <div className="results-count">
        <span>{productCount} options available</span>
      </div>
    </div>
  );
};

// ==========================================
// Filter Sidebar
// ==========================================
export const FilterSidebar = ({ filters, onFilterChange, activeFilters, onClearFilters }: {
  filters: any,
  onFilterChange: (group: string, value: string) => void,
  activeFilters: any,
  onClearFilters: () => void
}) => {
  return (
    <div className="filter-sidebar">
      <h3 className="filter-title">Filters</h3>
      
      {/* Brand Filter */}
      {filters.brands && filters.brands.length > 0 && (
        <div className="filter-group">
          <h4>Brand</h4>
          {filters.brands.map((brand: string) => (
            <label key={brand} className="filter-checkbox">
              <input 
                type="checkbox" 
                value={brand}
                checked={activeFilters.brands?.includes(brand)}
                onChange={() => onFilterChange('brands', brand)}
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      )}

      {/* Price Range Filter */}
      {filters.priceMax && (
        <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-range">
            <input 
                type="range" 
                min={0} 
                max={filters.priceMax}
                value={activeFilters.priceRange?.max || filters.priceMax}
                onChange={(e) => onFilterChange('priceMax', e.target.value)}
            />
            <div className="price-inputs">
                <input type="number" placeholder="Min" value={0} disabled/>
                <span>-</span>
                <input type="number" placeholder="Max" value={activeFilters.priceRange?.max || filters.priceMax} readOnly/>
            </div>
            </div>
        </div>
      )}

      {/* Dynamic Spec Filters */}
      {filters.specs && Object.entries(filters.specs).map(([key, options]: [string, any]) => (
        <div key={key} className="filter-group">
          <h4 style={{textTransform: 'capitalize'}}>{key}</h4>
          {options.map((option: string) => (
            <label key={option} className="filter-checkbox">
              <input 
                type="checkbox" 
                value={option} 
                checked={activeFilters[key]?.includes(option)}
                onChange={() => onFilterChange(key, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ))}

      <button className="clear-filters-btn" onClick={onClearFilters}>
        Clear All Filters
      </button>
    </div>
  );
};

// ==========================================
// Product Card
// ==========================================
export const SelectionProductCard = ({ product, specs, onSelect }: { product: any, specs: string[], onSelect: (product: any) => void }) => {
  return (
    <div className="product-card" style={{ position: 'relative', cursor: 'pointer' }}>
      <Link href={`/product/${product.id}`} className="product-card-link" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
        <img src={product.imgUrl || '/img/placeholder.png'} alt={product.title} className="product-image" />
        <div className="product-info">
          <h3 className="product-name" style={{ fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>{product.title}</h3>
          <div className="product-specs">
            {specs.slice(0, 3).map((spec, i) => (
              <span key={i} className="spec-badge" style={{ fontSize: '11px' }}>{spec}</span>
            ))}
          </div>
          <div className="product-price-row" style={{ marginTop: 'auto', paddingTop: '10px' }}>
            <span className="product-price" style={{ color: '#ef4a23', fontWeight: '700' }}>{product.price} ৳</span>
            {product.oldPrice && (
              <span className="product-old-price" style={{ textDecoration: 'line-through', color: '#888', fontSize: '12px', marginLeft: '8px' }}>{product.oldPrice} ৳</span>
            )}
          </div>
        </div>
      </Link>
      <button className="select-product-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onSelect(product); }} style={{ width: '100%', marginTop: '10px' }}>
        Select Product
      </button>
    </div>
  );
};
