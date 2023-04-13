import authRequest from "@/utils/request/authRequest";
import { useQuery } from "@tanstack/react-query";
import PurchaseHistory from "components/PurchaseHistory";
import useDetectClose from "hooks/useDetectClose";
import useInput from "hooks/useInput";
import { useState } from "react";

export default function Receipt({ planId }) {
  const search = useInput("", "Insert");
  const {
    isOpen: isRecent,
    ref: recentRef,
    removeHandler: recentHandler,
  } = useDetectClose(false);

  const {
    isOpen: isSort,
    ref: sortRef,
    removeHandler: sortHandler,
  } = useDetectClose(false);

  const getTransactionData = ({ queryKey }) => {
    return authRequest.get(`/banking/transaction/list/${queryKey[1]}`);
  };

  const { data: transactionData } = useQuery(
    ["getTransactionData", planId],
    getTransactionData
  );
  console.log("transactionData1", transactionData?.data?.transaction);

  const [recentValue, setRecentValue] = useState<string>("10");
  const [sortValue, setSortValue] = useState<string>("최신순");
  const recentList = ["10", "20", "30"];
  const sortList = ["최신순", "가격순"];
  let totalAmount = 0;

  for (let i = 0; i < transactionData?.data?.transaction.length; i++) {
    totalAmount += Number(transactionData?.data?.transaction[i].amount);
  }

  return (
    <>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center">
          <div className="flex h-16 w-full justify-start lg:w-2/3">
            <h1 className="mx-5 text-3xl font-semibold lg:mx-0">
              {`지출금액 : ${totalAmount} 원`}
            </h1>
          </div>
          <div className="h-fit w-full">
            <form action="" className="flex w-full justify-center">
              <input
                type="text"
                {...search}
                className="mx-5 h-16 w-full rounded-xl border-2 border-sky-500 p-5 text-2xl lg:mx-0 lg:w-2/3"
              />
            </form>
          </div>
          <div className="h-4 w-full"></div>
          <div className="flex w-full flex-1 justify-center bg-white">
            <div className="mb-14 min-h-full w-full rounded-3xl border-2 border-sky-500 pb-4 lg:mb-0 lg:w-2/3 ">
              <div className="mx-auto flex h-full w-[90%] flex-col items-center">
                <div className="mt-6 flex h-12 w-full justify-between border-b-2">
                  {/* 최근 몇개 */}
                  <div className="relative h-fit w-fit">
                    <button
                      className="cursor-pointer text-lg hover:text-sky-500"
                      onClick={recentHandler}
                      ref={recentRef}
                    >
                      최근({recentValue}건)
                    </button>
                    <ul
                      className={`bg-white ${
                        isRecent ? "block" : "hidden"
                      } rounded-lg shadow-lg`}
                    >
                      {recentList.map((el, idx) => {
                        return (
                          <li
                            className="p-5 text-center hover:bg-slate-300"
                            onClick={() => {
                              setRecentValue(el);
                            }}
                          >
                            {el}건
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* 정렬 */}
                  <div className="relative h-fit w-fit">
                    <button
                      className="cursor-pointer text-lg hover:text-sky-500"
                      onClick={sortHandler}
                      ref={sortRef}
                    >
                      정렬({sortValue})
                    </button>
                    <ul
                      className={`bg-white ${
                        isSort ? "block" : "hidden"
                      } rounded-lg shadow-lg`}
                    >
                      {sortList.map((el, idx) => {
                        return (
                          <li
                            className="p-5 text-center hover:bg-slate-300"
                            onClick={() => {
                              setSortValue(el);
                            }}
                          >
                            {el}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                {transactionData &&
                  transactionData?.data?.transaction.map((data) => {
                    if (data.visible === true)
                      return <PurchaseHistory data={data} />;
                  })}
                {/* 데이터 없을시 */}
                {transactionData?.data?.transaction.length === 0 && (
                  <div className="flex items-center justify-center">
                    <p className="py-5 text-2xl">There isn't any data yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
