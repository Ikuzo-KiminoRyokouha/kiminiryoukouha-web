import axios from "axios";
import { getJWTToken, setJWTToken } from "../client";

// axios 인스턴스 생성
/**
 * @description 인증요청이 필요한 요청일 때 써야 하는 axiuos 인스턴스
 */
const authRequest = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });
authRequest.defaults.withCredentials = true;

authRequest.interceptors.request.use(
  (cfg) => {
    cfg.headers["Authorization"] = "Bearer " + getJWTToken();
    return cfg;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// axios 인스턴스의 응답을 캐치
authRequest.interceptors.response.use(
  (res) => {
    // 생성된 인스턴스의 요청 성공 콜백
    return res;
  },
  async (err) => {
    // 생성된 인스턴스의 요청 실패 콜백
    if (err.response.status === 401) {
      // 401 Unauthorized Error 가 발생하면 Token 을 refresh 한다.
      const res = await axios.get(
        process.env.NEXT_PUBLIC_API_URL + "/auth/token/refresh",
        {
          withCredentials: true,
        }
      );
      // authRequest header에 authorization의 default 값을 refresh 된 accessToken 으로 교체
      authRequest.defaults.headers["Authorization"] = res.data.accessToken;
      // 전역 accessToken에 저장
      setJWTToken(res.data.accessToken);
      // 실패한 요청 재전송
      return axios(err.request.responseURL, {
        headers: {
          authorization: "Bearer " + res.data.accessToken,
        },
      });
    }
    return Promise.reject(err);
  }
);

export default authRequest;
