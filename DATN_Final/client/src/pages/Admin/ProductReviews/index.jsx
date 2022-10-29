import { DeleteOutlined } from '@ant-design/icons';
import { Button, Input, message, Rate, Table } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, deleteReviews, getAllReviews } from '../../../redux/actions/productAction';
import { DELETE_REVIEW_RESET } from '../../../redux/types/productTypes';
import Layout from '../Layout';

const ProductReviews = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { error: deleteError, isDeleted } = useSelector(state => state.review);

	const { error, reviews } = useSelector(state => state.productReviews);

	const [productId, setProductId] = useState('');

	useEffect(() => {
		if (productId.length === 24) {
			dispatch(getAllReviews(productId));
		}
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (deleteError) {
			message.error(deleteError);
			dispatch(clearErrors());
		}

		if (isDeleted) {
			message.success('Xoá đánh giá thành công!');
			navigate('/admin/productReviews');
			dispatch({ type: DELETE_REVIEW_RESET });
		}
	}, [dispatch, error, deleteError, isDeleted, productId, navigate]);

	const deleteReviewHandler = reviewId => {
		dispatch(deleteReviews(reviewId, productId));
	};

	const productReviewsSubmitHandler = e => {
		e.preventDefault();
		dispatch(getAllReviews(productId));
	};

	const columns = [
		{ dataIndex: 'id', title: 'Mã đánh giá' },

		{
			dataIndex: 'user',
			title: 'Họ tên'
		},

		{
			dataIndex: 'comment',
			title: 'Đánh giá',
			width: '500px'
		},

		{
			dataIndex: 'rating',
			title: 'Xếp hạng',
			render: rating => {
				return (
					<Fragment>
						<Rate disabled value={rating} style={{ fontSize: '12px' }} />
					</Fragment>
				);
			}
		},

		{
			dataIndex: 'key',
			title: 'Hoạt động',
			render: id => {
				return (
					<Fragment>
						<Button type="text" onClick={() => deleteReviewHandler(id)}>
							<DeleteOutlined style={{ color: 'red' }} />
						</Button>
					</Fragment>
				);
			}
		}
	];

	const rows = [];

	reviews &&
		reviews.forEach(item => {
			rows.push({
				id: item._id,
				key: item._id,
				rating: item.rating,
				comment: item.comment,
				user: item.name
			});
		});

	return (
		<Layout breadcrumb={['Đánh giá sản phẩm']}>
			<div className="productReviews">
				<div className="productReviews-filter mx-auto" style={{ width: '500px' }}>
					<label htmlFor="">Mã sản phẩm:</label>
					<Input value={productId} onChange={e => setProductId(e.target.value)} placeholder="Mã sản phẩm" />
					<Button onClick={productReviewsSubmitHandler} className="mt-3" type="primary" block>
						Tìm kiếm
					</Button>
				</div>

				<div className="productReviews-content mt-5">
					{reviews && reviews.length > 0 ? (
						<Table columns={columns} dataSource={rows} />
					) : (
						<h1 className="text-center">Không có đánh giá nào</h1>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default ProductReviews;
