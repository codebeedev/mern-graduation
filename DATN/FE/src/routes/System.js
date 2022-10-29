import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/Admin/ManageUser/UserManage";
import TourManage from "../containers/System/Admin/ManageTour/TourManage";
import TourA2Manage from "../containers/System/Admin/ManageTour/TourA2Manage";
import TourInfo from "../containers/System/Admin/ManageTour/TourInfo";
import Booking from "../containers/System/Admin/ManageTour/Booking";
import Header from "../containers/Header/Header";
import TravelnewManage from "../containers/System/Admin/Travelnew/TravelnewManage";
class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/he-thong/quan-ly-nguoi-dung" component={UserManage} />
              <Route path="/he-thong/du-lich-trong-nuoc" component={TourManage} />
              <Route path="/he-thong/du-lich-nuoc-ngoai" component={TourA2Manage} />
              <Route path="/he-thong/thong-tin-chuyen-di" component={TourInfo} />
              <Route path="/he-thong/dat-tour" component={Booking} />
              <Route path="/he-thong/thong-tin-du-lich" component={TravelnewManage} />

              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
