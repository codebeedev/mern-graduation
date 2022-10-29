import tourService from "../services/tourService";
//--------------------------------all-------------------
let createTour = async (req, res) => {
  let createTour = await tourService.createTourService(req.body);
  return res.status(200).json(createTour);
};
let getAllTour = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      tour: [],
    });
  }
  let tour = await tourService.getAllTourService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    tour,
  });
};
let editTour = async (req, res) => {
  let editTour = await tourService.editTourService(req.body);
  return res.status(200).json(editTour);
};
let deleteTour = async (req, res) => {
  let deleteTour = await tourService.deleteTourService(req.body.id);
  return res.status(200).json(deleteTour);
};
let saveInFoTour = async (req, res) => {
  try {
    let info = await tourService.saveInFoTour(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getTourPlace = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      tourPlace: [],
    });
  }
  let tourPlace = await tourService.getTourPlaceService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    tourPlace,
  });
};
let getInFoTour = async (req, res) => {
  try {
    let info = await tourService.getInFoTour(req.query.id);

    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let booktour = async (req, res) => {
  let booktour = await tourService.bouktourService(req.body);
  return res.status(200).json(booktour);
};
let verifyBooktour = async (req, res) => {
  let booktour = await tourService.verifyBooktourService(req.body);
  return res.status(200).json(booktour);
};
let getInfoBookour = async (req, res) => {
  try {
    let info = await tourService.getInfoBooktopur(req.query.id);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let editBooking = async (req, res) => {
  let editbooking = await tourService.editBookingService(req.body);
  return res.status(200).json(editbooking);
};
let handleDeleteBooking = async (req, res) => {
  let deletebooking = await tourService.deleteBookingService(req.body.id);
  return res.status(200).json(deletebooking);
};
//-----------------------------------a1-------------------
let getTopTourA1 = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 8;
  try {
    let response = await tourService.getTopTourA1(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getTourNav = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 4;
  try {
    let response = await tourService.getTourNav(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getPlace = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      place: [],
    });
  }
  let place = await tourService.getPlaceService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    place,
  });
};
let getdomainA1 = async (req, res) => {
  try {
    let data = await tourService.getdomainA1Service(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
//-----------------------------------a2---------------------
let getTopTourA2 = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 8;
  try {
    let response = await tourService.getTopTourA2(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getTourNavA2 = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 4;
  try {
    let response = await tourService.getTourNavA2(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getPlaceA2 = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      place: [],
    });
  }
  let place = await tourService.getPlaceServiceA2(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    place,
  });
};
let getdomainA2 = async (req, res) => {
  try {
    let data = await tourService.getdomainA2Service(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  createTour: createTour,
  getAllTour: getAllTour,
  editTour: editTour,
  deleteTour: deleteTour,
  getPlace: getPlace,
  saveInFoTour: saveInFoTour,
  getInFoTour: getInFoTour,
  booktour: booktour,
  verifyBooktour: verifyBooktour,
  getInfoBookour: getInfoBookour,
  editBooking: editBooking,
  handleDeleteBooking: handleDeleteBooking,

  getTopTourA1: getTopTourA1,
  getTourNav: getTourNav,
  getTourPlace: getTourPlace,
  getdomainA1: getdomainA1,

  getTopTourA2: getTopTourA2,
  getTourNavA2: getTourNavA2,
  getPlaceA2: getPlaceA2,
  getdomainA2: getdomainA2,
};
