import authRequest from "@/utils/request/authRequest";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function AccountList({ accountData }) {
  console.log("accountData", accountData);
  const router = useRouter();
  const mRegisterAccount = (body) => {
    return authRequest.post("/banking/mycount", body);
  };

  const { mutate: registerAccount } = useMutation({
    mutationKey: ["mRegisterAccount"],
    mutationFn: mRegisterAccount,
    onSuccess: () => {
      // 리다이렉트 설정해줘야함
      router.push("/plan");
    },
  });

  const onClick = () => {
    registerAccount({
      bank_name: accountData.bank_name,
      account_num_masked: accountData.account_num_masked,
      account_holder_name: accountData.account_holder_name,
    });
  };

  return (
    <>
      <div className="flex h-fit w-full flex-col rounded bg-slate-200 p-5 shadow-lg md:w-2/5">
        <Account onClick={onClick} />
      </div>
    </>
  );
}

function Account({ onClick }: { onClick: () => void }) {
  return (
    <>
      <div className="my-1 flex h-20 w-full justify-between rounded border-2 bg-white">
        <div className="flex w-[80%] items-center">
          <p className="pl-3 text-2xl">オープンバンク</p>
        </div>
        <div className="w-[20%]">
          <button
            className="h-full w-full rounded-r bg-sky-600 text-xl text-white hover:bg-sky-500"
            onClick={onClick}
          >
            洗濯
          </button>
        </div>
      </div>
    </>
  );
}
