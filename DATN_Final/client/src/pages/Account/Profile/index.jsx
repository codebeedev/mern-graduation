import { SettingOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="account-profile">
      <div className="account-profile-title d-flex justify-content-between align-items-center">
        <div className="account-profile-title-name">
          {user?.name} <span className="email">({user?.email})</span>
        </div>
        <Link to="/account/update" className="account-profile-title-action">
          <SettingOutlined />
        </Link>
      </div>

      <div className="account-profile-content">
        <div className="account-profile-content-name">
          <Avatar src={user?.avatar?.url} size="large" /> <span>{user?.name}</span>
        </div>
        <div className="account-profile-content-address">
          <span>Địa chỉ: </span>
          <span>{user.address}</span>
        </div>
        <div className="account-profile-content-phone">
          <span>Số điện thoại: </span>
          <span>{user.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;
