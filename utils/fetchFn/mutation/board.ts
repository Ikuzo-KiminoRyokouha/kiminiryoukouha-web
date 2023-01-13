import authRequest from "@/utils/request/authRequest";
interface writeBoardBody {
  id: string;
  title: string;
  content: string;
  secret: boolean;
}

export const mWriteBoard = (body: Omit<writeBoardBody, "id">) => {
  return authRequest.post("/board", body);
};

export const mUpdateBoard = ({
  id,
  ...body
}: Omit<writeBoardBody, "private">) => {
  return authRequest.put(`/board/${id}`, body);
};

export const mDeleteBoard = (id: string) => {
  return authRequest.delete(`/board/${id}`);
};
export const mWriteComment = (body: any) => {
  return authRequest.post(`/comment`, body);
};

export const mUpdateComment = ({ id, ...body }: any) => {
  return authRequest.put(`/comment/${id}`, body);
};
export const mDeleteComment = (id: string) => {
  return authRequest.delete(`/comment/${id}`);
};
