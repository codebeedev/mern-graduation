import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from '../types/cartTypes';
import axios from 'axios';

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
	const { data } = await axios.get(`/api/product/${id}`);

	const { product } = data;

	const checkDiscount = product.discount
		? new Date(product.discount?.expireDate).toISOString() > new Date().toISOString()
		: false;

	const productDiscount = product.discount
		? product.discount.products.find(val => val.productId.toString() === product._id.toString())
		: null;

	const afterPrice =
		checkDiscount && productDiscount?.amount
			? productDiscount?.isPresent
				? (Number(product.price) * (100 - Number(productDiscount?.amount))) / 100
				: Number(product.price) - Number(productDiscount?.amount)
			: product.price;

	dispatch({
		type: ADD_TO_CART,
		payload: {
			product: product._id,
			name: product.name,
			price: product.price,
			image: product.images[0].url,
			stock: product.Stock,
			checkDiscount,
			afterPrice,
			quantity
		}
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = id => async (dispatch, getState) => {
	dispatch({
		type: REMOVE_CART_ITEM,
		payload: id
	});

	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveShippingInfo = data => async dispatch => {
	dispatch({
		type: SAVE_SHIPPING_INFO,
		payload: data
	});

	localStorage.setItem('shippingInfo', JSON.stringify(data));
};
