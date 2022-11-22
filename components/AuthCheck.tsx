import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useRouter } from "next/router";

import { getUser } from "../utils/fetchFn/query/user";

import type IProps from "../types/props.interface";
import { setUser } from "../utils/client";
interface Props extends IProps {
  needAuth: boolean;
}

/**
 * @description react-query 기반으로 유저의 로그인 유무를 체크
 * @returns
 */
export default function AuthCheck({ children, needAuth }: Props) {
  // getUser 쿼리 수행
  const { data, isLoading, isSuccess } = useQuery(["getUser"], getUser, {
    retry: 0,
  });
  const router = useRouter();

  useEffect(() => {
    //   Auth정보가 필요하고 로딩이 끝났는데 데이터가 없거나, 에러가 뜨면 메인페이지로 돌아감
    if (!isLoading && !data && needAuth) {
      alert("invaild user");
      router.back();
    }
    // 데이터 페칭 성공시 전역 변수에 저장
    else if (isSuccess) {
      setUser(data.data.user[0]);
    }
  }, [isLoading]);

  // Auth정보가 필요없는 페이지의 경우 정상 리턴
  if (!needAuth) {
    return <>{children}</>;
  }
  // 로딩 중에는 빈 화면 띄워주기
  else if (isLoading && needAuth) {
    return <div></div>;
  }

  // 정상 리턴
  return <>{children}</>;
}
