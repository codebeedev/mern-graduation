import { AuditOutlined, PhoneOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Input, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearErrors, loadUser, updateProfile } from '../../../redux/actions/userAction';
import { UPDATE_PROFILE_RESET } from '../../../redux/types/userTypes';

const UpdateProfile = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { user } = useSelector(state => state.user);
	const { error, isUpdated, loading } = useSelector(state => state.profile);

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [avatar, setAvatar] = useState();
	const [avatarPreview, setAvatarPreview] = useState('');

	useEffect(() => {
		if (user) {
			setName(user.name);
			setAddress(user?.address);
			setPhone(user?.phone);
			setAvatarPreview(user.avatar.url);
		}

		if (error) {
			message.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			message.success('Cập nhật thành công!');
			dispatch(loadUser());

			navigate('/account');

			dispatch({
				type: UPDATE_PROFILE_RESET
			});
		}
	}, [dispatch, error, navigate, user, isUpdated]);

	const handleImageChange = e => {
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result);
				setAvatar(reader.result);
			}
		};

		reader.readAsDataURL(e.target.files[0]);
	};

	const updateProfileSubmit = e => {
		e.preventDefault();

		const myForm = new FormData();

		myForm.set('name', name);
		myForm.set('phone', phone);
		myForm.set('address', address);
		if (avatar) myForm.set('avatar', avatar);
		dispatch(updateProfile(myForm));
	};

	return (
		<div className="account-profile">
			<div className="account-profile-title d-flex justify-content-between align-items-center">
				<div className="account-profile-title-name">
					{user?.name} <span className="email">({user?.email})</span>
				</div>
				<div className="account-profile-title-action">
					<SettingOutlined />
				</div>
			</div>
			<div className="account-profile-edit">
				<div className="d-flex" id="registerImage">
					<Avatar src={avatarPreview} size="large" icon={<UserOutlined />} />
					<input type="file" name="avatar" accept="image/*" onChange={handleImageChange} />
				</div>
				<Input
					value={name}
					onChange={e => setName(e.target.value)}
					className="mt-3"
					placeholder="Họ tên"
					prefix={<UserOutlined />}
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
				<Button loading={loading} onClick={updateProfileSubmit} className="mt-3" type="primary" danger>
					CẬP NHẬT
				</Button>
			</div>
		</div>
	);
};

export default UpdateProfile;
