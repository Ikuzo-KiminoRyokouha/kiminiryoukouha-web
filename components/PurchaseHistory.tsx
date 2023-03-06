interface PurchaseHistoryProps {
  date?: string;
  status?: string;
  description?: string;
  money?: string;
  balance?: string;
}

export default function PurchaseHistory({
  date,
  status,
  description,
  money,
  balance,
}: PurchaseHistoryProps) {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(() => {
        return (
          <div className="flex h-28 w-full flex-col justify-center border-b-2">
            <div className="h-[90%] w-full">
              <div className="flex justify-between pt-1">
                <p className="text-lg">{date || "2022.11.20"}</p>
                <p className="text-lg text-sky-500">{status || "출금"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xl font-semibold">
                  {description || "신한체크교통"}
                </p>
                <p className="text-xl font-semibold text-sky-500">
                  {money || "7500원"}
                </p>
              </div>
              <div className="flex justify-end">
                <p className="text-lg">{balance || "잔액 10만원"}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
