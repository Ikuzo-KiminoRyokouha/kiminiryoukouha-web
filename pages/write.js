import { AiOutlineArrowLeft } from "react-icons/ai";

// 글작성_취소 함수
function writeCancel() {
  if (confirm("글작성을 취소 하시겠습니까?") == true) {
    alert("이전화면으로 돌아갑니다");
    history.back();
  } else {
    alert("글작성을 완료해주세요.");
  }
}
// 글작성 함수***ing
function writeOk() {}

export default function detail() {
  return (
    <div className="mx-auto h-full w-full max-w-7xl flex-1">
      {/* 글작성용 네비바 */}
      <nav className="d flex w-full justify-between bg-sky-600 px-6 py-2 text-white">
        <div className="flex space-x-2">
          {/* 취소 버튼(이전화면으로 돌아감) */}
          <a
            className="block md:hidden"
            onClick={(e) => {
              writeCancel();
            }}
          >
            <AiOutlineArrowLeft />
          </a>
          <p>질의응답</p>
        </div>
        {/* 모바일(화면이 작은 경우) 글작성 버튼 */}
        <div className="block space-x-2 md:hidden">
          <button
            onClick={(e) => {
              writeOk();
            }}
          >
            글작성
          </button>
        </div>
      </nav>
      {/* 페이지 작성 */}
      <div className="space-y-2 py-4 px-2">
        {/* 제목 */}
        <div>
          <div className="flex items-center justify-center px-14">
            <label className="form-label w-20 text-center">제목:</label>
            <input
              className="h-10 w-2/3 rounded-md border px-2"
              type="text"
              placeholder="제목을 입력하세요"
            />
            <p className="px-2">비밀글</p>
            <input
              type="checkBox"
              className="checkBox"
              value="secret_post"
            ></input>
          </div>
        </div>
        {/* 비밀번호 */}
        <div className="flex items-center justify-center">
          <label className="form-label w-20 text-center" id="password">
            비밀번호:
          </label>
          <input
            className="h-10 w-2/3 rounded-md border px-2"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {/* 디바이더 */}
        <div className="h-2">
          <p className="color-blue w-full border-t"></p>
        </div>
        {/* 내용 */}
        <div className="flex items-center justify-center">
          <label className="form-label w-20 text-center">내용:</label>
          <textarea
            className="w-3/4 resize-none rounded-md border px-2 py-2"
            rows={20}
            placeholder="내용을 입력하세요"
            id="contents"
            name="contents"
          />
        </div>
        {/* PC 글작성 버튼 */}
        {/* 가운데 정렬 왜 안됨??? + 화면 작아지면 안보여야 되는데? */}
        <div className="flex items-center justify-center space-x-2">
          <button
            className="rounded border border-sky-600 bg-sky-500 py-2 px-4 font-bold text-white hover:bg-sky-600"
            onClick={(e) => {
              writeOk();
            }}
          >
            글작성
          </button>
          <button
            className="rounded border border-sky-600 bg-sky-500 py-2 px-4 font-bold text-white hover:bg-sky-600"
            onClick={(e) => {
              writeCancel();
            }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
