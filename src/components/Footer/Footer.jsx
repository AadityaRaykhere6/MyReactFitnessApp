import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-col about-us">
          <a href="#" className="logo-text">
            <span className="logo-fit">Fit</span>
            <span className="logo-india">India</span>
          </a>
          <p>At FitIndia, we make group workouts fun, daily food healthy & tasty, mental fitness easy with yoga & meditation, and medical & lifestyle care hassle-free. #BeBetterEveryDay</p>
        </div>
        <div className="footer-col links">
          <a href="#">FitIndia for Business</a>
          <a href="#">FitIndia Franchise</a>
          <a href="#">Corporate Partnerships</a>
          <a href="#">Careers</a>
        </div>
        <div className="footer-col links">
          <a href="#">Contact Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms & Conditions</a>
          <a href="#">Blogs</a>
        </div>
        <div className="footer-col app-social">
          <div className="app-links">
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_178,q_auto:good,f_auto,dpr_2,fl_progressive//image/icons/cult/appstore.svg" alt="app-store" /></a>
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_178,q_auto:good,f_auto,dpr_2,fl_progressive//image/icons/cult/googleplay.svg" alt="play-store" /></a>
          </div>
          <div className="social-links">
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_32,q_auto:good,f_auto,dpr_2,fl_progressive//image/footer-web/FooterV3/youtube.svg" alt="youtube" /></a>
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_32,q_auto:good,f_auto,dpr_2,fl_progressive//image/footer-web/FooterV3/fb-page.svg" alt="facebook" /></a>
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_32,q_auto:good,f_auto,dpr_2,fl_progressive//image/footer-web/FooterV3/twitter-page-new.svg" alt="twitter" /></a>
            <a href="#"><img src="https://cdn-images.cure.fit/www-curefit-com/image/upload/w_32,q_auto:good,f_auto,dpr_2,fl_progressive//image/footer-web/FooterV3/insta-page.svg" alt="instagram" /></a>
          </div>
        </div>
      </div>
      {/* --- NAYA COPYRIGHT SECTION --- */}
      <div className="footer-bottom">
        <p>© 2024 FitIndia, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

