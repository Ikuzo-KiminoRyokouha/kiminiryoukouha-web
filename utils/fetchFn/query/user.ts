import mainRequest from "../../request/mainRequest";

export const getUser = () => {
  return mainRequest.get("/api/user", {
    timeout: 3000,
  });
};
