import api from "./axiosConfig";

export const getAllCategories = async () => {
  try {
    const res = await api.get("/categories.php");

    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};

export const getMealsByCategory = async (category: string) => {
  try {
    const res = await api.get(`filter.php?c=${category}`);

    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};

export const getIngredient = async (mealId: string) => {
  try {
    const res = await api.get(`lookup.php?i=${mealId}`);

    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
