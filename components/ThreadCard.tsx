import useToggle from "hooks/useToggle";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import ThreadSummary from "./ThreadSummary";
import useInput from "hooks/useInput";
import { CommentBox } from "./community/CommentBox";
import mainRequest from "@/utils/request/mainRequest";
import { useMutation, useQuery } from "@tanstack/react-query";
import PostWriteModal from "./community/PostWriteModal";
import {
  mCreateComment,
  mDeleteComment,
} from "@/utils/fetchFn/mutation/community";
import { useRouter } from "next/router";

export default function ThreadCard({ postData, deletePost, loginUser }) {
  const writeComment = useInput("", "내용을 입력해주세요");
  const modal = useToggle(false);
  const readmore = useToggle(false);
  const router = useRouter();

  const getComments = ({ queryKey }) => {
    return mainRequest.get(`/commComments/${queryKey[1]}`);
  };

  const { data: comments, refetch: commentsRefetch } = useQuery(
    ["getComments", postData.id],
    getComments
  );

  const submitComment = (e) => {
    if (!loginUser) {
      alert("로그인이 필요합니다.");
      return;
    } else {
      if (e.key == "Enter") {
        onClick.createComment();
        writeComment.onChange("");
      }
    }
  };

  const { mutate: createComment } = useMutation({
    mutationKey: ["createComment"],
    mutationFn: mCreateComment,
    onSuccess: () => {
      // 댓글쓰면 댓글가져오는 useQuery 강제 refetch
      commentsRefetch();
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: mDeleteComment,
    onSuccess: () => {
      commentsRefetch();
    },
  });

  const { mutate: addComment } = useMutation({
    mutationKey: ["addComment"],
    mutationFn: mCreateComment,
    onSuccess: () => {
      commentsRefetch();
    },
  });

  const onClick = {
    like: () => {},
    showUser: () => {
      router.push(`/profile/${postData?.user?.id}`);
    },
    deletePost: () => {
      if (confirm("정말 삭제하시겠습니까?") === true) {
        deletePost(postData.id);
      } else {
        return;
      }
    },
    // 댓글작성
    createComment: () => {
      if (!loginUser) {
        alert("로그인이 필요합니다.");
        return;
      } else {
        writeComment.onChange("");
        createComment({
          postId: postData.id,
          depth: 0,
          content: writeComment.value,
          order: 1,
          targetId: null,
        });
      }
    },
    clickInput: () => {
      if (!loginUser) {
        alert("로그인이 필요합니다.");
        return;
      }
    },
    goUserProfile: (userId) => {
      router.push(`/profile/${userId}`);
    },
  };

  // console.log("postData123", postData);
  // console.log("isRefetching", isRefetching);
  // console.log("comments123", comments);

  return (
    <>
      <div className="w-full" key={postData?.name}>
        {/* 게시물 수정 모달 */}
        {modal.value && (
          <PostWriteModal
            img={""}
            planId={null}
            hideModal={modal.setFalse}
            nickname={loginUser.nickname}
            isFixed={true}
            postId={postData.id}
          />
        )}

        <div className="">
          <div className="m-2 min-h-[27rem] w-auto rounded-3xl border shadow-md ">
            {/* 닉넴 */}
            <div className="flex h-auto w-full items-center space-x-3 p-4">
              <FaUserCircle size={40} onClick={onClick.showUser} />
              <span
                className="cursor-pointer hover:underline"
                onClick={onClick.showUser}
              >
                {postData?.user?.nickname}
              </span>
            </div>
            {/* content */}
            <div className="min-h-[13rem]">
              <div className="p-4">
                <span
                  className={`${
                    readmore.value ? "" : "line-clamp-4"
                  } block text-lg leading-6`}
                >
                  {postData.content}
                </span>
                <div className="flex justify-end">
                  <span
                    className="cursor-pointer p-2 text-slate-400"
                    onClick={readmore.onClick}
                  >
                    {readmore.value ? "close" : "read more"}
                  </span>
                </div>
              </div>
              <div className="py-4">
                <ThreadSummary plan={postData && postData} />
              </div>
            </div>
            <div>
              <p className="border border-solid border-neutral-200"></p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FaRegThumbsUp
                  className="m-2 ml-5"
                  color="blue"
                  onClick={onClick.like}
                />
                <span className="text-sm">101</span>
              </div>
              {loginUser?.sub === postData.user.id ? (
                <div className="pr-2">
                  <button className="pr-3" onClick={() => modal.setTrue()}>
                    수정
                  </button>
                  <button className="" onClick={onClick.deletePost}>
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
            <div>
              <p className="border border-solid border-neutral-200"></p>
            </div>
            {/* 댓글 불러오기 */}
            {comments?.data?.ok &&
              comments?.data?.comments?.map((el) => {
                return (
                  el.targetId === null && (
                    <CommentBox
                      goUserProfile={onClick.goUserProfile}
                      key={el.id}
                      commentData={el}
                      postId={postData.id}
                      allComments={comments?.data?.comments}
                      addComment={addComment}
                      deleteComment={deleteComment}
                    />
                  )
                );
              })}
            {/* 댓글 작성란 */}
            <div className="flex w-full items-center justify-start p-2">
              <FaUserCircle className="m-2" size={30} />
              <textarea
                rows={1}
                className="w-full resize-none rounded bg-neutral-200 p-2 outline-none"
                {...writeComment}
                onClick={onClick.clickInput}
                onKeyDown={(e) => {
                  submitComment(e);
                }}
              />
              <button
                className="w-20 rounded bg-sky-600 py-2 text-white"
                onClick={onClick.createComment}
              >
                등록
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
