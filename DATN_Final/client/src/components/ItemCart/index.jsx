import { CloseCircleOutlined } from '@ant-design/icons';
import { Button, InputNumber } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartAction';
import { formatPrice } from '../../utils/products';
import './styles.scss';

const ItemCart = ({ item }) => {
  const dispatch = useDispatch();
  function onChange(value) {
    dispatch(addItemsToCart(item.product, value));
  }

  const handleDelete = () => {
    dispatch(removeItemsFromCart(item.product));
  };

  return (
    <div className="itemCart">
      <img className="itemCart-img" src={item.image} alt="img" />

      <div className="itemCart-tit">
        <h2 className="itemCart-tit-name">{item.name}</h2>
        <div className="itemCart-tit-price">
          <span>Giá </span>
          {item.checkDiscount && (
            <span className="price-before me-3">{formatPrice(item.price)}</span>
          )}
          <span>{formatPrice(item.afterPrice)}</span>
          {/* <span>{formatPrice(item.price)}</span> */}
        </div>
      </div>

      <div className="itemCart-amount">
        <InputNumber min={1} max={item.Stock} defaultValue={item.quantity} onChange={onChange} />
      </div>

      <div className="itemCart-price">
        <span className="money">
          {formatPrice(Number(item.afterPrice) * Number(item.quantity))}
        </span>
      </div>

      <div className="itemCart-remove">
        <Button
          onClick={handleDelete}
          type="danger"
          shape="circle"
          icon={<CloseCircleOutlined />}
        />
      </div>
    </div>
  );
};

export default ItemCart;
