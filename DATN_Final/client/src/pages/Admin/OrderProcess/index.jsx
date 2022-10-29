import { Button, Descriptions, message, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { clearErrors, getOrderDetails, updateOrder } from '../../../redux/actions/orderAction';
import { UPDATE_ORDER_RESET } from '../../../redux/types/orderTypes';
import { formatPrice } from '../../../utils/products';
import Layout from '../Layout';
import './styles.scss';

const OrderProcess = () => {
	const { order, error, loading } = useSelector(state => state.orderDetails);
	const { id } = useParams();
	const dispatch = useDispatch();
	const { error: updateError, isUpdated } = useSelector(state => state.order);

	const [status, setStatus] = useState('');

	const updateOrderSubmitHandler = e => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('status', status);

		dispatch(updateOrder(id, myForm));
	};

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			message.error(updateError);
			dispatch(clearErrors());
		}
		if (isUpdated) {
			message.success('Đã cập nhật đơn đặt hàng thành công!');
			dispatch({ type: UPDATE_ORDER_RESET });
		}

		dispatch(getOrderDetails(id));
	}, [dispatch, error, id, isUpdated, updateError]);
	return (
		<Layout breadcrumb={['Đơn đặt hàng', 'Cập nhật đơn đặt hàng']}>
			<Spin spinning={loading}>
				{loading ? (
					<></>
				) : (
					<div className="orderProcess">
						<div className="orderProcess-tit">
							<h1 className="text-danger">Đơn hàng: #{order && order._id}</h1>
						</div>
						<div className="row">
							<div className="col-md-9">
								<div className="mt-3">
									<Descriptions title="Thông tin vận chuyển">
										<Descriptions.Item label="Họ tên">
											{order.user && order.user.name}
										</Descriptions.Item>
										<Descriptions.Item label="Số điện thoại">
											{order.shippingInfo && order.shippingInfo.phone}
										</Descriptions.Item>
										<Descriptions.Item label="Địa chỉ">
											{order.shippingInfo && order.shippingInfo.address}
										</Descriptions.Item>
										<Descriptions.Item label="Email">
											{order.user && order.user.email}
										</Descriptions.Item>
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
							</div>
							<div className="col-md-3">
								<Descriptions className="mt-3" title="Xử lý đơn hàng" />
								<Select
									style={{ width: '100%' }}
									defaultValue={order.orderStatus && order.orderStatus}
									onChange={value => setStatus(value)}
								>
									<Select.Option value="Processing">Chưa giao hàng</Select.Option>
									<Select.Option value="Delivered">Đã giao hàng</Select.Option>
								</Select>
								<Button onClick={updateOrderSubmitHandler} className="mt-3" type="primary" block danger>
									Lưu
								</Button>
							</div>
						</div>

						<Descriptions className="mt-3" title="Danh sách đơn hàng" />
						<div className="orderProcess-order">
							{order.orderItems &&
								order.orderItems.map(item => (
									<div className="orderProcess-items" key={item.product}>
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
				)}
			</Spin>
		</Layout>
	);
};

export default OrderProcess;
