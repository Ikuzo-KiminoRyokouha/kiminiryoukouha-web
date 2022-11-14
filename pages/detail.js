export default function Detail() {
  return (
    <div className="max-w-8xl mx-auto w-full">
      <div className="my-16  text-3xl font-bold"> Qna든 F&든 게시판이름</div>
      <div className="float-left w-4/5 text-2xl font-semibold">
        {" "}
        아침밥은 김치찌개 에다가 참치꽁치찌개{" "}
      </div>
      <div className=" float-left w-1/5 text-right ">2011.22.34</div>
      <br></br>
      <div className="float-left w-4/5">작성자: wqeasd987</div>
      <div className="my float-left w-1/5 text-right">조회 2300 | 댓글 300</div>
      <br></br>
      <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
      <div className="w-5/5 h-auto border-black">sadasdsasa</div>
      <div className="flex justify-end pt-3">
        <button className="rounded bg-sky-400 p-3 text-white">수정</button>
        <button className="rounded bg-sky-400 p-3 text-white">삭제</button>
      </div>
      <div> 전체댓글 300개</div>
      <div className="text-3xl">닉네임: 어쩌구 저쩌구 </div>
      <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
      <div className="text-3xl">닉네임: 어쩌구 저쩌구23 </div>
      <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>

      <div className="bg-gray-200">
        <form>
          <textarea className="float-left h-full w-11/12 resize-none border"></textarea>
        </form>

        <button className=" float-left flex w-1/12 justify-center rounded bg-sky-400 p-2 text-white">
          등록
        </button>
      </div>
    </div>
  );
}
