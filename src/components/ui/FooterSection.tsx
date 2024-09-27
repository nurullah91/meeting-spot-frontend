import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../styles/footer.style.css";

const FooterSection: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Contact Information */}
        <div className="footer-section contact-info">
          <h3>Contact Information</h3>
          <p>
            <MailOutlined /> Email: info@example.com
          </p>
          <p>
            <PhoneOutlined /> Phone: +123 456 7890
          </p>
          <p>
            <EnvironmentOutlined /> Address: 123 Main St, Suite 100, City,
            Country
          </p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined className="social-icon" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined className="social-icon" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined className="social-icon" />
            </a>
          </div>
        </div>

        {/* Additional Links */}
        <div className="footer-section additional-links">
          <h3>Additional Links</h3>
          <ul>
            <li>
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Meeting Spot. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
