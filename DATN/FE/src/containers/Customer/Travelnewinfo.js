import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import "./Travelnewinfo.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../HomePage/Footer/Footer";
import * as actions from "../../store/actions";
import Commentt from "../Customer/fb/Comment";
import LikeAndShare from "../Customer/fb/LikeAndShare";

class Travelnewsinfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelnew: "",
      toptravelnew: "",
      idmas: "",
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      await this.props.getTravelnew(id);
      this.setState({
        idmas: id,
      });
    }
    this.props.getTopTravelnew("ALL");
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    let idmas = this.props.match && this.props.match.params && this.props.match.params.id;
    if (this.state.idmas !== idmas) {
      let id = idmas;
      await this.props.getTravelnew(id);
      this.setState({
        idmas: id,
      });
    }
    if (prevProps.travelnew !== this.props.travelnew) {
      this.setState({
        travelnew: this.props.travelnew,
      });
    }
    if (prevProps.toptravelnew !== this.props.toptravelnew) {
      this.setState({
        toptravelnew: this.props.toptravelnew,
      });
    }
  }
  travelnewsinfo = (item) => {
    this.props.history.push(`/thong-tin-du-lich/${item.id}`);
  };
  render() {
    let { travelnew, toptravelnew } = this.state;
    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://chat-bot-smile-travel.herokuapp.com/"
        : window.location.href;
    return (
      <>
        <HomeHeader />
        <div className="travelnew_container">
          <label>{travelnew.name}</label>
          <div className="fb">
            <div className="like-share">
              <LikeAndShare dataHref={currentURL} />
            </div>
          </div>
          <div className="travelnew_content">
            <div
              className="left"
              dangerouslySetInnerHTML={{ __html: travelnew.thongtinHTML }}
            ></div>
            <div className="right">
              <div className="toptravel">
                <div className="title">Tin nổi bậc</div>
                {toptravelnew &&
                  toptravelnew.length > 0 &&
                  toptravelnew.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <div
                          className="image"
                          dangerouslySetInnerHTML={{ __html: item.anhHTML }}
                        ></div>
                        <div className="name" onClick={() => this.travelnewsinfo(item)}>
                          {item.name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="cmt">
            <Commentt dataHref={currentURL} width={"100%"} />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    travelnew: state.admin.travelnew,
    toptravelnew: state.admin.toptravelnew,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTravelnew: (id) => dispatch(actions.getTravelnew(id)),
    getTopTravelnew: (id) => dispatch(actions.getTopTravelnew(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Travelnewsinfo);
