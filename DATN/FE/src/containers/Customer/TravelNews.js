import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HeaderPage/HomeHeader";
import "./TravelNews.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Footer from "../HomePage/Footer/Footer";
import * as actions from "../../store/actions";

class TravelNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      travelnew: "",
      toptravelnew: "",
    };
  }

  async componentDidMount() {
    this.props.getTravelnew("ALL");
    this.props.getTopTravelnew("ALL");
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
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
    window.location.reload();
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      pauseOnFocus: true,
    };
    let { travelnew, toptravelnew } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="travelnew_container">
          <label>Thông tin du lịch</label>

          <div className="travelnew_content">
            <div className="left">
              <div className="top">
                <Slider {...settings}>
                  {toptravelnew &&
                    toptravelnew.length > 0 &&
                    toptravelnew.map((item, index) => {
                      return (
                        <>
                          <div
                            className="tvlnew"
                            key={index}
                            dangerouslySetInnerHTML={{ __html: item.anhHTML }}
                          ></div>

                          <div
                            className="nametra text-center"
                            onClick={() => this.travelnewsinfo(item)}
                          >
                            {item.name}
                          </div>
                        </>
                      );
                    })}
                </Slider>
              </div>
              <div className="bottom">
                {travelnew &&
                  travelnew.length > 0 &&
                  travelnew.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <div
                          className="itemleft"
                          dangerouslySetInnerHTML={{ __html: item.anhHTML }}
                        ></div>

                        <div className="itemright" onClick={() => this.travelnewsinfo(item)}>
                          <div className="name">{item.name}</div>
                          <div
                            className="subtitle"
                            dangerouslySetInnerHTML={{ __html: item.motaHTML }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(TravelNews);
