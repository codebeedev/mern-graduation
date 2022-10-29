import { Badge, Breadcrumb, Button, Input, message, Radio } from 'antd';
import React, { useEffect, useState } from 'react';
import './styles.scss';
import other from '../../assets/images/other.svg';
import cod from '../../assets/images/cod.svg';
import { formatPrice } from '../../utils/products';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AuditOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { saveShippingInfo } from '../../redux/actions/cartAction';
import { createOrder } from '../../redux/actions/orderAction';

const Checkout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingInfo, cartItems } = useSelector(state => state.cart);
	const { user } = useSelector(state => state.user);
	const { error, loading } = useSelector(state => state.newOrder);

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');

	const [choosePayment, setChoosePayment] = useState(1);

	const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.afterPrice, 0);

	const shippingCharges = subtotal > 5000000 ? 50000 : 0;

	const totalPrice = subtotal + shippingCharges;

	useEffect(() => {
		if (error) {
			message.error(error.response.data.message);
		}
		if (cartItems.length === 0) {
			navigate('/cart');
		}

		if (user) {
			setName(user.name);
			setAddress(user?.address);
			setPhone(user?.phone);
			setEmail(user.email);
		}
	}, [cartItems, navigate, user, error]);

	const order = {
		shippingInfo,
		orderItems: cartItems,
		itemsPrice: subtotal,
		shippingPrice: shippingCharges,
		totalPrice: totalPrice
	};

	const handleCompleted = async e => {
		e.preventDefault();

		if (!phone || !name || !email || !address) {
			message.error('Vui lòng nhập đầy đủ thông tin để tiếp tục!');
			return;
		}

		if (phone.length < 10 || phone.length > 10) {
			message.error('Số điện thoại phải dài 10 chữ số');
			return;
		}
		dispatch(saveShippingInfo({ address, name, phone, email }));

		const data = {
			subtotal,
			shippingCharges,
			totalPrice
		};

		sessionStorage.setItem('orderInfo', JSON.stringify(data));

		if (choosePayment === 3) {
			navigate('/checkout/payment');
		} else {
			order.paymentInfo = {
				id: Math.random()
					.toString(36)
					.replace(/[^a-z]+/g, '')
					.substr(2, 10),
				status: 'unsuccessful'
			};

			await dispatch(createOrder(order));

			!loading && !error && navigate('/checkout/success');
		}
	};

	return (
		<>
			<div className="checkout">
				<div className="container">
					<div className="row">
						<div className="col-md-6">
							<div className="checkout-info">
								<div className="checkout-tit">Pandora Việt Nam</div>
								<Breadcrumb className="mt-2" separator=">">
									<Breadcrumb.Item href="/cart">Giỏ hàng</Breadcrumb.Item>
									<Breadcrumb.Item>Thông tin giao hàng</Breadcrumb.Item>
								</Breadcrumb>
								<div className="checkout-info-tit mt-2">Thông tin giao hàng</div>
								<div className="checkout-info-content mt-4">
									<Input
										value={name}
										onChange={e => setName(e.target.value)}
										placeholder="Họ tên"
										prefix={<UserOutlined />}
									/>
									<Input
										value={email}
										onChange={e => setEmail(e.target.value)}
										className="mt-3"
										placeholder="Email"
										prefix={<MailOutlined />}
									/>
									<Input
										value={address}
										onChange={e => setAddress(e.target.value)}
										className="mt-3"
										placeholder="Địa chỉ"
										prefix={<AuditOutlined />}
									/>
									<Input
										value={phone}
										onChange={e => setPhone(e.target.value)}
										className="mt-3"
										placeholder="Số điện thoại"
										prefix={<PhoneOutlined />}
									/>
								</div>
								<div className="checkout-info-tit mt-5">Phương thức thanh toán</div>
								<div className="checkout-info-choose-payment mt-3">
									<Radio.Group value={choosePayment} onChange={e => setChoosePayment(e.target.value)}>
										<Radio value={1}>
											<img src={cod} alt="cod" className="pe-3" />
											Thanh toán khi giao hàng (COD)
										</Radio>

										<Radio value={3}>
											<img src={other} alt="other" className="pe-3" />
											Thanh toán qua Stripe
										</Radio>
									</Radio.Group>
								</div>
								<div className="checkout-info-footer d-flex justify-content-between mt-5">
									<Link to="/cart">Giỏ hàng</Link>
									<Button loading={loading} onClick={handleCompleted} type="primary" size="large">
										Hoàn tất đơn hàng
									</Button>
								</div>
							</div>
						</div>
						<div className="col-md-6">
							<div className="checkout-products pt-4 ps-2">
								<div className="checkout-products-wrap">
									<div className="checkout-products-list">
										{cartItems.map(item => (
											<div className="checkout-products-item" key={item.product}>
												<div className="checkout-products-item-img">
													<Badge count={item.quantity}>
														<img src={item.image} alt="" />
													</Badge>
												</div>

												<div className="checkout-products-item-name">{item.name}</div>
												<div className="checkout-products-item-price">
													{item.checkDiscount && (
														<p className="price-before">{formatPrice(item.price)}</p>
													)}
													<p>{formatPrice(item.afterPrice)}</p>
												</div>
											</div>
										))}
									</div>

									<div className="checkout-summary">
										<div className="checkout-summary-item">
											<div className="checkout-summary-item-tit">Tạm tính</div>
											<div className="checkout-summary-item-cnt">{formatPrice(subtotal)}</div>
										</div>
										<div className="checkout-summary-item">
											<div className="checkout-summary-item-tit">Phí vận chuyển</div>
											<div className="checkout-summary-item-cnt">
												{formatPrice(shippingCharges)}
											</div>
										</div>
									</div>

									<div className="checkout-total">
										<div className="checkout-total-item">
											<div className="checkout-total-item-tit">Tổng cộng</div>
											<div className="checkout-total-item-cnt">{formatPrice(totalPrice)}</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Checkout;
