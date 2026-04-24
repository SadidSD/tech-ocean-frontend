'use client';

import React from 'react';
import { ComponentCategoryMetadata, FilterAttribute } from '@/data/component-structure';

interface FilterSidebarProps {
  metadata: ComponentCategoryMetadata;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (attrId: string, value: string) => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ 
  metadata, 
  selectedFilters, 
  onFilterChange 
}) => {
  return (
    <div className="filter-sidebar" style={{
      width: '280px',
      padding: '20px',
      background: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      height: 'fit-content',
      position: 'sticky',
      top: '100px'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '20px', color: '#333' }}>
        Filters
      </h3>

      {/* Brand Filter */}
      <div className="filter-group" style={{ marginBottom: '24px' }}>
        <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#db4b27' }}>Brand</h4>
        <div className="filter-options" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {metadata.brands.map(brand => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
              <input 
                type="checkbox" 
                checked={selectedFilters['brand']?.includes(brand)}
                onChange={() => onFilterChange('brand', brand)}
                style={{ accentColor: '#db4b27' }}
              />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* Dynamic Attributes */}
      {metadata.filterAttributes.map((attr: FilterAttribute) => (
        <div className="filter-group" key={attr.id} style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: '#db4b27' }}>{attr.name}</h4>
          
          {attr.type === 'boolean' ? (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
              <input 
                type="checkbox" 
                checked={selectedFilters[attr.id]?.includes('true')}
                onChange={() => onFilterChange(attr.id, 'true')}
                style={{ accentColor: '#db4b27' }}
              />
              Yes / Enabled
            </label>
          ) : (
            <div className="filter-options" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {attr.options?.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedFilters[attr.id]?.includes(opt)}
                    onChange={() => onFilterChange(attr.id, opt)}
                    style={{ accentColor: '#db4b27' }}
                  />
                  {opt}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button 
        className="clear-filters-btn"
        style={{
          width: '100%',
          padding: '10px',
          background: 'transparent',
          border: '1px solid #ddd',
          borderRadius: '4px',
          color: '#666',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          marginTop: '10px',
          transition: 'all 0.2s'
        }}
        onMouseOver={(e) => (e.currentTarget.style.borderColor = '#db4b27', e.currentTarget.style.color = '#db4b27')}
        onMouseOut={(e) => (e.currentTarget.style.borderColor = '#ddd', e.currentTarget.style.color = '#666')}
      >
        Clear All Filters
      </button>
    </div>
  );
};
