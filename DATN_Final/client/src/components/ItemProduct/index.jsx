import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/products';
import './styles.scss';

const ItemProduct = ({ item }) => {
	const checkDiscount = item.discount
		? new Date(item.discount?.expireDate).toISOString() > new Date().toISOString()
		: false;

	const productDiscount = item.discount
		? item.discount.products.find(val => val.productId.toString() === item._id.toString())
		: null;

	const afterPrice =
		checkDiscount && productDiscount?.amount
			? formatPrice(
					productDiscount?.isPresent
						? (Number(item.price) * (100 - Number(productDiscount?.amount))) / 100
						: Number(item.price) - Number(productDiscount?.amount)
			  )
			: formatPrice(item.price);

	return (
		<div>
			<Link to={`/detailProduct/${item._id}`}>
				<div className="item-product">
					<div className="item-product-img">
						<img src={item.images[0].url} alt="Mom Daisy Heart Charm" />
					</div>
					<div className="item-product-content">
						<span className="new-product-loop-label"></span>
						<span className="item-product-content-tit">{item.name}</span>
						<span
							className={`item-product-content-price d-flex ${
								checkDiscount ? 'justify-content-between' : 'justify-content-end'
							}`}
						>
							{checkDiscount && <span className="price-before">{formatPrice(item.price)}</span>}
							<span>{afterPrice}</span>
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default ItemProduct;
