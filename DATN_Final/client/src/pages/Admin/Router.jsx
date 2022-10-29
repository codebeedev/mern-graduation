import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './Categories';
import Dashboards from './Dashboards';
import Discounts from './Discounts';
import NewCategory from './NewCategory';
import NewDiscount from './NewDiscount';
import NewProduct from './NewProduct';
import OrderProcess from './OrderProcess';
import Orders from './Orders';
import ProductReviews from './ProductReviews';
import Products from './Products';
import UpdateCategory from './UpdateCategory';
import UpdateDiscount from './UpdateDiscount';
import UpdateProduct from './UpdateProduct';
import User from './User';
import Users from './Users';

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<Dashboards />} />
			<Route path="/products" element={<Products />} />
			<Route path="/product" element={<NewProduct />} />
			<Route path="/product/:id" element={<UpdateProduct />} />
			<Route path="/categories" element={<Categories />} />
			<Route path="/category" element={<NewCategory />} />
			<Route path="/category/:id" element={<UpdateCategory />} />
			<Route path="/orders" element={<Orders />} />
			<Route path="/order/:id" element={<OrderProcess />} />
			<Route path="/users" element={<Users />} />
			<Route path="/user/:id" element={<User />} />
			<Route path="/productReviews" element={<ProductReviews />} />
			<Route path="/discounts" element={<Discounts />} />
			<Route path="/discount" element={<NewDiscount />} />
			<Route path="/discount/:id" element={<UpdateDiscount />} />
		</Routes>
	);
};

export default Router;
