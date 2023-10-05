import axios from "axios";
import BoardWrite from "components/board/BoardWrite";

export default function Update({ boardData }) {
  return (
    <>
      <BoardWrite
        initTitle={boardData.board.title}
        initContents={boardData.board.content}
        isSecret={boardData.board.secret}
      />
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
