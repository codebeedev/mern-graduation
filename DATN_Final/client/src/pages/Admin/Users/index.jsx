import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Spin, Table } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, deleteUser, getAllUsers } from '../../../redux/actions/userAction';
import { DELETE_USER_RESET } from '../../../redux/types/userTypes';
import Layout from '../Layout';

const Users = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error, users } = useSelector(state => state.allUsers);

	const { error: deleteError, loading, isDeleted, message: messageProfile } = useSelector(state => state.profile);

	const deleteUserHandler = id => {
		dispatch(deleteUser(id));
	};

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			message.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			message.success(messageProfile);
			navigate('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}

		dispatch(getAllUsers());
	}, [dispatch, error, deleteError, navigate, isDeleted, messageProfile]);

	const columns = [
		{ dataIndex: 'id', title: 'Mã khách hàng' },

		{
			dataIndex: 'email',
			title: 'Email'
		},
		{
			dataIndex: 'name',
			title: 'Họ tên'
		},
		{
			dataIndex: 'key',
			title: 'Hoạt động',
			render: id => {
				return (
					<Fragment>
						<Link to={`/admin/user/${id}`} className="me-3">
							<EditOutlined />
						</Link>

						<Button type="text" onClick={() => deleteUserHandler(id)}>
							<DeleteOutlined style={{ color: 'red' }} />
						</Button>
					</Fragment>
				);
			}
		}
	];

	const rows = [];

	users &&
		users.forEach(item => {
			rows.push({
				key: item._id,
				id: item._id,
				role: item.role,
				email: item.email,
				name: item.name
			});
		});
	return (
		<Layout breadcrumb={['Khách hàng']}>
			<Spin spinning={loading}>
				<Table columns={columns} dataSource={rows} />
			</Spin>
		</Layout>
	);
};

export default Users;
