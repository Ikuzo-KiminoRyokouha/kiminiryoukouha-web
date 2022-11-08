import Image from "next/image";

interface Props {
  src: string;
  description: string;
}

export default function ImageCard({ src, description }: Props) {
  return (
    <div className="relative m-1 flex-1">
      <Image src={src} layout="fill"></Image>
      <div className="absolute bottom-0 flex w-full justify-center">
        <span className="text-xl font-bold text-white">{description}</span>
      </div>
    </div>
  );
}
