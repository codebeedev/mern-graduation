import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

//--------------------------------------all-------------------------------------
let checkTour = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findOne({
        where: { name: name },
      });
      if (tour) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createTourService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (data && data.name) {
        let check = await checkTour(data.name);
        if (check === true) {
          resolve({
            errCode: 2,
            errMessage: "This tour is already in the system, please enter another tour !",
          });
        } else {
          await db.Tour.create({
            imgTourHTML: data.imgTourHTML,
            imgTourMark: data.imgTourMark,
            name: data.name,
            startAddress: data.startAddress,
            startDate: data.startDate,
            price: data.price,
            timeId: data.timeId,
            addressId: data.addressId,
            placeId: data.placeId,
            domainId: data.domainId,
          });
        }
      } else {
        resolve({
          errCode: 1,
          message: "mising parameter",
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
let getAllTourService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = "";
      if (id === "ALL") {
        tour = await db.Tour.findAll();
      }
      if (id === "A1") {
        tour = await db.Tour.findAll({
          where: { addressId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "A2") {
        tour = await db.Tour.findAll({
          where: { addressId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "M1") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "domainM",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "M2") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "M3") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "C1") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "C2") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "C3") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "C4") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }
      if (id === "C5") {
        tour = await db.Tour.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Allcode,
              as: "addressData",
              attributes: ["keyMap", "value"],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name", "id", "domainId"],
            },
          ],
        });
      }

      resolve(tour);
    } catch (e) {
      reject(e);
    }
  });
};
let editTourService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: " Missing  required parameters!",
        });
      }
      let tour = await db.Tour.findOne({
        where: { id: data.id },
      });
      if (tour) {
        tour.imgTourHTML = data.imgTourHTML;
        tour.imgTourMark = data.imgTourMark;
        tour.name = data.name;
        tour.startAddress = data.startAddress;
        tour.startDate = data.startDate;
        tour.price = data.price;
        tour.timeId = data.timeId;
        tour.addressId = data.addressId;
        tour.placeId = data.placeId;
        await tour.save();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Tour not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteTourService = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        errMessage: "Missing parameter!",
      });
    }
    try {
      let tour = await db.Tour.findOne({
        where: { id: id },
      });
      if (tour) {
        await tour.destroy();
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Tour not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let saveInFoTour = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.tourId || !data.motaHTML || !data.motaMark) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let tour = await db.infoTour.findOne({
          where: { tourId: data.tourId },
        });
        if (!tour) {
          await db.infoTour.create({
            motaHTML: data.motaHTML,
            motaMark: data.motaMark,
            anhHTML: data.anhHTML,
            anhMark: data.anhMark,
            thongtinHTML: data.thongtinHTML,
            thongtinMark: data.thongtinMark,
            dieuleHTML: data.dieuleHTML,
            dieuleMark: data.dieuleMark,
            tourId: data.tourId,
          });
        } else {
          tour.motaHTML = data.motaHTML;
          tour.motaMark = data.motaMark;
          tour.anhHTML = data.anhHTML;
          tour.anhMark = data.anhMark;
          tour.thongtinHTML = data.thongtinHTML;
          tour.thongtinMark = data.thongtinMark;
          tour.dieuleHTML = data.dieuleHTML;
          tour.dieuleMark = data.dieuleMark;
          tour.save();
        }
      }
      resolve({
        errCode: 0,
        errMessage: "Save info tour succeed ",
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getInFoTour = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter! ",
        });
      } else {
        let data = await db.Tour.findOne({
          where: {
            id: id,
          },
          include: [
            {
              model: db.infoTour,
              attributes: [
                "motaHTML",
                "motaMark",
                "anhHTML",
                "anhMark",
                "thongtinHTML",
                "thongtinMark",
                "dieuleHTML",
                "dieuleMark",
              ],
            },
            {
              model: db.Place,
              as: "placeData",
              attributes: ["name"],
            },
            {
              model: db.Allcode,
              as: "timeData",
              attributes: ["value"],
            },
          ],
          nest: true,
        });
        if (!data) data = {};

        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getTourPlaceService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tourPlace = await db.Tour.findAll({
        where: {
          placeId: id,
        },
        include: [
          {
            model: db.Allcode,
            as: "timeData",
            attributes: ["value"],
          },
          {
            model: db.Place,
            as: "placeData",
            attributes: ["name"],
          },
        ],
      });
      resolve({
        data: tourPlace,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let urlEmail = (tourId, token) => {
  let result = `${process.env.URL_REACT}/xac-nhan?token=${token}&id=${tourId}`;
  return result;
};
let bouktourService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.tourId) {
        resolve({
          errCode: 1,
          message: "mising parameter",
        });
      } else {
        let token = uuidv4();
        let link = urlEmail(data.tourId, token);
        let pay = "";
        if (data.pay === "PAY1") {
          pay = "Tiền mặt";
        } else {
          pay = "Chuyển Khoản";
        }
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            name: data.name,
            address: data.address,
            phoneNumber: data.phonenumber,
            roleId: "R3",
            gender: data.gender,
          },
          raw: true,
        });
        if (user && user[0]) {
          let booktour = await db.BookTour.findOne({
            where: {
              customerId: user[0].id,
              tourId: data.tourId,
            },
          });

          if (booktour) {
            if (booktour.statusId === "S3" || booktour.statusId === "S4") {
              let newbooking = await db.BookTour.create({
                statusId: "S1",
                pay: data.pay,
                customerId: user[0].id,
                tourId: data.tourId,
                startdate: data.startdate,
                amount: data.amount,
                price: data.price,
                token: token,
              });
              if (newbooking) {
                await emailService.sendEmail({
                  id: newbooking.id,
                  email: data.email,
                  name: data.name,
                  address: data.address,
                  phonenumber: data.phonenumber,
                  tourId: data.tourId,
                  tourName: data.tourName,
                  startdate: data.startdate,
                  amount: data.amount,
                  price: data.price,
                  pay: pay,
                  link: link,
                });
              }
            }
            if (booktour.statusId === "S1" || booktour.statusId === "S2") {
              resolve({
                errCode: 2,
              });
            }
          } else {
            let newbooking = await db.BookTour.create({
              statusId: "S1",
              pay: data.pay,
              customerId: user[0].id,
              tourId: data.tourId,
              startdate: data.startdate,
              amount: data.amount,
              price: data.price,
              token: token,
            });
            if (newbooking) {
              await emailService.sendEmail({
                id: newbooking.id,
                email: data.email,
                name: data.name,
                address: data.address,
                phonenumber: data.phonenumber,
                tourId: data.tourId,
                tourName: data.tourName,
                startdate: data.startdate,
                amount: data.amount,
                price: data.price,
                pay: pay,
                link: link,
              });
            }
          }
        }
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
let verifyBooktourService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.id) {
        resolve({
          errCode: 1,
          errMessage: "missing parameter",
        });
      } else {
        let booking = await db.BookTour.findOne({
          where: {
            tourId: data.id,
            token: data.token,
            statusId: "S1",
          },
        });
        if (booking) {
          booking.statusId = "S2";
          await booking.save();
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Chưa đặt tour hoặt đã được xác nhận",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getInfoBooktopur = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter! ",
        });
      } else {
        if (id === "ALL") {
          let data = await db.BookTour.findAll({
            include: [
              {
                model: db.Tour,
                as: "tourData",
                attributes: ["name", "startAddress", "timeId", "placeId", "price"],
                include: [
                  {
                    model: db.Allcode,
                    as: "timeData",
                    attributes: ["value"],
                  },
                  {
                    model: db.Place,
                    as: "placeData",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: db.Allcode,
                as: "statusData",
                attributes: ["value"],
              },
              {
                model: db.Allcode,
                as: "payData",
                attributes: ["value"],
              },
              {
                model: db.User,
                as: "customerData",
                attributes: ["name", "address", "phoneNumber", "email", "gender"],
                include: [
                  {
                    model: db.Allcode,
                    as: "genderData",
                    attributes: ["value"],
                  },
                ],
              },
            ],
            nest: true,
            raw: true,
          });
          if (!data) data = {};
          resolve({
            errCode: 0,
            data: data,
          });
        } else {
          let data = await db.BookTour.findOne({
            where: {
              tourId: id,
            },
            include: [
              {
                model: db.Tour,
                as: "tourData",
                attributes: ["name", "startAddress", "timeId", "placeId", "price"],
                include: [
                  {
                    model: db.Allcode,
                    as: "timeData",
                    attributes: ["value"],
                  },
                  {
                    model: db.Place,
                    as: "placeData",
                    attributes: ["name"],
                  },
                ],
              },
              {
                model: db.Allcode,
                as: "statusData",
                attributes: ["value"],
              },
              {
                model: db.Allcode,
                as: "payData",
                attributes: ["value"],
              },
              {
                model: db.User,
                as: "customerData",
                attributes: ["name", "address", "phoneNumber", "email", "gender"],
                include: [
                  {
                    model: db.Allcode,
                    as: "genderData",
                    attributes: ["value"],
                  },
                ],
              },
            ],
            nest: true,
            raw: true,
          });
          if (!data) {
            let data2 = await db.BookTour.findOne({
              where: {
                CustomerId: id,
              },
              include: [
                {
                  model: db.Tour,
                  as: "tourData",
                  attributes: ["name", "startAddress", "timeId", "placeId", "price"],
                  include: [
                    {
                      model: db.Allcode,
                      as: "timeData",
                      attributes: ["value"],
                    },
                    {
                      model: db.Place,
                      as: "placeData",
                      attributes: ["name"],
                    },
                  ],
                },
                {
                  model: db.Allcode,
                  as: "statusData",
                  attributes: ["value"],
                },
                {
                  model: db.Allcode,
                  as: "payData",
                  attributes: ["value"],
                },
                {
                  model: db.User,
                  as: "customerData",
                  attributes: ["name", "address", "phoneNumber", "email", "gender"],
                  include: [
                    {
                      model: db.Allcode,
                      as: "genderData",
                      attributes: ["value"],
                    },
                  ],
                },
              ],
              nest: true,
              raw: true,
            });
            resolve({
              errCode: 0,
              data: data2,
            });
          }
          resolve({
            errCode: 0,
            data: data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
//editBookingService
let editBookingService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: " Missing  required parameters!",
        });
      }
      let booking = await db.BookTour.findOne({
        where: { id: data.id },
      });
      if (booking) {
        booking.amount = data.amount;
        booking.price = data.price;
        booking.pay = data.pay;
        booking.startdate = data.date;
        booking.statusId = data.statusId;
        await booking.save();
        resolve({
          errCode: 0,
          message: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          message: "Tour not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//deleteBookingService
let deleteBookingService = (id) => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      resolve({
        errCode: 1,
        errMessage: "Missing parameter!",
      });
    }
    try {
      let booktour = await db.BookTour.findOne({
        where: { id: id.id },
      });
      if (booktour) {
        await booktour.destroy();
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      } else {
        resolve({
          errCode: 2,
          errMessage: "Tour not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
//-----------------------------------A1------------------------------------------
let getTopTourA1 = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findAll({
        where: {
          addressId: "A1",
        },
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Allcode,
            as: "timeData",
            attributes: ["value"],
          },
          {
            model: db.Place,
            as: "placeData",
            attributes: ["name"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: tour,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTourNav = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findAll({
        where: {
          addressId: "A1",
        },
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Allcode,
            as: "timeData",
            attributes: ["value"],
          },
          {
            model: db.Place,
            as: "placeData",
            attributes: ["name"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: tour,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getPlaceService = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let place = "";

      if (id === "M1") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "M2") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "M3") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "ALL") {
        place = await db.Place.findAll({
          limit: 63,
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id && id !== "M1" && id !== "M2" && id !== "M3" && id !== "ALL") {
        place = await db.Place.findOne({
          where: { id: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      resolve(place);
    } catch (e) {
      reject(e);
    }
  });
};
let getdomainA1Service = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = {};
        let data = await db.Allcode.findAll({
          where: { type: typeInput },
          limit: 3,
        });
        res.errCode = 0;
        res.data = data;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};
//-----------------------------------A2-----------------------------------------
let getTopTourA2 = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findAll({
        where: {
          addressId: "A2",
        },
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Allcode,
            as: "timeData",
            attributes: ["value"],
          },
          {
            model: db.Place,
            as: "placeData",
            attributes: ["name"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: tour,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getTourNavA2 = (limit) => {
  return new Promise(async (resolve, reject) => {
    try {
      let tour = await db.Tour.findAll({
        where: {
          addressId: "A2",
        },
        limit: limit,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Allcode,
            as: "timeData",
            attributes: ["value"],
          },
          {
            model: db.Place,
            as: "placeData",
            attributes: ["name"],
          },
        ],
      });
      resolve({
        errCode: 0,
        data: tour,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getPlaceServiceA2 = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let place = "";

      if (id === "M1") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "M2") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "M3") {
        place = await db.Place.findAll({
          where: { domainId: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id === "ALL") {
        place = await db.Place.findAll({
          offset: 63,
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      if (id && id !== "M1" && id !== "M2" && id !== "M3" && id !== "ALL") {
        place = await db.Place.findOne({
          where: { id: id },
          include: [
            {
              model: db.Allcode,
              as: "domainData",
              attributes: ["value"],
            },
          ],
        });
      }
      resolve(place);
    } catch (e) {
      reject(e);
    }
  });
};
let getdomainA2Service = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = {};
        let data = await db.Allcode.findAll({
          where: { type: typeInput },
          offset: 3,
        });
        res.errCode = 0;
        res.data = data;
        resolve(res);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  checkTour: checkTour,
  createTourService: createTourService,
  getAllTourService: getAllTourService,
  editTourService: editTourService,
  deleteTourService: deleteTourService,
  getPlaceService: getPlaceService,
  saveInFoTour: saveInFoTour,
  getInFoTour: getInFoTour,
  getTopTourA1: getTopTourA1,
  getTourNav: getTourNav,
  getTourPlaceService: getTourPlaceService,
  getTopTourA2: getTopTourA2,
  getTourNavA2: getTourNavA2,
  getPlaceServiceA2: getPlaceServiceA2,
  getdomainA1Service: getdomainA1Service,
  getdomainA2Service: getdomainA2Service,
  bouktourService: bouktourService,
  verifyBooktourService: verifyBooktourService,
  getInfoBooktopur: getInfoBooktopur,
  editBookingService: editBookingService,
  deleteBookingService: deleteBookingService,
};
