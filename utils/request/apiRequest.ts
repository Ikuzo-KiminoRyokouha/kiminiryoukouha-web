import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://apis.openapi.sk.com",
  headers: {
    appKey: process.env.NEXT_PUBLIC_TMAP_API_KEY,
  },
});

export default apiRequest;
