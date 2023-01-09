import Link from "next/link";

export default function BoardNav() {
  return (
    <nav className=" w-full md:flex md:w-1/4">
      <div className="flex w-full flex-row md:flex-col">
        <div className="h-9 w-full bg-sky-600 md:mt-9 md:w-2/3 md:flex-none">
          <Link href={`/QnA?page=1`} legacyBehavior>
            <a>
              <h2 className="pl-2 pt-1 text-lg text-white md:pl-1">질의응답</h2>
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
