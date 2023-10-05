import { useRouter } from "next/router";
import { useMemo } from "react";
import { AiOutlineHome } from "react-icons/ai";

export default function SideBar() {
  return (
    <div className="basis-1/5 border">
      <ul className="p-2">
        <li
          className={`flex w-full space-x-3 border bg-sky-600 p-2
           text-white`}
        >
          <AiOutlineHome />
          <span>Home</span>
        </li>
      </ul>
    </div>
  );
}
