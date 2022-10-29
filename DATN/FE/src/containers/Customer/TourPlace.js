import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import Footer from "../HomePage/Footer/Footer";
import * as actions from "../../store/actions";
import "./TourPlace.scss";
class TourPlace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourPlaceArr: [],
      placesArr: [],
      placesA2Arr: [],
      placeInfoArr: [],
      idmas: "",
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      await this.props.getTourPlace(id);
      await this.props.getPlaceInfo(id);
      this.setState({
        idmas: id,
      });
    }
    this.props.getPlace();
    this.props.getPlaceA2();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let idmas = this.props.match && this.props.match.params && this.props.match.params.id;
    if (this.state.idmas !== idmas) {
      let id = idmas;
      await this.props.getTourPlace(id);
      await this.props.getPlaceInfo(id);
      this.setState({
        idmas: id,
      });
    }
    if (prevProps.tourplaces !== this.props.tourplaces) {
      this.setState({
        tourPlaceArr: this.props.tourplaces,
      });
    }
    if (prevProps.placeinfos !== this.props.placeinfos) {
      this.setState({
        placeInfoArr: this.props.placeinfos,
      });
    }
    if (prevProps.places !== this.props.places) {
      this.setState({
        placesArr: this.props.places,
      });
    }
    if (prevProps.placesA2 !== this.props.placesA2) {
      this.setState({
        placesA2Arr: this.props.placesA2,
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
    let tourplace = this.state.tourPlaceArr;
    let places = this.state.placesArr;
    let placesA2 = this.state.placesA2Arr;
    let placeinfo = this.state.placeInfoArr;

    return (
      <>
        <HomeHeader />
        <div className="tour_TourPlace_container">
          <div className="tour_TourPlace_content">
            <div className="title_tour">
              <div className="name_TourPlace">
                <b>Du Lịch {placeinfo.name}</b>
                <br />
                <p>Chúng tôi hiện có các tour như sau:</p>
              </div>
              <div className="note">
                {tourplace.length === 0 ? (
                  <div className="text-center">
                    Địa điểm này hiện chưa có tour, hãy quay lại sau! Chân thành cảm ơn!
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="tour">
                {tourplace &&
                  tourplace.length > 0 &&
                  tourplace.map((item, index) => {
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
            {this.state.idmas < 64 ? (
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
            ) : (
              <div className="places">
                <div className="place_title">
                  <label>Điểm đến du lịch</label>
                  <div className="img_place">
                    <img
                      src="https://media.vov.vn/sites/default/files/styles/large/public/2020-12/b1_2.jpg"
                      alt="Ảnh đẹp thế giới"
                    />
                  </div>
                </div>
                <div className="place_place">
                  {placesA2 &&
                    placesA2.length > 0 &&
                    placesA2.map((item, index) => {
                      return (
                        <div className="name" key={index} onClick={() => this.handlePlace(item)}>
                          Du lịch {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tourplaces: state.admin.tourplaces,
    places: state.admin.places,
    placesA2: state.admin.placesA2,
    placeinfos: state.admin.placeinfos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourPlace: (id) => dispatch(actions.getTourPlace(id)),
    getPlace: () => dispatch(actions.getPlace()),
    getPlaceA2: () => dispatch(actions.getPlaceA2()),
    getPlaceInfo: (id) => dispatch(actions.getPlaceInfo(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourPlace);
