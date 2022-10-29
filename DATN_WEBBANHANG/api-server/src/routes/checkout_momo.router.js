const { Router } = require("express");
const CheckoutMomoControllers = require("../controllers/CheckoutMomo/CheckoutMomo");
const checkoutMomoRouter = Router();

checkoutMomoRouter.get("/", CheckoutMomoControllers.checkoutMomo)
// favoriteProductRouter.post("/", FavoriteProductControllers.addToListFavorite);
// favoriteProductRouter.delete("/delete/:id", FavoriteProductControllers.deleteToListFavorite)


module.exports = checkoutMomoRouter;