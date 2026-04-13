import api from "./api";

export const signupUser = async (payload) => {
  const { data } = await api.post("/api/auth/signup", payload);
  return data;
};

export const loginUser = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  return data;
};

export const fetchMe = async () => {
  const { data } = await api.get("/auth/auth/me");
  return data;
};
