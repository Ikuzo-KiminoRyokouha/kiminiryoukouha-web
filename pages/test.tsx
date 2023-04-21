import Image from "next/image";

export default function ASDF() {
  return (
    <div className="flex flex-1">
      <div className="relative h-32 w-32">
        <Image src={`/public/assets/readmelogo.JPG`} layout="fill" />
      </div>
    </div>
  );
}
