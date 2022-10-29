import axiosClient from "./instances/axiosClient";

const getStatistic = () => {
  return axiosClient({
    method: "get",
    url: "/statistic",
  });
};

const COMMON_API = {
  getStatistic,
};

export default COMMON_API;
