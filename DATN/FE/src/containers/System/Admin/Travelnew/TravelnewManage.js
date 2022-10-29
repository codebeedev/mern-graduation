import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import "./TravelnewManage.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import {
  getTravelnewService,
  editTravelnewService,
  deleteTravelnewService,
} from "../../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class TravelnewManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelnewArr: [],
      selectedOption: "",
      name: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      hide: 1,
    };
  }

  //load
  componentDidMount() {
    this.props.getTravelnew("ALL");
  }

  //cập nhật biến vào redux
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.travelnew !== this.props.travelnew) {
      let arrTour = this.buildInputSelect(this.props.travelnew);
      this.setState({
        travelnewArr: arrTour,
      });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    let res = await getTravelnewService(selectedOption.value);
    let tour = res.data;
    console.log(tour);
    if (tour) {
      this.setState({
        id: tour.id,
        name: tour.name,
        motaHTML: tour.motaHTML,
        motaMark: tour.motaMark,
        anhHTML: tour.anhHTML,
        anhMark: tour.anhMark,
        thongtinHTML: tour.thongtinHTML,
        thongtinMark: tour.thongtinMark,
        hide: 2,
      });
    } else {
      this.setState({
        name: "",
        motaHTML: "",
        motaMark: "",
        anhHTML: "",
        anhMark: "",
        thongtinHTML: "",
        thongtinMark: "",
        hide: 2,
      });
    }
  };

  buildInputSelect = (inputData) => {
    let result = [];

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        obj.label = item.name;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };

  handlemota = ({ html, text }) => {
    this.setState({
      motaMark: text,
      motaHTML: html,
    });
  };

  handleanh = ({ html, text }) => {
    this.setState({
      anhMark: text,
      anhHTML: html,
    });
  };
  handlethongtin = ({ html, text }) => {
    this.setState({
      thongtinMark: text,
      thongtinHTML: html,
    });
  };
  handleOnChangeInput = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  save = async () => {
    this.props.createTravelnew({
      name: this.state.name,
      motaHTML: this.state.motaHTML,
      motaMark: this.state.motaMark,
      anhHTML: this.state.anhHTML,
      anhMark: this.state.anhMark,
      thongtinHTML: this.state.thongtinHTML,
      thongtinMark: this.state.thongtinMark,
    });
    this.setState({
      name: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      hide: 1,
    });
    window.location.reload();
  };
  update = async () => {
    await editTravelnewService({
      id: this.state.id,
      name: this.state.name,
      motaHTML: this.state.motaHTML,
      motaMark: this.state.motaMark,
      anhHTML: this.state.anhHTML,
      anhMark: this.state.anhMark,
      thongtinHTML: this.state.thongtinHTML,
      thongtinMark: this.state.thongtinMark,
    });
    toast.success("Lưu thành công");
    this.setState({
      name: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      hide: 1,
    });
  };
  new = () => {
    this.setState({
      name: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      hide: 1,
    });
  };
  deletec = async () => {
    await deleteTravelnewService({
      id: this.state.id,
    });
    toast.success("Xóa thành công");
    this.setState({
      name: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      hide: 1,
    });
    window.location.reload();
  };
  render() {
    return (
      <div className="container">
        <div className="title-info-tour mt-5 text-center ">QUẢN LÝ BÀI ĐĂNG</div>
        <div className="row my-5">
          <div className="col-6 mt-5">
            <label> Hình ảnh chuyến đi:</label>
            <MdEditor
              className="mt-2"
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleanh}
              value={this.state.anhMark}
            />
          </div>
          <div className="col-6 mt-5">
            <div className="col-12">
              <label>Chọn bài đăng để xem thông tin:</label>
              <Select
                className="col-12 mt-2"
                value={this.state.selectedOption}
                onChange={this.handleChange}
                options={this.state.travelnewArr}
              />
              <label className="mt-3">Tiêu đề bài đăng:</label>
              <input
                type="phoneNumber"
                className="form-control mt-2"
                value={this.state.name}
                onChange={(event) => {
                  this.handleOnChangeInput(event);
                }}
              />
              <div className="col-12 mt-3">
                <button
                  className="btn btn-primary mx-2"
                  onClick={() => {
                    this.new();
                  }}
                  hidden={this.state.hide !== 2}
                >
                  Bài đăng mới
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.save();
                  }}
                  hidden={this.state.hide !== 1}
                >
                  Lưu bài đăng
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    this.update();
                  }}
                  hidden={this.state.hide !== 2}
                >
                  Lưu bài đăng
                </button>

                <button className="btn btn-primary mx-2" onClick={() => this.deletec()}>
                  Xóa bài
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4">
            <label> Phụ đề chuyến đi:</label>
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handlemota}
              value={this.state.motaMark}
            />
          </div>

          <div className="col-12 mt-4">
            <label> Thông tin chi tiết chuyến đi:</label>
            <MdEditor
              style={{ height: "600px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handlethongtin}
              value={this.state.thongtinMark}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    travelnew: state.admin.travelnew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTravelnew: (id) => dispatch(actions.getTravelnew(id)),
    createTravelnew: (data) => dispatch(actions.createTravelnew(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TravelnewManage);
