'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_CCTV_COMPONENTS } from '@/data/products';
import { useBuilderStorage } from '@/hooks/useBuilderStorage';
import { 
  SelectionPageHeader, 
  FilterSidebar, 
  SelectionProductCard, 
  Toast 
} from '@/components/BuilderSelectionComponents';

export default function SelectCCTVComponentPage({ params }: { params: { component: string } }) {
  const router = useRouter();
  const componentKey = params.component;
  const rawProducts = (MOCK_CCTV_COMPONENTS as any)[componentKey] || [];

  const [selections, setSelections] = useBuilderStorage<Record<string, any>>('cctvBuilderState', {});
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // -- Filters State --
  const [activeFilters, setActiveFilters] = useState<any>({
    brands: [],
    priceRange: { max: 100000 },
    specs: {}
  });

  const [availableFilters, setAvailableFilters] = useState<any>({ brands: [], priceMax: 0, specs: {} });

  useEffect(() => {
    if (rawProducts.length === 0) return;

    let maxPrice = 0;
    const brandsSet = new Set<string>();
    
    rawProducts.forEach((p: any) => {
      if (p.price > maxPrice) maxPrice = p.price;
      const brand = p.title.split(' ')[0];
      brandsSet.add(brand);
    });

    setAvailableFilters({
      brands: Array.from(brandsSet),
      priceMax: maxPrice || 100000,
      specs: {}
    });

    setActiveFilters((prev: any) => ({
      ...prev,
      priceRange: { max: maxPrice || 100000 }
    }));
  }, [componentKey]);

  const handleFilterChange = (group: string, value: string) => {
    setActiveFilters((prev: any) => {
      const next = { ...prev };
      if (group === 'priceMax') {
        next.priceRange = { max: Number(value) };
      } else if (group === 'brands') {
        if (!next.brands) next.brands = [];
        if (next.brands.includes(value)) {
          next.brands = next.brands.filter((v: string) => v !== value);
        } else {
          next.brands.push(value);
        }
      } else {
        if (!next.specs[group]) next.specs[group] = [];
        if (next.specs[group].includes(value)) {
          next.specs[group] = next.specs[group].filter((v: string) => v !== value);
        } else {
          next.specs[group].push(value);
        }
      }
      return next;
    });
  };

  const handleClearFilters = () => {
    setActiveFilters({
      brands: [],
      priceRange: { max: availableFilters.priceMax },
      specs: {}
    });
  };

  const handleSelectProduct = (product: any) => {
    setSelections({ ...selections, [componentKey]: product });
    setToastMessage(`${product.title} selected`);
    setTimeout(() => {
      router.push('/cctv-builder');
    }, 1200);
  };

  const filteredProducts = rawProducts.filter((p: any) => {
    if (p.price > activeFilters.priceRange.max) return false;
    if (activeFilters.brands.length > 0) {
      const brand = p.title.split(' ')[0];
      if (!activeFilters.brands.includes(brand)) return false;
    }
    return true;
  });

  return (
    <div className="selection-page" style={{ paddingTop: '40px' }}>
      {toastMessage && (
        <Toast message={toastMessage} type="success" onClose={() => setToastMessage(null)} />
      )}
      
      <FilterSidebar 
        filters={availableFilters}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <div className="selection-main">
        <SelectionPageHeader 
          componentName={componentKey.toUpperCase()} 
          onBack={() => router.push('/cctv-builder')}
          productCount={filteredProducts.length}
        />

        <div className="products-grid">
          {filteredProducts.map((prod: any) => (
            <SelectionProductCard 
              key={prod.id} 
              product={prod} 
              specs={prod.specs ? prod.specs.split('|').map((s:string) => s.trim()) : []}
              onSelect={handleSelectProduct}
            />
          ))}
          {filteredProducts.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', gridColumn: '1/-1', color: '#666' }}>
              No products found matching these filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
