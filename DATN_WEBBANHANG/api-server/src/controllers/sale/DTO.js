const Joi = require("joi");
const catchValidateError = require("../../helpers/catch_validate_error");
const getPage = require("../../helpers/get_page");

class DTO {
  createSale(data) {
    const { title, description, value, date } = data || {};

    const schema = Joi.object({
      title: Joi.string().min(1).required(),
      description: Joi.string().min(1).required(),
      value: Joi.number().min(1).required(),
      date: Joi.string().min(1).required(),
    });

    const { error } = schema.validate({
      title,
      description,
      value,
      date,
    });

    catchValidateError(error);

    return data;
  }

  updateSale(_id, newData) {
    const { title, description, value, date } =
      newData || {};

    const schema = Joi.object({
      _id: Joi.string().alphanum(),
      title: Joi.string().min(1),
      description: Joi.string().min(1),
      value: Joi.number().min(1),
      date: Joi.string().min(1),
    });

    const { error } = schema.validate({
      _id,
      title,
      description,
      value,
      date,
    });

    catchValidateError(error);

    return {
      _id,
      newData,
    };
  }

  removeSale(_id) {
    const schema = Joi.object({
      _id: Joi.string().alphanum().required(),
    });

    const { error } = schema.validate({
      _id,
    });

    catchValidateError(error);

    return _id;
  }

  querySales(params) {
    const { page } = params || {};

    const schema = Joi.object({
      page: Joi.number().min(1),
    });

    const { error } = schema.validate({
      page,
    });

    catchValidateError(error);

    const { start, limit } = getPage(page || 0);

    delete params["page"];

    return {
      conditions: {
        start,
        limit,
        page,
      },
      params,
    };
  }
}

module.exports = new DTO();
