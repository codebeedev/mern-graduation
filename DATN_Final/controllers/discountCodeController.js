const DiscountCode = require('../models/discountCodeModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

// create
exports.createDiscount = catchAsyncError(async (req, res, next) => {
	let myDiscountCode = coupongenerator();

	const { expireDate, name } = req.body;

	// if (isPresent) {
	// 	if (amount <= 0 || amount >= 100)
	// 		return next(new ErrorHandler('Vui lòng nhập lại số lượng giảm trong khoảng 1-100', 404));
	// }

	const discountCode = await DiscountCode.create({ code: myDiscountCode, expireDate, name });

	res.status(201).json({
		success: true,
		discountCode
	});
});

// get the code that has not expired
exports.getAllDiscount = catchAsyncError(async (req, res, next) => {
	const discountCodes = await DiscountCode.find();

	res.status(200).json({
		success: true,
		discountCodes
	});
});

// detail
exports.getDetailDiscount = catchAsyncError(async (req, res, next) => {
	const discount = await DiscountCode.findById(req.params.id).populate({
		path: 'products',
		populate: { path: 'productId' }
	});
	if (!discount) return next(new ErrorHandler('Mã giảm giá không tồn tại', 404));

	res.status(200).json({ success: true, discount });
});

// delete
exports.deleteDiscount = catchAsyncError(async (req, res, next) => {
	const discount = await DiscountCode.findById(req.params.id);
	if (!discount) return next(new ErrorHandler('Mã giảm giá không tồn tại', 404));

	await discount.remove();

	res.status(200).json({ success: true, message: 'Xoá mã giảm giá thành công!' });
});

// update
exports.updateDiscountProduct = catchAsyncError(async (req, res, next) => {
	const { productId, isPresent, amount } = req.body;

	const discount = await DiscountCode.findById(req.params.id);
	if (!discount) return next(new ErrorHandler('Mã giảm giá không tồn tại', 404));

	if (!amount) {
		const product = await Product.findById(productId);
		product.discount = req.params.id;

		await product.save({ validateBeforeSave: false });
	}

	const isUpdate = discount.products.find(item => item.productId.toString() === productId.toString());

	if (isUpdate) {
		discount.products.forEach(pro => {
			if (pro.productId.toString() === productId.toString()) (pro.isPresent = isPresent), (pro.amount = amount);
		});
	} else {
		discount.products.push({
			productId,
			isPresent,
			amount
		});
	}

	await discount.save({ validateBeforeSave: false });

	res.json({
		success: true,
		message: 'Cập nhật thành công!'
	});
});

exports.deleteDiscountProduct = catchAsyncError(async (req, res, next) => {
	const discount = await DiscountCode.findById(req.query.id);
	if (!discount) return next(new ErrorHandler('Mã giảm giá không tồn tại', 404));

	const products = discount.products.filter(pro => pro.productId.toString() !== req.query.productId.toString());

	const product = await Product.findById(req.query.productId);

	product.discount = '';

	await product.save({ validateBeforeSave: false });

	await DiscountCode.findByIdAndUpdate(
		req.query.id,
		{
			products
		},
		{
			new: true,
			runValidators: true,
			useFindAndModify: false
		}
	);

	res.status(200).json({
		success: true
	});
});

// get product discount
exports.getProductDiscount = catchAsyncError(async (req, res, next) => {
	const products = await Product.find();
	const discounts = await DiscountCode.find({
		expireDate: { $gte: new Date() }
	});

	const productDiscounts = products.filter(
		pro => !discounts.map(val => val._id?.toString()).includes(pro.discount?.toString())
	);

	res.status(200).json({
		success: true,
		productDiscounts
	});
});

function coupongenerator() {
	var coupon = '';
	var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < 10; i++) {
		coupon += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return coupon;
}
