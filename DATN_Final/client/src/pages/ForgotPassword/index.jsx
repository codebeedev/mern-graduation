import { MailOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, forgotPassword } from '../../redux/actions/userAction';
import './styles.scss';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { error, mess, loading } = useSelector((state) => state.forgotPassword);

  const [email, setEmail] = useState('');

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }

    if (mess) {
      message.success(mess);
      dispatch(clearErrors());
    }
  }, [dispatch, error, mess]);

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set('email', email);
    dispatch(forgotPassword(myForm));
  };

  return (
    <div className="forgot-password">
      <div className="container" style={{ width: '500px' }}>
        <div className="forgot-password-tit fw-bold">Quên mật khẩu</div>
        <Input
          className="mt-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size="large"
          placeholder="Email"
          prefix={<MailOutlined />}
        />
        <Button
          loading={loading}
          onClick={handleForgotPassword}
          className="mt-3 fw-bold"
          size="large"
          block
        >
          Gửi
        </Button>

        <Link to="/login" className="forgot-password-cancel">
          Huỷ
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
