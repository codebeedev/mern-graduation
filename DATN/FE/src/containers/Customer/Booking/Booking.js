import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HeaderPage/HomeHeader";
import { bookingService } from "../../../services/userService";
import Footer from "../../HomePage/Footer/Footer";
import "./Booking.scss";
class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      infobooking: "",
      errCode: "",
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let id = urlParams.get("id");
      let res = await bookingService({
        token: token,
        id: id,
      });
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
      this.props.infoBookingTour(id);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.infobooking !== this.props.infobooking) {
      this.setState({
        infobooking: this.props.infobooking,
      });
    }
  }

  render() {
    let { statusVerify, errCode } = this.state;
    let booking = this.state.infobooking;
    return (
      <>
        <HomeHeader />
        {statusVerify === false ? (
          <div>Loading data...</div>
        ) : (
          <div>
            {+errCode === 0 ? (
              <div className="infoBooking_container">
                <div className="infBooking_content">
                  {booking && booking.tourData && booking.tourData.name && (
                    <>
                      <div className="ten">{booking.tourData.name}</div>
                      <div className="chitiet">
                        <label>Xác nhận đặt tour</label>
                        <div className="item">
                          <div className="title1">Mã tour</div>
                          <div className="title2">: {booking.tourId}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Tên tour</div>
                          <div className="title2">: {booking.tourData.name}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Thời gian</div>
                          <div className="title2">: {booking.tourData.timeData.value}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Điểm khởi hành:</div>
                          <div className="title2">: {booking.tourData.startAddress}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Điểm đến</div>
                          <div className="title2">: {booking.tourData.placeData.name}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Giá tour</div>
                          <div className="title2">: {booking.tourData.price} đ</div>
                        </div>
                      </div>
                      <div className="chitiet">
                        <label>Chi tiết đặt tour</label>
                        <div className="item">
                          <div className="title1">Mã booking</div>
                          <div className="title2">: {booking.id}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Ngày khởi hành</div>
                          <div className="title2">: {booking.startdate}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Tổng số khách</div>
                          <div className="title2">: {booking.amount}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Tổng tiền</div>
                          <div className="title2">: {booking.price} đ</div>
                        </div>
                        <div className="item">
                          <div className="title1">Hình thức thanh toán</div>
                          <div className="title2">: {booking.payData.value}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Trạng thái</div>
                          <div className="title2">: {booking.statusData.value}</div>
                        </div>
                      </div>
                      <div className="chitiet">
                        <label>Thông tin liên lạc</label>
                        <div className="item">
                          <div className="title1">Họ và tên</div>
                          <div className="title2">: {booking.customerData.name}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Email</div>
                          <div className="title2">: {booking.customerData.email}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Số điện thoại</div>
                          <div className="title2">: {booking.customerData.phoneNumber}</div>
                        </div>
                        <div className="item">
                          <div className="title1">Địa chỉ</div>
                          <div className="title2">: {booking.customerData.address}</div>
                        </div>
                      </div>
                      <p className="chucmung">----- Chúc mừng bạn đã đặt tour thành công -----</p>
                      <p>
                        Nhân viên hỗ trợ của chúng tôi sẽ sớm liên lạc với quý khách để xác nhận đặt
                        tour, cám ơn quý khách đã sử dụng dịch vụ của chúng tôi !
                      </p>
                      <p>Chúc quý khách có chuyến du lịch thật vui vẻ !</p>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className=" ktt text-center">Tour không tồn tại hoạt đã được xác nhận</div>
            )}
          </div>
        )}
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    infobooking: state.admin.infoBooking,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    infoBookingTour: (id) => dispatch(actions.infoBookingTour(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
