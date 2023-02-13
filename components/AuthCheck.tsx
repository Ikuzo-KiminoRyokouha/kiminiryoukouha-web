import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
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
  const [didAlert, setDidAlert] = useState(false);

  // getUser 쿼리 수행
  const { data, isFetching, isSuccess, isFetched } = useQuery(
    ["getUser"],
    getUser,
    {
      retry: 0,
    }
  );

  console.log("data123", data);

  const router = useRouter();

  useEffect(() => {
    //   Auth정보가 필요하고 로딩이 끝났는데 데이터가 없거나, 에러가 뜨면 메인페이지로 돌아감
    if (!isFetching && !data && needAuth) {
      if (!alert) {
        alert("invaild user");
        setDidAlert(true);
      }
      router.back();
    }
    // 데이터 페칭 성공시 전역 변수에 저장
    else if (isSuccess) {
      setUser({
        sub: data.data.sub,
        email: data.data.username,
        nickname: data.data.username,
        role: "Client",
      });
    }
  }, [isFetching]);

  // Auth정보가 필요없는 페이지의 경우 정상 리턴
  if (!needAuth) {
    return <>{children}</>;
  }
  // 로딩 중에는 빈 화면 띄워주기
  else if (isFetching && needAuth) {
    return <div></div>;
  } else if (!isFetching && !data) {
    return <div></div>;
  }

  // 정상 리턴
  return <>{children}</>;
}
