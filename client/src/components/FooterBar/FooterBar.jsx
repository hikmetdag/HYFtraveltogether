import React from "react";
import "./footerBar.css";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookSquare } from "react-icons/fa";

function FooterBar() {
  return (
    <div className="footer">
      <div className="container footer_content">
        <div className="footer_item footer_logo_div">
          <div>
            <Link to="/" className="footer-logo">
              TRAVEL 2GETHER
            </Link>
          </div>
          <div>
            <p>Enjoy the touring with travel together</p>
          </div>

          <div className="social_icon">
            <a
              href="https://www.instegram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram className="social_icon_item" />
            </a>
            <a href="https://www.twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter className="social_icon_item" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookSquare className="social_icon_item" />
            </a>
          </div>
        </div>

        <div className="footer_item">
          <ul>
            <li className="caption">Resources</li>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/login">
              <li>Login</li>
            </Link>
            <Link to="/register">
              <li>Register</li>
            </Link>
            <Link to="/about_us">
              <li>About us</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FooterBar;
