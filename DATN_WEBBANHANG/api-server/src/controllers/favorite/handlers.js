const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
// const CartItemModel = require("../../models/cart_item.model");
// const ProductModel = require("../../models/product.model");
const FavoriteModel = require("../../models/favorite_product.model");

class FavoriteHandlers {
    async addToFavorite(data) {
        try {
            const favoriteInfo = await FavoriteModel.findOne({ user_id: data.user_id, product_id: data.product_id });

            if (favoriteInfo?._id) return {
                status: ERROR,
                response: new HttpException(400, "Sản phẩm này đã có trong danh sách yêu thích!"),
            };

            const result = await FavoriteModel.create(data);
            if (!result || result === "null")
                return {
                    status: ERROR,
                    response: new HttpException(400, "Không thể thêm vào danh sách yêu thích!"),
                };

            return {
                status: SUCCESS,
                response: {
                    status: OK,
                    message: "Thêm vào danh sách thành thông!",
                    data: result,
                },
            };

        } catch (error) {
            return catchHandlerError(error);
        }
    }

    // async updateCartItem(_id, newData) {
    //     try {
    //         const query = { _id };
    //         const data = newData;
    //         const option = {
    //             new: true,
    //             runValidations: true,
    //         };

    //         const result = await CartItemModel.findOneAndUpdate(query, data, option);

    //         if (!result || result === "null")
    //             return {
    //                 status: ERROR,
    //                 response: new HttpException(400, "Can not update cart item!"),
    //             };

    //         return {
    //             status: SUCCESS,
    //             response: {
    //                 status: OK,
    //                 message: "Update cart item successfully!",
    //                 data: result,
    //             },
    //         };
    //     } catch (error) {
    //         return catchHandlerError(error);
    //     }
    // }

    // async removeCartItems(_ids) {
    //     try {
    //         const result = await CartItemModel.deleteMany({
    //             _id: {
    //                 $in: _ids
    //             },
    //         });

    //         if (!result || result === "null")
    //             return {
    //                 status: ERROR,
    //                 response: new HttpException(400, "Can not remove cart item!"),
    //             };

    //         return {
    //             status: SUCCESS,
    //             response: {
    //                 status: OK,
    //                 message: "Remove cart item successfully!",
    //                 data: result,
    //             },
    //         };
    //     } catch (error) {
    //         return catchHandlerError(error);
    //     }
    // }

    // async queryCart(params) {
    //     try {
    //         const results = await CartItemModel.find(params).populate({
    //             path: "product",
    //             model: "product_model",
    //         });

    //         if (!results || results === "null")
    //             return {
    //                 status: ERROR,
    //                 response: new HttpException(400, "Can not get cart!"),
    //             };

    //         return {
    //             status: SUCCESS,
    //             response: {
    //                 status: OK,
    //                 message: "Get cart successfully!",
    //                 data: results,
    //             },
    //         };
    //     } catch (error) {
    //         return catchHandlerError(error);
    //     }
    // }
}

module.exports = new FavoriteHandlers();
