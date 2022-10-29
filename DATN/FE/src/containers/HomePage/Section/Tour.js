import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";

class Tour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topTourArr: [],
      topTourA2Arr: [],
    };
  }

  //load
  async componentDidMount() {
    this.props.getTopTourA1(10);
    this.props.getTopTourA2(10);
  }
  trongnuoc = () => {
    this.props.history.push("/du-lich-trong-nuoc");
    window.location.reload();
  };
  nuocngoai = () => {
    this.props.history.push("/du-lich-nuoc-ngoai");
    window.location.reload();
  };
  duthuyen = () => {
    this.props.history.push("/tour-du-thuyen");
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topTourA1 !== this.props.topTourA1) {
      this.setState({
        topTourArr: this.props.topTourA1,
      });
    }
    if (prevProps.topTourA2 !== this.props.topTourA2) {
      this.setState({
        topTourA2Arr: this.props.topTourA2,
      });
    }
  }
  handleInfoTour = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
    window.location.reload();
  };
  render() {
    let topTourA1 = this.state.topTourArr;
    let topTourA2 = this.state.topTourA2Arr;
    return (
      <React.Fragment>
        {/**TOUR TRONG NƯỚC*/}
        <div className="section_container">
          <div className="section_content">
            <div className="section_title text-center">
              <b>DU LỊCH VIỆT NAM</b>
            </div>
            <Slider {...this.props.settings}>
              {topTourA1 &&
                topTourA1.length > 0 &&
                topTourA1.map((item, index) => {
                  return (
                    <div className="secsion_customize">
                      <div className="customize">
                        <div
                          className="image"
                          dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}
                        ></div>
                        <div className="address">
                          <i className="fas fa-map-marker-alt"></i>
                          {item.placeData.name}
                        </div>
                        <div className="info">
                          <div className="name" onClick={() => this.handleInfoTour(item)}>
                            <b>{item.name}</b>
                          </div>
                          <div className="location">
                            <i className="fas fa-map-marker-alt"></i>
                            KH: {item.startAddress}
                          </div>
                          <div className="time">
                            <i className="fa fa-calendar-alt"></i>
                            TG: {item.timeData.value}
                          </div>
                          <div className="price">
                            {item.price}đ<button className="btn-tour">Đặt tour</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
            <div className="section_btn text-center">
              <button onClick={() => this.trongnuoc()}>
                <b>Xem Thêm</b>
              </button>
            </div>
          </div>
        </div>
        {/**TOUR NƯỚC NGOÀI*/}
        <div className="section_container">
          <div className="section_content">
            <div className="section_title text-center">
              <b>DU LỊCH NƯỚC NGOÀI</b>
            </div>
            <Slider {...this.props.settings}>
              {topTourA2 &&
                topTourA2.length > 0 &&
                topTourA2.map((item, index) => {
                  return (
                    <div className="secsion_customize">
                      <div className="customize">
                        <div
                          className="image"
                          dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}
                        ></div>
                        <div className="address">
                          <i className="fas fa-map-marker-alt"></i>
                          {item.placeData.name}
                        </div>
                        <div className="info">
                          <div className="name" onClick={() => this.handleInfoTour(item)}>
                            <b>{item.name}</b>
                          </div>
                          <div className="location">
                            <i className="fas fa-map-marker-alt"></i>
                            KH: {item.startAddress}
                          </div>
                          <div className="time">
                            <i className="fa fa-calendar-alt"></i>
                            TG: {item.timeData.value}
                          </div>
                          <div className="price">
                            {item.price}đ<button className="btn-tour">Đặt tour</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
            <div className="section_btn text-center">
              <button onClick={() => this.nuocngoai()}>
                <b>Xem Thêm</b>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topTourA1: state.admin.topTourA1,
    topTourA2: state.admin.topTourA2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopTourA1: (limit) => dispatch(actions.getTopTourA1(limit)),
    getTopTourA2: (limit) => dispatch(actions.getTopTourA2(limit)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Tour));
