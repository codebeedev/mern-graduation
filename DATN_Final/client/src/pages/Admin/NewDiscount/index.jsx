import { Button, DatePicker, Input, message, Spin } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, createDiscount } from '../../../redux/actions/discountAction';
import { NEW_DISCOUNT_RESET } from '../../../redux/types/discountType';
import Layout from '../Layout';

const NewDiscount = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { loading, error, success } = useSelector(state => state.newDiscount);

	const [name, setName] = useState('');
	const [dateTime, setDateTime] = useState();
	const [expireDate, setExpireDate] = useState();

	useEffect(() => {
		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (success) {
			message.success('Thêm mã giảm giá thành công!');
			dispatch({ type: NEW_DISCOUNT_RESET });
		}
	}, [dispatch, error, success]);

	const onChange = (value, dateString) => {
		setDateTime(value);
		setExpireDate(dateString);
	};

	const handleAdd = async e => {
		e.preventDefault();

		await dispatch(
			createDiscount({
				name,
				expireDate
			})
		);

		let idNewDiscount = await localStorage.getItem('idNewDiscount');

		!loading && !error && navigate(`/admin/discount/${idNewDiscount}`);
	};
	const disabledDate = current => {
		return current && current < moment().endOf('day');
	};

	return (
		<Layout breadcrumb={['Thêm mã giảm giá']}>
			<div className="mx-auto" style={{ width: '500px' }}>
				<Spin spinning={loading}>
					<label className="mt-3 d-block" htmlFor="">
						Tên chương trình giảm giá:
					</label>
					<Input
						value={name}
						onChange={e => setName(e.target.value)}
						placeholder="Tên chương trình giảm giá"
					/>
					<label className="mt-3" htmlFor="">
						Hạn mã giảm:{' '}
					</label>
					<DatePicker
						className="d-block"
						onChange={onChange}
						disabledDate={disabledDate}
						value={dateTime}
						showTime={{ format: 'HH:mm' }}
						format="MM/DD/YYYY HH:mm"
					/>
					<Button className="mt-4" onClick={handleAdd} block type="primary">
						Lưu và tiếp tục
					</Button>
				</Spin>
			</div>
		</Layout>
	);
};

export default NewDiscount;
