import { getUser } from "@/utils/client";
import { mCreateComment } from "@/utils/fetchFn/mutation/community";
import authRequest from "@/utils/request/authRequest";
import { useMutation } from "@tanstack/react-query";
import useInput from "hooks/useInput";
import useToggle from "hooks/useToggle";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";

export function CommentBox({ commentData, postId, refetchComment }) {
  console.log("commentData123", commentData);
  const router = useRouter();
  const isWriting = useToggle(false);
  const addCommentInput = useInput("", "내용을 입력해주세요");
  const user = getUser();

  const mDeleteComment = (id) => {
    return authRequest.delete(`/commComments/${id}`);
  };

  const { mutate: deleteComment } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: mDeleteComment,
    onSuccess: () => {
      refetchComment();
    },
  });

  const { mutate: addComment } = useMutation({
    mutationKey: ["addComment"],
    mutationFn: mCreateComment,
    onSuccess: () => {
      refetchComment();
    },
  });

  const onClick = {
    goUserProfile: () => {
      router.push(`/profile/${commentData.user.id}`);
    },
    // 대댓글 작성
    addComment: async () => {
      isWriting.onClick();
      await addComment({
        postId: postId,
        depth: 1,
        content: addCommentInput.value,
        order: 1,
      });
    },
    delComment: () => {
      deleteComment(commentData.id);
    },
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
      <div className="flex p-2 py-3">
        <FaUserCircle className="m-2" size={30} />
        <div>
          <div className="min-w-[130px] resize-none rounded-xl bg-neutral-200 p-2 outline-none">
            <div className="p-1">
              <div className="flex">
                {/* 유저아이디 */}
                <button
                  className="font-bold hover:underline"
                  onClick={onClick.goUserProfile}
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
            <p
              className="cursor-pointer pb-1 pr-3 hover:underline"
              onClick={onClick.openCommentInput}
            >
              댓글달기
            </p>
            {user && user.sub === commentData.user.id ? (
              <p
                className="cursor-pointer hover:underline"
                onClick={onClick.delComment}
              >
                삭제
              </p>
            ) : null}
          </div>
        </div>
      </div>
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
 */
