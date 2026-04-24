'use client';

import React, { useState } from 'react';
import { COMPONENT_METADATA } from '@/data/component-structure';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';
import * as BsIcons from 'react-icons/bs';
import * as GiIcons from 'react-icons/gi';

export default function AdminComponentsPage() {
  const [activeTab, setActiveTab] = useState<'categories' | 'brands' | 'attributes'>('categories');
  const allCategories = Object.values(COMPONENT_METADATA);

  const getIcon = (name: string) => {
    if (name.startsWith('Bs')) return (BsIcons as any)[name];
    if (name.startsWith('Gi')) return (GiIcons as any)[name];
    return (FaIcons as any)[name] || FaIcons.FaBox;
  };

  return (
    <div className="admin-container" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <BrandSectionTitle 
        title="COMPONENT MANAGEMENT" 
        subtitle="Manage categories, brands, and filter attributes"
      />

      <div className="admin-tabs" style={{ display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #eee' }}>
        {(['categories', 'brands', 'attributes'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '3px solid #db4b27' : '3px solid transparent',
              color: activeTab === tab ? '#db4b27' : '#666',
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'categories' && (
          <div className="category-table-wrap">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', margin: 0 }}>All Categories</h2>
              <button style={{ 
                background: '#db4b27', 
                color: '#fff', 
                border: 'none', 
                padding: '10px 20px', 
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer'
              }}>
                + Add New Category
              </button>
            </div>
            
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <thead>
                <tr style={{ background: '#f9f9f9', textAlign: 'left', borderBottom: '1px solid #eee' }}>
                  <th style={{ padding: '16px' }}>Icon</th>
                  <th style={{ padding: '16px' }}>Category Name</th>
                  <th style={{ padding: '16px' }}>ID</th>
                  <th style={{ padding: '16px' }}>Required in Builder</th>
                  <th style={{ padding: '16px' }}>Filters</th>
                  <th style={{ padding: '16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map(cat => {
                  const Icon = getIcon(cat.icon);
                  return (
                    <tr key={cat.id} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '16px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {Icon && <Icon size={20} color="#db4b27" />}
                        </div>
                      </td>
                      <td style={{ padding: '16px', fontWeight: 600 }}>{cat.name}</td>
                      <td style={{ padding: '16px', color: '#666', fontFamily: 'monospace' }}>{cat.id}</td>
                      <td style={{ padding: '16px' }}>
                        {cat.requiredInBuilder ? 
                          <span style={{ color: '#10B981', background: '#E1F9F1', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>Yes</span> : 
                          <span style={{ color: '#666', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>No</span>
                        }
                      </td>
                      <td style={{ padding: '16px', fontSize: '13px', color: '#666' }}>
                        {cat.filterAttributes.length} Attributes
                      </td>
                      <td style={{ padding: '16px' }}>
                        <button style={{ color: '#1B5B97', background: 'none', border: 'none', marginRight: '10px', cursor: 'pointer' }}>Edit</button>
                        <button style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'brands' && (
           <div className="brands-list-wrap">
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
               <h2 style={{ fontSize: '20px', margin: 0 }}>Category Brand Mapping</h2>
               <p style={{ fontSize: '14px', color: '#666' }}>Manage which brands appear in the Mega Menu dropdowns</p>
             </div>

             <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {allCategories.map(cat => (
                  <div key={cat.id} style={{ background: '#fff', border: '1px solid #eee', borderRadius: '12px', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                      <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>{cat.name}</h3>
                      <span style={{ fontSize: '12px', color: '#999' }}>{cat.brands.length} Brands</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {cat.brands.map(brand => (
                        <span key={brand} style={{ 
                          background: '#f0f0f0', 
                          padding: '6px 12px', 
                          borderRadius: '20px', 
                          fontSize: '13px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {brand}
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', padding: 0 }}>✕</button>
                        </span>
                      ))}
                      <button style={{ 
                        background: 'transparent', 
                        border: '1px dashed #db4b27', 
                        color: '#db4b27', 
                        padding: '6px 12px', 
                        borderRadius: '20px', 
                        fontSize: '13px',
                        cursor: 'pointer' 
                      }}>
                        + Add Brand
                      </button>
                    </div>
                  </div>
                ))}
             </div>
           </div>
        )}

        {activeTab === 'attributes' && (
           <div className="attributes-list-wrap">
             <p style={{ color: '#666', padding: '40px', textAlign: 'center' }}>Filter attribute management interface loading...</p>
           </div>
        )}
      </div>

      <div className="product-form-preview" style={{ marginTop: '60px', padding: '40px', background: '#fdf3f0', borderRadius: '12px', border: '2px dashed #db4b27' }}>
        <h3 style={{ marginTop: 0, color: '#db4b27' }}>Preview: Dynamic Add Product Form</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px' }}>
          This form will dynamically generate specification fields based on the selected category.
        </p>
        
        <div className="mock-form" style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="form-group">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Category</label>
            <select style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ddd' }}>
              <option>Processor (CPU)</option>
              <option>Motherboard</option>
              <option>RAM</option>
            </select>
          </div>
          
          <div className="specifications-section" style={{ background: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #eee' }}>
            <h4 style={{ margin: '0 0 15px 0', fontSize: '15px' }}>Dynamic Specifications (CPU)</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Socket</label>
                <input type="text" placeholder="e.g. LGA1700" style={{ width: '100%', padding: '8px', border: '1px solid #eee' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#666', marginBottom: '4px' }}>Cores</label>
                <input type="number" placeholder="14" style={{ width: '100%', padding: '8px', border: '1px solid #eee' }} />
              </div>
            </div>
          </div>

          <button style={{ background: '#db4b27', color: '#fff', border: 'none', padding: '14px', borderRadius: '6px', fontWeight: 700 }}>
            Save Product Structure
          </button>
        </div>
      </div>
    </div>
  );
}
