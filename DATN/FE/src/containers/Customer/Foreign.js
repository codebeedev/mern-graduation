import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import Footer from "../HomePage/Footer/Footer";
import * as actions from "../../store/actions";
import "./Foreign.scss";
class Foreign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getA2Arr: [],
      placesA2Arr: [],
    };
  }

  async componentDidMount() {
    this.props.getTourA2();
    this.props.getPlaceA2();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.toursA2 !== this.props.toursA2) {
      this.setState({
        getA2Arr: this.props.toursA2,
      });
    }
    if (prevProps.placesA2 !== this.props.placesA2) {
      this.setState({
        placesA2Arr: this.props.placesA2,
      });
    }
  }
  handleInfoTourA2 = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
    window.location.reload();
  };
  handlePlace = (place) => {
    this.props.history.push(`/dia-diem-du-lich/${place.id}`);
    window.location.reload();
  };
  render() {
    let tourA2 = this.state.getA2Arr;
    let placesA2 = this.state.placesA2Arr;
    return (
      <>
        <HomeHeader />
        <div className="tour_inland_container">
          <div className="tour_inland_content">
            <div className="title_tour">
              <div className="name_inland">
                <b>Du Lịch Nước Ngoài</b>
                <br />
                <span>
                  Mục đích của cuộc đời chính là sống, trải nghiệm đến tận cùng, háo hức vươn ra và
                  không bao giờ sợ hãi đón nhận những trải nghiệm mới mẻ và phong phú hơn.
                </span>
                <br />
                <span>
                  Đến với tour trong nước của Smile Travel bạn sẽ có những giây phút thư giãn thoải
                  mái, chiêm ngưỡng thiên nhiên thơ mộng và hùng vĩ, khám phá những nét văn hóa mới
                  lạ, những di tích cổ kính và hiện đại của cộng đồng người Việt và thế giới.
                </span>
                <br />
                <p>Chúng tôi hiện có các tour trong nước như sau:</p>
              </div>
              <div className="tour">
                {tourA2 &&
                  tourA2.length > 0 &&
                  tourA2.map((item, index) => {
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
                          <div className="name" onClick={() => this.handleInfoTourA2(item)}>
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
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    toursA2: state.admin.toursA2,
    placesA2: state.admin.placesA2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourA2: () => dispatch(actions.getTourA2()),
    getPlaceA2: () => dispatch(actions.getPlaceA2()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Foreign);
