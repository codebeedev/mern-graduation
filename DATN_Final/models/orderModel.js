const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	shippingInfo: {
		address: {
			type: String,
			required: true
		},

		email: {
			type: String,
			required: true
		},

		name: {
			type: String,
			required: true
		},

		phone: {
			type: String,
			required: true
		}
	},
	orderItems: [
		{
			name: {
				type: String,
				required: true
			},
			price: {
				type: Number,
				required: true
			},
			quantity: {
				type: Number,
				required: true
			},
			image: {
				type: String,
				required: true
			},
			checkDiscount: {
				type: Boolean
			},
			afterPrice: {
				type: Number
			},
			product: {
				type: mongoose.Schema.ObjectId,
				ref: 'Product',
				required: true
			}
		}
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true
	},
	paymentInfo: {
		id: {
			type: String
		},
		status: {
			type: String
		},
		types: {
			type: String,
			required: true,
			default: 'recieve'
		}
	},
	paidAt: {
		type: Date,
		required: true
	},
	itemsPrice: {
		type: Number,
		required: true,
		default: 0
	},
	shippingPrice: {
		type: Number,
		required: true,
		default: 0
	},
	totalPrice: {
		type: Number,
		required: true,
		default: 0
	},
	orderStatus: {
		type: String,
		required: true,
		default: 'Processing'
	},
	deliveredAt: Date,
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Order', orderSchema);
