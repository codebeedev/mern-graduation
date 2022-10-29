import {
	AppstoreAddOutlined,
	AreaChartOutlined,
	CommentOutlined,
	FileAddOutlined,
	FundProjectionScreenOutlined,
	GoldOutlined,
	ProfileOutlined,
	QrcodeOutlined,
	SisternodeOutlined,
	TeamOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Router from './Router';

import './styles.scss';

const { Header, Sider } = Layout;

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label
	};
}

const items = [
	getItem(<Link to="/admin">Trang Chủ</Link>, '1', <FundProjectionScreenOutlined />),
	getItem('Sản phẩm', 'subProduct', <ProfileOutlined />, [
		getItem(<Link to="/admin/products">Sản phầm</Link>, 'products', <ProfileOutlined />),
		getItem(<Link to="/admin/product">Thêm sản phầm</Link>, 'newProduct', <FileAddOutlined />)
	]),
	getItem('Loại sản phẩm', 'sub1', <GoldOutlined />, [
		getItem(<Link to="/admin/categories">Loại sản phẩm</Link>, '3', <GoldOutlined />),
		getItem(<Link to="/admin/category">Thêm loại sản phẩm</Link>, '4', <SisternodeOutlined />)
	]),
	getItem(<Link to="/admin/users">Khách hàng</Link>, 'sub2', <TeamOutlined />),
	getItem(<Link to="/admin/orders">Đơn đặt hàng</Link>, '9', <AreaChartOutlined />),
	getItem(<Link to="/admin/productReviews">Đánh giá sản phẩm</Link>, '10', <CommentOutlined />),
	getItem('Mã giảm giá', 'code', <QrcodeOutlined />, [
		getItem(<Link to="/admin/discounts">Mã giảm giá</Link>, '11', <QrcodeOutlined />),
		getItem(<Link to="/admin/discount">Thêm mã giảm giá</Link>, '12', <AppstoreAddOutlined />)
	])
];

const Admin = () => {
	const [collapsed, setCollapsed] = useState(false);

	const onCollapse = () => {
		setCollapsed(!collapsed);
	};

	const onClickTest = ({ item, key, keyPath, domEvent }) => {
		// console.log({ item, key, keyPath, domEvent });
	};

	return (
		<Layout
			style={{
				minHeight: '100vh'
			}}
		>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="logo" />
				<Menu onClick={onClickTest} theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
			</Sider>
			<Layout className="site-layout">
				<Header
					className="site-layout-background"
					style={{
						padding: 0
					}}
				/>
				<Router />
			</Layout>
		</Layout>
	);
};

export default Admin;
