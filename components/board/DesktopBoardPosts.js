import Link from "next/link";
import { useRouter } from "next/router";
import { BiLockAlt } from "react-icons/bi";
import { getUser } from "../../utils/client";

/**
 *
 * @param {Array} datas 게시물 데이터
 * @param boardname 게시판 이름
 */
export default function DesktopBoardPosts({ datas, boardname }) {
  const router = useRouter();

  return (
    <>
      {datas.map((data, index) => {
        return (
          <tr className="border-b-2 border-solid" key={index}>
            {/* 게시물 번호 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.id}
            </td>
            <td className="w-2/4 whitespace-nowrap p-2 text-xl font-normal">
              {/* 제목 */}
              {data.private == 1 ? (
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    if (getUser().name === data.user.name) {
                      router.push({
                        pathname: `/${boardname}/view`,
                        query: { id: `${data.id}` },
                      });
                    } else {
                      alert("권한이 없습니다.");
                    }
                  }}
                >
                  <span className="flex items-center">
                    <span>{data.title}</span>
                    <BiLockAlt className="mt-1 pl-1" />
                  </span>
                </a>
              ) : (
                <Link
                  href={{
                    pathname: `/${boardname}/view`,
                    query: { id: `${data.id}` },
                  }}
                  legacyBehavior
                >
                  <a>
                    <span className="flex items-center">
                      <span>{data.title}</span>
                    </span>
                  </a>
                </Link>
              )}
            </td>
            {/* 유저이름 */}
            <td className="whitespace-nowrap break-keep p-2 text-xl font-normal">
              {data.user.name}
            </td>
            {/* 게시일 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.created_at}
            </td>
            {/* 답변상태 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.complete === 0 ? "답변대기중" : "답변완료"}
            </td>
          </tr>
        );
      })}
    </>
  );
}
