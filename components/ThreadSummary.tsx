import Image from "next/image";
import { useRouter } from "next/router";
export default function ThreadSummary() {
  const router = useRouter();
  return (
    <>
      <div className="m-4 flex border p-1 shadow-sm">
        <div className="h-24 w-24">
          <Image
            src="/assets/main-img.png"
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
          <p className="p-1">場所 : 韓国</p>
          <p className=" whitespace-nowrap p-1">
            内容 : Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Cumque a aperiam aspernatur labore laboriosam vitae soluta animi
            quibusdam ipsam est ab odio hic, adipisci vel. Autem et quo ipsa in.
          </p>
          <p className="p-1">テーマ: テーマパーク、静かな、アンニョン</p>
        </div>
        <div className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white" onClick={() => {console.log("계획보기 clicked")}}>
          <span>계획보기</span>
        </div>
      </div>
    </>
  );
}
