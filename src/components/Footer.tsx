import React from 'react';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container footer-top">
                <div className="footer-col" style={{ flex: 1.5 }}>
                    <div className="footer-logo" style={{ marginBottom: '15px' }}>
                        <img 
                            src="/images/logo/logo-white.png" 
                            alt="Tech X Ocean" 
                            onError={(e: any) => {
                                e.target.onerror = null;
                                e.target.src = "/images/logo/fallback-logo.png";
                                e.target.outerHTML = '<span class="logo-text-fallback">Tech X Ocean</span>';
                            }}
                        />
                    </div>
                    <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6' }}>
                        Enhancing the way you build, configure, and secure your systems. Your trusted partner for IT products.
                    </p>
                </div>
                <div className="footer-col">
                    <h4>Support</h4>
                    <ul className="footer-links">
                        <li><a href="#"><i className="fas fa-phone-alt"></i> 16793</a></li>
                        <li><a href="#"><i className="fas fa-map-marker-alt"></i> Store Locator</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>About Us</h4>
                    <ul className="footer-links">
                        <li><a href="#">Company Profile</a></li>
                        <li><a href="#">Contact Us</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Policy</h4>
                    <ul className="footer-links">
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Refund Policy</a></li>
                    </ul>
                </div>
                <div className="footer-col">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-facebook-f"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; 2026 Tech X Ocean. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
