import authRequest from "@/utils/request/authRequest";

export const getTodayPlan = () => {
  return authRequest.get("/plan/today");
};

export const getTodayTreavel = () => {
  return authRequest.get("/travel/today");
};

export const getTransactions = ({ queryKey }) => {
  return authRequest.get(`/banking/transaction/list/${queryKey[1]}`);
};
