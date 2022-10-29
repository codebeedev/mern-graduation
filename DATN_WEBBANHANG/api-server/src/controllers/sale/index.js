const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const SaleHandlers = require("./handlers");
const { OK, ERROR } = require("../../configs/constants");

class SaleControllers {
  async createSale(req, res, next) {
    try {
      const data = DTO.createSale(req.body);
      const response = await SaleHandlers.createSale(data);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async updateSale(req, res, next) {
    try {
      const { _id } = req.params;

      const { newData } = DTO.updateSale(_id, req.body);
      const response = await SaleHandlers.updateSale(_id, newData);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async removeSale(req, res, next) {
    try {
      const { _id } = req.params;

      DTO.removeSale(_id);
      const response = await SaleHandlers.removeSale(_id);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }

  async querySales(req, res, next) {
    try {
      const { params, conditions } = DTO.querySales(req.query);
      const response = await SaleHandlers.querySales(params, conditions);

      if (response.status === ERROR) return next(response.response);

      return res.json(response.response);
    } catch (error) {
      return next(
        new HttpException(error.status || 500, catchRoutesError(error))
      );
    }
  }
}

module.exports = new SaleControllers();
