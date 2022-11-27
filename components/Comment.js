import useToggle from "../hooks/useToggle";

function Inputform() {
  return (
    <>
      <div className="mt-3 ml-2 flex">
        <span>↳</span>
        <textarea
          onChange={(e) => {
            console.log(e.target.value);
          }}
          cols="5"
          row="3"
          placeholder="  댓글을 입력해주세요."
          className="w-full resize-none border-2 "
        ></textarea>
        <button
          className="   ml-1 w-20   justify-center rounded bg-sky-600 p-4    text-white"
          onClick={() => {
            console.log("댓글등록");
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
  return (
    <>
      <div className="  flex  justify-between space-x-3  border-b border-gray-300 p-2 text-base">
        <div>{data.writer}</div>
        <div
          className="flex-1 flex-col break-words break-all"
          onClick={isVisible.onClick}
          onMouseDown={(e) => e.preventDefault()}
        >
          {data.content}
        </div>
        <div className="ml-10 w-fit ">
          <button
            className="float-right mx-2 "
            onClick={() => {
              console.log("댓글삭제");
            }}
          >
            삭제
          </button>
          <button
            className="float-right"
            onClick={() => {
              console.log("댓글수정");
            }}
          >
            수정
          </button>
        </div>
      </div>
      {isVisible.value && <Inputform />}
    </>
  );
}
