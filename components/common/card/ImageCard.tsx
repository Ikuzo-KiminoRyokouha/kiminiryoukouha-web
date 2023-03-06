import Image from "next/image";

interface Props {
  src: string;
  description: string;
}
/**
 * @description 가고싶은 여행지에 대해서 쓰는 이미지 카드입니다.
 * @param src 이미지 주소
 * @param description 이미지에 대한 설명
 */
export default function ImageCard({ src, description }: Props) {
  return (
    <div className="relative m-1 h-full w-full">
      <Image src={src} layout="fill"></Image>
      <div className="absolute bottom-4 flex w-full justify-center">
        <span className="text-xl font-bold text-white">{description}</span>
      </div>
    </div>
  );
}
