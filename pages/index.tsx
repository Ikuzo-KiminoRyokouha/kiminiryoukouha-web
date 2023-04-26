import Head from "next/head";
import Image from "next/image";
import PlanCarousel from "../components/PlanCarousel";
import ImageCard from "../components/common/card/ImageCard";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
  // useEffect(() => {
  //   const observer = new IntersectionObserver((e) => {
  //     e.forEach((el) => {
  //       if (el.isIntersecting) {
  //         (el.target as any).style.opacity = 1;
  //       } else {
  //         (el.target as any).style.opacity = 0;
  //       }
  //     });
  //   });
  //   const block = document.querySelectorAll("#block");
  //   block.forEach((el) => {
  //     el.classList.add("opacity-0");
  //     (el as any).style.transition = "3s";
  //     observer.observe(el);
  //   });
  // }, []);
  return (
    <div>
      <Head>
        <title>
          君の旅行は | AR, AI 基盤の旅行オールインワンフラットフォム
        </title>
        <meta name="description" content="너의 여행은의 메인 페이지 입니다." />
      </Head>

      <main id="block" className="min-h-fit">
        <div className="lg:block">
          {/* 이미지 absoulte */}
          <Image src={"/assets/main-img.png"} layout={"fill"} />
          {/* 메인 문구 */}
          <div className="absolute flex h-full items-center">
            <div className="mb-64 ml-28 space-y-8">
              <p className="text-5xl font-semibold text-white">
                Do You Wanna Go To Travel?
              </p>
              <div className="flex">
                <Link href={"/plan/new"} passHref>
                  <a className="rounded-lg bg-gray-300 bg-opacity-30 px-10 py-3 duration-300 ease-in hover:bg-sky-600">
                    <span className="bg-opacity-100 text-2xl text-white">
                      Start Your Journey &#10132;
                    </span>
                  </a>
                </Link>
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
      {/* 나의 여행 키워드 */}
      {/* <div id="block" className="mx-auto mt-6 max-w-7xl space-y-6">
        <div className="flex w-full justify-between px-5 lg:justify-start lg:pl-0">
          <p className="mr-6 pr-4 text-xl font-bold lg:px-0 lg:text-2xl">
            私の旅行キーワードは？
          </p>
          <div className="flex items-center justify-center rounded bg-sky-500 py-1 px-4">
            <p className="text-white">食べ物</p>
          </div>
        </div>
        <div className="hidden py-3 lg:block">
          <p className="font-semibold">おすすめプラン</p>
        </div>
      </div> */}
      {/* 어디로 가고싶은지 */}
      {/* <PlanCarousel />
      <div
        id="block"
        className="mx-auto mt-5 mb-16 max-w-7xl space-y-6 px-4 lg:mb-0 lg:px-0"
      >
        <p className="py-2 text-xl font-bold lg:text-2xl">
          どこへ行きたいんですか
        </p>
        <div className="flex h-fit w-full flex-col justify-between lg:flex-row">
          <div className="h-96 w-full lg:w-2/3">
            <ImageCard
              src={"/assets/main-img.png"}
              description={"東京/なごや"}
            />
          </div>
          <div className="h-5 w-full lg:h-full lg:w-5"></div>
          <div className="flex h-96 w-full flex-col lg:w-1/3">
            <div className="h-1/2 w-full">
              <ImageCard
                src={"/assets/main-img.png"}
                description={"東京/なごや"}
              />
            </div>
            <div className="h-5 w-full"></div>
            <div className="mb-10 h-1/2 w-full lg:mb-0">
              <ImageCard
                src={"/assets/main-img.png"}
                description={"東京/なごや"}
              />
            </div>
          </div>
        </div>
      </div> */}
      {/* AR로 보는세계 */}
      {/* <div
        id="block"
        className="mx-auto my-5 hidden max-w-7xl  space-y-6 py-4 pb-10 lg:block"
      >
        <p className="py-3 text-xl font-bold lg:text-2xl">ARから見る世界</p>
        <div className="flex h-96 space-x-6">
          <div className="relative flex-1">
            <Image src={"/assets/main-img.png"} layout={"fill"}></Image>
          </div>
          <div className="my-auto flex-1 space-y-6">
            <p className="text-4xl font-bold">
              その場で我がサービスをご利用していらっしゃっていたお客様たちの意見を見てみましょう‼
            </p>
            <button className="rounded bg-sky-500 py-2 px-6 text-lg font-bold text-white duration-300 ease-in hover:bg-sky-600">
              体験 &#10132;
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
