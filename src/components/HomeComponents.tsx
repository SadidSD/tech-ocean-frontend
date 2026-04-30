'use client';

import React from 'react';
import Link from 'next/link';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';

export const HeroBanner = () => (
    <>
        <section className="hero-section desktop-only">
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
                    <div className="side-banner" style={{background: 'linear-gradient(135deg, #1B5B97, #0d3d6b)', color: 'white'}}>
                        <h3 style={{color: 'white'}}>Special Laptop Deals</h3>
                    </div>
                    <div className="side-banner" style={{background: 'linear-gradient(135deg, #ff6b00, #e05a00)', color: 'white'}}>
                        <h3 style={{color: 'white'}}>CCTV Build Offers</h3>
                    </div>
                </div>
            </div>
        </section>
        
        <div className="mobile-animated-hero">
            <video autoPlay loop muted playsInline style={{
                position: 'absolute', right: 0, bottom: 0, minWidth: '100%', minHeight: '100%',
                width: 'auto', height: 'auto', zIndex: 0, objectFit: 'cover', opacity: 0.4
            }}>
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
            </video>
            <div className="hero-overlay" style={{position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>
                <h1 style={{fontSize: '24px', fontWeight: 800, textAlign: 'center'}}>Ocean of IT Products</h1>
            </div>
        </div>

        <div className="mobile-offer-row">
          <div className="offer-card half laptop-deal">
            <div className="offer-content">
              <h4>Special Laptop Deals</h4>
              <p>Up to 40% off</p>
              <button>Shop Now →</button>
            </div>
            <div className="offer-icon">💻</div>
          </div>
          
          <div className="offer-card half cctv-offer">
            <div className="offer-content">
              <h4>CCTV Build Offers</h4>
              <p>Custom Security System</p>
              <button>Build Now →</button>
            </div>
            <div className="offer-icon">📹</div>
          </div>
        </div>
    </>
);

export const DesktopFeaturesBar = () => (
    <div className="container desktop-only">
        <div className="features-bar">
            <Link href="/cctv-builder" className="feature-pill">
                <div className="icon"><i className="fas fa-video"></i></div>
                <div className="text">
                    <span className="title">CCTV Quotation</span>
                    <span className="subtitle">Build Custom Security</span>
                </div>
            </Link>
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

export const MobileContactBar = () => (
    <div className="mobile-contact-bar">
      <div className="contact-item">
        <i className="fas fa-phone-alt"></i>
        <div>
          <span className="label">Call Us</span>
          <span className="value">16793</span>
        </div>
      </div>
      <div className="contact-item">
        <i className="fas fa-clock"></i>
        <div>
          <span className="label">Opening Hours</span>
          <span className="value">09AM - 08PM</span>
        </div>
      </div>
      <div className="contact-item">
        <i className="fas fa-truck"></i>
        <div>
          <span className="label">Delivery</span>
          <span className="value">Inside & Outside Dhaka</span>
        </div>
      </div>
    </div>
);

export const CategoryList = ({ categories }: { categories: any[] }) => (
    <>
        <section className="categories-section container desktop-only">
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

        <div className="mobile-categories">
          <div className="section-header" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center'}}>
            <h3 className="section-title" style={{margin: 0}}>Shop by Category</h3>
            <a href="#" className="view-all" style={{color: '#1B5B97', fontSize: '13px', fontWeight: 600, textDecoration: 'none'}}>View All →</a>
          </div>
          
          <div className="category-grid compact scrollable">
            {categories.map((cat, idx) => {
                const Icon = cat.reactIcon ? (FaIcons as any)[cat.reactIcon] : FaIcons.FaBox;
                return (
                    <Link href={`/category/${cat.id}`} key={idx} className="category-card compact" style={{textDecoration: 'none'}}>
                      <div className="category-icon" style={{ color: cat.iconColor || '#db4b27' }}>
                          {Icon && <Icon />}
                      </div>
                      <span>{cat.name}</span>
                    </Link>
                );
            })}
          </div>
        </div>
    </>
);

export const LatestBlogs = ({ blogs = [] }: { blogs?: any[] }) => {
    const [realBlogs, setRealBlogs] = React.useState<any[]>(blogs);
    const [loading, setLoading] = React.useState(blogs.length === 0);

    React.useEffect(() => {
        // Fetch only if initial blogs are empty
        if (blogs.length === 0) {
            const fetchBlogs = async () => {
                try {
                    const response = await fetch('/api/blogs');
                    const data = await response.json();
                    setRealBlogs(data || []);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                    setRealBlogs([]); // Empty array on error - NO mock data
                } finally {
                    setLoading(false);
                }
            };
            fetchBlogs();
        }
    }, [blogs]);

    if (loading) {
        return (
            <div className="mobile-blogs-section">
                <div className="blogs-header">
                    <h2 className="blogs-title">LATEST BLOGS</h2>
                    <p className="blogs-subtitle">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Desktop Version */}
            <section className="blogs-section container mt-5 desktop-only">
                <BrandSectionTitle 
                    title="LATEST BLOGS" 
                    subtitle="Catch up on the latest tech news and reviews!"
                />
                <div className="blogs-grid">
                    {realBlogs.length === 0 ? (
                        <p style={{textAlign: 'center', gridColumn: '1/-1', color: '#888', padding: '40px'}}>Coming soon...</p>
                    ) : (
                        realBlogs.map(blog => (
                            <div className="blog-card" key={blog.id}>
                                <div className="blog-icon">
                                    <i className={`fas ${blog.imgIcon || 'fa-newspaper'}`}></i>
                                </div>
                                <div className="blog-meta">
                                    <i className="far fa-calendar-alt"></i> {blog.date}
                                </div>
                                <h3>
                                    <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
                                </h3>
                                <p>{blog.excerpt}</p>
                                <Link href={`/blog/${blog.id}`} className="read-more">
                                    Read More <i className="fas fa-arrow-right"></i>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Mobile Version */}
            <div className="mobile-blogs-section">
                <div className="blogs-header">
                    <h2 className="blogs-title">LATEST BLOGS</h2>
                    <p className="blogs-subtitle">Catch up on the latest tech news and reviews!</p>
                </div>
                
                {realBlogs.length === 0 ? (
                    <div className="blogs-empty-state">
                        <div className="empty-icon">📝</div>
                        <h3 className="empty-title">Coming Soon</h3>
                        <p className="empty-text">
                            Blog posts will appear here once published from the admin panel.
                        </p>
                    </div>
                ) : (
                    <div className="blogs-grid">
                        {realBlogs.slice(0, 3).map(blog => (
                            <Link 
                                href={`/blog/${blog.id}`} 
                                key={blog.id} 
                                className="blog-card"
                                style={{textDecoration: 'none'}}
                            >
                                {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
                                <h3 className="blog-title">{blog.title}</h3>
                                <div className="blog-meta">
                                    <span className="blog-date">📅 {blog.date}</span>
                                    <span className="blog-read-time">📖 {blog.readTime} min read</span>
                                </div>
                                <p className="blog-excerpt">{blog.excerpt}</p>
                                <div className="read-more">
                                    Read More →
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                
                {realBlogs.length > 3 && (
                    <Link href="/blogs" className="view-all-blogs">
                        View All Blogs →
                    </Link>
                )}
            </div>
        </>
    );
};
