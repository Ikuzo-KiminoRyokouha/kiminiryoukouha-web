import Image from "next/image";

export default function BoardImage() {
  return (
    <>
      {/* 이미지 박스 */}
      <div className="relative hidden h-72 md:block">
        <Image src={"/assets/QnA-bg.png"} layout={"fill"} />
        {/* inset :0 position: absolute */}
      </div>
    </>
  );
}
