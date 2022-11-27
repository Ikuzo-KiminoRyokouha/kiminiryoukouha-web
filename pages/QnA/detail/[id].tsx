import Image from "next/image";
import Link from "next/link";
//얘가 밑에 댓글 맵으로 뿌려주는거
import Comment from "../../../components/Comment";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { getBoardPost } from "../../../utils/fetchFn/query/board";
import dayjs from "dayjs";
import useBoard from "../../../hooks/useBoard";

export default function Detail() {
  const router = useRouter();
  const id = router.query.id as string;
  const { deleteBoard } = useBoard();

  const { data, isLoading, error } = useQuery(
    ["getBoardPost", id],
    getBoardPost
  );

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

          <div className="flex h-full w-full">
            <div className=" hidden w-1/4 md:flex ">
              <div className="flex w-full flex-col items-center">
                <div className="mt-10 h-9 w-2/3 bg-sky-600">
                  <Link href={"/QnA"} legacyBehavior>
                    <a>
                      <h2 className="pl-1 text-lg text-white ">질의응답</h2>
                    </a>
                  </Link>
                </div>
                <div className="h-9 w-2/3 border-b-2 border-solid border-gray-300">
                  <Link href="/F&A" legacyBehavior>
                    <a>
                      <h2 className="pl-1 text-lg">자주묻는질문</h2>
                    </a>
                  </Link>
                </div>
              </div>
            </div>

            {/** 게시판 제목 */}
            <div className="mx-auto w-full max-w-6xl">
              <div className="bg-gray mx-auto mt-9 h-px w-full max-w-6xl bg-black "></div>
              <dl>
                <div className="flex pb-1">
                  <dt className="mt-2 border-r border-gray-300  pr-6 text-lg">
                    제목
                  </dt>
                  <dd className="mt-2 pl-3 text-lg">
                    {data.data.board[0].title}
                  </dd>
                </div>

                <div className="flex border-b border-t  pb-2    ">
                  <div className="flex w-6/12">
                    <dt className=" border-r border-gray-300  pr-2  text-lg ">
                      글쓴이
                    </dt>
                    <dd className="pl-3 text-lg">
                      {data.data.board[0].user.name}
                    </dd>
                  </div>

                  <div className="flex w-6/12">
                    <dt className="border-r border-gray-300  pr-2 text-lg ">
                      작성일
                    </dt>
                    <dd className="pl-3 text-lg ">
                      {dayjs(data.data.board[0].created_at).format(
                        "YYYY.MM.DD"
                      )}
                    </dd>
                  </div>
                </div>

                <div className="flex">
                  <dt className="border-r border-gray-300  pr-2 text-lg">
                    조회수
                  </dt>
                  <dd className=" pl-3 text-lg">{data.data.board[0].view}</dd>
                </div>
              </dl>
              {/**게시판 내용*/}

              <div className="bg-gray  float-none clear-both my-2 h-px w-full bg-gray-200 "></div>
              <div className="w-5/5 h-auto border-black  text-base  ">
                {data.data.board[0].content}
              </div>
              {/**댓글 */}
              <div className="flex justify-end pt-3">
                <Link href={`/QnA/update?id=${id}`}>
                  <button
                    className="mx-2 rounded bg-sky-600 p-3 text-white "
                    onClick={() => {}}
                  >
                    수정
                  </button>
                </Link>
                <button
                  className="rounded bg-sky-600 p-3 text-white"
                  onClick={() => {
                    deleteBoard(id);
                  }}
                >
                  삭제
                </button>
              </div>

              <div className="my-6 flex flex-row ">
                <textarea
                  placeholder="댓글을 입력해주세요."
                  className="h-32 w-full resize-none  border-2  "
                ></textarea>

                <button
                  className="   ml-1  w-20 rounded bg-sky-600    p-4 text-white   "
                  onClick={() => {
                    console.log("댓글등록");
                  }}
                >
                  등록
                </button>
              </div>
              <div>
                {/* {comment.map((el, index) => {
                  return <Comment data={el} key={index} />;
                })} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
