import { LockOutlined, PullRequestOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, updatePassword } from '../../../redux/actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../../redux/types/userTypes';

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      message.success('Cập nhật thành công');

      navigate('/account');

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, navigate, isUpdated]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('oldPassword', oldPassword);
    myForm.set('newPassword', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(updatePassword(myForm));
  };

  return (
    <div className="update-password">
      <div className="update-password text-center fw-bold">ĐỔI MẬT KHẨU</div>
      <Input.Password
        className="mt-3"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        placeholder="Mật khẩu cũ"
        prefix={<UnlockOutlined />}
      />
      <Input.Password
        className="mt-3"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Mật khẩu mới"
        prefix={<LockOutlined />}
      />
      <Input.Password
        className="mt-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Xác nhận mật khẩu mới"
        prefix={<PullRequestOutlined />}
      />
      <Button
        loading={loading}
        onClick={handleUpdate}
        className="mt-3 d-flex justify-content-end"
        type="primary"
        danger
      >
        CẬP NHẬT
      </Button>
    </div>
  );
};

export default UpdatePassword;
