import mainRequest from "../../request/mainRequest";
interface writeBoardBody {
  title: string;
  content: string;
  private: number;
}

export const mWriteBoard = (body: writeBoardBody) => {
  return mainRequest.post("/api/board", {
    ...body,
  });
};
