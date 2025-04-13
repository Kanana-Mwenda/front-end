import React from 'react';
import './Footer.css'
import facebook from '../../assets/facebook_icon.png'
import twitter from '../../assets/twitter_icon.png'
import linkedin from '../../assets/linkedin_icon.png'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const showFooter = ['/home', '/courses', '/about'].includes(location.pathname);

  if (!showFooter) {
    return null;
  }

  return (
    <div>
      <div className="footer">
        <div className="footer_content">
          <div className="content_left">
            <h2>Tech Academy</h2>
            <p>From beginners to advanced learners, find courses that fit your level and interests</p>
            <div className="social_icons">
              <img src={facebook} alt="social_icons" className="icons" />
              <img src={linkedin} alt="social-icons" className="icons" />
              <img src={twitter} alt="social_icons" className="icons" />
            </div>
          </div>
          <div className="content_center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About us</li>
              <li>Services</li>
              <li>Privacy policy</li>
            </ul>
          </div>
          <div className="content_right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>Phone: (123) 456-7890</li>
              <li>Email: support@techacademy.com</li>
              <li>Address:123 Business St, Suite 100, City, State</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="copyright">Copyright 2025 @Company. All Right Reserved</p>
      </div>
    </div>
  );
};

export default Footer;