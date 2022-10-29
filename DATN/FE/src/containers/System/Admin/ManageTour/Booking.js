import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./Booking.scss";
import Select from "react-select";
import { editbooking, deleteBookingService } from "../../../../services/userService";

class Booking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infobooking: "",
      genderArr: [],
      selectArr: "",
      dem: 1,

      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      gender: "Nam",
      tourName: "",
      amount: 1,
      price: "",
      pay: "",
      date: "",
      status: "Tất Cả",
      selectedOption: "",
      customerId: "",
      id: "",
    };
  }

  async componentDidMount() {
    this.props.infoBookingTour("ALL");
    this.props.getGenderStart();
    this.props.infoBookingTour2("ALL");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.infobooking !== this.props.infobooking) {
      this.setState({
        infobooking: this.props.infobooking,
      });
    }
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
      });
    }
    if (prevProps.infobooking2 !== this.props.infobooking2) {
      let arrTour = this.buildInputSelect(this.props.infobooking2);
      this.setState({
        selectArr: arrTour,
      });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });
    this.setState({
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      gender: "Nam",
      tourName: "",
      amount: "! khách",
      price: "",
      pay: "",
      date: "",
      status: "Tất Cả",
    });
    await this.props.infoBookingTour(selectedOption.value);
    this.setState({
      dem: 2,
    });
  };

  buildInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        obj.label = item.customerData.name;
        obj.value = item.customerId;
        result.push(obj);
      });
    }
    return result;
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEdit = (item) => {
    let obj = {};
    obj.label = item.customerData.name;
    obj.value = item.customerId;
    this.setState({
      customerId: item.customerId,
      id: item.id,
      name: item.customerData.name,
      email: item.customerData.email,
      address: item.customerData.address,
      phoneNumber: item.customerData.phoneNumber,
      gender: item.customerData.gender,
      tourName: item.tourData.name,
      amount: item.amount,
      price: item.price,
      pay: item.pay,
      date: item.startdate,
      status: item.statusId,
      selectedOption: obj,
    });
  };

  save = async () => {
    this.props.updateUser({
      id: this.state.customerId,
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
    });
    await editbooking({
      id: this.state.id,
      amount: this.state.amount,
      price: this.state.price,
      pay: this.state.pay,
      date: this.state.date,
    });
    this.props.infoBookingTour("ALL");
    this.setState({
      name: "",
      email: "",
      address: "",
      phoneNumber: "",
      gender: "Nam",
      tourName: "",
      amount: 1,
      price: "",
      pay: "",
      date: "",
      status: "Tất Cả",
    });
  };

  handleEditBooking = async (item) => {
    await editbooking({
      id: item.id,

      statusId: "S3",
    });
    this.props.infoBookingTour("ALL");
  };
  handleDeleteBooking = async (item) => {
    await editbooking({
      id: item.id,
      statusId: "S4",
    });
    this.props.infoBookingTour("ALL");
  };
  handleDeleteBk = async (item) => {
    await deleteBookingService({
      id: item.id,
    });
    this.props.infoBookingTour("ALL");
  };
  render() {
    let infobooking = this.state.infobooking;
    let genders = this.state.genderArr;

    return (
      <React.Fragment>
        <div className="container">
          <div className="title text-center my-3">Quản lý đặt tour</div>
          <div className="info_container">
            <div className="info_content row ">
              <div className="col-3 mt-2">
                <label>Họ và tên:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
              </div>
              <div className="col-3 mt-2">
                <label>Email:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-3 mt-2">
                <label>Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-2 mt-2">
                <label>Số điện thoại:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-1 mt-2">
                <label>Giới tính:</label>
                <select
                  className="form-control mt-2"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={this.state.gender}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mt-2">
                <label>Tên chuyến đi:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.tourName}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "tourName");
                  }}
                />
              </div>
              <div className="col-1 mt-2">
                <label>Số khách:</label>
                <select
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "amount");
                  }}
                  value={this.state.amount}
                  className=" form-control mt-2"
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
              <div className="col-2 mt-2">
                <label>Tổng tiền:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.price}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "price");
                  }}
                />
              </div>
              <div className="col-2 mt-2">
                <label>Thanh toán:</label>
                <select
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "pay");
                  }}
                  value={this.state.pay}
                  className=" form-control mt-2"
                >
                  <option value={"PAY1"}>Tiền mặt</option>
                  <option value={"PAY2"}>chuyển khoản</option>
                </select>
              </div>
              <div className="col-2 mt-2">
                <label>Ngày khởi hành:</label>
                <input
                  type="text"
                  className="form-control mt-2"
                  value={this.state.date}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "date");
                  }}
                />
              </div>
              <div className="col-1 mt-2">
                <label>Trạng thái:</label>
                <select
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "status");
                  }}
                  value={this.state.status}
                  className=" form-control mt-2"
                >
                  <option value={"ALL"}>Tất cả</option>
                  <option value={"S1"}>Đang chờ</option>
                  <option value={"S2"}>Chờ duyệt</option>
                  <option value={"S3"}>Đã duyệt</option>
                  <option value={"S4"}>Đã hủy</option>
                  <option value={"S5"}>Đã xong</option>
                </select>
              </div>
              <div className="col-3 mt-2">
                <label>Chọn hành khách:</label>
                <Select
                  className="mt-2"
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.selectArr}
                />
              </div>
            </div>
          </div>
          <div className="btn btn-info mt-2" onClick={() => this.save()}>
            Lưu
          </div>
          {infobooking && infobooking.length ? (
            <table id="customers" className="mt-4 mb-4">
              <tr>
                <th>Họ và tên</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Tên chuyến đi</th>
                <th>Số khách</th>
                <th>Tổng tiền</th>
                <th>Ngày đi</th>
                <th>Thanh toán</th>
                <th>Trạng thái</th>
                <th>Hành động </th>
              </tr>
              {infobooking &&
                infobooking.length > 0 &&
                infobooking.map((item, index) => {
                  return (
                    <tr key={index} onClick={() => this.handleEdit(item)}>
                      <td>{item.customerData.name}</td>
                      <td>{item.customerData.genderData.value}</td>
                      <td>{item.customerData.phoneNumber}</td>
                      <td>{item.tourData.name}</td>
                      <td>{item.amount}</td>
                      <td>{item.price}</td>
                      <td>{item.startdate}</td>
                      <td>{item.payData.value}</td>
                      <td>{item.statusData.value}</td>

                      <td>
                        {item.statusId === "S2" ? (
                          <button className="duyet" onClick={() => this.handleEditBooking(item)}>
                            Duyệt
                          </button>
                        ) : item.statusId === "S3" ? (
                          <button className="duyet" onClick={() => this.handleDeleteBooking(item)}>
                            Hủy
                          </button>
                        ) : item.statusId === "S4" ? (
                          <button className="duyet" onClick={() => this.handleDeleteBk(item)}>
                            Xóa
                          </button>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  );
                })}
            </table>
          ) : (
            // <table id="customers" className="mt-4 mb-4">
            //   <tr>
            //     <th>Họ và tên</th>
            //     <th>Giới tính</th>
            //     <th>Số điện thoại</th>
            //     <th>Tên chuyến đi</th>
            //     <th>Số khách</th>
            //     <th>Tổng tiền</th>
            //     <th>Ngày đi</th>
            //     <th>Thanh toán</th>
            //     <th>Trạng thái</th>
            //     <th>Hành động </th>
            //   </tr>
            //   <tr onClick={() => this.handleEdit(infobooking)}>
            //     <td>{infobooking.customerData.name}</td>
            //     <td>{infobooking.customerData.genderData.value}</td>
            //     <td>{infobooking.customerData.phoneNumber}</td>
            //     <td>{infobooking.tourData.name}</td>
            //     <td>{infobooking.amount}</td>
            //     <td>{infobooking.price}</td>
            //     <td>{infobooking.startdate}</td>
            //     <td>{infobooking.payData.value}</td>
            //     <td>{infobooking.statusData.value}</td>
            //     <td>
            //       <button className="duyet" onClick={() => this.handleEditBooking(infobooking)}>
            //         Duyệt
            //       </button>

            //       <button className="btn-Delete" onClick={() => this.handleDeleteUser(infobooking)}>
            //         <i className="fas fa-trash-alt"></i>
            //       </button>
            //     </td>
            //   </tr>
            // </table>
            ""
          )}
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    infobooking: state.admin.infoBooking,
    infobooking2: state.admin.infoBooking2,
    genderRedux: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    infoBookingTour: (id) => dispatch(actions.infoBookingTour(id)),
    infoBookingTour2: (id) => dispatch(actions.infoBookingTour2(id)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    updateUser: (data) => dispatch(actions.updateUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
