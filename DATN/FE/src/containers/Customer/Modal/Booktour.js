import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./Booktour.scss";
import { toast } from "react-toastify";

import { Modal } from "reactstrap";

class Booktour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radio: 1,
      name: "",
      email: "",
      address: "",
      phonenumber: "",
      gender: "Nam",
      pay: "PAY1",
      genderArr: "",
    };
  }
  async componentDidMount() {
    this.props.getGenderStart();
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.gender !== this.props.gender) {
      let arrgender = this.props.gender;
      this.setState({
        genderArr: arrgender,
      });
    }
  }

  tienmatClick = () => {
    this.setState({
      radio: 1,
      pay: "PAY1",
    });
  };

  chuyenkhoangClick = () => {
    this.setState({
      radio: 2,
      pay: "PAY2",
    });
  };

  IsInvalidEmail = (the_email) => {
    var at = the_email.indexOf("@");
    var dot = the_email.lastIndexOf(".");
    var space = the_email.indexOf(" ");
    if (
      at !== -1 && //có ký tự @
      at !== 0 && //ký tự @ không nằm ở vị trí đầu
      dot !== -1 && //có ký tự .
      dot > at + 1 &&
      dot < the_email.length - 1 && //phải có ký tự nằm giữa @ và . cuối cùng
      space === -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  is_phonenumber = (phonenumber) => {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (phonenumber.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  };

  handelBooktour = () => {
    if (this.state.name === "" || this.state.email === "" || this.state.phonenumber === "") {
      toast.info("Hãy nhập đầy đủ thông tin!");
      return;
    }
    let checkEmail = this.IsInvalidEmail(this.state.email);
    let checkPhone = this.is_phonenumber(this.state.phonenumber);
    if (checkEmail === false) {
      toast.info("Email không đúng định dạng");
      return;
    }
    if (checkPhone === false) {
      toast.info("Số điện thoại không đúng định dạng");
      return;
    }
    let { infoBooktour } = this.props;
    let infotour = infoBooktour[0];
    this.props.booktour({
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      phonenumber: this.state.phonenumber,
      gender: this.state.gender,
      pay: this.state.pay,
      tourId: infotour.tourId,
      tourName: infotour.tourName,
      startdate: infotour.startDate,
      amount: infotour.amount,
      price: infotour.price,
    });
    this.props.isCloseModal();
    this.props.getGenderStart();
  };

  handleOnChangInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  render() {
    let { isOpenModal, isCloseModal, infoBooktour } = this.props;
    let { genderArr, gender } = this.state;

    return (
      <Modal isOpen={isOpenModal} className={"booking_container"} size="xl" centered>
        <div className="booking_content">
          <div className="booking_header">
            <div className="title_booking">Đặt tour</div>
            <div className="closeModal" onClick={isCloseModal}>
              <i className="fas fa-times"></i>
            </div>
          </div>
          <div className="booking_body">
            <div className="booking_left container">
              <div className="radio row">
                <label className="radio_thanhtoan">Thanh Toán</label>
                <label>Chọn hình thức thanh toán</label>
                <div className="item_radio col-4 mt-3">
                  <div
                    className={this.state.radio === 1 ? "tienmat active col-2" : "tienmat col-2"}
                    onClick={() => this.tienmatClick()}
                  >
                    <div>Tiền mặt</div>
                  </div>
                  <div
                    className={
                      this.state.radio === 2 ? "chuyenkhoan active col-2" : "chuyenkhoan col-2"
                    }
                    onClick={() => this.chuyenkhoangClick()}
                  >
                    <div>Chuyển Khoản</div>
                  </div>
                </div>
                <div className="item_radio-info">
                  <div className="infotienmat col-12" hidden={this.state.radio !== 1}>
                    <span>
                      Qúy khách vui lòng thanh toán tại 150 Lê Văn việt, phường Tăng Nhơn Phú A, Tp.
                      Thủ Đức, Tp. Hồ Chí Minh. Ngoài ra Qúy khách có thể thanh toán bằng hình thức
                      chuyển khoản.
                    </span>
                  </div>
                  <div className="infochuyenkhoan col-12" hidden={this.state.radio !== 2}>
                    <span>PHƯƠNG THỨC THANH TOÁN CHUYỂN KHOẢN:</span>
                    <br />
                    <span>
                      <b>Chủ tài khoản:</b> BIEN THANH PHONG
                    </span>
                    <br />
                    <span>
                      <b>Ngân hàng:</b> TMCP Công Thương Việt Nam – Chi nhánh Thủ Đức
                    </span>
                    <br />
                    <span>
                      <b>Số tài khoản:</b> 1000868832585
                    </span>
                  </div>
                </div>
              </div>
              <div className="info_member row pt-2">
                <label className="title_info">Thông tin liên hệ</label>
                <div className="col-5 mt-2">
                  <label>Họ và tên:</label>
                  <input
                    type="text"
                    className="form-control  mt-2"
                    value={this.state.name}
                    onChange={(event) => this.handleOnChangInput(event, "name")}
                  />
                </div>
                <div className="col-4 mt-2">
                  <label>Số điện thoại:</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={this.state.phonenumber}
                    onChange={(event) => this.handleOnChangInput(event, "phonenumber")}
                  />
                </div>
                <div className="col-3 mt-2">
                  <label>Giới tính:</label>
                  <select
                    className="form-control mt-2"
                    onChange={(event) => {
                      this.handleOnChangInput(event, "gender");
                    }}
                    value={gender}
                  >
                    {genderArr &&
                      genderArr.length > 0 &&
                      genderArr.map((item, index) => {
                        return (
                          <option key={index} value={item.keyMap}>
                            {item.value}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-6 mt-2">
                  <label>Email:</label>
                  <input
                    type="text"
                    className="form-control mt-2"
                    value={this.state.email}
                    onChange={(event) => this.handleOnChangInput(event, "email")}
                  />
                </div>

                <div className="col-6 mt-2">
                  <label>Địa chỉ:</label>
                  <input
                    type="address"
                    className="form-control mt-2"
                    value={this.state.address}
                    onChange={(event) => this.handleOnChangInput(event, "address")}
                  />
                </div>
              </div>
            </div>
            {infoBooktour &&
              infoBooktour.length > 0 &&
              infoBooktour.map((item, index) => {
                return (
                  <div className="booking_right">
                    <div className="booktour_content">
                      <div className="imgTour">
                        <div dangerouslySetInnerHTML={{ __html: item.imgTour }}></div>
                      </div>
                      <div className="tourName">
                        <div className="tourId">{item.tourId}</div>
                        <div className="name">{item.tourName}</div>
                      </div>
                      <div className="startAddress">
                        <i className="fas fa-map-marker-alt"></i> KH: {item.startAddress}
                      </div>
                      <div className="startDate">
                        <i className="fas fa-calendar-alt"></i> {item.startDate}
                      </div>
                      <div className="timeTour">
                        <i className="fas fa-clock"></i> {item.time}
                      </div>
                      <div className="amount">
                        {" "}
                        <i className="fas fa-user"></i> Số khách: {item.amount}
                      </div>
                      <div className="price">Tổng: {item.price} đ</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="support">
            <span>
              Sau khi hoàn tất đơn hàng, nhân viên hỗ trợ sẽ liên hệ với quý khách để xác nhận tình
              trạng tour. Mọi thắc mắc, xin Quý khách vui lòng liên hệ 0899906599.
            </span>
          </div>
          <div className="booking_footer">
            <button className="btn btn-info" onClick={() => this.handelBooktour()}>
              hoàn tất đặt tour
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    gender: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    booktour: (data) => dispatch(actions.booktour(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booktour);
