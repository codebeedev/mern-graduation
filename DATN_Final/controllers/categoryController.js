const Category = require('../models/categoryModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const Product = require('../models/productModel');

// create
exports.createCategory = catchAsyncError(async (req, res, next) => {
	const category = await Category.create(req.body);

	res.status(201).json({
		success: true,
		category
	});
});

// get all
exports.getAllCategory = catchAsyncError(async (req, res, next) => {
	const categories = await Category.find();

	res.status(200).json({
		success: true,
		categories
	});
});

// update category (Admin)
exports.updateCategory = catchAsyncError(async (req, res, next) => {
	let category = await Category.findById(req.params.id);

	if (!category) return next(new ErrorHandler('Loại sản phẩm không tồn tại', 404));

	category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false
	});

	res.status(200).json({
		success: true,
		category
	});
});

// delete
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
	const category = await Category.findById(req.params.id);

	if (!category) return next(new ErrorHandler('Loại sản phẩm không tồn tại', 404));

	const products = await Product.find({ category: req.params.id });
	if (products.length > 0) return next(new ErrorHandler('Không thể xóa, vì đang tồn tại sản phẩm', 404));

	await category.remove();

	res.status(200).json({ success: true, message: 'Xoá loại sản phẩm thành công' });
});

// get product by id
exports.getCategoryById = catchAsyncError(async (req, res, next) => {
	const category = await Category.findById(req.params.id);

	if (!category) return next(new ErrorHandler('Loại sản phẩm không tồn tại', 404));

	res.status(200).json({ success: true, category });
});
