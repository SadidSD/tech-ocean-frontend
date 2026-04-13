'use client';

import React from 'react';
import Link from 'next/link';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';

export const HeroBanner = () => (
    <section className="hero-section">
        <div className="container hero-grid">
            <div className="hero-main-banner" style={{position: 'relative', overflow: 'hidden'}}>
                <video autoPlay loop muted playsInline style={{
                    position: 'absolute', right: 0, bottom: 0, minWidth: '100%', minHeight: '100%',
                    width: 'auto', height: 'auto', zIndex: 0, objectFit: 'cover', opacity: 0.8
                }}>
                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                </video>
                <div className="hero-main-content" style={{position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>
                    <h2>Dive into Tech</h2>
                    <p>Ocean of IT Products & Accessories</p>
                </div>
            </div>
            <div className="hero-side-banners">
                <div className="side-banner" style={{background: 'var(--primary-color)'}}>
                    <h3>Special Laptop Deals</h3>
                </div>
                <div className="side-banner" style={{background: 'var(--secondary-color)'}}>
                    <h3>CCTV Build Offers</h3>
                </div>
            </div>
        </div>
    </section>
);

export const FeaturesBar = () => (
    <div className="container">
        <div className="features-bar">
            <Link href="/cctv-builder" className="feature-pill">
                <div className="icon"><i className="fas fa-video"></i></div>
                <div className="text">
                    <span className="title">CCTV Quotation</span>
                    <span className="subtitle">Build Custom Security</span>
                </div>
            </Link>
            <div className="feature-pill">
                <div className="icon"><i className="fas fa-store"></i></div>
                <div className="text">
                    <span className="title">20+ Physical Stores</span>
                    <span className="subtitle">Find Store Near You</span>
                </div>
            </div>
            <div className="feature-pill">
                <div className="icon"><i className="fas fa-headset"></i></div>
                <div className="text">
                    <span className="title">Reliable Support</span>
                    <span className="subtitle">Call 16793 (09AM - 08PM)</span>
                </div>
            </div>
            <div className="feature-pill">
                <div className="icon"><i className="fas fa-truck"></i></div>
                <div className="text">
                    <span className="title">Fastest Delivery</span>
                    <span className="subtitle">Inside & Outside Dhaka</span>
                </div>
            </div>
        </div>
    </div>
);

export const CategoryList = ({ categories }: { categories: any[] }) => (
    <section className="categories-section container">
        <BrandSectionTitle 
            title="SHOP BY CATEGORY" 
            subtitle="Browse our collection"
        />
        <div className="categories-grid">
            {categories.map((cat, idx) => {
                const Icon = cat.reactIcon ? (FaIcons as any)[cat.reactIcon] : FaIcons.FaBox;
                return (
                    <Link href={`/category/${cat.id}`} key={idx} className="category-card">
                        <div className="category-icon" style={{ background: cat.iconBg || 'rgba(0,0,0,0.05)' }}>
                            {Icon && <Icon color={cat.iconColor || '#555'} size={36} />}
                        </div>
                        <h4 className="category-name">{cat.name}</h4>
                    </Link>
                );
            })}
        </div>
    </section>
);

export const LatestBlogs = ({ blogs }: { blogs: any[] }) => (
    <section className="blogs-section container mt-5">
        <BrandSectionTitle 
            title="LATEST BLOGS" 
            subtitle="Catch up on the latest tech news and reviews!"
        />
        <div className="blogs-grid">
            {blogs.length === 0 && <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Coming soon...</p>}
            {blogs.map(blog => (
                <div className="blog-card" key={blog.id}>
                    <div className="blog-icon">
                        <i className={`fas ${blog.imgIcon}`}></i>
                    </div>
                    <div className="blog-meta">
                        <i className="far fa-calendar-alt"></i> {blog.date}
                    </div>
                    <h3>
                        <a href="#">{blog.title}</a>
                    </h3>
                    <p>{blog.excerpt}</p>
                    <a href="#" className="read-more">
                        Read More <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            ))}
        </div>
    </section>
);
