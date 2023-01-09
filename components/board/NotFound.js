export default function NotFound() {
   return(
      {/* 검색된 게시물 없을시 페이지 */}
      <div>
        <div>
          <h1>검색된 게시물이 없습니다.</h1>
        </div>
        <div className="flex justify-end pt-3">
          <button
            className="rounded bg-sky-600 p-3 text-white"
            onClick={onWrite}
          >
            글쓰기
          </button>
        </div>
      </div>
   )
}