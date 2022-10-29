import React, { useState } from 'react';
import { Breadcrumb, Input, Tooltip, Button } from 'antd';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import './style.scss';

function Contact() {
	const formatNumber = value => new Intl.NumberFormat().format(value);

	const NumericInput = props => {
		const { value, onChange } = props;

		const handleChange = e => {
			const { value: inputValue } = e.target;
			const reg = /^-?\d*(\.\d*)?$/;

			if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
				onChange(inputValue);
			}
		}; // '.' at the end or only '-' in the input box.

		const handleBlur = () => {
			let valueTemp = value;

			if (value.charAt(value.length - 1) === '.' || value === '-') {
				valueTemp = value.slice(0, -1);
			}

			onChange(valueTemp.replace(/0*(\d+)/, '$1'));
		};

		const title = value ? (
			<span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
		) : (
			'Input a number'
		);
		return (
			<Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
				<Input
					{...props}
					onChange={handleChange}
					onBlur={handleBlur}
					placeholder="Số điện thoại của bạn"
					maxLength={25}
				/>
			</Tooltip>
		);
	};
	const [value, setValue] = useState('');

	const { TextArea } = Input;
	return (
		<div className="container contact" style={{ marginTop: '150px', display: 'flex', flexDirection: 'column' }}>
			<h1
				style={{
					display: 'block',
					width: '100%',
					textAlign: 'center',
					margin: '50px',
					fontWeight: '700',
					fontSize: '35px',
					textTransform: 'uppercase'
				}}
			>
				Liên hệ
			</h1>
			<Breadcrumb>
				<Breadcrumb.Item>
					<Link to="/">Trang chủ</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Liên hệ</Breadcrumb.Item>
			</Breadcrumb>
			<div className="row">
				<div className="col-md-6">
					<Link to="/">
						<img src={logo} width="300" height="auto" alt="img" />
					</Link>
				</div>
				<div className="col-md-6">
					<div className="box-info-contact">
						<ul className="list-info">
							<li>
								<p>Địa chỉ chúng tôi</p>
								<p>
									<strong>
										{' '}
										Văn phòng Pandora Online Tầng L1 , 11-13 Huỳnh Thúc Kháng, Phường Bến Nghé, Quận
										1, TP.Hồ Chí Minh, Việt Nam.
									</strong>
								</p>
							</li>
							<li>
								<p>Email chúng tôi</p>
								<p>
									<strong>pandoraonline@norbreeze.com</strong>
								</p>
							</li>
							<li>
								<p>Điện thoại</p>
								<p>
									<strong>1900 299 998</strong>
								</p>
							</li>
							<li>
								<p>Thời gian làm việc</p>
								<p>
									<strong>Thứ 2 đến Thứ 6 Hoạt động từ 09:00 đến 20:00</strong>
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="contactFormWrapper">
				<div className="box-send-contact">
					<h2
						style={{
							fontWeight: '700',
							fontSize: '25px',
							margin: ' 40px 0 35px'
						}}
					>
						Gửi thắc mắc cho chúng tôi
					</h2>
					<div id="contactFormWrapper">
						<div className="row" style={{ marginBottom: '10px' }}>
							<div className="col-md-4">
								<Input placeholder="Tên của bạn" className=".ant-input" />
							</div>
							<div className="col-md-4">
								<Input placeholder="Email của bạn" className=".ant-input" />
							</div>
							<div className="col-md-4">
								<NumericInput
									style={{
										width: '100%'
									}}
									value={value}
									onChange={setValue}
									className=".ant-input"
								/>
							</div>
						</div>
						<TextArea rows={4} placeholder="Nội dung" style={{ marginBottom: '15px' }} />

						<Button type="primary" className="btn_send">
							Gửi cho chúng tôi
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contact;
