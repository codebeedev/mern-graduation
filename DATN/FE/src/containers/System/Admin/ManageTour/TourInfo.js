import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import "./Tourinfo.scss";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class TourInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourArr: [],
      selectedOption: "",
      motaHTML: "",
      motaMark: "",
      anhHTML: "",
      anhMark: "",
      thongtinHTML: "",
      thongtinMark: "",
      dieuleHTML: "",
      dieuleMark: "",
    };
  }

  //load
  async componentDidMount() {
    this.props.getTourAll();
  }

  //cập nhật biến vào redux
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.tourRedux !== this.props.tourRedux) {
      let arrTour = this.buildInputSelect(this.props.tourRedux);
      this.setState({
        tourArr: arrTour,
      });
    }
  }

  handleChange = async (selectedOption) => {
    this.setState({ selectedOption });

    await this.props.getInfoTour(selectedOption.value);
    let tour = this.props.detailtour;
    if (tour && tour.infoTour) {
      this.setState({
        motaHTML: tour.infoTour.motaHTML,
        motaMark: tour.infoTour.motaMark,
        anhHTML: tour.infoTour.anhHTML,
        anhMark: tour.infoTour.anhMark,
        thongtinHTML: tour.infoTour.thongtinHTML,
        thongtinMark: tour.infoTour.thongtinMark,
        dieuleHTML: tour.infoTour.dieuleHTML,
        dieuleMark: tour.infoTour.dieuleMark,
      });
    } else {
      this.setState({
        motaHTML: "",
        motaMark: "",
        anhHTML: "",
        anhMark: "",
        thongtinHTML: "",
        thongtinMark: "",
        dieuleHTML: "",
        dieuleMark: "",
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
  handledieule = ({ html, text }) => {
    this.setState({
      dieuleMark: text,
      dieuleHTML: html,
    });
  };

  handleSaveInfoTour = () => {
    this.props.SaveInfotour({
      motaHTML: this.state.motaHTML,
      motaMark: this.state.motaMark,

      anhHTML: this.state.anhHTML,
      anhMark: this.state.anhMark,

      thongtinHTML: this.state.thongtinHTML,
      thongtinMark: this.state.thongtinMark,

      dieuleHTML: this.state.dieuleHTML,
      dieuleMark: this.state.dieuleMark,

      tourId: this.state.selectedOption.value,
    });
  };
  render() {
    return (
      <div className="container">
        <div className="title-info-tour mt-5 text-center ">Thông tin Chuyến đi</div>
        <div className="row my-5">
          <div className="col-5">
            <label>Chọn chuyến tham quan:</label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.tourArr}
            />
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
            <label> Hình ảnh chuyến đi:</label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleanh}
              value={this.state.anhMark}
            />
          </div>

          <div className="col-12 mt-4">
            <label> Thông tin chi tiết chuyến đi:</label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handlethongtin}
              value={this.state.thongtinMark}
            />
          </div>

          <div className="col-12 mt-4">
            <label>Thông tin đến khách du lịch:</label>
            <MdEditor
              style={{ height: "500px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handledieule}
              value={this.state.dieuleMark}
            />
          </div>
          <div className="col-3 mt-3">
            <button className="btn btn-primary" onClick={() => this.handleSaveInfoTour()}>
              Lưu thông tin chuyến đi
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tourRedux: state.admin.alltour,
    detailtour: state.admin.infotour,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourAll: () => dispatch(actions.getTourAll()),
    SaveInfotour: (data) => dispatch(actions.SaveInfotour(data)),
    getInfoTour: (id) => dispatch(actions.getInfoTour(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TourInfo);
