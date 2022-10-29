import db from "../models/index";

let checkTravelnew = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let travelnew = await db.Travelnew.findOne({
        where: { name: name },
      });
      if (travelnew) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createTravelnewService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkTravelnew(data.name);
      if (check === true) {
        resolve({
          errCode: 1,
        });
      } else {
        await db.Travelnew.create({
          name: data.name,
          motaHTML: data.motaHTML,
          motaMark: data.motaMark,
          anhHTML: data.anhHTML,
          anhMark: data.anhMark,
          thongtinHTML: data.thongtinHTML,
          thongtinMark: data.thongtinMark,
        });
      }
      resolve({
        errCode: 0,
        message: "ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editTravelnewService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: " Missing  required parameters!",
        });
      }
      let Travelnew = await db.Travelnew.findOne({
        where: { id: data.id },
      });
      if (Travelnew) {
        Travelnew.id = data.id;
        Travelnew.name = data.name;
        Travelnew.motaHTML = data.motaHTML;
        Travelnew.motaMark = data.motaMark;
        Travelnew.anhHTML = data.anhHTML;
        Travelnew.anhMark = data.anhMark;
        Travelnew.thongtinHTML = data.thongtinHTML;
        Travelnew.thongtinMark = data.thongtinMark;
        await Travelnew.save();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Travelnew not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteTravelnewService = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        errMessage: " Missing required parameters!",
      });
    }
    try {
      let Travelnew = await db.Travelnew.findOne({
        where: { id: id.id },
      });
      if (Travelnew) {
        await Travelnew.destroy();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Travelnew isn't exist!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getTravelnewService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let travelnew = "";
      if (userId === "ALL") {
        travelnew = await db.Travelnew.findAll();
      }
      if (userId && userId !== "ALL") {
        travelnew = await db.Travelnew.findOne({
          where: { id: userId },
        });
      }
      resolve(travelnew);
    } catch (e) {
      reject(e);
    }
  });
};
let getTopTravelnewService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let travelnew = "";
      if (userId === "ALL") {
        travelnew = await db.Travelnew.findAll({
          limit: 6,
        });
      }

      resolve(travelnew);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createTravelnewService: createTravelnewService,
  editTravelnewService: editTravelnewService,
  deleteTravelnewService: deleteTravelnewService,
  getTravelnewService: getTravelnewService,
  getTopTravelnewService: getTopTravelnewService,
};
