import authRequest from "@/utils/request/authRequest";

export const mCreateAlbumImage = (body) => {
  return authRequest.post("/album", body);
};
