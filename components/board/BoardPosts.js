import Link from "next/link";
import { BiLockAlt } from "react-icons/bi";

export default function BoardPosts({ datas, boardname }) {
  return (
    <>
      {datas.map((data, index) => {
        return (
          <tr className="border-b-2 border-solid" key={index}>
            {/* 게시물 번호 */}
            <td className="p-2 text-xl font-normal">{data.id}</td>
            <td className="w-2/4 p-2 text-xl font-normal">
              {/* 제목 */}
              <Link
                href={{
                  pathname: `/${boardname}/view`,
                  query: { id: `${data.id}` },
                }}
                legacyBehavior
              >
                {data.private == 1 ? (
                  <a>
                    <span className="flex items-center">
                      <span>{data.title}</span>
                      <BiLockAlt className="mt-1 pl-1" />
                    </span>
                  </a>
                ) : (
                  <a>
                    <span className="flex items-center">
                      <span>{data.title}</span>
                    </span>
                  </a>
                )}
              </Link>
            </td>
            {/* 유저이름 */}
            <td className="break-keep p-2 text-xl font-normal">
              {data.user_id}
            </td>
            {/* 게시일 */}
            <td className="p-2 text-xl font-normal">{data.created_at}</td>
            {/* 답변상태 */}
            <td className="p-2 text-xl font-normal">{status}</td>
          </tr>
        );
      })}
    </>
  );
}
