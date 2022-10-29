import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./UserManage.scss";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
import { toast } from "react-toastify";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      roleArr: [],

      preImg: "",
      isOpen: false,
      disabled: 1,
      id: "",
      email: "",
      password: "",
      name: "",
      phoneNumber: "",
      address: "",
      gender: "",
      role: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }

    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.userRedux !== this.props.userRedux) {
      let arrGender = this.props.genderRedux;
      let arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
  }

  handleSaveUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;

    //fire redux
    this.props.createNewUsers({
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
    });
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValideInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "name", "phoneNumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.info("Missing paraerter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleEditUserFromParent = (user) => {
    this.setState({
      id: user.id,
      email: user.email,
      password: "password",
      name: user.name,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      role: user.roleId,
      disabled: 0,
    });
  };

  handleSaveEditUser = () => {
    let isValid = this.checkValideInput();
    if (isValid === false) return;
    this.props.updateUser({
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      phoneNumber: this.state.phoneNumber,
      gender: this.state.gender,
      roleId: this.state.role,
    });
    this.setState({
      disabled: 1,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let { email, password, name, phoneNumber, address, gender, role } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">Quản lý người dùng</div>
        <div className="user-redux-body">
          <div className="container mt-4">
            <div className="row">
              <div className="col-4">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  disabled={this.state.disabled !== 1}
                />
              </div>
              <div className="col-2">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "password");
                  }}
                  disabled={this.state.disabled !== 1}
                />
              </div>
              <div className="col-3">
                <label>Họ tên</label>
                <input
                  type="name"
                  className="form-control"
                  value={name}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "name");
                  }}
                />
              </div>
              <div className="col-3">
                <label>Địa chỉ</label>
                <input
                  type="address"
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-2">
                <label>Số điện thoại</label>
                <input
                  type="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-2">
                <label>Giới tính</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "gender");
                  }}
                  value={gender}
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

              <div className="col-2">
                <label>Vai trò</label>
                <select
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "role");
                  }}
                  value={role}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="col-12 mt-3">
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    this.handleSaveUser();
                  }}
                  hidden={this.state.disabled !== 1}
                >
                  Thêm
                </div>
                <div
                  className="btn btn-primary"
                  onClick={() => {
                    this.handleSaveEditUser();
                  }}
                  hidden={this.state.disabled !== 0}
                >
                  Lưu
                </div>
              </div>

              <div className="col-12 mt-4">
                <TableManageUser handleEditUserFromParentKye={this.handleEditUserFromParent} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    isLoadingGender: state.admin.isLoadingGender,
    roleRedux: state.admin.roles,
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUsers: (data) => dispatch(actions.createNewUsers(data)),
    updateUser: (data) => dispatch(actions.updateUsers(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
