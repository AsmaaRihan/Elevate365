import api from "./axiosConfig";

export const getAllProducts = async ({
  skip = undefined,
}: {
  skip?: number;
}) => {
  try {
    const res = await api.get(`/products`, { params: { skip } });

    console.log("res", res);

    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};

export const getProductsById = async (productId: string) => {
  try {
    const res = await api.get(`/products/${productId}`);

    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};
