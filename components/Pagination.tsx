import Link from "../node_modules/next/link";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";

interface Props {
  currentPage: number;
  moveToNext: () => void;
  moveToPrev: () => void;
  maxPage: number;
  pathname: string;
}

export default function Pagination({
  currentPage,
  moveToNext,
  moveToPrev,
  maxPage,
  pathname,
}: Props) {
  const router = useRouter();

  return (
    <>
      {/* 페이지네이션 */}
      <div className="flex justify-center pt-5">
        <ul className="flex">
          <button className="pr-5" onClick={moveToPrev}>
            <BiLeftArrow className="text-sky-600" />
          </button>
          {Array.from({
            length: maxPage,
          }).map((_, index) => {
            const page = currentPage
              ? parseInt((currentPage / 5 - 0.1) as any) * 5 + index + 1
              : 1;
            return (
              <li className="p-2" key={index}>
                <Link
                  href={{
                    pathname: `${pathname}`,
                    query: { page },
                  }}
                  legacyBehavior
                >
                  <a
                    className={`text-lg ${
                      parseInt(router.query?.page as string) === page
                        ? "text-blue-600"
                        : ""
                    }`}
                  >
                    {page}
                  </a>
                </Link>
              </li>
            );
          })}
          <button className="pl-5" onClick={moveToNext}>
            <BiRightArrow className="text-sky-600" />
          </button>
        </ul>
      </div>
    </>
  );
}
