import axios from "axios";
/**
 * @description 인증요청이 필요없는 요청일 때 써야 하는 axiuos 인스턴스
 */
const mainRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export default mainRequest;
