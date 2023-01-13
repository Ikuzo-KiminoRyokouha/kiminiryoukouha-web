import { useRouter } from "next/router";
import { BiLockAlt } from "react-icons/bi";
import { getUser } from "../../utils/client";

export default function MobileBoardPosts({ datas }) {
  const router = useRouter();
  return (
    <>
      {datas.map((data, index) => {
        return (
          <div key={index}>
            {/* 게시물 */}
            <div className="flex h-24 w-full border-b-2 border-solid border-gray-300">
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
                    {data.createdAt.slice(0, 11)}
                  </span>
                  <span className="text-xs text-gray-300">
                    {data.user.name}
                  </span>
                </div>
                {/* 제목 */}
                {data.secret == true ? (
                  <div
                    className="flex items-center"
                    onClick={() => {
                      if (getUser().name === data.user.name) {
                        router.push({
                          pathname: `/QnA/view/${data.id}`,
                        });
                      } else {
                        alert("권한이 없습니다.");
                      }
                    }}
                  >
                    <span className="pt-2.5 text-lg">{data.title}</span>
                    <BiLockAlt className="mt-3 pl-1" />
                  </div>
                ) : (
                  <div
                    className="flex items-center"
                    onClick={() => {
                      router.push({
                        pathname: `/QnA/view/${data.id}`,
                      });
                    }}
                  >
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
