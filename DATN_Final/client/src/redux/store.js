import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
  productsReducer,
  reviewReducer,
} from './reducer/productReducer';
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from './reducer/userReducer';
import { cartReducer } from './reducer/cartReducer';
import {
  categoriesReducer,
  categoryDetailsReducer,
  categoryReducer,
  newCategoryReducer,
} from './reducer/categoryReducer';
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from './reducer/orderReducer';
import {
  discountDetailReducer,
  discountProductsReducer,
  discountReducer,
  discountsReducer,
  newDiscountsReducer,
  productDiscountReducer,
} from './reducer/discountReducer';

const reducer = combineReducers({
  products: productsReducer,
  categories: categoriesReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  category: categoryReducer,
  newCategory: newCategoryReducer,
  categoryDetails: categoryDetailsReducer,
  userDetails: userDetailsReducer,
  newReview: newReviewReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  discounts: discountsReducer,
  newDiscount: newDiscountsReducer,
  discount: discountReducer,
  discountDetail: discountDetailReducer,
  productDiscount: productDiscountReducer,
  discountProducts: discountProductsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
