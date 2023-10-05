import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Chatgpt from "../chatbot/restaurant/chatgpt";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Chatbot from "components/chatbot/Chatbot";

/**
 * @description 누르면 챗봇 창이 뜨는 Floating Button 입니다.
 */
export default function ChatBotButton() {
  const [modalbtn, setModalbtn] = useState(false);
  const chatBotBtnRef = useRef(null);

  useEffect(() => {
    const clickOutside = (e) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        modalbtn &&
        chatBotBtnRef.current &&
        !chatBotBtnRef.current.contains(e.target)
      ) {
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
      onClick={() => {
        setModalbtn(!modalbtn);
      }}
    >
      <Image src="/assets/customer-service.png" width={24} height={24}></Image>
      {modalbtn ? <Modal closeModal={() => setModalbtn(!modalbtn)} /> : null}
    </div>
  );
}

function Modal({ closeModal }) {
  function handleCloseModal(e) {
    e.stopPropagation();
    closeModal();
  }

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="z-100 fixed bottom-16 right-0  h-auto w-auto rounded-lg bg-blue-300 ">
          <Chatbot></Chatbot>
        </div>
      </div>
    </div>
  );
}
