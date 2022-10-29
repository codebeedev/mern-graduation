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
  DELETE_DISCOUNT_PRODUCT_RESET,
  DELETE_DISCOUNT_PRODUCT_SUCCESS,
  DELETE_DISCOUNT_REQUEST,
  DELETE_DISCOUNT_RESET,
  DELETE_DISCOUNT_SUCCESS,
  DISCOUNT_DETAILS_FAIL,
  DISCOUNT_DETAILS_REQUEST,
  DISCOUNT_DETAILS_SUCCESS,
  NEW_DISCOUNT_FAIL,
  NEW_DISCOUNT_REQUEST,
  NEW_DISCOUNT_RESET,
  NEW_DISCOUNT_SUCCESS,
  UPDATE_DISCOUNT_FAIL,
  UPDATE_DISCOUNT_REQUEST,
  UPDATE_DISCOUNT_RESET,
  UPDATE_DISCOUNT_SUCCESS,
} from '../types/discountType';

export const discountsReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case ALL_DISCOUNT_REQUEST:
      return {
        loading: true,
        discounts: [],
      };

    case ALL_DISCOUNT_SUCCESS:
      return {
        loading: false,
        discounts: action.payload,
      };

    case ALL_DISCOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newDiscountsReducer = (state = { discount: {}, loading: false }, action) => {
  switch (action.type) {
    case NEW_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case NEW_DISCOUNT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        discount: action.payload.discountCode,
      };

    case NEW_DISCOUNT_RESET:
      return {
        ...state,
        success: false,
      };

    case NEW_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const discountReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DELETE_DISCOUNT_REQUEST:
    case UPDATE_DISCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_DISCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_DISCOUNT_FAIL:
    case UPDATE_DISCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DISCOUNT_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DISCOUNT_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const discountDetailReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DISCOUNT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case DISCOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        discount: action.payload,
      };

    case DISCOUNT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const discountProductsReducer = (state = { discountProducts: [] }, action) => {
  switch (action.type) {
    case ALL_DISCOUNT_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_DISCOUNT_PRODUCT_SUCCESS:
      return {
        loading: false,
        discountProducts: action.payload,
      };
    case ALL_DISCOUNT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDiscountReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case DELETE_DISCOUNT_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case DELETE_DISCOUNT_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_DISCOUNT_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case DELETE_DISCOUNT_PRODUCT_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
