import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Chatgpt from "../chatgpt";
import { AiOutlineArrowLeft } from "react-icons/ai"; 
import Chatbot from "components/Chatbot";

/**
 * @description 누르면 챗봇 창이 뜨는 Floating Button 입니다.
 */
export default function ChatBotButton() {
  const [modalbtn,setModalbtn]=useState(false);
  const chatBotBtnRef=useRef(null)

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (modalbtn && chatBotBtnRef.current && !chatBotBtnRef.current.contains(e.target)) {
        setModalbtn(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modalbtn]);

  return (
  
    <div
      className="z-100 fixed bottom-10 right-8 hidden h-12 w-12 items-center
 justify-center rounded-full bg-blue-600 text-4xl text-white
 drop-shadow-lg duration-300  hover:bg-blue-700 hover:drop-shadow-2xl md:flex"
    ref={chatBotBtnRef}

    onClick={()=>{
      setModalbtn(!modalbtn)
    
    }}
    >
      <Image src="/assets/customer-service.png" width={24} height={24}></Image>
      {modalbtn?<Modal closeModal={()=>setModalbtn(!modalbtn)} />:null} 
      

    </div>
   
  );

}




function Modal({closeModal}) {





  function handleCloseModal(e) {
    e.stopPropagation();
    closeModal();
  }

  return (
    <div >
      <div onClick={(e)=>{e.stopPropagation()}}>
        <div className="z-100 fixed bottom-16 right-0  h-auto w-auto bg-blue-300 rounded-lg ">
          {/* <div className="flex justify-between bg-red-500">
            <div className="ml-2 my-2  text-black text-2xl items-center font-bold">Chatbot</div>
            <button onClick={handleCloseModal} className=" mr-2 text-2xl my-2 ">X</button>
          </div> */}
          
          <Chatbot ></Chatbot>
          {/* <div className="bg-amber-700 w-10/12 h-20">
            <span className="bg-slate-400 "> B</span>
          </div>
          <div className="bg-amber-700 w-10/12 h-20 ml-auto mt-3">
            <div className="bg-slate-400 "> asdasdassdadkas;dasldkas;dkasdkaskdaskdlsakda;d;askdaskd;alskdaskd;aldkd</div>
        
          <
          </div>
           */}
         

          
          
          {/* <button className="w-full hover:bg-blue-400 p-4  text-black border-2 rounded-2xl">맛집추천</button>
          <button className="w-full hover:bg-blue-400   border-2  p-4 text-black rounded-2xl" >플랜수정</button>
          <button className="w-full  hover:bg-blue-400 border-2  p-4 text-black rounded-2xl">가계부</button>
          <button className="w-full  hover:bg-blue-400 border-2 p-4 text-black rounded-2xl">기타</button> */}
          
          
        </div>
      
      </div>
    </div>
  );
}

