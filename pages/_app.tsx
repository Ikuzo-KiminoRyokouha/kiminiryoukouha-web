import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import AuthCheck from "../components/AuthCheck";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ChatBotButton from "../components/layout/ChatBotButton";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import BottomNavigation from "../components/layout/BottomNavigation";

/**
 * @description 로그인 정보가 필요한 페이지 접근 시, 해당 배열에 URL정보를 넣어줄 것
 */
const NEED_AUTH_URL: Array<string> = ["/navigation"];

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 로그인 정보가 필요한 페이지 일 떼
  if (NEED_AUTH_URL.includes(router.pathname)) {
    return (
      <QueryClientProvider client={queryClient}>
        <AuthCheck>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </AuthCheck>
        <ReactQueryDevtools initialIsOpen={false} />
        <ChatBotButton />
      </QueryClientProvider>
    );
  }

  //로그인 정보가 필요없는 페이지 일때
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />
      <BottomNavigation />
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
      <ChatBotButton />
    </QueryClientProvider>
  );
}
