import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "components/ThreadCard";
import useObserver from "hooks/useObserver";
import { useRef } from "react";

export default function Thread() {
  const bottom = useRef(null);
  const LIMIT = 5;
  const OFFSET = 5;

  const getPoketmons = ({ queryKey, pageParam = OFFSET }) => {
    return axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${OFFSET}&offset=${pageParam}`
      )
      .then((res) => res.data);
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["getPoketmons"], getPoketmons, {
    getNextPageParam: (lastPage, pages) => {
      const { next } = lastPage;
      if (!next) return false;

      return Number(new URL(next).searchParams.get("offset"));
    },
  });

  const onClick = {
    showUser: () => {},
  };

  // useObserver로 넘겨줄 callback, entry로 넘어오는 HTMLElement가
  // isIntersecting이라면 무한 스크롤을 위한 fetchNextPage가 실행될 것이다.
  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  // useObserver로 bottom ref와 onIntersect를 넘겨 주자.
  useObserver({
    target: bottom,
    onIntersect,
  });

  return (
    <>
      <div className="mx-auto  mb-[53px] flex max-h-full w-full max-w-2xl flex-1 border lg:mb-0">
        <div className="max-w-2xl">
          {data?.pages?.map((group, idx) => (
            <div key={idx}>
              {/* {group?.results?.map((pokemon) => (
                <ThreadCard pokemon={pokemon} onClick={onClick} />
              ))} */}
            </div>
          ))}
          <div ref={bottom} />
          <div className="flex justify-center p-5">
            {isFetchingNextPage && <p>데이터 불러오는중</p>}
          </div>
        </div>
      </div>
    </>
  );
}
