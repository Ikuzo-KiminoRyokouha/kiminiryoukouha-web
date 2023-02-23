import useToggle from "hooks/useToggle";
import { icons } from "react-icons";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import ThreadSummary from "./ThreadSummary";
import useInput from "hooks/useInput";
import { useRouter } from "next/dist/client/router";
import { CommentBox } from "./community/CommentBox";

export default function ThreadCard({ pokemon, onClick }) {
  const readmore = useToggle(false);
  // 좋아요 담는 용도
  const like = useToggle(false);
  const router = useRouter();

  const fun_like = () => {
    console.log("좋아요 버튼 클릭");
  };
  const fun_download = () => {
    console.log("다운로드 버튼 클릭");
  };

  const user = {
    id: "Younha Go",
    name: "윤하",
    comment: "사건의 지평선",
  };

  const test_com = useInput("", "내용을 입력해주세요");

  const keyCheck = (e) => {
    if (e.key == "Enter") {
      // alert("엔터키 눌림"); // ok
      alert(`${test_com.value} 입력완료`);
      location.reload();
    }
  };

  return (
    <>
      <div className="w-full" key={pokemon?.name}>
        <div className="">
          <div className="m-2 min-h-[30rem] w-auto rounded-3xl border shadow-md ">
            <div className="flex h-auto w-full items-center space-x-3 p-4">
              {/* <FaUserCircle size={40} onClick={onClick.showUser} />
              <span className="" onClick={onClick.showUser}>
                {createdAt.slice(5, 10)}
              </span> */}
            </div>
            {/* <div className="pl-2 text-sm">{"날짜"}</div> */}
            <div className="min-h-[13rem]">
              <div className="p-4">
                <span
                  className={`${
                    readmore.value ? "" : "line-clamp-4"
                  } block text-lg leading-6`}
                >
                  {/* {content} */}
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
                <ThreadSummary />
              </div>
            </div>
            <div>
              <p className="border border-solid border-neutral-200"></p>
            </div>
            <div className="flex items-center justify-start">
              <FaRegThumbsUp
                className="m-2 ml-5"
                color="blue"
                onClick={(e) => {
                  fun_like();
                }}
              />
              <span className="text-sm">101</span>
              <MdSaveAlt
                className="mx-2"
                size={19}
                onClick={(e) => {
                  fun_download();
                }}
              />
              <span className="text-sm">8</span>
            </div>
            <div>
              <p className="border border-solid border-neutral-200"></p>
            </div>
            {/* 댓글 불러오기 */}
            <CommentBox user={user} />
            <div>
              {/* 댓글 작성란 */}
              <div className="flex w-full items-center justify-start p-2">
                <FaUserCircle className="m-2" size={30} />
                <textarea
                  rows={1}
                  className="w-full resize-none rounded-xl bg-neutral-200 p-2 outline-none"
                  {...test_com}
                  onKeyDown={(e) => {
                    keyCheck(e);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
