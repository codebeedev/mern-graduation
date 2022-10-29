const { Router } = require("express");
const FavoriteProductControllers = require("../controllers/favorite/favorite_product");
const favoriteProductRouter = Router();
const { USER } = require("../configs/constants");
const auth = require("../middlewares/auth");
const FavoriteControllers = require("../controllers/favorite");


favoriteProductRouter.get("/:id", FavoriteProductControllers.getToListFavorite)
favoriteProductRouter.post("/", FavoriteProductControllers.addToListFavorite);
favoriteProductRouter.delete("/delete/:id", FavoriteProductControllers.deleteToListFavorite)

favoriteProductRouter.post("/new", FavoriteControllers.addToFavorite);

module.exports = favoriteProductRouter;
