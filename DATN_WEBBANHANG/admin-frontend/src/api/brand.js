import axiosClient from "./instances/axiosClient";

const removeBrands = (brandId) => {
  return axiosClient({
    method: "DELETE",
    url: `/brands/${brandId}`,
  });
};

const queryBrands = (query) => {
  return axiosClient({
    method: "GET",
    url: `/brands${query}`,
  });
};

const createBrand = (data) => {
  return axiosClient({
    method: "POST",
    url: `/brands`,
    data,
  });
};

const updateBrand = (_id, data) => {
  return axiosClient({
    method: "PUT",
    url: `/brands/${_id}`,
    data,
  });
};

const BRAND_API = {
  queryBrands,
  createBrand,
  updateBrand,
  removeBrands,
};

export default BRAND_API;
