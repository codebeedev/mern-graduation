import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import "./TourManage.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TourManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tour: [],
      timeTour: [],
      placeArr: [],

      imgTourHTML: "",
      imgTourMark: "",

      selectedOption: "",
      placeId: "",
      addressId: "",
      timeId: "",
      name: "",
      startDate: "Hằng ngày",
      startAddress: "Hồ Chí Minh",
      price: "",
      id: "",

      a: 0,
    };
  }

  //load
  async componentDidMount() {
    this.props.getAllTourA1();
    this.props.getTimeTour();
    this.props.getPlace();
  }

  //cập nhật biến vào redux
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.timeRedux !== this.props.timeRedux) {
      let arrTime = this.props.timeRedux;
      this.setState({
        timeTour: arrTime,
        timeId: arrTime && arrTime.length > 0 ? arrTime[0].keyMap : "",
      });
    }

    if (prevProps.tourRedux !== this.props.tourRedux) {
      this.setState({
        tour: this.props.tourRedux,
      });
    }

    if (prevProps.placeRedux !== this.props.placeRedux) {
      this.setState({
        placeArr: this.buildInputSelect(this.props.placeRedux),
      });
    }
  }

  // onChang cho input
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  numberWithCommas = (x) => {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
  };
  // onChang cho selectOption địa điểm
  handleChange = async (selectedOption) => {
    await this.setState({ selectedOption });
    console.log(this.state.selectedOption);
  };

  //biến state selectOption địa điểm
  buildInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item.id;
        obj.domain = item.domainId;
        result.push(obj);
      });
    }
    return result;
  };

  //kiểm tra biến state
  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["name", "startAddress", "startDate", "selectedOption", "price"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.info("Hãy nhập đầy đủ thông tin của chuyến đi !");
        break;
      }
    }
    return isValid;
  };

  //lưu tour khi tạo mới
  handleCreateTour = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;

    this.props.createTour({
      imgTourHTML: this.state.imgTourHTML,
      imgTourMark: this.state.imgTourMark,
      name: this.state.name,
      startAddress: this.state.startAddress,
      startDate: this.state.startDate,
      price: this.numberWithCommas(this.state.price),
      timeId: this.state.timeId,
      addressId: "A1",
      placeId: this.state.selectedOption.value,
      domainId: this.state.selectedOption.domain,
    });
    this.setState({
      imgTourHTML: "",
      imgTourMark: "",
      id: "",
      name: "",
      startAddress: "Hồ Chí Minh",
      startDate: "Hằng ngày",
      price: "",
      timeId: "",
      selectedOption: "",
      addressId: "A1",
      placeId: "",
      domainId: "",
    });
  };

  // ấn vào nút sửa
  handleEditUser = async (item) => {
    let label = item.placeData.name;
    let value = item.placeData.id;
    let domain = item.placeData.domainId;
    let selectopt = { label, value, domain };
    await this.setState({
      imgTourHTML: item.imgTourHTML,
      imgTourMark: item.imgTourMark,
      id: item.id,
      name: item.name,
      startAddress: item.startAddress,
      startDate: item.startDate,
      selectedOption: selectopt,
      price: item.price,
      timeId: item.timeId,
      a: 1,
    });
  };

  //lưu tour
  handleSaveTour = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;
    this.props.updateTour({
      imgTourHTML: this.state.imgTourHTML,
      imgTourMark: this.state.imgTourMark,
      id: this.state.id,
      name: this.state.name,
      startAddress: this.state.startAddress,
      startDate: this.state.startDate,
      price: this.numberWithCommas(this.state.price),
      timeId: this.state.timeId,
      addressId: "A1",
      placeId: this.state.selectedOption.value,
      domainId: this.state.selectedOption.domain,
    });
    this.setState({
      imgTourHTML: "",
      imgTourMark: "",
      id: "",
      name: "",
      startAddress: "Hồ Chí Minh",
      startDate: "Hằng ngày",
      price: "",
      timeId: "",
      selectedOption: "",
      addressId: "A1",
      placeId: "",
      domainId: "",
      a: 0,
    });
  };

  // xoá tour
  handleDeleteUser = (item) => {
    console.log(item);
    this.props.deleteTour(item.id);
  };

  handleImgTour = ({ html, text }) => {
    this.setState({
      imgTourHTML: html,
      imgTourMark: text,
    });
  };

  render() {
    let place = this.state.placeArr;
    let alltour = this.state.tour;
    let timeTour = this.state.timeTour;
    let { timeId, name, startAddress, startDate, price } = this.state;
    return (
      <div className="container tour-container">
        <div className="tour-content">
          <div className="row tour-info">
            <div className="text-center mt-5 title-tours">Quản lý chuyến tham quan trong nước</div>
            <div className="col-12">
              <div className="col-8 mt-4">
                <label className="my-2"> Ảnh Tour:</label>
                <MdEditor
                  style={{ height: "350px" }}
                  renderHTML={(text) => mdParser.render(text)}
                  onChange={this.handleImgTour}
                  value={this.state.imgTourMark}
                />
              </div>
            </div>

            <div className="col-4 mt-5">
              <label>Tên chuyến đi:</label>
              <input
                type="text"
                className="form-control mt-2"
                value={name}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "name");
                }}
              />
            </div>

            <div className="col-2 mt-5">
              <label>Địa điểm khởi hành:</label>
              <input
                type="text"
                className="form-control mt-2"
                value={startAddress}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "startAddress");
                }}
              />
            </div>

            <div className="col-2 mt-5">
              <label>Ngày khởi hành:</label>
              <input
                type="text"
                className="form-control mt-2"
                value={startDate}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "startDate");
                }}
              />
            </div>

            <div className="col-2 mt-5">
              <label>Thời gian:</label>
              <select
                className="form-control mt-2"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "timeId");
                }}
                value={timeId}
              >
                {timeTour &&
                  timeTour.length > 0 &&
                  timeTour.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>

            <div className="col-2 mt-5">
              Giá:
              <input
                type="text"
                className="form-control mt-2"
                value={price}
                onChange={(event) => {
                  this.handleOnChangeInput(event, "price");
                }}
              />
            </div>

            <div className="col-3 mt-3">
              <label>Địa điểm du lịch:</label>
              <Select
                className="mt-2"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={place}
              />
            </div>
          </div>

          <button
            className="btn btn-info mt-3"
            onClick={() => {
              this.handleCreateTour();
            }}
            hidden={this.state.a !== 0}
          >
            Lưu chuyến đi
          </button>

          <button
            className="btn btn-primary mt-3"
            onClick={() => {
              this.handleSaveTour();
            }}
            hidden={this.state.a !== 1}
          >
            Lưu chuyến đi
          </button>
        </div>

        <div className="tour-table mt-4">
          <table id="customers" className="mt-4 mb-4">
            <tr>
              <th>Tên chuyến đi</th>
              <th>Khởi hành</th>
              <th>Thời gian</th>
              <th>Địa điểm tham quan</th>
              <th>Giá chuyến đi</th>
              <th>Hành động</th>
            </tr>
            {alltour &&
              alltour.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.startDate}</td>
                    <td value={item.timeData.keyMap}>{item.timeData.value}</td>
                    <td value={item.placeData.id}>{item.placeData.name}</td>
                    <td>{item.price}</td>
                    <td>
                      <button className="btn-Edit" onClick={() => this.handleEditUser(item)}>
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="btn-Delete" onClick={() => this.handleDeleteUser(item)}>
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tourRedux: state.admin.toursA1,
    timeRedux: state.admin.times,
    placeRedux: state.admin.places,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTimeTour: () => dispatch(actions.getTimeTour()),
    getAllTourA1: () => dispatch(actions.getTourA1()),
    getPlace: () => dispatch(actions.getPlace()),
    createTour: (data) => dispatch(actions.createTour(data)),
    updateTour: (data) => dispatch(actions.updateTour(data)),
    deleteTour: (id) => dispatch(actions.deleteTour(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourManage);
