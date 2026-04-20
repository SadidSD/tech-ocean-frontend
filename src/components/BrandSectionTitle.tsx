import React from 'react';

interface BrandSectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'center' | 'left' | 'right';
}

const BrandSectionTitle: React.FC<BrandSectionTitleProps> = ({ title, subtitle, align = "center" }) => {
  return (
    <div className={`brand-section-title brand-section-title--${align}`}>
      <h2>{title}</h2>
      <div className="orange-underline"></div>
      {subtitle && <p className="subtitle">{subtitle}</p>}
    </div>
  );
};

export default BrandSectionTitle;
