const DTO = require("./DTO");
const HttpException = require("../../helpers/http_exception");
const catchRoutesError = require("../../helpers/catch_routes_error");
const MessengerHandlers = require("./handler");
const { OK, ERROR } = require("../../configs/constants");

class MessengerControllers {
    async getMessenger(req, res, next) {
        try {
            const data = DTO.getMessenger(req.body);
            const response = await MessengerHandlers.getMessenger(data);

            if (response.status === ERROR) return next(response.response);

            return res.json(response.response);
        } catch (error) {
            return next(
                new HttpException(error.status || 500, catchRoutesError(error))
            );
        }
    }

    async createMessenger(req, res, next) {
        try {
            const data = DTO.createMessenger(req.body);
            const response = await MessengerHandlers.createMessenger(data);

            if (response.status === ERROR) return next(response.response);

            return res.json(response.response);
        } catch (error) {
            return next(
                new HttpException(error.status || 500, catchRoutesError(error))
            );
        }
    }

    async initCreateMessenger(req, res, next) {
        try {
            const data = DTO.initCreateMessenger(req.body);
            const response = await MessengerHandlers.initCreateMessenger(data);

            if (response.status === ERROR) return next(response.response);

            return res.json(response.response);
        } catch (error) {
            return next(
                new HttpException(error.status || 500, catchRoutesError(error))
            );
        }
    }

}

module.exports = new MessengerControllers();
