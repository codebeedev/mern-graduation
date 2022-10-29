import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss';

const CartEmpty = () => {
  return (
    <div className="cartEmpty">
      <div className="cartEmpty-content">
        <p>Giỏ hàng đang trống</p>
        <Link className="btn-shopping" to="/products">
          Tiếp tục mua sắm
        </Link>
      </div>
    </div>
  );
};

export default CartEmpty;
