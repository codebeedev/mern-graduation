const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");

class DTO {

    // get messenger
    getMessenger(data) {
        const { user_id1, user_id2 } = data || {};

        const schema = Joi.object({
            user_id1: Joi.string().alphanum().min(1).required(),
            user_id2: Joi.string().alphanum().min(1).required(),
        });

        const { error } = schema.validate({
            user_id1,
            user_id2,
        });
        catchValidateError(error);

        return {
            user_id1, user_id2
        };

    }

    // send messenger
    createMessenger(data) {
        const { user_id1, user_id2, id, message, name, category } = data || {};

        const schema = Joi.object({
            user_id1: Joi.string().alphanum().min(1).required(),
            user_id2: Joi.string().alphanum().min(1).required(),
            id: Joi.string(),
            message: Joi.string(),
            name: Joi.string(),
            category: Joi.string(),
        });

        const { error } = schema.validate({
            user_id1,
            user_id2,
            id,
            message,
            name,
            category
        });

        catchValidateError(error);

        return {
            user_id1, user_id2, id, message, name, category
        };
    }

    initCreateMessenger(data) {
        const { email } = data || {};
        const schema = Joi.object({
            email: Joi.string().email()
        });

        const { error } = schema.validate({
            email,
        });

        catchValidateError(error);

        return {
            email
        };
    }

}

module.exports = new DTO();
