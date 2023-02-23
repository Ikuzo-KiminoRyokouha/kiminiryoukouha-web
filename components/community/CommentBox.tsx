import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

export function CommentBox({ user }) {
  const router = useRouter();
  return (
    <>
      <div className="flex p-2 py-5">
        <FaUserCircle className="m-2" size={30} />
        <div>
          <div className="resize-none rounded-xl bg-neutral-200 p-2 outline-none">
            <div className="p-1">
              <div className="flex">
                {/* 유저아이디 */}
                <button
                  className="font-bold hover:underline"
                  onClick={() => {
                    router.push("#");
                  }}
                >
                  <p className="">{user.id}</p>
                </button>
                {/* 타임스탬프 */}
                <p className="font-nomal pl-2 text-xs text-slate-400">
                  1시간 전
                </p>
              </div>
              {/* 댓글내용 */}
              <div className="flex py-2">
                <p className="text-md leading-5">{user.comment}</p>
              </div>
            </div>
          </div>
          <div className="flex w-11/12 justify-between p-2 py-1">
            <div>
              <p className="cursor-pointer" onClick={() => {}}>
                좋아요
              </p>
            </div>
            <div>
              <p className="cursor-pointer" onClick={() => {}}>
                댓글달기
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
