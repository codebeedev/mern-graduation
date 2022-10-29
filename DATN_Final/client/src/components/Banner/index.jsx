import React from 'react';
import { Link } from 'react-router-dom';
import imgLogo from '../../assets/images/banner.webp';
import './styles.scss';

const Banner = () => {
  return (
    <div className="banner">
      <Link className="d-flex justify-content-center" to="/products">
        <img src={imgLogo} alt="banner" />
      </Link>
    </div>
  );
};

export default Banner;
