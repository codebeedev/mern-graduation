const express = require('express');
const {
	createCategory,
	getAllCategory,
	updateCategory,
	deleteCategory,
	getCategoryById
} = require('../controllers/categoryController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/categories').get(getAllCategory);

router.route('/admin/category/new').post(isAuthenticatedUser, authorizeRoles('admin'), createCategory);

router
	.route('/admin/category/:id')
	.get(isAuthenticatedUser, authorizeRoles('admin'), getCategoryById)
	.put(isAuthenticatedUser, authorizeRoles('admin'), updateCategory)
	.delete(isAuthenticatedUser, authorizeRoles('admin'), deleteCategory);

module.exports = router;
