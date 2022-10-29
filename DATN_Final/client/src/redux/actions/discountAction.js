import axios from 'axios';
import {
  ALL_DISCOUNT_FAIL,
  ALL_DISCOUNT_PRODUCT_FAIL,
  ALL_DISCOUNT_PRODUCT_REQUEST,
  ALL_DISCOUNT_PRODUCT_SUCCESS,
  ALL_DISCOUNT_REQUEST,
  ALL_DISCOUNT_SUCCESS,
  CLEAR_ERRORS,
  DELETE_DISCOUNT_FAIL,
  DELETE_DISCOUNT_PRODUCT_FAIL,
  DELETE_DISCOUNT_PRODUCT_REQUEST,
  DELETE_DISCOUNT_PRODUCT_SUCCESS,
  DELETE_DISCOUNT_REQUEST,
  DELETE_DISCOUNT_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  NEW_DISCOUNT_FAIL,
  NEW_DISCOUNT_REQUEST,
  NEW_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAIL,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_SUCCESS,
} from '../types/discountType';

export const getDiscounts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_DISCOUNT_REQUEST });

    const { data } = await axios.get(`/api/discounts`);

    dispatch({
      type: ALL_DISCOUNT_SUCCESS,
      payload: data.discountCodes,
    });
  } catch (error) {
    dispatch({
      type: ALL_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createDiscount = (dataDiscount) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DISCOUNT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.post(`/api/create_discount`, dataDiscount, config);

    dispatch({
      type: NEW_DISCOUNT_SUCCESS,
      payload: data,
    });

    localStorage.setItem('idNewDiscount', data.discountCode._id);
  } catch (error) {
    dispatch({
      type: NEW_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDiscountDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: DISCOUNT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/discount/${id}`);

    dispatch({
      type: DISCOUNT_DETAILS_SUCCESS,
      payload: data.discount,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DISCOUNT_REQUEST });

    const { data } = await axios.delete(`/api/discount/${id}`);

    dispatch({
      type: DELETE_DISCOUNT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateDiscount = (id, discountData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DISCOUNT_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const { data } = await axios.put(`/api/discount/${id}`, discountData, config);

    dispatch({
      type: UPDATE_DISCOUNT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISCOUNT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getAllDiscountProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DISCOUNT_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/discount_product`);

    dispatch({
      type: ALL_DISCOUNT_PRODUCT_SUCCESS,
      payload: data.productDiscounts,
    });
  } catch (error) {
    dispatch({
      type: ALL_DISCOUNT_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteDiscountProduct = (id, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DISCOUNT_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/discount_product?id=${id}&productId=${productId}`);

    dispatch({
      type: DELETE_DISCOUNT_PRODUCT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DISCOUNT_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
