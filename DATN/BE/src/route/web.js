import express from "express";
import userController from "../controllers/userController";
import tourController from "../controllers/tourController";
import travelnewController from "../controllers/travelnewController";

let router = express.Router();

let initWebRoutes = (app) => {
  //-------------------------login-----------------
  router.post("/api/login", userController.handleLogin);

  //-------------------------user------------------
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-user", userController.handleCreateUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  router.get("/api/allcode", userController.getAllCode);

  //-----------------------tour------------------------------
  //All
  router.post("/api/create-tour", tourController.createTour);
  router.get("/api/get-all-tour", tourController.getAllTour);
  router.put("/api/edit-tour", tourController.editTour);
  router.delete("/api/delete-tour", tourController.deleteTour);
  router.get("/api/get-tour-place", tourController.getTourPlace);
  router.post("/api/save-info-tour", tourController.saveInFoTour);
  router.get("/api/get-info-tour", tourController.getInFoTour);
  router.post("/api/booktour", tourController.booktour);
  router.post("/api/verify-booktour", tourController.verifyBooktour);
  router.get("/api/get-info-bootour", tourController.getInfoBookour);
  router.put("/api/edit-booking", tourController.editBooking);
  router.delete("/api/delete-booking", tourController.handleDeleteBooking);

  //a1
  router.get("/api/get-place", tourController.getPlace);
  router.get("/api/get-top-tourA1", tourController.getTopTourA1);
  router.get("/api/get-top-tourNAV", tourController.getTourNav);
  router.get("/api/get-domainA1", tourController.getdomainA1);

  //a2
  router.get("/api/get-placeA2", tourController.getPlaceA2);
  router.get("/api/get-top-tourA2", tourController.getTopTourA2);
  router.get("/api/get-top-tourNAVA2", tourController.getTourNavA2);
  router.get("/api/get-domainA2", tourController.getdomainA2);

  //travel new
  router.post("/api/create-travelnew", travelnewController.createTravelnew);
  router.put("/api/edit-travelnew", travelnewController.editTravelnew);
  router.delete("/api/delete-travelnew", travelnewController.deleteTravelnew);
  router.get("/api/get-travelnew", travelnewController.getTravelnew);
  router.get("/api/get-top-travelnew", travelnewController.getTopTravelnew);

  return app.use("/", router);
};

module.exports = initWebRoutes;
