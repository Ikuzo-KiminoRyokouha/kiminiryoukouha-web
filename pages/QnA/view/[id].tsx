import { useQueries } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import Comment from "../../../components/Comment";
import { useInput, useBoard } from "../../../hooks";
import { getUser } from "../../../utils/client";
import { getComment } from "../../../utils/fetchFn/query/board";
import axios from "axios";
import Image from "next/image";

//얘가 밑에 댓글 맵으로 뿌려주는거
export default function Detail({ boardData }) {
  const router = useRouter();
  const id = router.query?.id as string;
  const { deleteBoard } = useBoard();
  const { writeComment } = useBoard();
  const comment = useInput("", "댓글을 입력해주세요");
  const [{ data: comments }] = useQueries({
    queries: [
      {
        queryKey: ["getComment", id],
        queryFn: getComment,
      },
    ],
  });

  const authCheck = () => {
    if (!getUser()) {
      alert("로그인 되지 않은 유저입니다.");
      return false;
    }
    return true;
  };

  const onClick = {
    routing: (url) => {
      if (authCheck()) {
        router.push(url);
      }
    },
    delete: () => {
      if (authCheck()) {
        confirm("정말 삭제하시겠습니까?") && deleteBoard(id);
      }
    },
    registerComment: () => {
      if (authCheck()) {
        writeComment({
          boardId: Number(id),
          group: null,
          targetId: null,
          content: comment.value,
        });
        comment.onChange("");
      }
    },
  };

  return (
    <div className="h-full">
      <div>
        <div className="mx-auto max-w-7xl">
          {/* 배경사진 */}
          <div className="relative hidden h-72 w-full md:block">
            <Image src={"/assets/QnA-bg.png"} layout={"fill"} loading="lazy" />
          </div>
          <div className="flex h-full w-full flex-col lg:flex-row">
            <nav className=" w-full md:flex md:w-1/4">
              <div className="flex w-full flex-row md:flex-col">
                <div className="h-9 w-full bg-sky-600 md:mt-9 md:w-2/3 md:flex-none">
                  <h2 className="pl-2 pt-1 text-lg text-white md:pl-1">
                    질의응답
                  </h2>
                </div>
              </div>
            </nav>
            {/** 게시판 제목 */}
            <div className="mx-auto w-4/5 max-w-6xl px-2">
              <div className="mx-auto mt-0 hidden h-px w-full  max-w-6xl bg-black md:mt-9 md:block"></div>
              <dl>
                <div className="m-1 flex items-center p-1">
                  <dt className="border-r border-gray-300  pr-6 text-lg">
                    제목
                  </dt>
                  <dd className="pl-3 text-lg">{boardData?.board?.title}</dd>
                </div>

                <div className="flex border-y p-1">
                  <div className="flex w-full items-center">
                    <dt className=" border-r border-gray-300  pr-2.5  text-lg ">
                      글쓴이
                    </dt>
                    <dd className="pl-3 text-lg">
                      {boardData?.board?.user?.nickname}
                    </dd>
                  </div>
                </div>

                <div className="flex w-full p-1">
                  <dt className="border-r border-gray-300  pr-2 text-lg ">
                    작성일
                  </dt>
                  <dd className="pl-3 text-lg ">
                    {dayjs(boardData?.board?.created_at).format("YYYY.MM.DD")}
                  </dd>
                </div>
              </dl>
              {/**게시판 내용*/}
              <div className="w-5/5 h-auto min-h-[200px] break-all px-1 pt-4 text-base md:text-lg">
                {boardData?.board?.content}
              </div>

              <div className="flex justify-end pt-3">
                <button
                  className="border px-6 py-2"
                  onClick={() => {
                    onClick.routing("/QnA");
                  }}
                >
                  목록
                </button>
                <button
                  className="mx-2 border px-6 py-2"
                  onClick={() => {
                    onClick.routing(`/QnA/update?id=${id}`);
                  }}
                >
                  수정
                </button>
                <button
                  className="bg-gray-400 px-6 py-2 text-white"
                  onClick={onClick.delete}
                >
                  삭제
                </button>
              </div>
              {/* 댓글 */}
              <div>
                {comments?.data?.comments?.map((data, index) => {
                  return <Comment data={data} key={index} />;
                })}
              </div>
              <form
                className="my-6 flex flex-row "
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="flex-1  align-text-top ">
                  <textarea
                    rows={4}
                    {...comment}
                    className="h-auto w-full resize-none  border p-2 "
                  />
                </div>
                <button
                  className="ml-1  w-20 bg-gray-400  p-4 text-white "
                  onClick={onClick.registerComment}
                >
                  등록
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// SSR로 데이터 받아오기
export async function getServerSideProps(context: any) {
  try {
    const { data: boardData } = await axios.get(
      `http://localhost:8000/board/${context.params.id}`
    );

    if (!boardData) {
      console.log("boardData is not found");
      return {
        props: { boardData: -1 },
      };
    }

    return { props: { boardData } };
  } catch {
    console.log("error occured");
    return { props: { boardData: -1 } };
  }
}
