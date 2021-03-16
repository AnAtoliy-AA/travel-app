import './Footer.scss';

import React from 'react';
import gitLogo from '../../assets/images/github_logo.bmp';
import logo from '../../assets/images/rs_logo.svg';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="about-us">
        <a href="https://github.com/AnAtoliyAK">
          <img src={gitLogo} className="footer-logo" alt="rs_logo" />
          <span>AnAtoliyAA</span>
        </a>
        <a href="https://github.com/burik84">
          <img src={gitLogo} className="footer-logo" alt="rs_logo" />
          <span>burik84</span>
        </a>
      </div>
      <div>2021</div>
      <div>
        <a href="https://rs.school/js/">
          <img src={logo} className="footer-logo" alt="rs_logo" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
