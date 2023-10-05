import authRequest from "@/utils/request/authRequest";
import { useQuery } from "@tanstack/react-query";
import AccountList from "components/AccountList";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function CardAPI() {
    const router = useRouter();
    const getMyInfo = ({ queryKey }) => {
        return authRequest.get(`/banking/myinfo`);
    };
    const { data: bankingInfo } = useQuery(["getMyInfo"], getMyInfo);
    console.log("bankingInfo", bankingInfo?.data?.accounts[0]);
    // bankingInfo가 undefined면 계좌연결 버튼
    // bankingInfo가 있으면 계좌연결된 계좌들 보여주기

    // 선택된 계좌 있을시 finNum 존재시 플랜별 가계부 보여주기
    // useEffect 써서 존재시 /wallet/walletlist로 리다이렉트 시키기
    useEffect(() => {
        // router.push("/wallet/walletlist")
    }, []);

    async function onClick() {
        var tmpWindow = window.open("about:blank");
        if (tmpWindow !== null) {
            tmpWindow.location =
                "https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code&client_id=5ddeeed1-1cc5-4af6-ba50-79e055884302&redirect_uri=http://localhost:3000/test/authCode&scope=login+inquiry+transfer&state=b80BLsfigm9OokPTjy03elbJqRHOfGSY&auth_type=0";
        }
    }
    return (
        <>
            {/*  등록된 계좌 없으면 계좌연결 버튼 */}
            {!bankingInfo && (
                <div className="flex flex-1 items-center justify-center">
                    <div className="flex-col">
                        <p className="text-3xl">
                            There are no registered accounts yet.
                        </p>
                        <div className="flex justify-center pt-10">
                            <button
                                className="rounded bg-sky-600 p-2 text-2xl text-white hover:bg-sky-500"
                                onClick={onClick}
                            >
                                {/* 계좌연결 */}
                                口座連携
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* 등록된 계좌 있을시 계좌선택하기 */}
            {bankingInfo && (
                <div className="max-w-8xl mx-auto mb-[53px] flex w-full flex-1 flex-col items-center justify-center">
                    <div className="flex items-center pb-10">
                        <p className="text-2xl">
                            {/* 계좌선택하기 */}
                            口座の選択
                        </p>
                    </div>
                    <AccountList accountData={bankingInfo?.data?.accounts[0]} />
                </div>
            )}
        </>
    );
}
