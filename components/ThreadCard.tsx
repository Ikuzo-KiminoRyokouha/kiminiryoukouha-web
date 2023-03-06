import useToggle from "hooks/useToggle";
import { icons } from "react-icons";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdOutlineArrowBackIosNew, MdOutlineArrowForwardIos, MdSaveAlt } from "react-icons/md";
import { AiOutlineSend } from "react-icons/ai";
import ThreadSummary from "./ThreadSummary";
import useInput from "hooks/useInput";
import { useRouter } from "next/dist/client/router";
import { CommentBox } from "./community/CommentBox";
import authRequest from "@/utils/request/authRequest";
import { Modal, Portal } from "./common/modal";
import { FcAddImage } from "react-icons/fc";
import Router from "next/router";
import mainRequest from "@/utils/request/mainRequest";
import { useEffect, useState } from "react";
import MyPlan from '../components/Myplan'

export default function ThreadCard({
  pokemon,
  onClick,
  content,
  createdAt,
  id,
  img,
  plan,
 
}) {

  // const nickname = async ()=>{
  //   const a= await authRequest.get(`users/info/?userId=${pokemon.plan.userId}`).then((res) =>{ return res.data }).catch((error)=>{console.log(error)})  
  //   return a;
  // }
  // const nick = nickname()
  

  // console.log('pokemon123',pokemon)
  


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


  // const nickname  = async () => {
  //   const a = await authRequest.get(`/users/info/?userId=${pokemon.plan.userId}`)
  //   console.log(a)
  //   return  a.data.nickname
  // }

  
  //nickname()
 
  const DeleteCom = async () =>{
    router.reload()
    return await authRequest.delete(`/community/${pokemon.id}`)
   
  }

  const deleting = useToggle(false);
  // 게시글작성 관련
  //
  const modal = useToggle(false);



  


  
  return (
    <>
      <div className="w-full" key={pokemon?.name}>

      {deleting.value && (
                        <PostWrite
                        img={pokemon.plan.img}
                        content={pokemon.content}
                        planId={pokemon.plan.id}
                        hide={deleting.setFalse}
                        id={pokemon.id}
                      
                    />
                    )}

        <div className="">
          <div className="m-2 min-h-[30rem] w-auto rounded-3xl border shadow-md ">
            <div className="flex h-auto w-full items-center space-x-3 p-4">
              <FaUserCircle size={40} onClick={onClick.showUser} />
              <span className="" onClick={onClick.showUser}>
                      asdasda
              </span>
              
              <button className=""   onClick={() =>  deleting.setTrue() }  >
                수정
              </button>
              <button className="" onClick={DeleteCom} >
                삭제
              </button>
              
            
            </div>


            
            {/* <div className="pl-2 text-sm">{"날짜"}</div> */}
            <div className="min-h-[13rem]">
              <div className="p-4">
                <span
                  className={`${
                    readmore.value ? "" : "line-clamp-4"
                  } block text-lg leading-6`}
                >
                  {pokemon.content}
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
                <ThreadSummary plan={pokemon} />
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











interface ModalProps {
  img: string;
  content: string;
  planId: number;
  hide: () => void;
  id:number;
}

function PostWrite({ img, content, planId, hide, id }: ModalProps) {
  const contents = useInput(content, "게시물 내용을 입력해주세요");
  const edit = () => {
    authRequest.put("/community", {
        img:imgSrc,
        content: contents.value,
        id,
        planId:planIdNum,
       
    });

    alert("커뮤니티 글수정이 완료되었습니다.");
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
  console.log(planData)

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
                      <label>게시글 수정</label>
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
                              <MyPlan data={planData} getPlanIdNum={getPlanIdNum} getimgSrc={getimgSrc} />
                          </div>
                      </div>
                  </div>
                  <Modal.Footer>
                      <button
                          onClick={() => {
                            edit();
                            Router.reload()
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
