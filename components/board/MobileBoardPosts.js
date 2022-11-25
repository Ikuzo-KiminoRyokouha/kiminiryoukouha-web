import { BiLockAlt } from "react-icons/bi";

export default function MobileBoardPosts({ datas, boardname }) {
  return (
    <>
      {datas.map((data, index) => {
        return (
          <div key={index}>
            {/* 게시물 */}
            <div
              className="flex h-24 w-full border-b-2 border-solid border-gray-300"
              onClick={() => {
                router.push({
                  pathname: `/${boardname}/view`,
                  query: { id: data.id },
                });
              }}
            >
              {/* 게시물 번호 */}
              <div className="flex w-1/5 items-center justify-center">
                <span>{data.id}</span>
              </div>
              <div className="flex w-4/5 flex-col">
                {/* 제목위 세부사항들 */}
                <div className="flex w-3/5 justify-between p-1">
                  {data.complete == 1 ? (
                    <span className="text-xs text-gray-300">답변완료</span>
                  ) : (
                    <span className="text-xs text-gray-300">답변대기중</span>
                  )}
                  <span className="text-xs text-gray-300">
                    {data.created_at}
                  </span>
                  <span className="text-xs text-gray-300">
                    {data.user.name}
                  </span>
                </div>
                {/* 제목 */}
                {data.private == 1 ? (
                  <div className="flex items-center">
                    <span className="pt-2.5 text-lg">{data.title}</span>
                    <BiLockAlt className="mt-3 pl-1" />
                  </div>
                ) : (
                  <div className="flex items-center">
                    <span className="pt-2.5 text-lg">{data.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
