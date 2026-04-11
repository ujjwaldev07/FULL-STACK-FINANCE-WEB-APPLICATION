import api from "./api";

export const fetchCategories = async () => {
  const { data } = await api.get("/categories");
  return data;
};
