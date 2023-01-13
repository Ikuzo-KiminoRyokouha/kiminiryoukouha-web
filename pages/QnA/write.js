import BoardWrite from "../../components/board/BoardWrite";
import { useToggle, useInput } from "../../hooks";

export default function Write() {
  // 제목
  const title = useInput("", "제목을 입력하세요.");
  // 내용
  const contents = useInput("", "내용을 입력하세요.");

  return (
    <>
      <BoardWrite title={title} contents={contents} />
    </>
  );
}
