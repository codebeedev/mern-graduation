const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	err.message = err.message || 'Lỗi máy chủ!';

	// wrong mongodb Id error
	if (err.name === 'CastError') {
		const message = `Nguồn tài nguyên không được tìm thấy. Không hợp lệ: ${err.path}`;
		err = new ErrorHandler(message, 400);
	}

	// Mongoose duplicate key error
	if (err.code === 11000) {
		const message = `Đã nhập bản sao ${Object.keys(err.keyValue)}`;
		err = new ErrorHandler(message, 400);
	}

	// Wrong JWT error
	if (err.name === 'JsonWebTokenError') {
		const message = `Mã thông báo không hợp lệ, Hãy thử lại`;
		err = new ErrorHandler(message, 400);
	}

	// JWT EXPIRE error
	if (err.name === 'TokenExpiredError') {
		const message = `Mã thông báo đã hết hạn, hãy thử lại`;
		err = new ErrorHandler(message, 400);
	}

	res.status(err.statusCode).json({
		success: false,
		message: err.message
	});
};
