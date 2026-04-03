const { useState } = React;

// --- Phase 2: Foundation & Header Components ---

const TopBar = () => {
    return (
        <div className="top-bar">
            <div className="container top-bar-inner">
                <div className="top-bar-left">
                    <a href="#"><i className="LocationIcon fas fa-map-marker-alt"></i> Find a Store</a>
                    <a href="#"><i className="fas fa-phone-alt"></i> 16793</a>
                </div>
                <div className="top-bar-right">
                    <a href="#">Account <i className="fas fa-angle-down"></i></a>
                    <a href="#">Contact Us</a>
                    <a href="#">PC Builder</a>
                </div>
            </div>
        </div>
    );
};

const MainHeader = ({ cartCount, onMenuToggle }) => {
    return (
        <header className="main-header" id="mainHeader">
            <div className="container main-header-inner">
                {/* Mobile Menu Toggler */}
                <button className="mobile-menu-toggler" onClick={onMenuToggle}>
                    <i className="fas fa-bars"></i>
                </button>

                {/* Logo */}
                <div className="logo">
                    <a href="#">
                        <span className="logo-text">STAR <span className="logo-accent">TECH</span></span>
                    </a>
                </div>

                {/* Search Bar */}
                <div className="search-wrap">
                    <input type="text" className="search-input" placeholder="Search for Products..." />
                    <button className="search-btn"><i className="fas fa-search"></i></button>
                </div>

                {/* Header Actions */}
                <div className="header-actions">
                    <a href="#" className="action-item">
                        <div className="action-icon"><i className="fas fa-gift"></i></div>
                        <div className="action-text">
                            <span className="text-top">Offers</span>
                            <span className="text-bottom">Latest Promos</span>
                        </div>
                    </a>
                    <a href="#" className="action-item action-pc-builder d-none-mobile">
                        <div className="action-icon"><i className="fas fa-desktop"></i></div>
                        <div className="action-text">
                            <span className="text-top">PC Builder</span>
                            <span className="text-bottom">Build Your PC</span>
                        </div>
                    </a>
                    <a href="#" className="action-item d-none-mobile">
                        <div className="action-icon">
                            <i className="fas fa-sync-alt"></i>
                            <span className="badge">0</span>
                        </div>
                        <div className="action-text">
                            <span className="text-top">Compare</span>
                            <span className="text-bottom">Product</span>
                        </div>
                    </a>
                    <a href="#" className="action-item">
                        <div className="action-icon">
                            <i className="fas fa-user"></i>
                        </div>
                        <div className="action-text">
                            <span className="text-top">Account</span>
                            <span className="text-bottom">Login/Register</span>
                        </div>
                    </a>
                    <a href="#" className="action-item cart-item">
                        <div className="action-icon">
                            <i className="fas fa-shopping-bag"></i>
                            <span className="badge cart-badge">{cartCount}</span>
                        </div>
                        <div className="action-text d-none-mobile">
                            <span className="text-top">Cart</span>
                            <span className="text-bottom">0৳</span>
                        </div>
                    </a>
                </div>
            </div>
        </header>
    );
};

const MegaMenu = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
    // For simplicity with vanilla CSS hover states, we keep this structure mostly standard HTML.
    // The CSS already handles the hover dropdowns.
    
    return (
        <div style={{ display: isMobileMenuOpen && window.innerWidth < 991 ? 'block' : '' }}>
            <nav className="mega-menu-wrapper" style={{ display: isMobileMenuOpen ? 'block' : '' }}>
                <div className="container">
                    <ul className="mega-menu" id="megaMenu">
                        <li className="menu-item has-dropdown">
                            <a href="#">Desktop</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <a href="#" className="dropdown-heading">Custom PC</a>
                                    <a href="#">Intel PC</a>
                                    <a href="#">AMD PC</a>
                                </div>
                                {/* ... other desktop columns */}
                                <div className="column">
                                    <a href="#" className="dropdown-heading">Brand PC</a>
                                    <a href="#">Acer</a><a href="#">Apple</a><a href="#">Asus</a>
                                </div>
                            </div>
                        </li>
                        <li className="menu-item has-dropdown">
                            <a href="#">Laptop</a>
                            <div className="dropdown-content">
                                <div className="column">
                                    <a href="#" className="dropdown-heading">All Laptops</a>
                                    <a href="#">Acer</a><a href="#">Apple</a><a href="#">Asus</a>
                                </div>
                                <div className="column">
                                    <a href="#" className="dropdown-heading">Gaming Laptop</a>
                                    <a href="#">Asus ROG</a><a href="#">MSI</a>
                                </div>
                            </div>
                        </li>
                        <li className="menu-item"><a href="#">Component</a></li>
                        <li className="menu-item"><a href="#">Monitor</a></li>
                        <li className="menu-item"><a href="#">UPS</a></li>
                        <li className="menu-item"><a href="#">Phone</a></li>
                        <li className="menu-item"><a href="#">Tablet</a></li>
                        <li className="menu-item"><a href="#">Office Equipment</a></li>
                        <li className="menu-item"><a href="#">Camera</a></li>
                    </ul>
                </div>
            </nav>
            {/* Mobile Overlay */}
            <div 
                className="overlay" 
                style={{ display: isMobileMenuOpen ? 'block' : 'none' }}
                onClick={onCloseMobileMenu}
            ></div>
        </div>
    );
};


// --- Phase 3: Home Page Components & Data ---

const MOCK_CATEGORIES = [
    { title: 'Drone', icon: 'fas fa-plane' },
    { title: 'Gimbal', icon: 'fas fa-camera-retro' },
    { title: 'Laptop', icon: 'fas fa-laptop' },
    { title: 'TV', icon: 'fas fa-tv' },
    { title: 'Mobile Phone', icon: 'fas fa-mobile-alt' },
    { title: 'VR', icon: 'fas fa-vr-cardboard' },
    { title: 'Smart Watch', icon: 'fas fa-stopwatch' },
    { title: 'Action Camera', icon: 'fas fa-camera' },
    { title: 'Gaming Console', icon: 'fas fa-gamepad' },
    { title: 'Desktop', icon: 'fas fa-desktop' },
    { title: 'Printer', icon: 'fas fa-print' },
    { title: 'Headphone', icon: 'fas fa-headphones' },
];

const MOCK_PRODUCTS = [
    {
        id: 1,
        title: 'Apple MacBook Air 13.3-Inch Retina Display 8-core Apple M1 chip with 8GB RAM, 256GB SSD (MGN63) Space Gray',
        price: '95,000৳',
        oldPrice: '105,000৳',
        features: ['Apple M1 chip', '8GB Unified Memory', '256GB SSD', '13.3-inch Retina display'],
        status: 'In Stock',
        imgIcon: 'fa-laptop',
        rating: 4.5,
        reviewCount: 128
    },
    {
        id: 2,
        title: 'AMD Ryzen 5 5600G Processor with Radeon Graphics',
        price: '13,500৳',
        oldPrice: '',
        features: ['Cores 6 & Threads 12', 'Base Clock: 3.9GHz', 'Boost Clock: up to 4.4GHz', 'Radeon Graphics'],
        status: 'In Stock',
        imgIcon: 'fa-microchip',
        rating: 5,
        reviewCount: 84
    },
    {
        id: 3,
        title: 'Samsung 980 500GB PCIe 3.0 M.2 NVMe SSD',
        price: '4,500৳',
        oldPrice: '5,200৳',
        features: ['Storage capacity: 500GB', 'Form factor: M.2 (2280)', 'Interface: PCIe Gen 3.0 x4', 'Read/Write: Up to 3,100/2,600 MB/s'],
        status: 'Out of Stock',
        imgIcon: 'fa-hdd',
        rating: 4,
        reviewCount: 32
    },
    {
        id: 4,
        title: 'Gamdias AURA GC1 Mesh ARGB Mid-tower ATX Gaming Casing',
        price: '3,800৳',
        oldPrice: '',
        features: ['Mid-tower ATX Case', 'Mesh Front Panel', '4x 120mm ARGB Fans pre-installed', 'Magnetic Dust Filter'],
        status: 'In Stock',
        imgIcon: 'fa-box',
        rating: 0,
        reviewCount: 0
    },
    {
        id: 5,
        title: 'Sony PlayStation 5 Console (Disc Edition)',
        price: '58,000৳',
        oldPrice: '',
        features: ['Custom AMD RDNA 2 GPU', '825GB PCIe Gen 4 NVMe SSD', 'Tempest 3D AudioTech', 'DualSense wireless controller'],
        status: 'In Stock',
        imgIcon: 'fa-gamepad',
        rating: 4.5,
        reviewCount: 205
    },
    {
        id: 6,
        title: 'Dahua HAC-B1A21P-U-IL 2MP Smart Dual Light HDCVI Bullet CC Camera',
        price: '2,500৳',
        oldPrice: '3,000৳',
        features: ['2 Megapixel resolution', 'Smart Dual Light', 'HDCVI Bullet design', 'Stock: 30 pieces'],
        status: 'In Stock',
        imgUrl: 'img/dahua_camera.png',
        rating: 5,
        reviewCount: 15
    },
    {
        id: 7,
        title: 'WGP Mini UPS – (5V, 9V, 12V Output) -Capacity 10400mAh',
        price: '1,800৳',
        oldPrice: '2,200৳',
        features: ['5V, 9V, 12V Output', '10400mAh Capacity', 'Protects Wi-Fi router from power cuts', 'Stock: 30 pieces'],
        status: 'In Stock',
        imgUrl: 'img/wgp_ups.png',
        rating: 4.5,
        reviewCount: 52
    }
];

const MOCK_BLOGS = [
    {
        id: 1,
        title: "Top 5 Gaming Laptops in 2024",
        excerpt: "Discover the most powerful gaming laptops that let you play AAA titles smoothly.",
        date: "March 15, 2024",
        imgIcon: "fa-gamepad"
    },
    {
        id: 2,
        title: "How to Build Your Own PC",
        excerpt: "A comprehensive guide to selecting components and assembling your dream PC.",
        date: "March 10, 2024",
        imgIcon: "fa-desktop"
    },
    {
        id: 3,
        title: "Best Tech Gadgets for Productivity",
        excerpt: "Boost your daily workflow with these amazing tech accessories and tools.",
        date: "February 28, 2024",
        imgIcon: "fa-mobile-alt"
    }
];

const HeroBanner = () => (
    <section className="hero-section">
        <div className="container hero-grid">
            <div className="hero-main-banner">
                <div className="hero-main-content">
                    <h2>Eid Salami Deals</h2>
                    <p>Up to 50% Off on Selected Items</p>
                </div>
            </div>
            <div className="hero-side-banners">
                <div className="side-banner">
                    <h3>Special Laptop Deals</h3>
                </div>
                <div className="side-banner">
                    <h3>PC Build Offers</h3>
                </div>
            </div>
        </div>
    </section>
);

const FeaturesBar = () => (
    <div className="container">
        <div className="features-bar">
            <div className="feature-pill">
                <div className="icon"><i className="fas fa-laptop"></i></div>
                <div className="text">
                    <span className="title">Laptop Finder</span>
                    <span className="subtitle">Find Your Laptop Easily</span>
                </div>
            </div>
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

const CategoryList = ({ categories }) => (
    <section className="categories-section container">
        <div className="section-header">
            <h2>Featured Category</h2>
            <p>Get Your Desired Product from Featured Category!</p>
        </div>
        <div className="categories-grid">
            {categories.map((cat, idx) => (
                <a href="#" key={idx} className="category-card">
                    <div className="category-icon">
                        <i className={cat.icon}></i>
                    </div>
                    <h4>{cat.title}</h4>
                </a>
            ))}
        </div>
    </section>
);

const FeaturedProducts = ({ products }) => (
    <section className="products-section container">
        <div className="section-header">
            <h2>Featured Products</h2>
            <p>Check & Get Your Desired Product!</p>
        </div>
        <div className="products-grid">
            {products.map(prod => (
                <div className="product-card" key={prod.id}>
                    <div className={`product-status ${prod.status === 'In Stock' || prod.status.includes('Stock') ? 'instock' : 'out'}`}>
                        {prod.status}
                    </div>
                    <div className="product-img-wrap">
                        {/* Image or generic icon for the product */}
                        {prod.imgUrl ? (
                            <img src={prod.imgUrl} alt={prod.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                        ) : (
                            <i className={`fas ${prod.imgIcon}`}></i>
                        )}
                        <div className="actions">
                            <button className="btn-icon" title="Add to Cart"><i className="fas fa-shopping-cart"></i></button>
                            <button className="btn-icon" title="Compare"><i className="fas fa-sync-alt"></i></button>
                        </div>
                    </div>
                    <a href="#" className="product-title">{prod.title}</a>
                    <StarRating rating={prod.rating} count={prod.reviewCount} />
                    <ul className="product-features">
                        {prod.features.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                    <div className="product-price-box">
                        <span className="price">
                            {prod.price} 
                            {prod.oldPrice && <strike>{prod.oldPrice}</strike>}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </section>
);

const LatestBlogs = ({ blogs }) => (
    <section className="blogs-section container mt-5">
        <div className="section-header">
            <h2>Latest Blogs</h2>
            <p>Catch up on the latest tech news and reviews!</p>
        </div>
        <div className="blogs-grid">
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


// --- Phase 4 & 5: New Core Views & Footer ---

const Footer = () => (
    <footer className="footer mt-5">
        <div className="container">
            <div className="footer-top">
                <div className="support-info">
                    <div className="support-pill">
                        <i className="fas fa-headset"></i>
                        <div className="support-text">
                            <span className="title">Support Center</span>
                            <span className="phone">16793</span>
                        </div>
                    </div>
                </div>
                <div className="about-short">
                    <strong>Star Tech Ltd</strong><br/>
                    Leading Computer, Laptop & Gaming PC Retail & Online Shop in Bangladesh
                </div>
            </div>
            <div className="footer-links">
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="#">EMI Terms</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Star Point Policy</a></li>
                        <li><a href="#">Brands</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Customer Service</h4>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">FAQ</a></li>
                        <li><a href="#">Terms & Conditions</a></li>
                        <li><a href="#">Return Policy</a></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 Star Tech Ltd | All Rights Reserved</p>
                <div className="social-links">
                    <a href="https://www.facebook.com/TechXOcean" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                    <a href="#"><i className="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </footer>
);

const PCBuilderView = () => {
    // Basic mock structure for PC builder
    const components = [
        { name: 'Core i5 12400', type: 'CPU', icon: 'fa-microchip', price: '18,500৳' },
        { name: 'ASUS Prime H610M', type: 'Motherboard', icon: 'fa-chess-board', price: '9,500৳' },
        { name: 'Corsair Vengeance 8GB', type: 'RAM', icon: 'fa-memory', price: '3,200৳' },
        { name: 'Samsung 500GB NVMe', type: 'Storage', icon: 'fa-hdd', price: '4,500৳' },
    ];

    return (
        <div className="container mt-4">
            <div className="page-header">
                <div className="breadcrumb"><a href="#">Home</a> / PC Builder</div>
                <h1 className="page-title">Build Your Own PC</h1>
            </div>
            <div className="builder-layout">
                <div className="builder-components">
                    <div className="builder-header">
                        <span>Core Components</span>
                        <button className="btn-outline" style={{borderColor: 'rgba(255,255,255,0.3)', color: '#fff'}}>Save Build</button>
                    </div>
                    {components.map((comp, idx) => (
                        <div className="builder-row" key={idx}>
                            <div className="comp-icon"><i className={`fas ${comp.icon}`}></i></div>
                            <div className="comp-info">
                                <h5>{comp.type}</h5>
                                <div className="selected-name">{comp.name} - {comp.price}</div>
                            </div>
                            <div className="comp-action">
                                <button className="btn-outline">Choose</button>
                            </div>
                        </div>
                    ))}
                    {/* Empty placeholder slot to show how selection works */}
                    <div className="builder-row">
                            <div className="comp-icon"><i className="fas fa-box"></i></div>
                            <div className="comp-info">
                                <h5>Casing</h5>
                                <div style={{fontSize: '13px', color: '#999'}}>Please select Casing</div>
                            </div>
                            <div className="comp-action">
                                <button className="btn-primary">Choose</button>
                            </div>
                        </div>
                </div>
                <div className="builder-summary">
                    <h4>Estimated Wattage: 450W</h4>
                    <div className="summary-total">35,700৳</div>
                    <button className="btn-primary" style={{width: '100%'}}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

const CartView = () => (
    <div className="container mt-4">
        <div className="page-header">
            <div className="breadcrumb"><a href="#">Home</a> / Shopping Cart</div>
            <h1 className="page-title">Shopping Cart</h1>
        </div>
        <div className="cart-layout">
            <div className="empty-cart">
                <i className="fas fa-shopping-basket"></i>
                <h2>Your shopping cart is empty!</h2>
                <p>Please add products to your cart to proceed.</p>
                <button className="btn-primary mt-3">Continue Shopping</button>
            </div>
        </div>
    </div>
);


// --- Main Application Component (Updated with Routing) ---
const App = () => {
    const [cartCount, setCartCount] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [currentView, setCurrentView] = useState('home'); // 'home', 'pc-builder', 'cart'

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Navigation interceptors
    const navigateTo = (view, e) => {
        if(e) e.preventDefault();
        setCurrentView(view);
        window.scrollTo(0, 0);
    };

    return (
        <div className="app-container">
            {/* Navigational Headers */}
            <TopBar navigateTo={navigateTo} />
            <header className="main-header" id="mainHeader">
                <div className="container main-header-inner">
                    <button className="mobile-menu-toggler" onClick={toggleMobileMenu}>
                        <i className="fas fa-bars"></i>
                    </button>
                    <div className="logo">
                        <a href="#" onClick={(e) => navigateTo('home', e)}>
                            <span className="logo-text">STAR <span className="logo-accent">TECH</span></span>
                        </a>
                    </div>
                    <div className="search-wrap">
                        <input type="text" className="search-input" placeholder="Search for Products..." />
                        <button className="search-btn"><i className="fas fa-search"></i></button>
                    </div>
                    <div className="header-actions">
                        <a href="#" className="action-item">
                            <div className="action-icon"><i className="fas fa-gift"></i></div>
                            <div className="action-text">
                                <span className="text-top">Offers</span>
                                <span className="text-bottom">Latest Promos</span>
                            </div>
                        </a>
                        <a href="#" onClick={(e) => navigateTo('pc-builder', e)} className="action-item action-pc-builder d-none-mobile">
                            <div className="action-icon"><i className="fas fa-desktop"></i></div>
                            <div className="action-text">
                                <span className="text-top">PC Builder</span>
                                <span className="text-bottom">Build Your PC</span>
                            </div>
                        </a>
                        <a href="#" className="action-item d-none-mobile">
                            <div className="action-icon">
                                <i className="fas fa-sync-alt"></i>
                                <span className="badge">0</span>
                            </div>
                            <div className="action-text">
                                <span className="text-top">Compare</span>
                                <span className="text-bottom">Product</span>
                            </div>
                        </a>
                        <a href="#" className="action-item">
                            <div className="action-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="action-text">
                                <span className="text-top">Account</span>
                                <span className="text-bottom">Login/Register</span>
                            </div>
                        </a>
                        <a href="#" onClick={(e) => navigateTo('cart', e)} className="action-item cart-item">
                            <div className="action-icon">
                                <i className="fas fa-shopping-bag"></i>
                                <span className="badge cart-badge">{cartCount}</span>
                            </div>
                            <div className="action-text d-none-mobile">
                                <span className="text-top">Cart</span>
                                <span className="text-bottom">0৳</span>
                            </div>
                        </a>
                    </div>
                </div>
            </header>
            
            <MegaMenu isMobileMenuOpen={isMobileMenuOpen} onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
            
            {/* Simulated Routing View Port */}
            <main style={{ minHeight: '60vh' }}>
                {currentView === 'home' && (
                    <>
                        <HeroBanner />
                        <FeaturesBar />
                        <CategoryList categories={MOCK_CATEGORIES} />
                        <FeaturedProducts products={MOCK_PRODUCTS} />
                        <LatestBlogs blogs={MOCK_BLOGS} />
                    </>
                )}
                {currentView === 'pc-builder' && <PCBuilderView />}
                {currentView === 'cart' && <CartView />}
            </main>
            
            <Footer />
        </div>
    );
};

// Render App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
