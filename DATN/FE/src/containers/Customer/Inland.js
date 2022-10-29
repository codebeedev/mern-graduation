import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import Footer from "../HomePage/Footer/Footer";

import * as actions from "../../store/actions";
import "./Inland.scss";
class Inland extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getA1Arr: [],
      placesArr: [],
    };
  }

  async componentDidMount() {
    this.props.getTourA1();
    this.props.getPlace();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.toursA1 !== this.props.toursA1) {
      this.setState({
        getA1Arr: this.props.toursA1,
      });
    }
    if (prevProps.places !== this.props.places) {
      this.setState({
        placesArr: this.props.places,
      });
    }
  }
  handleInfoTour = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
    window.location.reload();
  };
  handlePlace = (place) => {
    this.props.history.push(`/dia-diem-du-lich/${place.id}`);
    window.location.reload();
  };
  render() {
    let tourA1 = this.state.getA1Arr;
    let places = this.state.placesArr;
    return (
      <>
        <HomeHeader />
        <div className="tour_inland_container">
          <div className="tour_inland_content">
            <div className="title_tour">
              <div className="name_inland">
                <b>Du Lịch Trong Nước</b>
                <br />
                <span>
                  Việt Nam tự hào là đất nước được thiên nhiên ban tặng với nhiều điểm du lịch hấp
                  dẫn. Smile Travel cung cấp các tour du lịch trong nước khởi hành từ TPHCM đến mọi
                  miền đất nước – những nơi mà bạn chưa tới, đã tới và muốn tới.
                </span>
                <br />
                <span>
                  Đến với tour trong nước của Smile Travel bạn sẽ có những giây phút thư giãn thoải
                  mái, chiêm ngưỡng thiên nhiên thơ mộng và hùng vĩ, khám phá những nét văn hóa mới
                  lạ, những di tích cổ kính và hiện đại của cộng đồng người Việt.
                </span>
                <br />
                <p>Chúng tôi hiện có các tour trong nước như sau:</p>
              </div>
              <div className="tour">
                {tourA1 &&
                  tourA1.length > 0 &&
                  tourA1.map((item, index) => {
                    return (
                      <div className="tour_info" key={index}>
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
                    );
                  })}
              </div>
            </div>

            <div className="places">
              <div className="place_title">
                <label>Điểm đến du lịch</label>
                <div className="img_place">
                  <img
                    src="https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/trucchinh2/2021_06_08/pha-din-con-deo-dep-hang-dau-viet-nam-hinh-13.jpg"
                    alt="Ảnh đẹp Việt Nam"
                  />
                </div>
              </div>

              <div className="place_place">
                {places &&
                  places.length > 0 &&
                  places.map((item, index) => {
                    return (
                      <div className="name" key={index} onClick={() => this.handlePlace(item)}>
                        Du lịch {item.name}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toursA1: state.admin.toursA1,
    places: state.admin.places,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourA1: () => dispatch(actions.getTourA1()),
    getPlace: () => dispatch(actions.getPlace()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Inland);
