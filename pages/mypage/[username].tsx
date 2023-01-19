import { getUser } from "@/utils/client";
import Image from "next/image";
import { useRouter } from "next/router";

export default function MyPage() {
  const router = useRouter();
  //   console.log("router", router.query.username);
  //   console.log("getUser()", getUser());
  return (
    <>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col">
          {/* 상단 */}
          <div className="flex h-1/3 min-h-[286px]">
            {/* 이미지 */}
            <div className="flex h-full w-1/5 justify-center py-10">
              <div className="relative w-4/5 overflow-hidden rounded after:block after:pb-[100%]">
                <Image src={"/assets/main-img.png"} layout={"fill"} />
              </div>
            </div>
            {/* 내용 */}
            <div className="flex h-full w-3/5 flex-col py-10">
              <div className="flex h-1/3 w-full ">
                <span className="text-4xl">Mingyu Shin</span>
              </div>
              <div className="flex h-2/3 w-full flex-col">
                <div className="h-1/6 w-5/6"></div>
                <div className="h-5/6 w-5/6 ">
                  <div className="line-clamp-5 block h-full w-11/12 overflow-hidden pt-3 pl-2">
                    <span className="text-lg leading-5">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dicta voluptatibus corrupti recusandae quod sed cum,
                      architecto quisquam accusamus placeat quo, quam neque
                      vero, nisi maxime. Deleniti minima tenetur repudiandae
                      iusto. Lorem ipsum dolor sit amet consectetur, adipisicing
                      elit. Velit accusantium repudiandae totam culpa inventore,
                      similique aliquid in magnam. Harum ea atque doloribus aut
                      alias quaerat molestias sequi eveniet excepturi debitis.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 팔로우 */}
            <div className="h-full w-1/5 py-10">
              <div className="h-full">
                <div className="pt-2">
                  <button className="w-2/6 rounded bg-sky-600 p-2 text-white">
                    <span className="text-lg">Follow</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 */}
          <div className="flex h-2/3 bg-green-200">하단</div>
        </div>
      </div>
    </>
  );
}
