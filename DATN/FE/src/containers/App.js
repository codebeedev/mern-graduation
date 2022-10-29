import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import { userIsAuthenticated, userIsNotAuthenticated } from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import System from "../routes/System";

import Inland from "./Customer/Inland";
import Foreign from "./Customer/Foreign";
import DomainTour from "./Customer/DomainTour";
import TravelNews from "./Customer/TravelNews";
import TravelNewInfo from "./Customer/Travelnewinfo";
import DetaiTour from "./Customer/DetaiTour";
import TourPlace from "./Customer/TourPlace";
import Booking from "./Customer/Booking/Booking.js";

import ConfirmModal from "../components/ConfirmModal";
import HomePage from "../containers/HomePage/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                  <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                  <Route path={path.HOMEPAGE} component={HomePage} />

                  <Route path={"/du-lich-trong-nuoc"} component={Inland} />
                  <Route path={"/du-lich-nuoc-ngoai"} component={Foreign} />
                  <Route path={"/tin-du-lich"} component={TravelNews} />
                  <Route path={"/thong-tin-du-lich/:id"} component={TravelNewInfo} />
                  <Route path={"/thong-tin-chuyen-di/:id"} component={DetaiTour} />
                  <Route path={"/du-lich/:id"} component={DomainTour} />
                  <Route path={"/dia-diem-du-lich/:id"} component={TourPlace} />
                  <Route path={"/xac-nhan"} component={Booking} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
