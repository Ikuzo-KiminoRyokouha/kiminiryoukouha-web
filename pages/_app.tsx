import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AuthCheck from "../components/AuthCheck";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatBotButton from "../components/layout/ChatBotButton";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/header";
import BottomNavigation from "../components/layout/BottomNavigation";
import { useMemo } from "react";

export default function App({ Component, pageProps }: AppProps) {
  /**
   * @description 로그인 정보가 필요한 페이지 접근 시, 해당 배열에 URL정보를 넣어줄 것
   */
  const NEED_AUTH_URL: Array<string> = [];

  const queryClient = new QueryClient();
  const router = useRouter();

  const needAuth = useMemo(() => {
    return NEED_AUTH_URL.includes(router.pathname);
  }, [router.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthCheck needAuth={needAuth}>
        <div className="flex min-h-screen flex-col">
          <Header />
          <Component {...pageProps} />
          <BottomNavigation />
          <ReactQueryDevtools initialIsOpen={false} />
          <ChatBotButton />
        </div>
        <Footer />
      </AuthCheck>
    </QueryClientProvider>
  );
}
