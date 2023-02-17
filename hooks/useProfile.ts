import {
  PostUserDescription,
  PostUserFollow,
  PostUserUnfollow,
} from "@/utils/fetchFn/query/profile";
import { useMutation } from "@tanstack/react-query";

/**
 * @description 마이페이지에 있어서 쓰일 mutate 함수들을 모아 놓은 훅입니다.
 */
export default function useProfile() {
  const { mutate: writeDescription } = useMutation(
    ["writeBoardPost"],
    PostUserDescription
  );
  const { mutate: userFollow } = useMutation(
    ["writeBoardPost"],
    PostUserFollow
  );

  const { mutate: userUnfollow } = useMutation(
    ["writeBoardPost"],
    PostUserUnfollow
  );

  return {
    writeDescription,
    userFollow,
    userUnfollow,
  };
}
