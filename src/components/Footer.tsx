import React from 'react';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-grid">
                <div className="footer-brand">
                  <img src="/img/main website logo.png" alt="Tech X Ocean" className="footer-logo" />
                  <p className="footer-tagline">Ocean of IT Products & Accessories</p>
                  <p className="footer-description">
                    Your trusted partner for CCTV systems, PC components, and tech solutions in Bangladesh.
                  </p>
                  <div className="social-icons">
                    <a href="https://www.facebook.com/TechXOcean" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
                    <a href="#"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.instagram.com/techxocean/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    <a href="#"><i className="fab fa-youtube"></i></a>
                  </div>
                </div>
                <div className="footer-column">
                  <h3 className="footer-heading">Shop</h3>
                  <ul className="footer-links">
                    <li><a href="/category/laptop">Laptop</a></li>
                    <li><a href="/category/desktop-pc">Desktop PC</a></li>
                    <li><a href="/category/gaming-pc">Gaming PC</a></li>
                    <li><a href="/category/cctv-ip-camera">CCTV & IP Camera</a></li>
                    <li><a href="/category/components">Components</a></li>
                    <li><a href="/category/gadget">Gadget</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-heading">Support</h3>
                  <ul className="footer-links">
                    <li><a href="/contact">Contact Us</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/returns">Return Policy</a></li>
                    <li><a href="/warranty">Warranty Info</a></li>
                    <li><a href="/delivery">Delivery Information</a></li>
                    <li><a href="/payment">Payment Methods</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-heading">About Us</h3>
                  <ul className="footer-links">
                    <li><a href="/about">Company Profile</a></li>
                    <li><a href="/blogs">Tech Blogs</a></li>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms & Conditions</a></li>
                    <li><a href="/refund">Refund Policy</a></li>
                  </ul>
                </div>
            </div>
            
            <div className="footer-contact-bar">
              <div className="contact-item">
                <i className="fas fa-phone-alt"></i>
                <span>Call: 16793 (09AM - 08PM)</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>Email: info@techxocean.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>Inside & Outside Dhaka</span>
              </div>
            </div>
            
            <div className="footer-copyright">
              <p>&copy; 2026 Tech X Ocean. All Rights Reserved.</p>
              <div className="payment-methods">
                <img src="/img/credit-card-debit-card-payment-card-bank-visa.jpg" alt="Visa" style={{ height: '28px', width: 'auto', objectFit: 'contain', borderRadius: '3px' }} />
                <img src="/img/logo-mastercard-vector-graphics-font-visa-png-favpng-g7QRvD5wzLbqfgH0T0WjAe90s.jpg" alt="Mastercard" style={{ height: '28px', width: 'auto', objectFit: 'contain', borderRadius: '3px' }} />
                <img src="/img/bkash-logo-bkash-logo-with-origami-pink-bird-Ur5y5Ta5.jpg" alt="bKash" style={{ height: '28px', width: 'auto', objectFit: 'contain', borderRadius: '3px' }} />
                <img src="/img/496-4962280_nagad-logo-transparent-bkash-logo-png-png-download.png" alt="Nagad" style={{ height: '28px', width: 'auto', objectFit: 'contain', borderRadius: '3px' }} />
              </div>
            </div>
        </footer>
    );
}
