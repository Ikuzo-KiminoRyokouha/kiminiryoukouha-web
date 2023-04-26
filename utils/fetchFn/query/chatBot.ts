import authRequest from "@/utils/request/authRequest";

export const getTodayPlan = () => {
  return authRequest.get("/plan/today");
};

export const getTodayTreavel = () => {
  return authRequest.get("/travel/today");
};
