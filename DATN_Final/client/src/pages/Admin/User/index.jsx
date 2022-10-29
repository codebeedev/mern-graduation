import { EditOutlined } from '@ant-design/icons';
import { Table, Tag } from 'antd';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getAllUserOrders } from '../../../redux/actions/orderAction';
import { getUserDetails } from '../../../redux/actions/userAction';
import { formatPrice } from '../../../utils/products';
import Layout from '../Layout';

const User = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.userDetails);
	const { orders } = useSelector(state => state.allOrders);

	useEffect(() => {
		dispatch(getUserDetails(id));
		dispatch(getAllUserOrders(id));
	}, [dispatch, id]);

	const columns = [
		{ dataIndex: 'id', title: 'Mã hoá đơn' },
		{ dataIndex: 'date', title: 'Ngày tạo' },

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
			},
			filters: [
				{
					text: 'Đã giao hàng',
					value: 'Delivered'
				},
				{
					text: 'Chưa giao hàng',
					value: 'Processing'
				}
			],
			onFilter: (value, record) => record.status.startsWith(value)
		},
		{
			dataIndex: 'itemsQty',
			title: 'Số lượng',
			sorter: (a, b) => a.itemsQty - b.itemsQty
		},

		{
			dataIndex: 'amount',
			title: 'Tổng tiền',
			render: amount => formatPrice(amount),
			sorter: (a, b) => a.amount - b.amount
		},

		{
			dataIndex: 'key',
			title: 'Hoạt động',
			render: id => {
				return (
					<Link className="me-3" to={`/admin/order/${id}`}>
						<EditOutlined />
					</Link>
				);
			}
		}
	];

	const rows = [];

	orders &&
		orders.forEach(item => {
			rows.push({
				id: item._id,
				key: item._id,
				itemsQty: item.orderItems.length,
				amount: item.totalPrice,
				status: item.orderStatus,
				date: moment(item.createdAt).format('MM/DD/YYYY')
			});
		});
	return (
		<Layout breadcrumb={['Khách hàng']}>
			<div
				className="admin-user mx-auto p-5 mb-5"
				style={{ boxShadow: 'rgb(0 0 0 / 30%) 0px 19px 38px, rgb(0 0 0 / 22%) 0px 15px 12px', width: '500px' }}
			>
				<div className="d-flex justify-content-center">
					<div
						className="user-avatar"
						style={{
							width: '100px',
							height: '100px',
							overflow: 'hidden',
							borderRadius: '50%',
							border: '1px solid #000'
						}}
					>
						<img
							style={{ objectFit: 'cover', width: '100px', height: '100px' }}
							src={user?.avatar?.url}
							alt=""
						/>
					</div>
				</div>

				<div className="admin-user-infor mt-5">
					<p className="admin-user-infor-name">
						<span className="fw-bold pe-2">Họ tên:</span>
						<span>{user?.name}</span>
					</p>
					<p className="admin-user-infor-email mt-3">
						<span className="fw-bold pe-2">Email:</span>
						<span>{user?.email}</span>
					</p>
				</div>
			</div>

			<div className="">
				<Table columns={columns} dataSource={rows} />
			</div>
		</Layout>
	);
};

export default User;
