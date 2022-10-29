import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tourNAV: "",
      alltourArr: "",
      search: "",
      filldata: [],
      searchClose: "",
      domainArr: "",
      domainArr2: "",
      tourNAVA2: "",
    };
  }
  async componentDidMount() {
    this.props.getTourNav(4);
    this.props.getTourNavA2(4);
    this.props.getTourAll();
    this.props.getDomainTour();
    this.props.getDomainTourA2();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topTourNAV !== this.props.topTourNAV) {
      this.setState({
        tourNAV: this.props.topTourNAV,
      });
    }
    if (prevProps.topTourNAVA2 !== this.props.topTourNAVA2) {
      this.setState({
        tourNAVA2: this.props.topTourNAVA2,
      });
    }
    if (prevProps.alltour !== this.props.alltour) {
      this.setState({
        alltourArr: this.props.alltour,
      });
    }
    if (prevProps.domains !== this.props.domains) {
      this.setState({
        domainArr: this.props.domains,
      });
    }
    if (prevProps.domainsA2 !== this.props.domainsA2) {
      this.setState({
        domainArr2: this.props.domainsA2,
      });
    }
  }

  handleInfoTour = (tour) => {
    this.props.history.push(`/thong-tin-chuyen-di/${tour.id}`);
    window.location.reload();
  };

  goHome = () => {
    if (this.props.history) {
      this.props.history.push("/trang-chu");
      window.location.reload();
    }
  };

  trongnuoc = () => {
    this.props.history.push("/du-lich-trong-nuoc");
    window.location.reload();
  };

  nuocngoai = () => {
    this.props.history.push("/du-lich-nuoc-ngoai");
    window.location.reload();
  };

  tindulich = () => {
    if (this.props.history) {
      this.props.history.push("/tin-du-lich");
      window.location.reload();
    }
  };

  handleOnChange = (event) => {
    this.state.search = event.target.value;
    this.setState({
      searchClose: this.state.search,
    });
    const newSearch = this.state.alltourArr.filter((value) => {
      return value.name.toLowerCase().includes(this.state.search.toLowerCase());
    });
    if (this.state.search === "") {
      this.setState({
        filldata: [],
      });
    } else {
      this.setState({
        filldata: newSearch,
      });
    }
  };

  clearInPut = () => {
    this.setState({
      filldata: [],
      searchClose: "",
    });
  };

  handleDomainTour = (item) => {
    this.props.history.push(`/du-lich/${item.keyMap}`);
    window.location.reload();
  };

  render() {
    let domain = this.state.domainArr;
    let domain2 = this.state.domainArr2;
    let tourNAV = this.state.tourNAV;
    let tourNAVA2 = this.state.tourNAVA2;
    let alltour = this.state.filldata;
    return (
      <React.Fragment>
        <div className="home-header-info-container">
          <div className="home-header-info-content">
            <div className="home-header-info-left">
              <div className="address">
                <i className="fas fa-map-marker-alt"></i> Thành phố Thủ Đức, Thành Phố Hồ Chí Minh
              </div>
              <div className="mobile">
                <i className="fa fa-phone"></i>Liên hệ: 0899906599
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-logo-container">
          <div className="home-header-logo-content">
            <div className="home-header-logo-left">
              <div className="logo" onClick={() => this.goHome()}></div>
            </div>
            <div className="home-header-logo-center">
              <div className="search">
                <div className="search-input">
                  <i class="fas fa-search"></i>
                  <input
                    type="text"
                    placeholder="Nhập tên chuyến đi, điểm đến ..."
                    value={this.state.searchClose}
                    onChange={(event) => this.handleOnChange(event)}
                  />
                  {alltour && alltour.length > 0 ? (
                    <i
                      className="fas fa-times"
                      onClick={() => {
                        this.clearInPut();
                      }}
                    ></i>
                  ) : (
                    ""
                  )}
                </div>
                {alltour.length > 0 && (
                  <div className="search-resullt">
                    {alltour.slice(0, 15).map((item, index) => {
                      return (
                        <div className="resullt" onClick={() => this.handleInfoTour(item)}>
                          <div
                            className="image"
                            dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}
                          ></div>
                          <div className="nameTour">{item.name}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <div className="home-header-logo-right">
              <div className="link">
                <div className="item-link facebook">
                  <i className="fab fa-facebook"></i>
                </div>
                <div className="item-link twitter">
                  <i className="fab fa-twitter"></i>
                </div>
                <div className="item-link youtube">
                  <i className="fab fa-youtube"></i>
                </div>
                <div className="item-link instagram">
                  <i className="fab fa-instagram"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-nav-container">
          <div className="home-header-nav-content">
            <div className="home-header-nav">
              <div className="home" onClick={() => this.goHome()}>
                <i className="fas fa-home"></i>
              </div>
              {/*tour trong nước*/}
              <div
                className={
                  this.props.history.location.pathname === "/du-lich-trong-nuoc"
                    ? "title-tourA1 active"
                    : "title-tourA1"
                }
              >
                <label onClick={() => this.trongnuoc()}>DU LỊCH TRONG NƯỚC</label>
                <ul className="box-menu-container-tourA1">
                  <li>
                    <div className="box-menu-content">
                      <div className="box-regions">
                        <ul>
                          {domain &&
                            domain.length > 0 &&
                            domain.map((item, index) => {
                              return (
                                <li onClick={() => this.handleDomainTour(item)}>
                                  Du lịch {item.value}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="box-tour">
                        {tourNAV &&
                          tourNAV.length > 0 &&
                          tourNAV.map((item, index) => {
                            return (
                              <div
                                className="tour"
                                key={index}
                                onClick={() => this.handleInfoTour(item)}
                              >
                                <div
                                  className="imgtour"
                                  dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}
                                ></div>
                                <div className="nametour">{item.name}</div>
                                <div className="pricetour">
                                  {item.price} <label>đ</label>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/*tour nước ngoài*/}
              <div
                className={
                  this.props.history.location.pathname === "/du-lich-nuoc-ngoai"
                    ? "title-tourA1 active"
                    : "title-tourA1"
                }
              >
                <label onClick={() => this.nuocngoai()}>DU LỊCH NƯỚC NGOÀI</label>
                <ul className="box-menu-container-tourA1">
                  <li>
                    <div className="box-menu-content">
                      <div className="box-regions">
                        <ul>
                          {domain2 &&
                            domain2.length > 0 &&
                            domain2.map((item, index) => {
                              return (
                                <li onClick={() => this.handleDomainTour(item)}>
                                  Du lịch {item.value}
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="box-tour">
                        {tourNAVA2 &&
                          tourNAVA2.length > 0 &&
                          tourNAVA2.map((item, index) => {
                            return (
                              <div
                                className="tour"
                                key={index}
                                onClick={() => this.handleInfoTour(item)}
                              >
                                <div
                                  className="imgtour"
                                  dangerouslySetInnerHTML={{ __html: item.imgTourHTML }}
                                ></div>
                                <div className="nametour">{item.name}</div>
                                <div className="pricetour">
                                  {item.price} <label>đ</label>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              {/*khách sạn*/}
              <div
                className={
                  this.props.history.location.pathname === ""
                    ? "title-tourA1 active"
                    : "title-tourA1"
                }
              >
                <label onClick={() => this.nuocngoai()}>DỊCH VỤ</label>
                <ul className="dichvu">
                  <li className="khachsan text-center">Khách Sạn</li>
                </ul>
              </div>
              {/*tin tức du lịch*/}
              <div
                className={
                  this.props.history.location.pathname === "/tin-du-lich"
                    ? "title-tourA1 active"
                    : "title-tourA1"
                }
              >
                <label onClick={() => this.tindulich()}>THÔNG TIN DU LỊCH</label>
              </div>
              {/*về Smile Travel*/}
              <div
                className={
                  this.props.history.location.pathname === ""
                    ? "title-tourA1 active"
                    : "title-tourA1"
                }
              >
                <label onClick={() => this.nuocngoai()}>SMILETRAVEL</label>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topTourNAV: state.admin.topTourNAV,
    topTourNAVA2: state.admin.topTourNAVA2,
    alltour: state.admin.alltour,
    domains: state.admin.domains,
    domainsA2: state.admin.domainsA2,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTourNav: (limit) => dispatch(actions.getTourNav(limit)),
    getTourNavA2: (limit) => dispatch(actions.getTourNavA2(limit)),
    getTourAll: () => dispatch(actions.getTourAll()),
    getDomainTour: () => dispatch(actions.getDomainTour()),
    getDomainTourA2: () => dispatch(actions.getDomainTourA2()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
