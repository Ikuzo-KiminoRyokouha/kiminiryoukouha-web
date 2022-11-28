import Link from "next/link";

interface Props {
  boardname: string;
}

export default function BoardNav({ boardname }: Props) {
  return (
    <nav className=" w-full md:flex md:w-1/4">
      <div className="flex w-full flex-row items-center md:flex-col">
        <div
          className={` h-9 flex-1 border-b-2 border-solid border-gray-300 ${
            boardname === "QnA" ? "bg-sky-600" : ""
          } md:mt-10 md:w-2/3 md:flex-none`}
        >
          <Link href={`/QnA?page=1`} legacyBehavior>
            <a>
              <h2 className="pl-2 text-lg text-white md:pl-1">질의응답</h2>
            </a>
          </Link>
        </div>
        <div
          className={`h-9 flex-1 border-b-2 border-solid border-gray-300 ${
            boardname === "FnA" ? "bg-sky-600" : ""
          }} md:w-2/3 md:flex-none`}
        >
          <Link href={`/FnA?page=1`} legacyBehavior>
            <a>
              <h2 className="pl-2 text-lg md:pl-1">자주묻는질문</h2>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
