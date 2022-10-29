import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import Footer from "../HomePage/Footer/Footer";
import * as actions from "../../store/actions";
import "./DomainTour.scss";
class DomainTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      domainTour: [],
      placesArr: [],
      placesA2Arr: [],
      idmas: "",
      domainArr: "",
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      await this.props.getTourDomain(id);
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
      await this.props.getTourDomain(id);
      this.setState({
        idmas: id,
      });
    }
    if (prevProps.tourDomain !== this.props.tourDomain) {
      this.setState({
        domainTour: this.props.tourDomain,
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
    let Domain = this.state.domainTour;
    let places = this.state.placesArr;
    let placesA2 = this.state.placesA2Arr;
    return (
      <>
        <HomeHeader />
        <div className="tour_DomainTour_container">
          <div className="tour_DomainTour_content">
            <div className="title_tour">
              <div className="name_DomainTour">
                <b>
                  {this.state.idmas === "M1"
                    ? "DU LỊCH MIỀN BẮC"
                    : this.state.idmas === "M2"
                    ? "Du LỊCH MIỀN TRUNG"
                    : this.state.idmas === "M3"
                    ? "DU LỊCH MIỀN NAM"
                    : this.state.idmas === "C1"
                    ? "DU LỊCH CHÂU Á"
                    : this.state.idmas === "C2"
                    ? "DU LỊCH CHÂU ÂU"
                    : this.state.idmas === "C3"
                    ? "DU LỊCH CHÂU PHI"
                    : this.state.idmas === "C4"
                    ? "DU LỊCH CHÂU MỸ"
                    : "DU LỊCH CHÂU ÚC"}
                </b>
                <br />
                <span>
                  {this.state.idmas === "M1"
                    ? "Du lịch Miền Bắc - Miền Bắc Việt Nam có nhiều danh lam thắng cảnh nổi tiếng trong nước và trên thế giới tiêu biểu như: Hạ Long, Sapa, Yên Tử, Chùa Hương, Côn Sơn Kiếp Bạc, Lạng Sơn, Hà Giang, Hoa Lư Tam Cốc, Đền Mẫu Âu Cơ, đền Trần, đền Bà Chúa Kho, đền Hùng..."
                    : this.state.idmas === "M2"
                    ? "Du lịch Miền Trung – Miền Trung cát trắng nắng và gió, sở hữu nhiều bãi biển đẹp, Miền Trung luôn là sự lựa chọn hàng đầu của du khách trong và ngoài nước. Smile Travel chuyên tổ chức các tour du lịch Miền Trung khởi hành từ thành phố Hồ Chí Minh với giá tốt nhất và dịch vụ tốt nhất."
                    : this.state.idmas === "M3"
                    ? "Du lịch Miền Nam – Miền Nam thân thương với rất nhiều điểm du lịch đẹp giàu chất thơ như Phú Quốc, Côn Đảo, Cần Thơ, Long Hải...với rất nhiều di tích lịch sử oai hùng của một thời dựng nước và giữ nước song hành với đó là máu và nước mắt."
                    : this.state.idmas === "C1"
                    ? "Du lịch Châu Á – Châu Á luôn là điểm đến lý tưởng của du khách Việt. Đến với tour Châu Á của chúng tôi du khách sẽ được khám phá các kỳ quan nổi tiếng của các nước như: Trung Quốc, Campuchia, Nhật Bản. Hàn Quốc, Ấn Độ…hay các thiên đường mua sắm như: Singapore, Malaysia, Thaí Lan, Hồng Kông…Hiện nay chúng tôi có các tour Châu Á sau:"
                    : this.state.idmas === "C2"
                    ? "Du lịch Châu Âu - Châu Âu vùng đất của nên văn minh và giàu có, nơi có nhiều danh thắng kỳ quan đẹp bậc nhất trên thới giới. Ngày càng nhiều người Việt có điều kiện du lịch Châu Âu do cải thiện về kinh tế cũng như việc đi lại bằng đường hàng không ngày càng cải tiến. Tour du lịch Châu Âu đưa du khách đến với các nên văn minh lâu đời nhất của nhân loại."
                    : this.state.idmas === "C3"
                    ? "Du lịch Châu Phi – Châu Phi là lục địa lớn thứ 2 thế giới, và cũng là nơi có nhiều cảnh quan thiên nhiên cùng hệ sinh thái vô cùng đặc sắc. Tuy nhiên, đáng tiếc là châu lục này lại không thu hút quá nhiều khách du lịch."
                    : this.state.idmas === "C4"
                    ? "Du lịch Châu Mỹ - Cách Việt Nam nửa vòng trái đất, tuy còn khá xa lạ với người Việt nhưng Châu Mỹ luôn là điểm đến thú vị cho những ai thích khám phá. Tour du lịch Châu Mỹ của Star Travel luôn là lựa chọn hàng đầu cho du khách. Chúng tôi thường xuyên mở các tour du lịch Châu Mỹ đi các nước Mỹ, Canada, Brazil…với giá tốt nhất."
                    : "Du lịch Châu Úc – Tour du lịch Châu Úc của Star Travel đưa du khách khám phá “hòn đảo lớn nhất thế giới”, xứ sở của những chú chuột xinh xắn, lãnh địa của loài cá sấu hung bạo hay khám phá các hoang mạc rộng lớn."}
                </span>
                <br />
              </div>
              {Domain.length > 0 ? (
                <div className="tour">
                  {Domain &&
                    Domain.length > 0 &&
                    Domain.map((item, index) => {
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
              ) : (
                <div className="text-center not_tour"> Hiện chưa có chuyến đi nào!</div>
              )}
            </div>
            {this.state.idmas === "M1" || this.state.idmas === "M2" || this.state.idmas === "M3" ? (
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
                      alt="Ảnh đẹp Việt Nam"
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
    tourDomain: state.admin.tourDomain,
    places: state.admin.places,
    placesA2: state.admin.placesA2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourDomain: (id) => dispatch(actions.getTourDomain(id)),
    getPlace: () => dispatch(actions.getPlace()),
    getPlaceA2: () => dispatch(actions.getPlaceA2()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DomainTour);
