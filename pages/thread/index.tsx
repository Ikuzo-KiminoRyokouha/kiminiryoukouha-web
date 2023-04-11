import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "components/ThreadCard";
import useObserver from "hooks/useObserver";
import { useRef, useState } from "react";
import React from "react";
import { useToggle } from "../../hooks";
import { FaUserCircle } from "react-icons/fa";
import { getUser } from "@/utils/client";
import PostWriteModalProps from "../../components/community/PostWriteModal";

export default function Thread() {
  const bottom = useRef(null);
  const onPostWrite = useToggle(false); // 게시물 작성 모달 on, off 스위치
  const user = getUser();
  const [totalPostsNum, setTotalPostsNum] = useState(0);

  console.log("user1234", user?.nickname);

  const getPostsData = ({ pageParam = 0 }) => {
    return axios
      .get(`http://localhost:8000/community/?limit=10&offset=${pageParam}`)
      .then((res) => {
        setTotalPostsNum(res.data[1]);
        return res?.data[0];
      });
  };

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    status,
    refetch: refetchPostsData,
  } = useInfiniteQuery(["getPostsData"], getPostsData, {
    getNextPageParam: (lastPage) => {
      // getNextPageParam 메서드가 falsy한 값을 반환하면 추가 fetch를 실행하지 않는다
      // falsy하지 않은 값을 return 할 경우 Number를 리턴해야 하며
      // 위의 fetch callback의 인자로 자동으로 pageParam을 전달.
      // lastPage: 호출된 가장 마지막에 있는 페이지 데이터
      // getNextPageParam의 return값은 위의 콜백의 pageParam으로 전달됨
      return totalPostsNum > lastPage[0]?.id + 10
        ? lastPage[0]?.id + 9
        : undefined;
    },
  });

  console.log("data?.pages", data?.pages);

  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  useObserver({
    target: bottom,
    onIntersect,
  });

  const onClick = {
    writePost: () => {
      if (!user) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      } else {
        onPostWrite.setTrue();
      }
    },
  };

  return (
    <>
      <div className="mx-auto  mb-[53px] max-h-full w-full max-w-2xl flex-1 border lg:mb-0">
        <div className="max-w-2xl">
          {/* community_글작성 */}
          <div className="flex w-full items-center justify-start p-1 pt-2">
            <FaUserCircle className="m-2" size={40} />
            <div className="flex w-full">
              <button
                className="mr-3 w-3/4 cursor-pointer resize-none rounded-xl bg-neutral-200 p-4 text-left outline-none"
                onClick={onClick.writePost}
              >
                게시물을 작성해주세요.
              </button>
              <input
                className="w-1/4 rounded-xl border border-solid border-black  p-2 outline-none"
                type="text"
                placeholder="게시물 검색"
              />
            </div>
          </div>
        </div>
        {data?.pages[0] &&
          data?.pages.map((group, idx) => {
            return group.map((el, index) => {
              console.log("el1234", el);
              return (
                <ThreadCard postData={el} refetchPostsData={refetchPostsData} />
              );
            });
          })}
        <div ref={bottom} />
        <div className="flex justify-center p-5">
          {isFetchingNextPage && <p>데이터 불러오는중</p>}
        </div>
      </div>
      {/* 모달창 */}
      {onPostWrite.value && (
        <PostWriteModalProps
          img={""}
          planId={null}
          hideModal={onPostWrite.setFalse}
          nickname={user ? user.nickname : "..."}
          refetchData={refetchPostsData}
        />
      )}
    </>
  );
}
