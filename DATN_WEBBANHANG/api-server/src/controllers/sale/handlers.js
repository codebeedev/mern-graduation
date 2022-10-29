const { SUCCESS, OK, ERROR, PAGE_SIZE } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const SaleModel = require("../../models/sale.model");

class SaleHandlers {
  async createSale(data) {
    try {
      const result = await SaleModel.create(data);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not create sale!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Create sale successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async updateSale(_id, newData) {
    try {
      const query = { _id };
      const data = newData;
      const option = {
        new: true,
        runValidations: true,
      };

      const result = await SaleModel.findOneAndUpdate(query, data, option);

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not update sale!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Update sale successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async removeSale(_id) {
    try {
      const result = await SaleModel.deleteOne({ _id });

      if (!result || result === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not remove sale!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Remove sale successfully!",
          data: result,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }

  async querySales(params, conditions) {
    try {
      const { limit, start, page } = conditions;
      const query = {
        ...params,
      };

      const sortQuery = {};

      const total = await SaleModel.countDocuments(query);
      const results = await SaleModel.find(query)
        .sort(sortQuery)
        .skip(start)
        .limit(limit);

      if (!results || results === "null")
        return {
          status: ERROR,
          response: new HttpException(400, "Can not get sales!"),
        };

      return {
        status: SUCCESS,
        response: {
          status: OK,
          message: "Get sales successfully!",
          pagination: {
            total,
            size: PAGE_SIZE,
            current: page,
          },
          data: results,
        },
      };
    } catch (error) {
      return catchHandlerError(error);
    }
  }
}

module.exports = new SaleHandlers();
