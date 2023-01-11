export default function SearchNotFound({ onWrite }) {
  return (
    <>
      {/* 검색된 게시물 없을시 페이지 */}
      <div>
        <div className="flex h-56 items-center justify-center">
          <h1 className="text-xl">검색된 게시물이 없습니다.</h1>
        </div>
        <div className="hidden justify-end pt-3 md:float-right md:inline-block">
          <button
            className="rounded bg-sky-600 p-3 text-white"
            onClick={onWrite}
          >
            글쓰기
          </button>
        </div>
      </div>
    </>
  );
}
