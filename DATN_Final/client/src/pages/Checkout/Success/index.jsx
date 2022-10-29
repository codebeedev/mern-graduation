import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Result
        status="success"
        title="Đơn hàng của bạn đã được đặt thành công!"
        // subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
        extra={[
          <Button onClick={() => navigate('/account/orders')} type="primary" key="console">
            Xem đơn đặt hàng
          </Button>,
          <Button onClick={() => navigate('/products')} key="buy">
            Tiếp tục mua
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
