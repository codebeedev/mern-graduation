const mongoose = require('mongoose');
const { Schema } = mongoose;

const SaleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    description: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      default: true,
    },
  },
  {
    collection: 'sales',
    timestamps: true,
  }
);

module.exports = mongoose.model('sale_model', SaleSchema);
