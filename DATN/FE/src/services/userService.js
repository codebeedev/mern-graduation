import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};
const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUser = (data) => {
  return axios.post("/api/create-user", data);
};

const editUser = (data) => {
  return axios.put("/api/edit-user", data);
};

const deleteUser = (userId) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};

const getAllCode = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const getAllTourService = (id) => {
  return axios.get(`/api/get-all-tour?id=${id}`);
};

const getPlaceService = (id) => {
  return axios.get(`/api/get-place?id=${id}`);
};
const createTourService = (data) => {
  return axios.post("/api/create-tour", data);
};
const UpdateTourService = (data) => {
  return axios.put("/api/edit-tour", data);
};

const deleteTourService = (id) => {
  return axios.delete("/api/delete-tour", {
    data: {
      id: id,
    },
  });
};

const SaveInfoTourService = (data) => {
  return axios.post("/api/save-info-tour", data);
};

const getInfoTourService = (id) => {
  return axios.get(`/api/get-info-tour?id=${id}`);
};

const getTopTourA1Service = (limit) => {
  return axios.get(`/api/get-top-tourA1?id=${limit}`);
};
const getTourNavService = (limit) => {
  return axios.get(`/api/get-top-tourNAV?id=${limit}`);
};

const getTourPlaceService = (id) => {
  return axios.get(`/api/get-tour-place?id=${id}`);
};
const getdomainA1 = (inputType) => {
  return axios.get(`/api/get-domainA1?type=${inputType}`);
};
const getdomainA2 = (inputType) => {
  return axios.get(`/api/get-domainA2?type=${inputType}`);
};

const getPlaceA2Service = (id) => {
  return axios.get(`/api/get-placeA2?id=${id}`);
};

const getTourNavA2Service = (limit) => {
  return axios.get(`/api/get-top-tourNAVA2?id=${limit}`);
};
const getTopTourA2Service = (limit) => {
  return axios.get(`/api/get-top-tourA2?id=${limit}`);
};

const booktourService = (data) => {
  return axios.post("/api/booktour", data);
};
const bookingService = (data) => {
  return axios.post("/api/verify-booktour", data);
};

const infoBookingService = (id) => {
  return axios.get(`/api/get-info-bootour?id=${id}`);
};
const editbooking = (data) => {
  return axios.put("/api/edit-booking", data);
};
const deleteBookingService = (id) => {
  return axios.delete("/api/delete-booking", {
    data: {
      id: id,
    },
  });
};

const getTravelnewService = (id) => {
  return axios.get(`/api/get-travelnew?id=${id}`);
};

const getTopTravelnewService = (id) => {
  return axios.get(`/api/get-top-travelnew?id=${id}`);
};

const createTravelnewService = (data) => {
  return axios.post("/api/create-travelnew", data);
};

const editTravelnewService = (data) => {
  return axios.put("/api/edit-travelnew", data);
};

const deleteTravelnewService = (id) => {
  return axios.delete("/api/delete-travelnew", {
    data: {
      id: id,
    },
  });
};
export {
  handleLoginAPI,
  getAllUsers,
  createNewUser,
  editUser,
  deleteUser,
  getAllCode,
  getAllTourService,
  getPlaceService,
  createTourService,
  UpdateTourService,
  deleteTourService,
  SaveInfoTourService,
  getInfoTourService,
  getTopTourA1Service,
  getTourNavService,
  getTourPlaceService,
  getdomainA1,
  getPlaceA2Service,
  getdomainA2,
  getTourNavA2Service,
  getTopTourA2Service,
  booktourService,
  bookingService,
  infoBookingService,
  editbooking,
  deleteBookingService,
  getTravelnewService,
  createTravelnewService,
  editTravelnewService,
  deleteTravelnewService,
  getTopTravelnewService,
};
