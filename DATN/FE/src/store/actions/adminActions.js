import actionTypes from "./actionTypes.js";

import {
  getAllCode,
  createNewUser,
  getAllUsers,
  deleteUser,
  editUser,
  getAllTourService,
  getPlaceService,
  createTourService,
  UpdateTourService,
  deleteTourService,
  SaveInfoTourService,
  getInfoTourService,
  getTopTourA1Service,
  getTopTourA2Service,
  getTourNavService,
  getTourPlaceService,
  getdomainA1,
  getPlaceA2Service,
  getdomainA2,
  getTourNavA2Service,
  booktourService,
  infoBookingService,
  getTravelnewService,
  createTravelnewService,
  getTopTravelnewService,
} from "../../services/userService";
import { toast } from "react-toastify";

//gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCode("gender");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSucess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log(e);
    }
  };
};
export const fetchGenderSucess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("role");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSucess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log(e);
    }
  };
};
export const fetchRoleSucess = (RoleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: RoleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//Create user
export const createNewUsers = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUser(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user succeed !");
        dispatch(createUserSucess());
        dispatch(getAllUser());
      }
      if (res && res.errCode === 1) {
        toast.warn("Your email is already in the system !");
        dispatch(createUserFailed());
      }
    } catch (e) {
      toast.warn("Create user failed !");
      dispatch(createUserFailed());
      console.log(e);
    }
  };
};
export const createUserSucess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const createUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//get all user
export const getAllUser = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(getAllUserSucess(res.users.reverse()));
      } else {
        dispatch(getAllUserFailed());
      }
    } catch (e) {
      dispatch(getAllUserFailed());
      console.log(e);
    }
  };
};
export const getAllUserSucess = (userData) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  data: userData,
});
export const getAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

//delete User
export const deletUsers = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUser(user);
      if (res && res.errCode === 0) {
        toast.success("Delete user succeed !");
        dispatch(deleteUserSucess());
        dispatch(getAllUser());
      } else {
        toast.warn("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.warn("Delete user failed!");
      dispatch(deleteUserFailed());
      console.log(e);
    }
  };
};
export const deleteUserSucess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//UPDATE
export const updateUsers = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUser(user);
      if (res && res.errCode === 0) {
        toast.success("Cập nhật thành công !");
        dispatch(updateUserSucess());
        dispatch(getAllUser());
      } else {
        toast.warn("Chỉnh sửa thất bại!");
        dispatch(updateUserFailed());
      }
    } catch (e) {
      toast.warn("Chỉnh sửa thất bại!");
      dispatch(updateUserFailed());
      console.log(e);
    }
  };
};
export const updateUserSucess = () => ({
  type: actionTypes.UPDATE_USER_SUCCESS,
});
export const updateUserFailed = () => ({
  type: actionTypes.UPDATE_USER_FAILED,
});
//get time tour
export const getTimeTour = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("time");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TIME_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TIME_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_TIME_FAILED,
      });
    }
  };
};
// get addressId
export const getAddressId = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCode("address");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ADDRESSID_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ADDRESSID_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_ADDRESSID_FAILED,
      });
    }
  };
};
//GET TOUR A1
export const getTourA1 = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTourService("A1");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOUR_A1_SUCCESS,
          data: res.tour.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOUR_A1_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOUR_A1_FAILED,
      });
    }
  };
};

//get place
export const getPlace = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPlaceService("ALL");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_PLACE_SUCCESS,
          data: res.place,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_PLACE_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.FETCH_PLACE_FAILED,
      });
    }
  };
};
//CREATE TOUR
export const createTour = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createTourService(data);
      if (res && res.errCode === 0) {
        toast.success("Lưu thành công");
        dispatch({
          type: actionTypes.CREATE_TOUR_SUCCESS,
        });
        dispatch(getTourA1());
        dispatch(getTourA2());
      }
      if (res && res.errCode === 2) {
        toast.warn("Chuyến tham quan này đã có trong hệ thống!");
        dispatch({
          type: actionTypes.CREATE_TOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.CREATE_TOUR_FAILED,
      });
    }
  };
};

// UPDATE TOUR
export const updateTour = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await UpdateTourService(data);
      if (res && res.errCode === 0) {
        toast.success("Lưu thành công");
        dispatch({
          type: actionTypes.UPDATE_TOUR_SUCCESS,
        });
        dispatch(getTourA1());
        dispatch(getTourA2());
      } else {
        toast.success("Lưu thất bại");
        dispatch({
          type: actionTypes.UPDATE_TOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.UPDATE_TOUR_FAILED,
      });
    }
  };
};
//DELETE TOUR
export const deleteTour = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteTourService(id);
      if (res && res.errCode === 0) {
        toast.success("Xoá thành công");
        dispatch({
          type: actionTypes.DELETE_TOUR_SUCCESS,
        });
        dispatch(getTourA1());
        dispatch(getTourA2());
      } else {
        toast.success("Xoá thất bại");
        dispatch({
          type: actionTypes.DELETE_TOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.DELETE_TOUR_FAILED,
      });
    }
  };
};

//get  tourall
export const getTourAll = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTourService("ALL");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOUR_ALL_SUCCESS,
          data: res.tour.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOUR_ALL_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOUR_ALL_FAILED,
      });
    }
  };
};

//save info tour
export const SaveInfotour = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await SaveInfoTourService(data);
      if (res && res.errCode === 0) {
        toast.success("Lưu thành công");
        dispatch({
          type: actionTypes.SAVE_INFO_TOUR_SUCCESS,
        });
      } else {
        toast.success("Lưu thất bại");
        dispatch({
          type: actionTypes.SAVE_INFO_TOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.SAVE_INFO_TOUR_FAILED,
      });
    }
  };
};

//get info tour
export const getInfoTour = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getInfoTourService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_INFO_TOUR_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_INFO_TOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_INFO_TOUR_FAILED,
      });
    }
  };
};

//getTopTourA1
export const getTopTourA1 = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopTourA1Service(limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_A1_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_A1_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_TOUR_A1_FAILED,
      });
    }
  };
};
//getTourNavService
export const getTourNav = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTourNavService(limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_NAV_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_NAV_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_TOUR_NAV_FAILED,
      });
    }
  };
};

//GET DOMAIN
export const getDomainTour = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getdomainA1("domain");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_DOMAIN_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DOMAIN_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_DOMAIN_FAILED,
      });
    }
  };
};
export const getDomainTourA2 = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getdomainA2("domain");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_DOMAIN_A2_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_DOMAIN_A2_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_DOMAIN_A2_FAILED,
      });
    }
  };
};

//get tour domain
export const getTourDomain = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTourService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOUR_DOMAIN_SUCCESS,
          data: res.tour.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOUR_DOMAIN_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOUR_DOMAIN_FAILED,
      });
    }
  };
};

export const getTourPlace = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTourPlaceService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOUR_PLACE_SUCCESS,
          data: res.tourPlace.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOUR_PLACE_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOUR_PLACE_FAILED,
      });
    }
  };
};

//get place info
export const getPlaceInfo = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getPlaceService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_PLACE_INFO_SUCCESS,
          data: res.place,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PLACE_INFO_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_PLACE_INFO_FAILED,
      });
    }
  };
};

//get tour A2
export const getTourA2 = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTourService("A2");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOURA2_SUCCESS,
          data: res.tour.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOURA2_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOURA2_FAILED,
      });
    }
  };
};

export const getPlaceA2 = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getPlaceA2Service("ALL");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_PLACEA2_SUCCESS,
          data: res.place,
        });
      } else {
        dispatch({
          type: actionTypes.GET_PLACEA2_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_PLACEA2_FAILED,
      });
    }
  };
};

export const getTourNavA2 = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTourNavA2Service(limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_NAV_A2_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_NAV_A2_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_TOUR_NAV_A2_FAILED,
      });
    }
  };
};

export const getTopTourA2 = (limit) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopTourA2Service(limit);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_A2_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_TOUR_A2_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_TOUR_A2_FAILED,
      });
    }
  };
};

export const booktour = (data) => {
  console.log("data", data);
  return async (dispatch, getState) => {
    try {
      let res = await booktourService(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.BOOKTOUR_SUCCESS,
        });
      }
      if (res && res.errCode === 2) {
        toast.info("Bạn đã đăng ký chuyến tham quan này rồi!");
        dispatch({
          type: actionTypes.BOOKTOUR_FAILED,
        });
      } else {
        dispatch({
          type: actionTypes.BOOKTOUR_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.BOOKTOUR_FAILED,
      });
    }
  };
};

// infoBookingService
export const infoBookingTour = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await infoBookingService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.BOOKING_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.BOOKING_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.BOOKING_FAILED,
      });
    }
  };
};

export const infoBookingTour2 = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await infoBookingService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.BOOKING_SUCCESS2,
          data: res.data.reverse(),
        });
      } else {
        dispatch({
          type: actionTypes.BOOKING_FAILED2,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.BOOKING_FAILED2,
      });
    }
  };
};

export const getTravelnew = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTravelnewService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TRAVEL_NEW_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TRAVEL_NEW_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TRAVEL_NEW_FAILED,
      });
    }
  };
};

export const getTopTravelnew = (id) => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopTravelnewService(id);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.GET_TOP_TRAVEL_NEW_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.GET_TOP_TRAVEL_NEW_FAILED,
        });
      }
    } catch (e) {
      console.log(e);
      dispatch({
        type: actionTypes.GET_TOP_TRAVEL_NEW_FAILED,
      });
    }
  };
};

export const createTravelnew = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createTravelnewService(data);
      if (res && res.errCode === 0) {
        toast.success("Lưu thành công");
        dispatch({
          type: actionTypes.CREATE_TRAVEL_NEW_SUCCESS,
          data: res.data,
        });
      } else {
        toast.success("Đã có bài đăng này");
        dispatch({
          type: actionTypes.CREATE_TRAVEL_NEW_FAILED,
        });
      }
    } catch (e) {
      toast.success("Lưu thất bại");
      console.log(e);
      dispatch({
        type: actionTypes.CREATE_TRAVEL_NEW_FAILED,
      });
    }
  };
};

// createTravelnewService
// editTravelnewService
// deleteTravelnewService
