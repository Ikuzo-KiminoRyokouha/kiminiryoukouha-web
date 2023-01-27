import { useInput, useToggle, useBoard } from "@/hooks";
import { getUser } from "@/utils/client";
import { useRouter } from "next/router";

function Inputform({ isVisible, writeComment }) {
  const router = useRouter();
  const id = router.query.id;
  const comment = useInput("", "댓글을 입력해주세요");
  return (
    <>
      <div className="mt-3 ml-2 flex">
        <span>↳</span>
        <textarea
          rows={4}
          {...comment}
          placeholder="  댓글을 입력해주세요."
          className="w-full resize-none border-2 "
        ></textarea>
        <button
          className="   ml-1 w-20   justify-center rounded bg-sky-600 p-4    text-white"
          onClick={() => {
            writeComment({
              content: comment.value,
              board_id: id,
              target_id: null,
              group: null,
            });
            isVisible.setFalse();
          }}
        >
          등록
        </button>
      </div>
    </>
  );
}

export default function Comment({ data }) {
  const isVisible = useToggle(false);
  const updateMode = useToggle(false);
  const user = getUser();
  const comment = useInput(data.content, "수정할 댓글을 입력해주세요.");
  const { deleteComment, updateComment, writeComment } = useBoard();

  const authCheck = () => {
    if (!getUser()) {
      alert("로그인 되지 않은 유저입니다.");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="  flex  justify-between space-x-3  border-b border-gray-300 p-2 text-base">
        <div>{data.user.name}</div>
        {!updateMode.value && (
          <>
            <div
              className="min-h-[30px] flex-1 flex-col break-words break-all"
              onClick={isVisible.onClick}
              onMouseDown={(e) => e.preventDefault()}
            >
              {data.content}
            </div>
            {data.user.id === user?.id && (
              <div className="ml-10 w-fit ">
                <button
                  className="float-right mx-2 "
                  onClick={() => {
                    if (authCheck()) {
                      confirm("정말 삭제하시겠습니까?") &&
                        deleteComment(data.id);
                    }
                  }}
                >
                  삭제
                </button>
                <button
                  className="float-right"
                  onClick={() => {
                    if (authCheck()) {
                      updateMode.setTrue();
                    }
                  }}
                >
                  수정
                </button>
              </div>
            )}
          </>
        )}
        {updateMode.value && (
          <>
            <textarea
              rows={4}
              className="max-h-auto h-20 flex-1 resize-none flex-col break-words break-all border p-2"
              {...comment}
            />
            <div className="flex flex-col space-y-2 text-white">
              <button
                className="flex-1 bg-sky-600 p-1 px-2"
                onClick={() => {
                  updateComment({
                    id: data.id,
                    content: comment.value,
                  });
                  updateMode.setFalse();
                }}
              >
                완료
              </button>
              <button
                className="flex-1 bg-gray-400 p-1 px-2"
                onClick={updateMode.setFalse}
              >
                취소
              </button>
            </div>
          </>
        )}
      </div>
      {isVisible.value && (
        <Inputform isVisible={isVisible} writeComment={writeComment} />
      )}
    </>
  );
}
