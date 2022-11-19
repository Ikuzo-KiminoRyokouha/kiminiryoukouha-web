import { createGlobalState } from "react-hooks-global-state";
import { IUser } from "../types/user.interface";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  accessToken: "",
  user: undefined,
});

export const getJWTToken = () => getGlobalState("accessToken");
export const setJWTToken = (token: string) =>
  setGlobalState("accessToken", token);
export const useJWTToken = () => useGlobalState("accessToken");

export const getUser = () => getGlobalState("user");
export const setUser = (user: Omit<IUser, "password"> | undefined) =>
  setGlobalState("user", user);
export const useUser = () => useGlobalState("user");
