const express = require('express');
const {
	createProduct,
	updateProduct,
	deleteProduct,
	getProductById,
	createProductReview,
	getProductReviews,
	deleteReview,
	getAllProducts,
	getAdminProducts,
	getHotProducts
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/hot').get(getHotProducts);

router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAdminProducts);

router
	.route('/admin/product/:id')
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

router.route('/product/:id').get(getProductById);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews').get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

module.exports = router;
