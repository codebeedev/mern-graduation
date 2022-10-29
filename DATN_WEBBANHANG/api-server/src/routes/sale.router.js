const { Router } = require("express");
const { ADMIN } = require("../configs/constants");
const SaleControllers = require("../controllers/sale/index");
const auth = require("../middlewares/auth");
const saleRouter = Router();

saleRouter.get("/", SaleControllers.querySales);

saleRouter.delete("/:_id", auth(ADMIN), SaleControllers.removeSale);
saleRouter.put("/:_id", auth(ADMIN), SaleControllers.updateSale);
saleRouter.post("/", auth(ADMIN), SaleControllers.createSale);

module.exports = saleRouter;
