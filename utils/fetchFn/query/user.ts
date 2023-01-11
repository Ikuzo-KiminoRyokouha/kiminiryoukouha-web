import authRequest from "../../request/authRequest";

export const getUser = () => {
  return authRequest.get("/users", {
    timeout: 3000,
  });
};
