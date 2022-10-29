const express = require('express');
const {
	getAllDiscount,
	createDiscount,
	deleteDiscount,
	updateDiscountProduct,
	getDetailDiscount,
	deleteDiscountProduct,
	getProductDiscount
} = require('../controllers/discountCodeController');
const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/create_discount').post(isAuthenticatedUser, createDiscount);

router.route('/discounts').get(isAuthenticatedUser, getAllDiscount);

router
	.route('/discount/:id')
	.get(isAuthenticatedUser, getDetailDiscount)
	.delete(isAuthenticatedUser, deleteDiscount)
	.put(isAuthenticatedUser, updateDiscountProduct);

router
	.route('/discount_product')
	.delete(isAuthenticatedUser, deleteDiscountProduct)
	.get(isAuthenticatedUser, getProductDiscount);

module.exports = router;
