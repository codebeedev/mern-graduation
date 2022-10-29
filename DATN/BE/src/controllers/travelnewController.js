import travelnewService from "../services/travelnewService";

let createTravelnew = async (req, res) => {
  let createTravelnew = await travelnewService.createTravelnewService(req.body);
  return res.status(200).json(createTravelnew);
};
let editTravelnew = async (req, res) => {
  let editTravelnew = await travelnewService.editTravelnewService(req.body);
  return res.status(200).json(editTravelnew);
};
let deleteTravelnew = async (req, res) => {
  let deleteTravelnew = await travelnewService.deleteTravelnewService(req.body.id);
  return res.status(200).json(deleteTravelnew);
};
let getTravelnew = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      data: [],
    });
  }
  let data = await travelnewService.getTravelnewService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    data,
  });
};
let getTopTravelnew = async (req, res) => {
  if (!req.query.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing required parametter",
      data: [],
    });
  }
  let data = await travelnewService.getTopTravelnewService(req.query.id);
  return res.status(200).json({
    errCode: 0,
    errMessage: "ok",
    data,
  });
};

module.exports = {
  createTravelnew: createTravelnew,
  editTravelnew: editTravelnew,
  deleteTravelnew: deleteTravelnew,
  getTravelnew: getTravelnew,
  getTopTravelnew: getTopTravelnew,
};
