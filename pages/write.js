import { AiOutlineArrowLeft } from "react-icons/ai";

export default function detail() {
  return (
    <div className="mx-auto h-full w-full max-w-7xl flex-1">
      {/* 글작성용 네비바 */}
      <nav className="flex w-full justify-between bg-blue-400 px-6 py-2 text-white">
        <div className="flex space-x-2">
          {/* 취소 버튼(이전화면으로 돌아감) */}
          <a
            className="block md:hidden"
            onClick={(e) => {
              history.back();
            }}
          >
            <AiOutlineArrowLeft />
          </a>
          <p>질의응답</p>
        </div>
        {/* 모바일(화면이 작은 경우) 글작성 버튼 */}
        <div className="block space-x-2 md:hidden">
          <a
            onClick={(e) => {
              console.log("글작성 클릭");
            }}
          >
            글작성
          </a>
        </div>
      </nav>
      {/* 페이지 작성 */}
      <div className="space-y-2 py-4 px-2">
        {/* 제목 */}
        <div>
          <div className="flex items-center justify-center">
            <label
              className="form-label w-20 text-center"
              id="title"
              name="title"
            >
              제목:
            </label>
            <input
              className="h-10 w-2/3 border"
              type="text"
              placeholder="제목을 입력하세요"
            />
          </div>
        </div>
        {/* 비밀번호 */}
        <div className="flex items-center justify-center">
          <label
            className="form-label w-20 text-center"
            id="password"
            name="password"
          >
            비밀번호:
          </label>
          <input
            className="h-10 w-2/3 border"
            type="password"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        {/* 디바이더 */}
        <div className="h-4">
          <p className="color-blue w-full border-t"></p>
        </div>
        {/* 내용 */}
        <div className="flex items-center justify-center">
          <label className="form-label w-20 text-center">내용:</label>
          <textarea
            className="w-3/4 resize-none border"
            rows="20"
            type="text"
            placeholder="내용을 입력하세요"
            id="contents"
            name="contents"
          />
        </div>
      </div>
      {/* PC 글작성 버튼 */}
      <div className="mx-auto w-full space-x-2">
        {/* 내용 */}
        <div className="flex items-center justify-center">
          <div className="lg-hidden">
            <button className="form-label w-20 text-center">취소</button>
            <button className="form-label w-20 text-center">글작성</button>
          </div>
        </div>
      </div>
    </div>
  );
}
