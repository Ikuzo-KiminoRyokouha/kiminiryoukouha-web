import authRequest from "@/utils/request/authRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

export default function AuthCode() {
  const router = useRouter();
  let myCode = "";

  const mSendApi = (body) => {
    return authRequest.post("/banking/authCode", body);
  };

  const { mutate } = useMutation(["mSendApi"], mSendApi);

  useLayoutEffect(() => {
    myCode = router.asPath.split("?")[1].split("&")[0].split("=")[1];
    console.log("router layoutEffect", myCode);
    mutate({
      authCode: String(myCode),
    });
    router.push("/cardapi");
  }, []);

  return (
    <>
      <div className="flex flex-1 items-center justify-center">
        <p className="text-2xl">Your account has been registered.</p>
      </div>
    </>
  );
}
