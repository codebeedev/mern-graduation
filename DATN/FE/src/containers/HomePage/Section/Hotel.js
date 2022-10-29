import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";

class Hotel extends Component {
  handleViewHotel = () => {
    this.props.history.push(`/hotel`);
  };
  render() {
    return (
      <div className="section_container">
        <div className="section_content">
          <div className="section_title text-center">
            <b>KHÁCH SẠN NỔI TIẾNG</b>
          </div>
          <Slider {...this.props.settings}>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
            <div className="secsion_customize">
              <div className="customize">
                <div className="image"></div>
                <div className="info">
                  <div className="name">
                    <b>Khám phá đảo ngọc</b>
                  </div>
                  <div className="location">
                    <i className="fas fa-map-marker-alt"></i>Hồ chí minh
                  </div>
                  <div className="time">
                    <span>2 Ngày 1 đêm</span>
                  </div>
                  <div className="price">
                    <b>21000000 Đ</b>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
          <div className="section_btn text-center">
            <button onClick={() => this.handleViewHotel()}>
              <b>Xem Thêm</b>
            </button>
          </div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Hotel));
