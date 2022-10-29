const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary = require('cloudinary');

// register
exports.registerUser = catchAsyncError(async (req, res, next) => {
	const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
		folder: 'avatars',
		width: 150,
		crop: 'scale'
	});

	const { name, email, password } = req.body;

	const user = await User.create({
		name,
		email,
		password,
		avatar: {
			public_id: myCloud.public_id,
			url: myCloud.secure_url
		}
	});

	sendToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
	const { email, password } = req.body;
	if (!email || !password) return next(new ErrorHandler('Vui lòng điền đầy đủ thông tin', 400));

	const user = await User.findOne({ email }).select('+password');
	if (!user) return next(new ErrorHandler('Email hoặc mật khẩu không đúng', 401));

	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) return next(new ErrorHandler('Mật khẩu không đúng', 401));

	sendToken(user, 200, res);
});

// logout user
exports.logout = catchAsyncError(async (req, res, next) => {
	res.cookie('token', null, { expires: new Date(Date.now()), httpOnly: true });

	res.status(200).json({
		success: true,
		message: 'Đã đăng xuất!'
	});
});

// forgot password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return next(new ErrorHandler('Tài khoản không tồn tại!', 404));

	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	const resetPasswordUrl = `${req.protocol}://${req.get('host')}/password/reset/${resetToken}`;

	// const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

	const message = `Mã thông báo đặt lại mật khẩu của bạn là: - \n\n ${resetPasswordUrl} \n\nNếu bạn chưa yêu cầu email này thì hãy bỏ qua nó.`;

	try {
		await sendEmail({
			email: user.email,
			subject: `Khôi phục mật khẩu`,
			message
		});

		res.status(200).json({
			success: true,
			message: `Đã gửi mã cập nhật lại mật khẩu đến ${user.email}`
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset Password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
	// creating token hash
	const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() }
	});

	if (!user) {
		return next(new ErrorHandler('Mã thông báo đặt lại mật khẩu không hợp lệ hoặc đã hết hạn', 400));
	}

	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler('Vui lòng nhập đúng mật khẩu', 400));
	}

	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;

	await user.save();

	sendToken(user, 200, res);
});

// get user detail
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);

	res.status(200).json({
		success: true,
		user
	});
});

// update User password
exports.updatePassword = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id).select('+password');

	const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

	if (!isPasswordMatched) {
		return next(new ErrorHandler('Mật khẩu cũ không đúng', 400));
	}

	if (req.body.newPassword !== req.body.confirmPassword) {
		return next(new ErrorHandler('Mật khẩu không hợp lệ', 400));
	}

	user.password = req.body.newPassword;

	await user.save();

	sendToken(user, 200, res);
});

// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		phone: req.body.phone,
		address: req.body.address
	};

	if (req.body.avatar) {
		const user = await User.findById(req.user.id);

		const imageId = user.avatar.public_id;

		await cloudinary.v2.uploader.destroy(imageId);

		const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
			folder: 'avatars',
			width: 150,
			crop: 'scale'
		});

		newUserData.avatar = {
			public_id: myCloud.public_id,
			url: myCloud.secure_url
		};
	}

	const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true
	});
});

// Get all users(admin)
exports.getAllUser = catchAsyncError(async (req, res, next) => {
	const users = await User.find({ role: 'User' });

	res.status(200).json({
		success: true,
		users
	});
});

// Get single user (admin)
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		return next(new ErrorHandler(`Người dùng không tồn tại với Id: ${req.params.id}`));
	}

	res.status(200).json({
		success: true,
		user
	});
});

// update User Role -- Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
	const newUserData = {
		name: req.body.name,
		email: req.body.email,
		role: req.body.role
	};

	await User.findByIdAndUpdate(req.params.id, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true
	});
});

// Delete User --Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(new ErrorHandler(`Người dùng không tồn tại với Id: ${req.params.id}`, 400));
	}

	const imageId = user.avatar.public_id;
	await cloudinary.v2.uploader.destroy(imageId);

	const orders = await Order.find({ user: req.params.id });

	if (orders.length > 0) {
		await orders.map(async order => {
			await order.remove();
		});
	}

	await user.remove();

	res.status(200).json({
		success: true,
		message: 'Xoá  người dùng thành công!'
	});
});
