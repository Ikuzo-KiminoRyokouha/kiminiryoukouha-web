import { Boards } from "@/types/boardPosts.interface";
import { useRouter } from "next/router";
import { BiLockAlt } from "react-icons/bi";
import { getUser } from "../../utils/client";

interface Props {
  posts: Boards[];
}

/**
 * @param {Array} posts 게시물 데이터
 */
export default function DesktopBoardPosts({ posts }: Props) {
  const router = useRouter();

  console.log("posts", posts);

  /**
   * @description 게시물이 비밀글인지 확인하는 함수
   */
  const checkPrivate = (data) => {
    if (data.private === 0 || getUser()?.id === data?.user.id) {
      router.push({
        pathname: `/QnA/view/${data.id}`,
      });
      return;
    } else {
      alert("권한이 없습니다.");
    }
  };

  return (
    <>
      {posts.map((data, index) => {
        return (
          <tr className="border-b-2 border-solid" key={index}>
            {/* 게시물 번호 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.id}
            </td>
            <td className="w-2/4 whitespace-nowrap p-2 text-xl font-normal">
              {/* 제목 */}
              <a
                className="cursor-pointer"
                onClick={() => {
                  checkPrivate(data);
                }}
              >
                <span className="flex items-center">
                  <span>{data.title}</span>
                  {data.secret == true && <BiLockAlt className="mt-1 pl-1" />}
                </span>
              </a>
            </td>
            {/* 유저이름 */}
            <td className="whitespace-nowrap break-keep p-2 text-xl font-normal">
              {data.user.nickname}
            </td>
            {/* 게시일 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.createdAt?.slice(0, 10) as string | "0"}
            </td>
            {/* 답변상태 */}
            <td className="whitespace-nowrap p-2 text-xl font-normal">
              {data.complete == false ? "답변대기중" : "답변완료"}
            </td>
          </tr>
        );
      })}
    </>
  );
}
