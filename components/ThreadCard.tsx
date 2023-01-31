import useToggle from "hooks/useToggle";
import { icons } from "react-icons";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import ThreadSummary from "./ThreadSummary";
import useInput from "hooks/useInput";

export default function ThreadCard({ pokemon, onClick }) {
  const readmore = useToggle(false);
  // 좋아요 담는 용도
  const like = useToggle(false);

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
      <div className="w-full" key={pokemon.name}>
        <div className="">
          <div className="m-2 w-auto rounded-3xl border shadow-md">
            <div className="flex h-auto w-full items-center space-x-3 p-2">
              <FaUserCircle size={40} onClick={onClick.showUser} />
              <span className="" onClick={onClick.showUser}>
                {/* {pokemon.name + "・" + "23/1/25"} */}
                {pokemon.name + "・" + "2시간 전"}
              </span>
            </div>
            {/* <div className="pl-2 text-sm">{"날짜"}</div> */}
            <div className="p-2">
              <span
                className={`${
                  readmore.value ? "" : "line-clamp-4"
                } block leading-6`}
              >
                {pokemon.url} Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Dolor, tempore magnam voluptate nobis, illum
                quas fuga pariatur neque ipsam inventore sequi. Vero
                reprehenderit sapiente labore dolore. Sint molestiae quasi
                commodi. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Cum vitae nemo expedita magnam distinctio quos cumque
                harum. Eveniet, quos vel, quasi odit modi molestiae praesentium,
                voluptatum sapiente nulla voluptatibus sit. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Illum ducimus optio
                quaerat, placeat deleniti in consequatur reiciendis, nisi
                dignissimos rem natus a minima sunt ipsum reprehenderit animi?
                Vitae, corrupti possimus!
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
            <ThreadSummary />
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
            <div>
              <div className="m-2 flex">
                <FaUserCircle className="m-2" size={30} />
                <div>
                  <div className="resize-none rounded-xl bg-neutral-200 p-2 outline-none">
                    <div className="flex">
                      <a href="" className="font-bold hover:underline">
                        <p className="">{user.id}</p>
                      </a>
                      <p className="font-nomal pl-2 text-xs text-slate-400">
                        {"1시간 전"}
                      </p>
                    </div>
                    <div className="flex py-1">
                      <p className="pl-1 text-sm">{user.comment}</p>
                    </div>
                  </div>
                  <div className="flex justify-between p-2 py-0">
                    <div>
                      <p>좋아요</p>
                    </div>
                    <div>
                      <p>댓글달기</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
