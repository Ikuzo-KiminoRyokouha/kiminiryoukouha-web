import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BoardWrite from "components/board/BoardWrite";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useInput } from "../../hooks";
import useBoard from "../../hooks/useBoard";
import { getBoardPost } from "../../utils/fetchFn/query/board";

export default function Update() {
  const route = useRouter();
  const id = route.query?.id as string;

  const { data } = useQuery(["getBoardPost", id], getBoardPost);

  // 제목
  const title = useInput(data.data.board[0].title, "제목을 입력하세요.");
  // 내용
  const contents = useInput(data.data.board[0].content, "내용을 입력하세요.");

  const { updateBoard } = useBoard();

  /** @description 글작성 버튼_함수 */
  function submit() {
    if (title.value && contents.value) {
      updateBoard({
        id,
        title: title.value,
        content: contents.value,
      });
    }
  }

  /** @description 글작성_취소 함수 */
  function writeCancel() {
    if (confirm("글작성을 취소 하시겠습니까?") == true) {
      route.back();
    } else {
      alert("글작성을 완료해주세요.");
    }
  }

  return (
    <>
      <div className="mx-auto mb-[53px] flex h-full w-full max-w-7xl flex-1 flex-col">
        {/* 글작성용 네비바 */}
        <nav className="flex h-12 w-full items-center justify-between bg-sky-600 px-6 py-2 text-white">
          <div className="flex space-x-2">
            {/* 취소 버튼(이전화면으로 돌아감) */}
            <a className=" md:hidden" onClick={writeCancel}>
              <AiOutlineArrowLeft />
            </a>
            <p>질의응답</p>
          </div>
          {/* 모바일(화면이 작은 경우) 글작성 버튼 */}
          <div className="block space-x-2 md:hidden">
            <button onClick={submit}>글작성</button>
          </div>
        </nav>
        {/* 페이지 작성 */}
        <div className="flex flex-1 flex-col space-y-2 py-4 px-2">
          {/* 제목 + 비밀글(체크박스) */}
          <div className="flex items-center justify-center">
            <div className="hidden md:block">
              <label className="hidden w-20 text-center md:block">제목:</label>
            </div>
            <input
              className="h-10 w-full rounded-md border"
              type="text"
              {...title}
            />
            {/* 여기 클릭이벤트 발생하면 체크박스 체크 */}
          </div>

          {/* 디바이더 */}
          <div className="h-2">
            <p className="color-blue w-full border-t"></p>
          </div>

          {/* 내용 */}
          <div className="relative flex flex-1 items-center">
            <label className="hidden w-20 text-center md:block">내용:</label>
            <textarea
              className="absolute inset-0 resize-none rounded-md border px-2 py-2 md:left-20"
              {...contents}
            />
          </div>

          {/* PC_글작성/취소 버튼 */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center space-x-2">
              <button
                className="rounded border border-sky-600 bg-sky-600 py-2 px-4 font-bold text-white"
                onClick={submit}
              >
                글작성
              </button>
              <button
                className="rounded border border-sky-600 bg-sky-600 py-2 px-4 font-bold text-white"
                onClick={writeCancel}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps(context) {
//   try {
//     const { data } = await axios.get(`/board/${context.query.id}`);

//     console.log("위 : ", context.query.id);

//     return { props: { data: data } };
//   } catch {
//     console.log("밑 : ", context.query.id);

//     return {
//       props: {
//         data: -1,
//       },
//     };
//   }
// }
