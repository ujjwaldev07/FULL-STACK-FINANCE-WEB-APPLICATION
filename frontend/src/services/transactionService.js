import api from "./api";

export const createTransaction = async (payload) => {
  const { data } = await api.post("/transactions", payload);
  return data;
};

export const fetchTransactions = async (params) => {
  const { data } = await api.get("/transactions", { params });
  return data;
};

export const fetchSummary = async () => {
  const { data } = await api.get("/transactions/summary");
  return data;
};

export const fetchMonthlyAnalytics = async (year) => {
  const { data } = await api.get("/transactions/analytics/monthly", { params: { year } });
  return data;
};
