import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
class Hotel extends Component {
  render() {
    return (
      <>
        <HomeHeader />
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Hotel);
