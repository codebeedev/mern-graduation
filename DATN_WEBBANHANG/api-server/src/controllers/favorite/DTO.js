const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const _ = require("lodash");

class DTO {
    addToFavorite(data) {
        const { user_id, product_id, name, thumbnail_url, price, stock, sold } = data || {};

        const schema = Joi.object({
            user_id: Joi.string().alphanum().min(1).required(),
            product_id: Joi.string().alphanum().min(1).required(),
            name: Joi.string().min(1),
            thumbnail_url: Joi.string().required(),
            price: Joi.number().min(0),
            stock: Joi.number().min(0),
            sold: Joi.number().min(0)
        });

        const { error } = schema.validate({
            user_id,
            product_id,
            name,
            thumbnail_url,
            price,
            stock,
            sold
        });

        catchValidateError(error);

        return { ...data };
    }

    // updateFavoriteItem(_id, newData) {
    //     const { quantity } = newData || {};

    //     const schema = Joi.object({
    //         quantity: Joi.number().min(1),
    //     });

    //     const { error } = schema.validate({
    //         quantity,
    //     });

    //     catchValidateError(error);

    //     return {
    //         _id,
    //         newData,
    //     };
    // }

    // removeFavoriteItems(data) {
    //     const { _ids } = data;

    //     const schema = Joi.object({
    //         _ids: Joi.array().min(1).items(Joi.string().alphanum()).required(),
    //     });

    //     const { error } = schema.validate({
    //         _ids,
    //     });

    //     catchValidateError(error);

    //     return _ids;
    // }

    // queryFavorite(params) {
    //     const { user_id } = params || {};

    //     const schema = Joi.object({
    //         user_id: Joi.string().alphanum().min(1),
    //     });

    //     const { error } = schema.validate({
    //         user_id,
    //     });

    //     catchValidateError(error);

    //     return {
    //         user_id,
    //     };
    // }
}

module.exports = new DTO();
