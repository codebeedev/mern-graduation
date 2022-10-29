import axiosClient from "./instances/axiosClient";

const queryAllRates = (query = "") => {
  return axiosClient({
    method: "GET",
    url: "/ratings/all" + query,
  });
};

const RATE_API = {
  queryAllRates,
};

export default RATE_API;
