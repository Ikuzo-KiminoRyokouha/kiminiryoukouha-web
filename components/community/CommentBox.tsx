import { getUser } from "@/utils/client";
import useInput from "hooks/useInput";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import { BsArrowReturnRight } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import NestedCommentBox from "./NestedCommentBox";

export function CommentBox({
  commentData,
  postId,
  allComments,
  addComment,
  deleteComment,
  goUserProfile,
}) {
  // console.log("commentData123", commentData);
  const router = useRouter();
  const isWriting = useToggle(false);
  const addCommentInput = useInput("", "내용을 입력해주세요");
  const user = getUser();

  const onClick = {
    // 대댓글 작성
    addComment: () => {
      isWriting.onClick();
      addComment({
        postId: postId,
        depth: 1, // 대댓글은 1고정 (댓글은 0)
        content: addCommentInput.value,
        order: 1,
        targetId: commentData.id,
      });
      addCommentInput.onChange("");
    },
    // 대댓글작성 Input창 띄워주는 함수
    openCommentInput: () => {
      if (!user) {
        alert("로그인이 필요합니다.");
        return;
      } else {
        isWriting.onClick();
      }
    },
  };
  return (
    <>
      <div
        className={`flex p-2 py-3 ${commentData?.depth === 1 ? "pl-12" : ""}`}
      >
        {commentData?.depth === 1 ? (
          <BsArrowReturnRight className="mt-4 mr-1" size={15} />
        ) : null}
        <FaUserCircle className="m-2" size={30} />
        <div>
          <div className="w-fit min-w-[130px] resize-none rounded-xl bg-neutral-200 p-2 outline-none">
            <div className="p-1">
              <div className="flex">
                {/* 유저아이디 */}
                <button
                  className="font-bold hover:underline"
                  onClick={() => {
                    goUserProfile(commentData?.user?.id);
                  }}
                >
                  <p className="">{commentData.user.nickname}</p>
                </button>
              </div>
              {/* 댓글내용 */}
              <div className="flex pt-2">
                <p className="text-md leading-5">{commentData.content}</p>
              </div>
            </div>
          </div>
          <div className="flex w-full min-w-[130px] py-1">
            {/* 대댓글까지만 작성 허용 */}
            {commentData.depth === 0 ? (
              <p
                className="cursor-pointer pb-1 pr-3 hover:underline"
                onClick={onClick.openCommentInput}
              >
                댓글달기
              </p>
            ) : null}
            {user && user.sub === commentData.user.id ? (
              <p
                className="cursor-pointer hover:underline"
                onClick={() => {
                  deleteComment(commentData.id);
                }}
              >
                삭제
              </p>
            ) : null}
          </div>
          <div>
            {allComments?.map((comment) => {
              return (
                comment.targetId !== null &&
                comment.targetId == commentData.id && (
                  <NestedCommentBox
                    key={comment.id}
                    goUserProfile={goUserProfile}
                    commentData={comment}
                    delComment={deleteComment}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
      {/* 대댓글 입력창 */}
      <form
        className={`flex p-2 ${isWriting.value ? "block" : "hidden"}`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="ontline-none w-full resize-none rounded border-2 p-2 text-lg"
          {...addCommentInput}
          rows={2}
        />
        <button
          className="w-20 rounded bg-sky-600 text-white"
          onClick={onClick.addComment}
        >
          등록
        </button>
      </form>
    </>
  );
}

/**
 * postId
 * depth - 0이면 그냥 댓글 1이면 대댓글
 * content
 * order - 댓글끼리 순서, 또는 대댓글끼리 순서
 * targetId - 대댓글이면 댓글의 id, 댓글이면 null
 */
