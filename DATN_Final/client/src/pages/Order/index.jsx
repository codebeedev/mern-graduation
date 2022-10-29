import { Descriptions, message, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails } from '../../redux/actions/orderAction';
import { formatPrice } from '../../utils/products';
import './styles.scss';

const Order = () => {
	const { order, error, loading } = useSelector(state => state.orderDetails);
	const { id } = useParams();

	console.log(order);

	const dispatch = useDispatch();

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		dispatch(getOrderDetails(id));
	}, [dispatch, error, id]);
	return (
		<Spin spinning={loading}>
			{loading ? (
				<></>
			) : (
				<div className="order">
					<div className="container">
						<div className="order-tit">
							<h1 className="text-danger">Đơn hàng: #{order && order._id}</h1>
						</div>
						<div className="mt-3">
							<Descriptions title="Thông tin vận chuyển">
								<Descriptions.Item label="Họ tên">{order.user && order.user.name}</Descriptions.Item>
								<Descriptions.Item label="Số điện thoại">
									{order.shippingInfo && order.shippingInfo.phone}
								</Descriptions.Item>
								<Descriptions.Item label="Địa chỉ">
									{order.shippingInfo && order.shippingInfo.address}
								</Descriptions.Item>
								<Descriptions.Item label="Email">{order.user && order.user.email}</Descriptions.Item>
							</Descriptions>
						</div>
						<div className="mt-3">
							<Descriptions title="Thông tin thanh toán">
								<Descriptions.Item label="Hình thức">
									{order.paymentInfo && order.paymentInfo.types === 'recieve'
										? 'Thanh toán khi nhận hàng'
										: 'Thanh toán qua Stripe'}
								</Descriptions.Item>
								<Descriptions.Item label="Tình trạng">
									{order.paymentInfo && order.paymentInfo.status === 'succeeded'
										? 'Đã thanh toán'
										: 'Chưa thanh toán'}
								</Descriptions.Item>
								<Descriptions.Item label="Phí vận chuyển">
									{order.shippingPrice && formatPrice(order.shippingPrice)}
								</Descriptions.Item>
								<Descriptions.Item label="Tổng tiền">
									{order.totalPrice && formatPrice(order.totalPrice)}
								</Descriptions.Item>
								<Descriptions.Item label="Giao hàng">
									{order.orderStatus && order.orderStatus === 'Delivered'
										? 'Đã giao hàng'
										: 'Chưa giao hàng'}
								</Descriptions.Item>
							</Descriptions>
						</div>
						<div style={{ borderTop: '1px solid #eee' }}>
							<Descriptions className="mt-3" title="Danh sách đơn hàng" />
							{order.orderItems &&
								order.orderItems.map(item => (
									<div className="order-items" key={item.product}>
										<img src={item.image} alt="Product" />
										<Link
											className="p-2 d-flex align-items-center justify-content-center"
											to={`/detailProduct/${item.product}`}
										>
											{item.name}
										</Link>
										<span className="p-2 d-flex align-items-center">
											<span className="me-2 d-flex align-items-center">
												{item.quantity} X
												<span className={`ms-2 d-flex ${item.checkDiscount && 'flex-column'}`}>
													{item.checkDiscount && (
														<span className="text-decoration-line-through">
															{formatPrice(item.price)}
														</span>
													)}
													<span>{formatPrice(item.afterPrice)}</span>
												</span>
											</span>{' '}
											=<b className="ms-2">{formatPrice(item.afterPrice * item.quantity)}</b>
										</span>
									</div>
								))}
						</div>
					</div>
				</div>
			)}
		</Spin>
	);
};

export default Order;
