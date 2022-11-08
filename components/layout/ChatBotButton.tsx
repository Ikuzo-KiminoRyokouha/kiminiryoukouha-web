import Image from "next/image";

/**
 * @description 누르면 챗봇 창이 뜨는 Floating Button 입니다.
 */
export default function ChatBotButton() {
  return (
    <div
      className="z-100 fixed bottom-10 right-8 hidden h-12 w-12 items-center
 justify-center rounded-full bg-blue-600 text-4xl text-white
 drop-shadow-lg duration-300 hover:animate-bounce hover:bg-blue-700 hover:drop-shadow-2xl md:flex"
    >
      <Image src="/assets/customer-service.png" width={24} height={24}></Image>
    </div>
  );
}
