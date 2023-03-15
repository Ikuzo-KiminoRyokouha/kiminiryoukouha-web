import PurchaseHistory from "components/PurchaseHistory";
import useInput from "hooks/useInput";

export default function Wallet() {
  const search = useInput("", "Search");
  return (
    <>
      <div className="flex w-full flex-1">
        <div className="mx-auto flex max-w-7xl flex-1 flex-col items-center">
          <div className="flex h-40 w-full items-center justify-center">
            <p className="text-5xl font-semibold">가계부</p>
          </div>
          <div className="h-fit w-full">
            <form action="" className="flex w-full justify-center">
              <input
                type="text"
                {...search}
                className="h-20 w-2/3 rounded-xl border-2 border-sky-500 p-5 text-2xl"
              />
            </form>
          </div>
          <div className="h-28 w-full"></div>
          <div className="flex w-full flex-1 justify-center bg-white">
            <div className="min-h-full w-2/3 rounded-3xl border-2 border-sky-500">
              <div className="mx-auto flex h-full w-[90%] flex-col items-center">
                <div className="mt-6 flex h-12 w-full justify-between border-b-2">
                  {/* 드롭다운 구현 예정 */}
                  <p className="text-lg">최근(10건)</p>
                  <p className="text-lg">정렬</p>
                </div>
                <PurchaseHistory />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
