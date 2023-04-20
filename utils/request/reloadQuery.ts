import { QueryClient } from "@tanstack/react-query";

/*
 * @description react 쿼리가 Provider 형식으로 나눠주는데 함수를 쓰기위한 객체
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 30000, // 30초
      cacheTime: 180000, // 3분
    },
  },
});

export const reloadUser = () => {
  queryClient.invalidateQueries(["getUser"]);
};

export const reloadComment = () => {
  queryClient.invalidateQueries(["getComment"]);
};
