import authRequest from "@/utils/request/authRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect } from "react";

// 계좌등록 끝내면 오픈뱅킹에서 test/authCode로 리다이렉트 시킴
export default function AuthCode() {
  const router = useRouter();
  let myCode = "";

  const mSendApi = (body) => {
    return authRequest.post("/banking/authCode", body);
  };

  const { mutate } = useMutation(["mSendApi"], mSendApi);

  useEffect(() => {
    myCode = router.asPath.split("?")[1].split("&")[0].split("=")[1];
    console.log("router layoutEffect", router.asPath);
    mutate({
      authCode: String(myCode),
    });
    // router.push("/wallet");
  }, []);

  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-2xl">アカウントが登録されました。</p>
        <button
          className="bg-sky-600 p-5 text-white"
          onClick={() => {
            router.push("/wallet");
          }}
        >
          確認
        </button>
      </div>
    </>
  );
}
