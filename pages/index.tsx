import Head from "next/head";
import Image from "next/image";
import PlanCard from "../components/card/PlanCard";
import ChatBotButton from "../components/layout/ChatBotButton";
import Header from "../components/layout/Header";
export default function Home() {
  return (
    <div>
      <Head>
        <title>
          君の旅行は | AR, AI 基盤の旅行オールインワンフラットフォム
        </title>
        <meta name="description" content="너의 여행은의 메인 페이지 입니다." />
      </Head>
      <Header />

      <main>
        <div className="hidden min-h-screen lg:block">
          {/* 이미지 absoulte */}
          <Image src={"/assets/main-img.png"} layout={"fill"} />
          {/* 메인 문구 */}
          <div className="absolute flex h-full items-center">
            <div className="mb-64 ml-28 space-y-8">
              <p className="text-5xl font-semibold text-white">
                Do You Wanna Go To Travel?
              </p>
              <div className="flex space-x-6">
                <button className="bg-gray-300 bg-opacity-30 py-3 pl-2 pr-12">
                  <span className="bg-opacity-100 text-2xl text-white">
                    Start Your Journey &#10132;
                  </span>
                </button>
                <div className="bg-gray-300 p-4">
                  <span>ランダム国 / 地域</span>
                </div>
              </div>
            </div>
          </div>
          {/* 바텀 문구 */}
          <div className="absolute bottom-5 w-full">
            <div className="flex flex-col items-center space-y-2 text-sm text-white">
              <p className="font-serif">
                Travel makes one modest. You see what a tiny place you occupy in
                the world
              </p>
              <p className="font-serif">- Gustav Flaubert -</p>
            </div>
          </div>
        </div>
      </main>
      <div
        className="z-100 fixed bottom-10 right-8 flex h-12 w-12
       items-center justify-center rounded-full bg-blue-600 text-4xl
       text-white drop-shadow-lg duration-300 hover:animate-bounce hover:bg-blue-700 hover:drop-shadow-2xl"
      >
        <ChatBotButton />
      </div>
      <div className="max-w-8xl mx-auto mt-6 space-y-6">
        <div className="flex">
          <p className="mr-6 text-xl font-bold">私の旅行キーワードは？</p>
          <p className="bg-sky-600 p-1 px-4">食べ物</p>
        </div>
        <div>
          <p>おすすめプラン</p>
        </div>
        <div className="p-1">
          <PlanCard />
        </div>
      </div>
      {/* <footer>
        <div>asdfasdfasdf</div>
      </footer> */}
    </div>
  );
}
