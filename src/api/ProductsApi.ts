import api from "./axiosConfig";

export const getAllProducts = async (skip = "") => {
  try {
    const res = await api.get("/products", { params: { skip } });

    return res.data;
  } catch (err) {
    console.log("products err", err);
  }
};

export const getProductsBySearch = async (searchQuery: string) => {
  try {
    const res = await api.get(`/products/search`, {
      params: {
        q: searchQuery,
      },
    });

    return res.data;
  } catch (err) {
    console.log("products search err", err);
  }
};

export const getProductsById = async (productId: string) => {
  try {
    const res = await api.get(`/products/${productId}`);

    return res.data;
  } catch (err) {
    console.log("product Id err", err);
  }
};
