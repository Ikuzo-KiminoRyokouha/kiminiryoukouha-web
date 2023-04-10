import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import ThreadCard from "components/ThreadCard";
import useObserver from "hooks/useObserver";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useInput, useToggle } from "../../hooks";
import { FaGetPocket, FaUserCircle } from "react-icons/fa";
// import { FiImage } from "react-icons/fi";
import { FcAddImage } from "react-icons/fc";

import { useRouter } from "next/router";
import { Modal, Portal } from "../../components/common/modal";
import authRequest from "@/utils/request/authRequest";
import MyPlan from "../../components/Myplan";
import { redirect } from "next/dist/server/api-utils";
import mainRequest from "@/utils/request/mainRequest";

export default function Thread() {
    const bottom = useRef(null);
    const LIMIT = 30;
    const OFFSET = 0;

    const getPoketmons = ({ queryKey, pageParam = OFFSET }) => {
        return axios
            .get(
                `http://localhost:8000/community/?limit=${LIMIT}&offset=${OFFSET}`
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
    //
    const deleting = useToggle(false);

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
                                onClick={() => deleting.setTrue()}
                                // onChange={modalOpen.onClick}
                            >
                                게시물을 작성해주세요.
                            </button>
                            <input
                                className="w-1/4 rounded-xl border border-solid border-black bg-slate-100 p-2 outline-none"
                                type="text"
                                placeholder="게시물 검색"
                            />
                        </div>
                    </div>
                    {/* 게시글 아래 아이콘 넣을 예정 */}
                    {/* 모달창 */}
                    {deleting.value && (
                        <PostWrite
                            img={"adsf"}
                            content={"경주"}
                            planId={1}
                            hide={deleting.setFalse}
                            
                        />
                    )}
                </div>
                {/* community_글작성 - Modal */}
                {data?.pages?.map((group, idx) => (
                    <div key={idx}>
                        {group?.map((el) => (
                            <ThreadCard pokemon={el} onClick={onClick}  content={''} createdAt={''} id={''} img={''} plan={''} />
                        ))}
                    </div>
                ))}
                <div ref={bottom} />
                <div className="flex justify-center p-5">
                    {isFetchingNextPage && <p>데이터 불러오는중</p>}
                </div>
            </div>
        </>
    );
}

interface ModalProps {
    img: string;
    content: string;
    planId: number;
    hide: () => void;
}

function PostWrite({ img, content, planId, hide }: ModalProps) {
    const contents = useInput("", "게시물 내용을 입력해주세요");
    const submit = () => {
        if (contents.value) {
            authRequest.post("/community", {
                img: imgSrc,
                content: contents.value,
                planId: planIdNum,
            });
            alert("커뮤니티 글작성이 완료되었습니다.");
            location.reload();
        } else {
            alert("글을 작성해주세요.");
        }
    };
    


    const [planData, setPlanData] = useState<Array<any> | undefined>(); // 데이터 저장 임의
    useEffect(() => {
        authRequest
            .get(`/plan/all/1`)
            .then((res) => {
                setPlanData(res.data.plans);
            })
            .catch((err) => {
               
            });
    }, []);
    
  
    // 커뮤니티 글작성; 모달창 내 이미지 버튼 클릭 시 내용 보이기 / 지우기
    var write_plan: number = 0;

    const classnameAdd = () => {
        // 플렌 데이터 불러오기
        
        document.getElementsByClassName("test")[0].classList.toggle("hidden");
        document.getElementsByClassName("test")[0].classList.add("block");
    };

    const [planIdNum,setPlanIdNum]=useState(0)
    const getPlanIdNum= (x)=>{
        setPlanIdNum(x)
    } 

    const [imgSrc,setImgsrc]=useState("")
    const getimgSrc= (x)=>{
        setImgsrc(x)
    } 
    
  

    
    return (
        <>
            <Portal qs={"#__next"}>
                <Modal hide={hide}>
                    <Modal.Header hide={hide} />
                    <div className=" border-0 text-center text-xl font-black">
                        <label>게시글 작성</label>
                    </div>
                    {/* 디바이더 */}
                    <div className="h-2">
                        <p className="w-full border-t"></p>
                    </div>
                    <div className="flex ">
                        <div className=" w-full justify-around">
                            <div className="flex ">
                                <div className="flex h-auto w-full items-center space-x-3 p-2">
                                    <FaUserCircle
                                        className="cursor-pointer"
                                        size={40}
                                        onClick={() => {
                                            console.log("프로필");
                                        }}
                                    />
                                    <span
                                        className="cursor-pointer"
                                        onClick={() => {
                                            console.log("nickname");
                                        }}
                                    >
                                        nickname
                                    </span>
                                </div>
                            </div>
                            {/* 게시물 내용 입력 */}
                            <div className="w-full">
                                <textarea
                                    className="w-full resize-none  rounded-md px-2 py-2 text-lg outline-none"
                                    rows={10}
                                    {...contents}
                                />
                            </div>
                            {/* img 아이콘 넣기 */}
                            <div className="flex w-full justify-end">
                                <FcAddImage
                                    size={40}
                                    onClick={(e) => {
                                        classnameAdd();
                                        console.log("데이터를 사용해야함");
                                    }}
                                    className="cursor-pointer"
                                />
                            </div>
                            <div className="test flex hidden items-center">
                                <MyPlan data={planData} getPlanIdNum={getPlanIdNum}  getimgSrc={getimgSrc} />
                            </div>
                        </div>
                    </div>
                    <Modal.Footer>
                        <button
                            onClick={() => {
                                submit();
                            }}
                            className="h-10 flex-1 rounded-md border-0 bg-sky-600 text-lg font-bold text-white"
                        >
                            완료
                        </button>
                    </Modal.Footer>
                </Modal>
            </Portal>
        </>
    );
}
