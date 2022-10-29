const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Vui lòng điền tên của bạn.'],
		maxlength: [30, 'Tên không quá 30 ký tự'],
		minlength: [4, 'Tên không it hơn 4 ký tự']
	},
	email: {
		type: String,
		required: [true, 'Vui lòng điền email!'],
		unique: true,
		validate: [validator.isEmail, 'Vui lòng nhập đúng địa chỉ email']
	},
	password: {
		type: String,
		required: [true, 'Vui lòng điền mật khẩu của bạn!'],
		minlength: [8, 'Mật khẩu không ít hơn 8 ký tự'],
		select: false
	},
	address: {
		type: String,
		default: ''
	},
	phone: {
		type: String,
		default: ''
	},
	avatar: {
		public_id: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		}
	},
	role: {
		type: String,
		default: 'User'
	},
	purchased: [
		{
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'Product'
			}
		}
	],
	resetPasswordToken: String,
	resetPasswordExpire: Date
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});

// JWT Token
userSchema.methods.getJWTToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRE
	});
};

// compare password
userSchema.methods.comparePassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

// generating password reset password
userSchema.methods.getResetPasswordToken = function () {
	const resetToken = crypto.randomBytes(20).toString('hex');

	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

	return resetToken;
};

module.exports = mongoose.model('User', userSchema);
