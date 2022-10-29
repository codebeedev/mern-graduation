import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class About extends Component {
  render() {
    let settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    return (
      <div className="section_about">
        <div className="header-about text-center">Khách hàng nói gì về Smile Travel</div>
        <div className="body-about">
          <Slider {...settings}>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì việc du thuyền 5 sao trở thành xu
                    hướng du lịch tại Việt Nam là vấn đề không còn xa. Dịch vụ tại Star Travel rất
                    tận tâm, tận tụy trong suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì việc du thuyền 5 sao trở thành xu
                    hướng du lịch tại Việt Nam là vấn đề không còn xa. Dịch vụ tại Star Travel rất
                    tận tâm, tận tụy trong suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì việc du thuyền 5 sao trở thành xu
                    hướng du lịch tại Việt Nam là vấn đề không còn xa. Dịch vụ tại Star Travel rất
                    tận tâm, tận tụy trong suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì việc du thuyền 5 sao trở thành xu
                    hướng du lịch tại Việt Nam là vấn đề không còn xa. Dịch vụ tại Star Travel rất
                    tận tâm, tận tụy trong suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì việc du thuyền 5 sao trở thành xu
                    hướng du lịch tại Việt Nam là vấn đề không còn xa. Dịch vụ tại Star Travel rất
                    tận tâm, tận tụy trong suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
            <div className="section-user">
              <div className="user">
                <div className="photo"></div>
                <div className="idea text-center">
                  <span>
                    Tôi đã được trải nghiệm những dịch vụ chất lượng 5 sao mà loại hình du lịch du
                    thuyền mang lại, với chất lượng như vậy thì trở thành xu hướng du lịch tại Việt
                    Nam là vấn đề không còn xa. Dịch vụ tại Smile Travel rất tận tâm, tận tụy trong
                    suốt hải trình. Rất đáng để trải nghiệm.
                  </span>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
