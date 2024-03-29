import authRequest from "@/utils/request/authRequest";
import { IUser } from "../../../types/user.interface";
import mainRequest from "../../request/mainRequest";
// ===============================================

/**
 * @description 회원가입 요청 함수
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 패스워드
 * @param {string} name 사용자 닉네임
 * @param {string} role 사용자 역할
 */
export const mSignUp = (body: Omit<IUser, "sub">) => {
  return mainRequest.post(
    process.env.NEXT_PUBLIC_API_URL + "/auth/signup",
    body
  );
};

// ===============================================

/**
 * @description 로그인 요청 함수
 * @param {string} email 사용자 이메일
 * @param {string} password 사용자 패스워드
 */
export const mLogin = (body: Pick<IUser, "email" | "password">) => {
  return mainRequest.post("/auth/signin", body);
};

export const mLogout = () => {
  return authRequest.get("/auth/logout");
};
