import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import Footer from "../HomePage/Footer/Footer";
import "./DetaiTour.scss";
import DatePicker from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import "flatpickr/dist/l10n/vn";
import moment from "moment";
import { toast } from "react-toastify";
import { dateFormat } from "../../utils";
import Booktour from "./Modal/Booktour";
import Commentt from "../Customer/fb/Comment";
import LikeAndShare from "../Customer/fb/LikeAndShare";
require("dotenv").config();

class DetaiTour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoTour: "",
      idmas: "",
      topTourArr: [],
      topTourArrA2: [],
      date: new Date(),
      member: 1,
      isOpenModalBooking: false,
      dataBooking: "",
    };
  }
  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      await this.props.getInfoTour(id);
      this.setState({
        idmas: id,
      });
    }
    this.props.getTopTourA1();
    this.props.getTopTourA2();
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailtour !== this.props.detailtour) {
      this.setState({
        infoTour: this.props.detailtour,
      });
    }
    let idmas = this.props.match && this.props.match.params && this.props.match.params.id;
    if (this.state.idmas !== idmas) {
      let id = idmas;
      await this.props.getInfoTour(id);
      this.setState({
        idmas: id,
      });
    }
    if (prevProps.topTourA1 !== this.props.topTourA1) {
      this.setState({
        topTourArr: this.props.topTourA1,
      });
    }
    if (prevProps.topTourA2 !== this.props.topTourA2) {
      this.setState({
        topTourArrA2: this.props.topTourA2,
      });
    }
  }

  handleInfoTour = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
    window.location.reload();
  };

  handleOnChangeMember = (event) => {
    this.setState({
      member: event.target.value,
    });
  };

  // laSoNguyenAm = (value) => {
  //   return Number.isInteger(value) && value < 0;
  // };

  handleBookTour = () => {
    const startdate = this.state.date;
    const today = new Date();
    let startDate = moment(startdate.toString()).format(dateFormat.SEND_TO_SERVER);
    let newDate = moment(today.toString()).format(dateFormat.SEND_TO_SERVER);
    let date = startDate.slice(0, 2) - newDate.slice(0, 2);
    let month = startDate.slice(3, 5) - newDate.slice(3, 5);
    if (month === 0) {
      if (date <= 7) {
        toast.error("Hãy chọn ngày khởi hành trước 7 ngày!");
      } else {
        this.setState({
          isOpenModalBooking: true,
          dataBooking: this.Booktour(),
        });
      }
    } else {
      this.setState({
        isOpenModalBooking: true,
        dataBooking: this.Booktour(),
      });
    }
  };

  Booktour = () => {
    let result = [];
    const startdate = this.state.date;
    let startDate = moment(startdate.toString()).format(dateFormat.SEND_TO_SERVER);
    let info = this.state.infoTour;
    const member = parseInt(this.state.member, 10);
    const price = parseInt(this.numberWithCommas(info.price), 10) * member;
    if (info) {
      let obj = {};
      obj.tourId = info.id;
      obj.imgTour = info.imgTourHTML;
      obj.tourName = info.name;
      obj.startAddress = info.startAddress;
      obj.startDate = startDate;
      obj.time = info.timeData.value;
      obj.amount = this.state.member;
      obj.price = this.numberWithCommass(price);
      result.push(obj);
    }
    return result;
  };

  numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join("");
  };

  numberWithCommass = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };
  closeModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let dataBooking = this.state.dataBooking;
    let topTourA1 = this.state.topTourArr;
    let topTourA2 = this.state.topTourArrA2;
    let info = this.state.infoTour;
    const { date } = this.state;
    let openModal = this.state.isOpenModalBooking;
    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://chat-bot-smile-travel.herokuapp.com/"
        : window.location.href;
    return (
      <>
        <HomeHeader />
        <div className="DetaiTour_container">
          <div className="DetaiTour_content">
            <div className="tour_name">{info.name}</div>
            <div className="title_tour">
              <div className="title_left">
                {info && info.infoTour && info.infoTour.motaHTML && (
                  <div dangerouslySetInnerHTML={{ __html: info.infoTour.motaHTML }}></div>
                )}
              </div>
              <div className="title_right">
                <div className="booktour">
                  <div className="booktour_info">
                    <div className="address">
                      <i className="fas fa-map-marker-alt"></i>
                      {info.startAddress}
                    </div>
                    <div className="matour">
                      <label>Mã tour:</label>
                      {info.id}
                    </div>
                    <div className="diemden">
                      Điểm đến:
                      {info && info.placeData && info.placeData.name && (
                        <div>{info.placeData.name}</div>
                      )}
                    </div>
                    <div className="startDate">
                      <label>Khởi hành: </label>
                      <DatePicker
                        onChange={(date) => {
                          this.setState({
                            date: date,
                          });
                        }}
                        value={date}
                        options={{
                          minDate: "today",
                          altFormat: "d/m/Y",
                          altInput: true,
                          locale: "vn",
                        }}
                      />
                    </div>
                    <div className="number">
                      <label>Số khách:</label>
                      <select
                        onChange={(event) => {
                          this.handleOnChangeMember(event);
                        }}
                        value={this.state.member}
                        className=" form-control"
                      >
                        <option value={1}>1 khách</option>
                        <option value={2}>2 khách</option>
                        <option value={3}>3 khách</option>
                        <option value={4}>4 khách</option>
                        <option value={5}>5 khách</option>
                        <option value={6}>6 khách</option>
                        <option value={7}>7 khách</option>
                        <option value={8}>8 khách</option>
                        <option value={9}>9 khách</option>
                        <option value={10}>10 khách</option>
                      </select>
                    </div>
                  </div>
                  <div className="price">
                    <label>Giá trọn gói: </label>
                    <div className="price_tour">{info.price} đ</div>
                  </div>
                  <div className="booking" onClick={() => this.handleBookTour()}>
                    đặt tour này
                  </div>
                  <div className="suppor">
                    <label>Tư vấn tour: 0899906599</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="fb">
              <div className="like-share">
                <LikeAndShare dataHref={currentURL} />
              </div>
            </div>
            <div className="detail_tour">
              <div className="img_tour">
                {info && info.infoTour && info.infoTour.anhHTML && (
                  <div dangerouslySetInnerHTML={{ __html: info.infoTour.anhHTML }}></div>
                )}
              </div>
              <div className="info_tour">
                {info && info.infoTour && info.infoTour.thongtinHTML && (
                  <div dangerouslySetInnerHTML={{ __html: info.infoTour.thongtinHTML }}></div>
                )}
              </div>
            </div>
            <div className="customer_tour">
              {info && info.infoTour && info.infoTour.dieuleHTML && (
                <div dangerouslySetInnerHTML={{ __html: info.infoTour.dieuleHTML }}></div>
              )}
            </div>
          </div>
          <div className="cmt">
            <Commentt dataHref={currentURL} width={"100%"} />
          </div>
          {info.addressId === "A1" ? (
            <div className="interested_Tour">
              <div className="interested_title text-center my-3">
                <b>CÓ THỂ BẠN QUAN TÂM</b>
              </div>
              {topTourA1 &&
                topTourA1.length > 0 &&
                topTourA1.map((item, index) => {
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
            <div className="interested_Tour">
              <div className="interested_title text-center my-3">
                <b>CÓ THỂ BẠN QUAN TÂM</b>
              </div>
              {topTourA2 &&
                topTourA2.length > 0 &&
                topTourA2.map((item, index) => {
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
          )}

          <Booktour
            isOpenModal={openModal}
            isCloseModal={this.closeModal}
            infoBooktour={dataBooking}
          />
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    detailtour: state.admin.infotour,
    topTourA1: state.admin.topTourA1,
    topTourA2: state.admin.topTourA2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getInfoTour: (id) => dispatch(actions.getInfoTour(id)),
    getTopTourA1: (limit) => dispatch(actions.getTopTourA1(limit)),
    getTopTourA2: (limit) => dispatch(actions.getTopTourA2(limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetaiTour);
