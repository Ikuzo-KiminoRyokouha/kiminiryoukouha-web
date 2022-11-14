import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { DesktopBoard, MobileBoard } from "../../components/board";
import BoardUI from "../../components/board/Board";

export default function QnA() {
  return (
    <>
      <BoardUI boardname={"QnA"} />
    </>
  );
}

// 29번째줄 더블클릭
