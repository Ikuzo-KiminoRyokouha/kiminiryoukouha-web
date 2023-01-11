import authRequest from "../../request/authRequest";

export const getUser = () => {
  return authRequest.get("/api/user", {
    timeout: 3000,
  });
};
