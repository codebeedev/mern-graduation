const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Vui lòng diền tên sản phẩm']
	},
	description: {
		type: String,
		required: [true, 'Vui lòng diền thông tin sản phẩm']
	},
	price: {
		type: Number,
		require: [true, 'Vui lòng điền giá sản phẩm']
	},
	ratings: {
		type: Number,
		default: 0
	},
	images: [
		{
			public_id: {
				type: String,
				required: true
			},
			url: {
				type: String,
				required: true
			}
		}
	],
	category: {
		type: mongoose.Schema.ObjectId,
		ref: 'Category',
		required: true
	},
	Stock: {
		type: Number,
		required: [true, 'Vui lòng nhập kho sản phẩm'],
		maxLength: [4, 'Kho sản phẩm không được quá 4 ký tự'],
		default: 1
	},
	sold: {
		type: Number,
		default: 0
	},
	numOfReviews: {
		type: Number,
		default: 0
	},
	reviews: [
		{
			user: {
				type: mongoose.Schema.ObjectId,
				ref: 'User',
				required: true
			},
			name: {
				type: String,
				required: true
			},
			rating: {
				type: Number,
				required: true
			},
			comment: {
				type: String,
				required: true
			}
		}
	],
	discount: {
		type: mongoose.Schema.ObjectId,
		ref: 'DiscountCode'
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Product', productSchema);
