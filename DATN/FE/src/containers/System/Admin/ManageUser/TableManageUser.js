import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import "./TableManageUser.scss";

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userArr: [],
    };
  }

  async componentDidMount() {
    this.props.getAllUser();
    console.log(this.props.userRedux);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.userRedux !== this.props.userRedux) {
      let arrUser = this.props.userRedux;
      this.setState({
        userArr: arrUser,
      });
    }
  }

  handleDeleteUser = async (user) => {
    this.props.deleteUser(user.id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKye(user);
  };
  render() {
    let getAllUser = this.state.userArr;
    return (
      <React.Fragment>
        <table id="customers" className="mt-4 mb-4">
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Address</th>
            <th>Gender</th>
            <th>Phone Number</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

          {getAllUser &&
            getAllUser.map((item, index) => {
              return (
                <tr key={index} onClick={() => this.handleEditUser(item)}>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td value={item.genderData.keyMap}>{item.genderData.value}</td>
                  <td>{item.phoneNumber}</td>
                  <td value={item.roleData.keyMap}>{item.roleData.value}</td>
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userRedux: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUser: () => dispatch(actions.getAllUser()),
    deleteUser: (user) => dispatch(actions.deletUsers(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
