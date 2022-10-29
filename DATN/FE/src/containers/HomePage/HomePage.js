import React, { Component } from "react";
import { connect } from "react-redux";

import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HomeHeader from "./HeaderPage/HomeHeader.js";
import Banner from "./BannerPage/Banner.js";
import Tour from "./Section/Tour.js";
import Hotel from "./Section/Hotel.js";
import About from "./Section/About.js";
import Footer from "./Footer/Footer.js";

class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 2,
    };

    return (
      <div>
        <HomeHeader />
        <Banner />
        <Tour settings={settings} />
        <Hotel settings={settings} />
        <About />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
