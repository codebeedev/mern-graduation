import { LockOutlined, PullRequestOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearErrors, resetPassword } from '../../redux/actions/userAction';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.forgotPassword);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      message.success('Cập nhật mật khẩu mới thành công!');

      navigate('/login');
    }
  }, [dispatch, error, navigate, success]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('password', newPassword);
    myForm.set('confirmPassword', confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  return (
    <div className="forgot-password">
      <div className="container" style={{ width: '500px' }}>
        <div className="forgot-password-tit fw-bold">Mật khẩu mới</div>

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
        <Button loading={loading} onClick={handleResetPassword} className="mt-3 fw-bold" block>
          CẬP NHẬT
        </Button>

        {/* <Link to="/login" className="forgot-password-cancel">
          Huỷ
        </Link> */}
      </div>
    </div>
  );
};

export default ResetPassword;
