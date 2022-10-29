import { ExpandAltOutlined } from '@ant-design/icons';
import { message, Table, Tag } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, myOrders } from '../../../redux/actions/orderAction';

const Orders = () => {
	const dispatch = useDispatch();
	const { error, orders } = useSelector(state => state.myOrders);

	const columns = [
		{ dataIndex: 'id', title: 'Mã hoá đơn', minWidth: 300, flex: 1 },

		{
			dataIndex: 'status',
			title: 'Tình trạng',
			render: status => {
				let color = 'processing';
				if (status === 'Delivered') {
					color = 'success';
				} else if (status === 'Processing') {
					color = 'processing';
				}

				return (
					<Tag color={color} key={status}>
						{status === 'Delivered' ? 'Đã giao hàng' : 'Chưa giao hàng'}
					</Tag>
				);
			}
		},
		{
			dataIndex: 'itemsQty',
			title: 'Số lượng mặt hàng'
		},

		{
			dataIndex: 'amount',
			title: 'Tổng tiền',
			defaultSortOrder: 'descend',
			sorter: (a, b) => a.amount - b.amount
		},

		{
			dataIndex: 'id',
			title: 'Hoạt động',
			sortable: false,
			render: params => {
				return (
					<Link to={`/order/${params}`}>
						<ExpandAltOutlined />
					</Link>
				);
			}
		}
	];
	const rows = [];

	orders &&
		orders.forEach((item, index) => {
			rows.push({
				key: item._id,
				itemsQty: item.orderItems.length,
				id: item._id,
				status: item.orderStatus,
				amount: item.totalPrice
			});
		});

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		dispatch(myOrders());
	}, [dispatch, error]);

	return (
		<div>
			<Table columns={columns} dataSource={rows} />
		</div>
	);
};

export default Orders;
