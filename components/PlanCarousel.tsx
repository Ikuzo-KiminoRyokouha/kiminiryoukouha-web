import Carousel from "react-multi-carousel";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

/**
 * @description 추천 플랜을 보기위한 캐러셀 입니다.
 * @returns
 */
export default function PlanCarousel() {
  return (
    <div id="block">
      <Carousel
        className="mx-auto my-2 max-w-7xl md:my-6"
        swipeable={false}
        draggable
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {[0, 1, 2, 3, 4, 5, 6].map(() => (
          <div key="el" className="flex h-96 flex-col space-y-2 p-5">
            <div className="relative flex-1">
              <Image src={"/assets/main-img.png"} layout={"fill"} />
            </div>
            <div className="mx-4 shrink space-y-2">
              <div className="mx-4 flex justify-between">
                <span>タイトル</span>
                <span>場所</span>
              </div>
              <p>中村修太郎</p>
              <p>テーマ : 食べ物、見物、買い物</p>
            </div>
            <div className="text-end">
              <button className="rounded-lg bg-sky-500 p-2 text-white">
                読み込み
              </button>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
