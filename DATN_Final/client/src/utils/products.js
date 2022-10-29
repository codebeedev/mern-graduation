import { allProducts } from '../assets/data/products';

export const getProductById = (id) => {
  return allProducts.find((val) => val.id === id);
};

export const getCartItemsInfo = (cartItems) => {
  let res = [];
  if (cartItems.length > 0) {
    cartItems.forEach((element) => {
      let product = getProductById(element.id);

      res.push({ ...element, product: product });
    });
  }

  return res;
};

export const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
