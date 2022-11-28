import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import BoardNav from "../../../components/board/BoardNav";
import Comment from "../../../components/Comment";
import { useInput, useBoard } from "../../../hooks";
import { getBoardPost, getComment } from "../../../utils/fetchFn/query/board";

//얘가 밑에 댓글 맵으로 뿌려주는거
export default function Detail() {
  const router = useRouter();
  const id = router.query?.id as string;
  const { deleteBoard } = useBoard();

  const commentV = useInput("", "댓글을 입력해주세요");

  const [{ data: post, isLoading, error }, { data: comment }] = useQueries({
    queries: [
      {
        queryKey: ["getBoardPost", id],
        queryFn: getBoardPost,
      },
      {
        queryKey: ["getComment", id],
        queryFn: getComment,
      },
    ],
  });

  const { writeComment } = useBoard();

  if (isLoading) {
    return <div></div>;
  } else if (error) {
    return <div>error</div>;
  }

  return (
    <div className="h-full">
      <div>
        <div className="mx-auto max-w-7xl">
          <div className="relative hidden h-72 md:block">
            <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
            {/* inset :0 position: absolute */}
          </div>

          <div className="flex h-full w-full flex-col lg:flex-row">
            <BoardNav boardname={"QnA"} />

            {/** 게시판 제목 */}
            <div className="mx-auto w-full max-w-6xl px-2">
              <div className="bg-gray mx-auto mt-0 hidden h-px w-full  max-w-6xl bg-black md:mt-9 md:block"></div>
              <dl>
                <div className="flex p-1">
                  <dt className="mt-2 border-r border-gray-300  pr-6 text-lg">
                    제목
                  </dt>
                  <dd className="mt-2 pl-3 text-lg">
                    {post.data.board[0].title}
                  </dd>
                </div>

                <div className="flex border-y p-1 ">
                  <div className="flex w-6/12 items-center">
                    <dt className=" border-r border-gray-300  pr-2  text-lg ">
                      글쓴이
                    </dt>
                    <dd className="pl-3 text-lg">
                      {post.data.board[0].user.name}
                    </dd>
                  </div>

                  <div className="flex w-6/12 p-1">
                    <dt className="border-r border-gray-300  pr-2 text-lg ">
                      작성일
                    </dt>
                    <dd className="pl-3 text-lg ">
                      {dayjs(post.data.board[0].created_at).format(
                        "YYYY.MM.DD"
                      )}
                    </dd>
                  </div>
                </div>
              </dl>
              {/**게시판 내용*/}
              {/* <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div> */}
              <div className="w-5/5 h-auto min-h-[200px]  border-black px-2 pt-1 text-sm md:text-base">
                {post.data.board[0].content}
              </div>
              {/**댓글 */}
              <div className="flex justify-end pt-3">
                <Link href={`/QnA/update?id=${id}`}>
                  <button className="mx-2 border px-4 py-2" onClick={() => {}}>
                    수정
                  </button>
                </Link>
                <button
                  className="bg-gray-400 px-4 py-2 text-white"
                  onClick={() => {
                    deleteBoard(id);
                  }}
                >
                  삭제
                </button>
              </div>
              <form
                className="my-6 flex flex-row "
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-1  align-text-top ">
                  <textarea
                    rows={4}
                    {...commentV}
                    className="h-auto w-full resize-none  border p-2 "
                  />
                </div>
                <button
                  className="ml-1  w-20 bg-gray-400  p-4 text-white "
                  onClick={() => {
                    writeComment({
                      content: commentV.value,
                      board_id: id,
                      target_id: null,
                      group: null,
                    });
                    commentV.onChange("");
                  }}
                >
                  등록
                </button>
              </form>
              <div>
                {comment?.data.comments.map((el, index) => {
                  return <Comment data={el} key={index} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
