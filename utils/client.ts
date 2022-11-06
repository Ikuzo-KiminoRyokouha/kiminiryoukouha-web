import { createGlobalState } from "react-hooks-global-state";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  accessToken: "",
  user: "",
});

export const getJWTToken = () => getGlobalState("accessToken");
export const setJWTToken = (token: string) =>
  setGlobalState("accessToken", token);
export const useJWTToken = () => useGlobalState("accessToken");

export const getUser = () => getGlobalState("user");
export const setUser = (user: string) => setGlobalState("user", user);
export const useUser = () => useGlobalState("user");
