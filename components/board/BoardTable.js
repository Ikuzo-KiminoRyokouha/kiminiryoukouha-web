export default function BoardTable() {
  return (
    <>
      {/* 게시판 테이블 */}
      <div>
        <div className="w-full border-2 border-solid">
          <table className="w-full text-center">
            <thead className="bg-gray-300 text-center">
              <tr>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  <span>게시물번호</span>
                </th>
                <th className="w-2/4 whitespace-nowrap p-2 text-xl font-normal">
                  제목
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  작성자
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  날짜
                </th>
                <th className="whitespace-nowrap p-2 text-xl font-normal">
                  답변상태
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              {/* 게시판 테이블 내 게시물들 */}
              {router.pathname === "/QnA/search" ? (
                <DesktopBoardPosts datas={searchData.searchData.boards || []} />
              ) : (
                <DesktopBoardPosts datas={POSTS} />
              )}
            </tbody>
          </table>
        </div>
        {/* 글쓰기 버튼 */}
        <div className="flex justify-end pt-3">
          <button
            className="rounded bg-sky-600 p-3 text-white"
            onClick={onWrite}
          >
            글쓰기
          </button>
        </div>
        {/* 페이지네이션 */}
        {router.pathname === "/QnA/search" ? (
          <Pagination
            {...usePagination(
              searchData.searchData.pages,
              `${router.pathname}`
            )}
            maxPage={searchData.searchData.pages}
            pathname={`${pathname}/search`}
          />
        ) : (
          <Pagination
            {...paginationProps}
            maxPage={MAX_PAGE}
            pathname={pathname}
          />
        )}
      </div>
    </>
  );
}
