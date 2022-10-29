const { SUCCESS, OK, ERROR } = require("../../configs/constants");
const catchHandlerError = require("../../helpers/catch_handler_error");
const HttpException = require("../../helpers/http_exception");
const MessengerModal = require("../../models/messenger.model");
const Users = require("../../models/user.model");

class MessengerHandlers {
    async getMessenger(data) {
        try {
            const id_admin = '6259945d9972435c645c61bc';
            const { user_id1, user_id2 } = data;

            const result = await MessengerModal.findOne({ user_id1, user_id2 });
            if (!result || result === "null") {

                const id_user = String(user_id1) === id_admin ? user_id2 : user_id1;
                // Tạo ra 2 cuộc trò chuyện
                // 1 cái của admin
                const data1 = {
                    user_id1: id_admin,
                    user_id2: id_user,
                    content: []
                }

                // 1 cái của user
                const data2 = {
                    user_id1: id_user,
                    user_id2: id_admin,
                    content: []
                }

                const result1 = await MessengerModal.insertMany(data1)
                const result2 = await MessengerModal.insertMany(data2)

                if (!result1 || result1 === "null" || !result2 || result2 === "null")
                    return {
                        status: ERROR,
                        response: new HttpException(400, "Can not init create messenger!"),
                    };

                return {
                    status: SUCCESS,
                    response: {
                        status: OK,
                        message: "Create init messenger successfully!",
                        data: { ...result1, ...result2 },
                    },
                };

                // return {
                //     status: ERROR,
                //     response: new HttpException(400, "Can not get messenger!"),
                // };
            }


            return {
                status: SUCCESS,
                response: {
                    status: OK,
                    message: "Get messenger successfully!",
                    data: result,
                },
            };
        } catch (error) {
            return catchHandlerError(error);
        }
    }

    async createMessenger(data) {
        try {
            const { user_id1, user_id2, ...rest } = data;

            const result = await MessengerModal.findOne({ user_id1, user_id2 });

            if (!result || result === "null")
                return {
                    status: ERROR,
                    response: new HttpException(400, "Can not create messenger!"),
                };
            result?.content?.push(rest);
            result.save();

            return {
                status: SUCCESS,
                response: {
                    status: OK,
                    message: "Create messenger successfully!",
                    data: result,
                },
            };
        } catch (error) {
            return catchHandlerError(error);
        }
    }

    async initCreateMessenger(data) {
        try {
            const { email } = data;
            // id_admin
            const id_admin = '6259945d9972435c645c61bc';

            // Tìm user để lấy id_user
            const user = await Users.findOne({ email });
            const id_user = user._id.toString();

            if (!user || user === "null")
                return {
                    status: ERROR,
                    response: new HttpException(400, "Can not find user id with email register!"),
                };

            // Tạo ra 2 cuộc trò chuyện
            // 1 cái của admin
            const data1 = {
                user_id1: id_admin,
                user_id2: id_user,
                content: []
            }

            // 1 cái của user
            const data2 = {
                user_id1: id_user,
                user_id2: id_admin,
                content: []
            }

            const result1 = await MessengerModal.insertMany(data1)
            const result2 = await MessengerModal.insertMany(data2)

            if (!result1 || result1 === "null" || !result2 || result2 === "null")
                return {
                    status: ERROR,
                    response: new HttpException(400, "Can not init create messenger!"),
                };

            return {
                status: SUCCESS,
                response: {
                    status: OK,
                    message: "Create init messenger successfully!",
                    data: { ...result1, ...result2 },
                },
            };
        } catch (error) {
            return catchHandlerError(error);
        }
    }
}

module.exports = new MessengerHandlers();
