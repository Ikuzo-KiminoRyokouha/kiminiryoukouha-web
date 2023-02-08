import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "components/ThreadCard";
import useObserver from "hooks/useObserver";
import { useRef } from "react";

export default function Thread({}) {
  const bottom = useRef(null);
  const LIMIT = 5;
  const OFFSET = 5;
//OFFSET 처음부터 얼마나 떨어졌는지 얼마나 보여주는지 

  
  const getPoketmons = ({ queryKey, pageParam = OFFSET }) => {
    return axios
      .get(
        `http://localhost:8000/community?limit=${LIMIT}&offset=${pageParam}/`
      )
      .then((res) => res.data);
  };
 //useQuery나 useInfinityQuery나 똑같다 앞에꺼 내가원하는 데이터를 찾는거 두번째껀 axios요청인데 첫번쨰껀 같은걸 계속찾으니까 상관없음
 //pageparam 현재 어떤 페이지인지 확인하는 값 lastpage 호출된 가장 마지막 페이지값
 //getNextPageParam 이게 다음 페이지 보여주는거   lastPage는 useInfiniteQuery를 이용해 호출된 가장 마지막에 있는 페이지 데이터를 의미합니다.
 //여기서 getPoketmons는 axios요청 
//  //fetchNextPage()는 다음페이지 호출 
//  [GET] /community
// 커뮤니티 조회 컨트롤러입니다 Polling 서비스에 쓰기위해 limit 와 offset을 QS로 받아옵니다.
// params : {limit : number , offset : number}
 
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
//값이 없으면 폴스고 있으면 
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
  //console.log(data?.pages)

  return (
    <>
      <div className="mx-auto  mb-[53px] flex max-h-full w-full max-w-2xl flex-1 border lg:mb-0">
        <div className="max-w-2xl">
          {data?.pages?.map((group, idx) => (
            <div key={idx}>
              {group?.map((el) => (
                <ThreadCard content={el} onClick={onClick} />
              ))}
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
