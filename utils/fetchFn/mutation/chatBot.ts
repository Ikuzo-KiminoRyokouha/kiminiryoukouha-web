import authRequest from "@/utils/request/authRequest";

export const mGetNewTravels = (body) => {
  console.log(" chatbot mutaion", "mGetNewTravels");
  return authRequest.post(`/destination/personality`, body);
};

export const mCreateTravel = ({ planId, destinationId }: any) => {
  return authRequest.post(`/travel/des/${planId}/${destinationId}`);
};

export const mDeleteTravel = (travelId: string) => {
  return authRequest.delete(`/travel/${travelId}`);
};

export const mUpdateClearTravel = (travelId: string) => {
  return authRequest.put(`/travel/clear/${travelId}`);
};
