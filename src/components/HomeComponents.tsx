'use client';

import React from 'react';
import Link from 'next/link';
import BrandSectionTitle from '@/components/BrandSectionTitle';
import * as FaIcons from 'react-icons/fa';

interface BannerData {
  heroVideoUrl?: string | null;
  banner1Title: string;
  banner1Subtitle: string;
  banner1ImageUrl?: string | null;
  banner1Link: string;
  banner2Title: string;
  banner2Subtitle: string;
  banner2ImageUrl?: string | null;
  banner2Link: string;
}

const DEFAULT_VIDEO = 'https://www.w3schools.com/html/mov_bbb.mp4';

export const HeroBanner = ({ banners }: { banners?: BannerData }) => {
  const b = banners ?? {
    heroVideoUrl: null,
    banner1Title: 'Special Laptop Deals', banner1Subtitle: 'Up to 40% off',
    banner1ImageUrl: null, banner1Link: '/category/laptop',
    banner2Title: 'CCTV Build Offers', banner2Subtitle: 'Custom Security System',
    banner2ImageUrl: null, banner2Link: '/cctv-builder',
  };
  const videoUrl = b.heroVideoUrl || DEFAULT_VIDEO;

  return (
    <>
        <section className="hero-section desktop-only">
            <div className="container hero-grid">
                <div className="hero-main-banner" style={{position: 'relative', overflow: 'hidden'}}>
                    <video autoPlay loop muted playsInline style={{
                        position: 'absolute', right: 0, bottom: 0, minWidth: '100%', minHeight: '100%',
                        width: 'auto', height: 'auto', zIndex: 0, objectFit: 'cover', opacity: 0.8
                    }}>
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                    <div className="hero-main-content" style={{position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>
                        <h2>Dive into Tech</h2>
                        <p>Ocean of IT Products & Accessories</p>
                    </div>
                </div>
                <div className="hero-side-banners">
                    <Link href={b.banner1Link} className="side-banner" style={{
                        background: b.banner1ImageUrl ? 'none' : 'linear-gradient(135deg, #1B5B97, #0d3d6b)',
                        backgroundImage: b.banner1ImageUrl ? `url(${b.banner1ImageUrl})` : undefined,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'flex-end', padding: '20px',
                    }}>
                        <div style={{background: 'rgba(0,0,0,0.45)', borderRadius: '8px', padding: '8px 14px'}}>
                            <h3 style={{color: 'white', margin: 0}}>{b.banner1Title}</h3>
                            <p style={{color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '13px'}}>{b.banner1Subtitle}</p>
                        </div>
                    </Link>
                    <Link href={b.banner2Link} className="side-banner" style={{
                        background: b.banner2ImageUrl ? 'none' : 'linear-gradient(135deg, #ff6b00, #e05a00)',
                        backgroundImage: b.banner2ImageUrl ? `url(${b.banner2ImageUrl})` : undefined,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'flex-end', padding: '20px',
                    }}>
                        <div style={{background: 'rgba(0,0,0,0.45)', borderRadius: '8px', padding: '8px 14px'}}>
                            <h3 style={{color: 'white', margin: 0}}>{b.banner2Title}</h3>
                            <p style={{color: 'rgba(255,255,255,0.85)', margin: 0, fontSize: '13px'}}>{b.banner2Subtitle}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>

        <div className="mobile-animated-hero">
            <video autoPlay loop muted playsInline style={{
                position: 'absolute', right: 0, bottom: 0, minWidth: '100%', minHeight: '100%',
                width: 'auto', height: 'auto', zIndex: 0, objectFit: 'cover', opacity: 0.4
            }}>
                <source src={videoUrl} type="video/mp4" />
            </video>
            <div className="hero-overlay" style={{position: 'relative', zIndex: 1, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.8)'}}>
                <h1 style={{fontSize: '24px', fontWeight: 800, textAlign: 'center'}}>Ocean of IT Products</h1>
            </div>
        </div>

        <div className="mobile-offer-row">
          <Link href={b.banner1Link} className="offer-card half laptop-deal" style={{
              textDecoration: 'none',
              backgroundImage: b.banner1ImageUrl ? `url(${b.banner1ImageUrl})` : undefined,
              backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            <div className="offer-content">
              <h4>{b.banner1Title}</h4>
              <p>{b.banner1Subtitle}</p>
              <button>Shop Now →</button>
            </div>
            <div className="offer-icon">💻</div>
          </Link>

          <Link href={b.banner2Link} className="offer-card half cctv-offer" style={{
              textDecoration: 'none',
              backgroundImage: b.banner2ImageUrl ? `url(${b.banner2ImageUrl})` : undefined,
              backgroundSize: 'cover', backgroundPosition: 'center',
          }}>
            <div className="offer-content">
              <h4>{b.banner2Title}</h4>
              <p>{b.banner2Subtitle}</p>
              <button>Build Now →</button>
            </div>
            <div className="offer-icon">📹</div>
          </Link>
        </div>
    </>
  );
};

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

export const MobileContactSection = () => {
  return (
    <div className="mobile-contact-section">
      <div className="contact-header">
        <h3>Need Help?</h3>
        <p>We're here to assist you 7 days a week</p>
      </div>
      
      <div className="contact-grid">
        {/* Call Us */}
        <div className="contact-card">
          <div className="contact-icon">📞</div>
          <div className="contact-details">
            <h4>Call Us</h4>
            <p className="contact-value">16793</p>
            <p className="contact-sub">Available 09AM - 08PM</p>
          </div>
        </div>
        
        {/* Opening Hours */}
        <div className="contact-card">
          <div className="contact-icon">🕒</div>
          <div className="contact-details">
            <h4>Opening Hours</h4>
            <p className="contact-value">09:00 AM - 08:00 PM</p>
            <p className="contact-sub">Saturday - Thursday</p>
            <p className="contact-sub holiday">Friday: 02:00 PM - 08:00 PM</p>
          </div>
        </div>
        
        {/* Delivery */}
        <div className="contact-card">
          <div className="contact-icon">🚚</div>
          <div className="contact-details">
            <h4>Delivery Coverage</h4>
            <p className="contact-value">Inside & Outside Dhaka</p>
            <p className="contact-sub">Free delivery on orders over ৳5,000</p>
          </div>
        </div>
        
        {/* Email */}
        <div className="contact-card">
          <div className="contact-icon">✉️</div>
          <div className="contact-details">
            <h4>Email Us</h4>
            <p className="contact-value">support@techxocean.com</p>
            <p className="contact-sub">sales@techxocean.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

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
                    const fetchedBlogs = Array.isArray(data) ? data : (data.blogs || []);
                    if (fetchedBlogs.length > 0) {
                        setRealBlogs(fetchedBlogs);
                    } else {
                        setRealBlogs([{
                            id: 'demo-blog-1',
                            title: 'Demo Blog Post',
                            image: '/img/placeholder.png',
                            date: '2026-05-11',
                            excerpt: 'This is a demo blog post so you can see the layout and make changes.',
                            slug: 'demo-blog'
                        }]);
                    }
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                    setRealBlogs([{
                        id: 'demo-blog-1',
                        title: 'Demo Blog Post',
                        image: '/img/placeholder.png',
                        date: '2026-05-11',
                        excerpt: 'This is a demo blog post so you can see the layout and make changes.',
                        slug: 'demo-blog'
                    }]);
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
