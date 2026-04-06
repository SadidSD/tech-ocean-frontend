import React from 'react';

export default function Footer() {
    return (
        <footer className="main-footer">
            <div className="container footer-top">
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
