import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import Footer from '../components/Footer';
import Header from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';
import Register from '../pages/Register';
import Admin from '../pages/Admin';
import DetailProducts from '../pages/DetailProducts';
import Account from '../pages/Account';
import Cart from '../pages/Cart';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import ProtectedRoute from '../components/ProtectedRoute';
import Checkout from '../pages/Checkout';
import { loadUser } from '../redux/actions/userAction';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '../pages/Checkout/Payment';
import Success from '../pages/Checkout/Success';
import Order from '../pages/Order';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Map from '../pages/Map';

const Router = () => {
  let location = useLocation();
  const dispatch = useDispatch();

  const [stripeApiKey, setStripeApiKey] = useState('');

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser());

    getStripeApiKey();
  }, [dispatch]);

  const RenderHeader = (isHeader) => {
    if (isHeader) {
      return <Header />;
    }
  };

  const RenderFooter = (isFooter) => {
    if (isFooter) {
      return <Footer />;
    }
  };

  return (
    <>
      {RenderHeader(!location.pathname.includes('admin'))}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/detailProduct/:id" element={<DetailProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<Map />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute isAdmin={true}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/account/*"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout/payment"
          element={
            <ProtectedRoute>
              {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              )}
            </ProtectedRoute>
          }
        />
      </Routes>
      {RenderFooter(!location.pathname.includes('admin'))}
    </>
  );
};

export default Router;
