const mongoose = require("mongoose");
const { INLAND, OVERSEA } = require("../configs/constants");
const { Schema } = mongoose;

const ProductFavoriteSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "users",
        },
        product_id: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "products",
        },
        name: {
            type: String,
            // text: true,
            // unique: true,
        },
        // categories: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "categories",
        //     },
        // ],
        // brand: {
        //     type: Schema.Types.ObjectId,
        //     ref: "brands",
        // },
        thumbnail_url: {
            type: String,
        },
        // thumbnail_id: {
        //     type: String,
        // },
        price: {
            type: Number,
            min: 1000,
        },
        sale_percent: {
            type: Number,
            max: 100,
        },
        stock: {
            type: Number,
            min: 0,
        },
        sold: {
            type: Number,
            min: 0,
        },
        // favorite: {
        //     type: String,
        //     unique: true
        // }

        // rate: {
        //     type: Number,
        //     min: 0,
        //     max: 5,
        //     default: 0,
        // },
        // origin: {
        //     type: String,
        //     enum: [INLAND, OVERSEA],
        //     default: INLAND,
        // },
        // description: {
        //     type: String,
        // },
        // short_description: {
        //     type: String,
        //     maxlength: 300,
        // },
        // insurance: {
        //     type: String,
        // },
        // in_home: {
        //     type: Boolean,
        //     default: false,
        // },
        // status: {
        //     type: Boolean,
        //     default: true,
        // },
        // slug: {
        //     type: String,
        //     required: true,
        // },
    },
    {
        collection: "product_favorite",
        timestamps: true,
    }
);

module.exports = mongoose.model("product_favorite", ProductFavoriteSchema);
