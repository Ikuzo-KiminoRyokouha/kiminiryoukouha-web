import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useInput, useToggle } from "../../hooks";
import useBoard from "../../hooks/useBoard";

interface Props {
  initTitle: string;
  initContents: string;
  isSecret?: boolean;
}

export default function BoardWrite({
  initTitle,
  initContents,
  isSecret,
}: Props) {
  // 제목
  const title = useInput(initTitle, "제목을 입력하세요.");
  // 내용
  const contents = useInput(initContents, "내용을 입력하세요.");

  const router = useRouter();

  const initSecret = isSecret ? isSecret : false;

  // 비밀글 여부
  const secret = useToggle(initSecret);

  const { writeBoard, updateBoard } = useBoard();

  const onClick = {
    // 글작성
    submit: () => {
      if (title.value && contents.value) {
        writeBoard({
          title: title.value,
          content: contents.value,
          secret: secret.value ? true : false,
        });
      }
    },
    // 글작성 취소
    writeCancel: () => {
      if (confirm("글작성을 취소 하시겠습니까?") == true) {
        router.back();
      } else {
        alert("글작성을 완료해주세요.");
      }
    },
    // 글수정
    update: () => {
      if (title.value && contents.value) {
        updateBoard({
          id: router.query.id as string,
          title: title.value,
          content: contents.value,
          secret: secret.value,
        });
      }
    },
  };

  return (
    <>
      <div className="mx-auto mb-[53px] flex h-full w-full max-w-7xl flex-1 flex-col">
        {/* 글작성용 네비바 */}
        <nav className="flex h-12 w-full items-center justify-between bg-sky-600 px-6 py-2 text-white">
          <div className="flex space-x-2">
            {/* 취소 버튼(이전화면으로 돌아감) */}
            <a className=" md:hidden" onClick={onClick.writeCancel}>
              <AiOutlineArrowLeft />
            </a>
            <p>질의응답</p>
          </div>
          {/* 모바일(화면이 작은 경우) 글작성 버튼 */}
          <div className="block space-x-2 md:hidden">
            {router.pathname == "/QnA/write" ? (
              <button onClick={onClick.submit}>글작성</button>
            ) : (
              <button onClick={onClick.update}>글작성</button>
            )}
          </div>
        </nav>
        {/* 페이지 작성 */}
        <div className="flex flex-1 flex-col space-y-2 py-4 px-2">
          {/* 제목 */}
          <div className="flex items-center justify-center">
            <div className="hidden md:block">
              <label className="hidden w-20 text-center md:block">제목:</label>
            </div>
            <input
              className="h-10 w-full rounded-md border pl-2"
              type="text"
              {...title}
            />
            {/* 비밀글 */}
            <div
              className="flex items-center justify-center whitespace-nowrap"
              onMouseDown={(e) => e.preventDefault()}
            >
              <label className="ml-1 flex-1 p-1 text-sm md:text-base">
                비밀글
              </label>

              <input
                type="checkbox"
                className="ml-1"
                checked={secret.value}
                onChange={secret.onClick}
              />
            </div>
          </div>

          {/* 디바이더 */}
          <div className="h-2">
            <p className="color-blue w-full border-t"></p>
          </div>

          {/* 내용 */}
          <div className="relative flex flex-1 pt-1">
            <label className="hidden w-20 text-center md:block">내용:</label>
            <textarea
              className="absolute inset-0 resize-none rounded-md border px-2 py-2 md:left-20"
              {...contents}
            />
          </div>

          {/* PC_글작성/취소 버튼 */}
          <div className="hidden md:block">
            <div className="flex items-center justify-center space-x-2">
              {router.pathname == "/QnA/write" ? (
                <button
                  className="rounded border border-sky-600 bg-sky-600 py-2 px-4 font-bold text-white"
                  onClick={onClick.submit}
                >
                  글작성
                </button>
              ) : (
                <button
                  className="rounded border border-sky-600 bg-sky-600 py-2 px-4 font-bold text-white"
                  onClick={onClick.update}
                >
                  글작성
                </button>
              )}
              <button
                className="rounded border border-sky-600 bg-sky-600 py-2 px-4 font-bold text-white"
                onClick={onClick.writeCancel}
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
