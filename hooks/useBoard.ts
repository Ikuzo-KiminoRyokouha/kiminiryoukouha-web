import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useMemo } from "react";
import {
  mDeleteBoard,
  mUpdateBoard,
  mDeleteComment,
  mUpdateComment,
  mWriteBoard,
  mWriteComment,
} from "../utils/fetchFn/mutation/board";

/**
 * @description 질의 응답게시판에 있어서 쓰일 함수들을 모아 놓은 훅입니다.
 */
export default function useBoard() {
  const router = useRouter();

  const mutationOption = useMemo(() => {
    return {
      onSuccess: () => {
        router.back();
      },
      onError: () => {},
    };
  }, [router]);

  // 질의응답 게시판 등록함수
  const { mutate: writeBoard } = useMutation(
    ["deleteBoardPost"],
    mWriteBoard,
    mutationOption
  );

  //  질의응답  게시판 삭제 함수
  const { mutate: deleteBoard } = useMutation(
    ["deleteBoardPost"],
    mDeleteBoard,
    mutationOption
  );

  // 질의응답 게시판 업데이트 함수
  const { mutate: updateBoard } = useMutation(
    ["updateBoardPost"],
    mUpdateBoard,
    mutationOption
  );

  //  질의응답 댓글 생성 함수
  const { mutate: writeComment } = useMutation(
    ["deleteComment"],
    mWriteComment,
    mutationOption
  );

  //  질의응답 댓글 삭제 함수
  const { mutate: deleteComment } = useMutation(
    ["deleteComment"],
    mDeleteComment,
    mutationOption
  );

  // 질의응답 댓글 업데이트 함수
  const { mutate: updateComment } = useMutation(
    ["updateComment"],
    mUpdateComment,
    mutationOption
  );

  return {
    writeBoard,
    deleteBoard,
    updateBoard,
    writeComment,
    deleteComment,
    updateComment,
  };
}
