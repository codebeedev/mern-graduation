import { ADD_TO_CART, REMOVE_CART_ITEM, REMOVE_CART, SAVE_SHIPPING_INFO } from '../types/cartTypes';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find((val) => val.product === item.product);

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((val) =>
            val.product === isItemExist.product ? item : val
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((val) => val.product !== action.payload),
      };

    case REMOVE_CART:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};
