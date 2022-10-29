import React, { useEffect, useRef } from 'react';
import './styles.scss';

import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, createOrder } from '../../../redux/actions/orderAction';

const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const paymentData = {
    amount: orderInfo.totalPrice,
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post('/api/payment/process', paymentData, config);

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        message.error(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            types: 'stripe',
          };

          dispatch(createOrder(order));

          navigate('/checkout/success');
        } else {
          message.error('Có một số vấn đề khi xử lý thanh toán ');
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      message.error(error.response.data.message);
    }
  };

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-tit">Thanh toán qua Stripe</div>
        <CardNumberElement className="form-control mt-3" />
        <CardExpiryElement className="form-control mt-3" />
        <CardCvcElement className="form-control mt-3" />
        <div className="d-flex justify-content-between mt-3">
          <Link to="/checkout">Huỷ</Link>
          <Button onClick={handlePayment} type="primary" danger ref={payBtn}>
            Thanh toán
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
