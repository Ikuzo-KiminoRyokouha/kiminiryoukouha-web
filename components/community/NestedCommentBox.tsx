import { getUser } from "@/utils/client";
import Link from "next/link";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

export default function NestedCommentBox({ commentData, delComment }) {
  const user = getUser();

  // console.log("commentData", commentData);
  return (
    <>
      <div className={`flex p-2 py-3 pl-2`}>
        <BsArrowReturnRight className="mt-4 mr-1" size={15} />
        <FaUserCircle className="m-2" size={30} />
        <div>
          <div className="min-w-[130px] resize-none rounded-xl bg-neutral-200 p-2 outline-none">
            <div className="p-1">
              <div className="flex">
                {/* 유저아이디 */}
                <Link href={`/profile/${commentData?.user?.id}`} passHref>
                  <a className="font-bold hover:underline">
                    {commentData.user.nickname}
                  </a>
                </Link>
              </div>
              {/* 댓글내용 */}
              <div className="flex pt-2">
                <p className="text-md leading-5">{commentData.content}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full min-w-[130px] py-1">
            {user && user.sub === commentData.user.id ? (
              <p
                className="cursor-pointer hover:underline"
                onClick={() => {
                  delComment(commentData.id);
                }}
              >
                삭제
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
