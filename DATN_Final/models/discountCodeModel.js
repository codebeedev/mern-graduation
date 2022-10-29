const mongoose = require('mongoose');

const discountCodeSchema = new mongoose.Schema(
	{
		code: {
			type: String,
			required: true,
			unique: true
		},
		name: {
			type: String,
			required: [true, 'Vui lòng nhập tên chương trình khuyến mãi']
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.ObjectId,
					ref: 'Product',
					required: true
				},
				isPresent: {
					type: Boolean,
					require: true
				},
				amount: {
					type: Number
				}
			}
		],
		expireDate: {
			type: Date,
			require: [true, 'Vui lòng nhập ngày hết hạn mã!']
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('DiscountCode', discountCodeSchema);
