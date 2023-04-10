import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AuthCheck from "../components/AuthCheck";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatBotButton from "../components/layout/ChatBotButton";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/header";
import BottomNavigation from "../components/layout/BottomNavigation";
import { useMemo } from "react";
import { queryClient } from "../utils/request/reloadQuery";
import { ThemeProvider } from "styled-components";

/**
 * @description 로그인 정보가 필요한 페이지 접근 시, 해당 배열에 URL정보를 넣어줄 것
 */
const NEED_AUTH_URL: Array<string> = ["/QnA/write"];

const theme = {};

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  /**
   * @description router에 pathname 에 대해서 인증처리가 필요한 URL 인지 판단해주는 변수
   */
  const needAuth = useMemo(() => {
    return NEED_AUTH_URL.includes(router.pathname);
  }, [router.pathname]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {/* 유저 인증 요청이 필요한 페이지에 대해 인증처리를 해주는 Wrapper 컴포넌트 */}
        <AuthCheck needAuth={needAuth}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Component {...pageProps}  />
            <BottomNavigation />
            <ReactQueryDevtools initialIsOpen={false} />
            <ChatBotButton   />
          </div>
          <Footer />
        </AuthCheck>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
