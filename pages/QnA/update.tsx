import axios from "axios";
import BoardWrite from "components/board/BoardWrite";
import { useInput } from "../../hooks";

export default function Update({ boardData }) {
  // 제목
  const title = useInput(boardData.board.title, "제목을 입력하세요.");
  // 내용
  const contents = useInput(boardData.board.content, "내용을 입력하세요.");
  // 비밀글
  const secret = boardData.board.secret;

  return (
    <>
      <BoardWrite title={title} contents={contents} isSecret={secret} />
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const { data: boardData } = await axios.get(
      `http://localhost:8000/board/${context.query.id}`
    );

    return { props: { boardData } };
  } catch {
    return {
      props: {
        boardData: -1,
      },
    };
  }
}
