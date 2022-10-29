import { message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';
import UpdatePassword from './UpdatePassword';
import UpdateProfile from './UpdateProfile';
import { logout } from '../../redux/actions/userAction';
import './styles.scss';
import Orders from './Orders';

const Account = () => {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    // e.preventDefault();
    dispatch(logout());
    message.success('Đã đăng xuất!');
  };
  return (
    <div className="account">
      <div className="container">
        <div className="account-title">
          <h1>Thông tin tài khoản</h1>
        </div>

        <div className="row">
          <div className="col-md-3">
            <div className="account-sidebar">
              <h3 className="account-sidebar-title">TÀI KHOẢN</h3>
              <div className="account-sidebar-content">
                <ul className="list-content">
                  <li>
                    <Link to="/account">Thông tin tài khoản</Link>
                  </li>
                  <li>
                    <Link to="/account/update">Cập nhật thông tin cá nhân</Link>
                  </li>
                  <li>
                    <Link to="/account/update/password">Đổi mật khẩu</Link>
                  </li>
                  <li>
                    <Link to="/account/orders">Danh sách đơn hàng</Link>
                  </li>
                  <li>
                    <Link to="/" onClick={handleLogout}>
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<Profile />} />
              <Route path="/update" element={<UpdateProfile />} />
              <Route path="/update/password" element={<UpdatePassword />} />
              <Route path="/orders" element={<Orders />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
