import axios from "axios";
import mainRequest from "../../request/mainRequest";

export const getUser = () => {
  return mainRequest.get(process.env.NEXT_PUBLIC_API_URL + "/api/user");
};
