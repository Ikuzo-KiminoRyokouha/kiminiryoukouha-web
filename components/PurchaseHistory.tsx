interface PurchaseHistoryProps {
  data?: any;
}

export default function PurchaseHistory({ data }: PurchaseHistoryProps) {
  // console.log("data4321", data);
  const date = data.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1.$2.$3");
  const status = data.inOrOut;
  const description = data.name;
  const amount = String(data.amount) + "원";
  const time = data.time.slice(0, 2) + "시" + data.time.slice(2, 4) + "분";
  return (
    <>
      <div className="flex h-28 w-full flex-col justify-center border-b-2">
        <div className="h-[90%] w-full">
          <div className="flex justify-between pt-1">
            <div>
              <p className="text-lg">{date || "2222.22.22"}</p>
              <p className="text-md">{time || "0000"}</p>
            </div>
            <p className="text-lg text-sky-500">{status || "error"}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-xl font-semibold">{description || "error"}</p>
            <p className="text-xl font-semibold text-sky-500">
              {amount || "0원"}
            </p>
          </div>
          {/* <div className="flex justify-end">
            <p className="text-lg">{balance || "잔액 10만원"}</p>
          </div> */}
        </div>
      </div>
    </>
  );
}
