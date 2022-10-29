import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  users: [],
  times: [],
  domains: [],
  toursA1: [],
  addressId: [],
  places: [],
  alltour: [],
  infotour: [],
  topTourA1: [],
  topTourNAV: [],
  tourDomain: [],
  tourplaces: [],
  placeinfos: [],
  toursA2: [],
  placesA2: [],
  domainsA2: [],
  topTourNAVA2: [],
  topTourA2: [],
  infoBooking: [],
  infoBooking2: [],
  travelnew: [],
  toptravelnew: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Gender
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoadingGender = false;
      state.genders = [];
      return {
        ...state,
      };

    //Role
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return {
        ...state,
      };

    // GET all user
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };

    //update user
    case actionTypes.UPDATE_USER_SUCCESS:
      state.users = action.data;
      return {
        ...state,
      };
    case actionTypes.UPDATE_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    //get time tour
    case actionTypes.FETCH_TIME_SUCCESS:
      state.times = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_TIME_FAILED:
      state.times = [];
      return {
        ...state,
      };
    //get addressId
    case actionTypes.FETCH_ADDRESSID_SUCCESS:
      state.addressId = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ADDRESSID_FAILED:
      state.addressId = [];
      return {
        ...state,
      };
    //get all tour
    case actionTypes.GET_TOUR_A1_SUCCESS:
      state.toursA1 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOUR_A1_FAILED:
      state.toursA1 = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_PLACE_SUCCESS:
      state.places = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_PLACE_FAILED:
      state.places = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOUR_ALL_SUCCESS:
      state.alltour = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOUR_ALL_FAILED:
      state.alltour = [];
      return {
        ...state,
      };

    case actionTypes.GET_INFO_TOUR_SUCCESS:
      state.infotour = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_INFO_TOUR_FAILED:
      state.infotour = [];
      return {
        ...state,
      };

    //get top tour a1
    case actionTypes.GET_TOP_TOUR_A1_SUCCESS:
      state.topTourA1 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TOUR_A1_FAILED:
      state.topTourA1 = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOP_TOUR_NAV_SUCCESS:
      state.topTourNAV = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TOUR_NAV_FAILED:
      state.topTourNAV = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOP_TOUR_NAV_A2_SUCCESS:
      state.topTourNAVA2 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TOUR_NAV_A2_FAILED:
      state.topTourNAVA2 = [];
      return {
        ...state,
      };

    case actionTypes.GET_DOMAIN_SUCCESS:
      state.domains = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DOMAIN_FAILED:
      state.domains = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOUR_DOMAIN_SUCCESS:
      state.tourDomain = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOUR_DOMAIN_FAILED:
      state.tourDomain = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOUR_PLACE_SUCCESS:
      state.tourplaces = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOUR_PLACE_FAILED:
      state.tourplaces = [];
      return {
        ...state,
      };
    case actionTypes.GET_PLACE_INFO_SUCCESS:
      state.placeinfos = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_PLACE_INFO_FAILED:
      state.placeinfos = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOURA2_SUCCESS:
      state.toursA2 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOURA2_FAILED:
      state.toursA2 = [];
      return {
        ...state,
      };

    case actionTypes.GET_PLACEA2_SUCCESS:
      state.placesA2 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_PLACEA2_FAILED:
      state.placesA2 = [];
      return {
        ...state,
      };

    case actionTypes.GET_DOMAIN_A2_SUCCESS:
      state.domainsA2 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_DOMAIN_A2_FAILED:
      state.domainsA2 = [];
      return {
        ...state,
      };

    case actionTypes.GET_TOP_TOUR_A2_SUCCESS:
      state.topTourA2 = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TOUR_A2_FAILED:
      state.topTourA2 = [];
      return {
        ...state,
      };

    case actionTypes.BOOKING_SUCCESS:
      state.infoBooking = action.data;
      return {
        ...state,
      };
    case actionTypes.BOOKING_FAILED:
      state.infoBooking = [];
      return {
        ...state,
      };

    case actionTypes.BOOKING_SUCCESS2:
      state.infoBooking2 = action.data;
      return {
        ...state,
      };
    case actionTypes.BOOKING_FAILED2:
      state.infoBooking2 = [];
      return {
        ...state,
      };
    // travelnew: [],
    case actionTypes.GET_TRAVEL_NEW_SUCCESS:
      state.travelnew = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TRAVEL_NEW_FAILED:
      state.travelnew = [];
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TRAVEL_NEW_SUCCESS:
      state.toptravelnew = action.data;
      return {
        ...state,
      };
    case actionTypes.GET_TOP_TRAVEL_NEW_FAILED:
      state.toptravelnew = [];
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;
