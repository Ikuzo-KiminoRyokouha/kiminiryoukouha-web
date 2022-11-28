import mainRequest from "../../request/mainRequest";
interface writeBoardBody {
  id: string;
  title: string;
  content: string;
  private: number;
}

export const mWriteBoard = (body: Omit<writeBoardBody, "id">) => {
  return mainRequest.post("/api/board", body);
};

export const mUpdateBoard = (body: Omit<writeBoardBody, "private">) => {
  return mainRequest.put(`/api/board/${body.id}`, body);
};

export const mDeleteBoard = (id: string) => {
  return mainRequest.delete(`/api/board/${id}`);
};
export const mWriteComment = (body: any) => {
  return mainRequest.post(`/api/comment`, body);
};

export const mUpdateComment = (body: any) => {
  return mainRequest.put(`/api/comment/${body.id}`, body);
};
export const mDeleteComment = (id: string) => {
  return mainRequest.delete(`/api/comment/${id}`);
};
