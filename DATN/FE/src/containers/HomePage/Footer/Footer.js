import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
class Footer extends Component {
  render() {
    return (
      <div className="footer text-center">
        &copy; 2022{" "}
        <a target="_blank" href="http://www.facebook.com/78.Phong">
          Design by Bien Thanh Phong | Smile Travel
        </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
