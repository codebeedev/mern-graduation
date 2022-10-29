const { Router } = require("express");
const { USER } = require("../configs/constants");
const MessengerControllers = require("../controllers/messenger/index");
const auth = require("../middlewares/auth");
const messengerRouter = Router();

// commentRouter.get("/:product_id", auth(USER), CommentControllers.queryComments);
messengerRouter.post("/init-messenger", MessengerControllers.initCreateMessenger);
messengerRouter.post("/", MessengerControllers.getMessenger);
messengerRouter.post("/send", MessengerControllers.createMessenger);

module.exports = messengerRouter;
