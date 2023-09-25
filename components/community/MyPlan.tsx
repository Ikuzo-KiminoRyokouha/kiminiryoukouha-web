import Image from "next/image";
import { useMemo } from "react";
export default function ThreadSummary(planData) {
  const city = planData.planData[planData.planIndex]?.city;

  const plan_tag = planData.planData[planData.planIndex]?.tag;
  let tag = [];
  let tag_length = 0;
  for (let key in plan_tag) {
    if (plan_tag.hasOwnProperty(key)) {
      tag_length++;
    }
  }
  for (let i = 1; i <= tag_length; i++) {
    tag = tag.concat(plan_tag[i]);
  }
  tag = tag.filter((item, pos) => tag.indexOf(item) === pos);
  const start: string = planData.planData[planData.planIndex]?.start.substr(
    2,
    8
  );
  const end: string = planData.planData[planData.planIndex]?.end.substr(2, 8);

  return (
    <>
      {planData && (
        <div className="m-4 flex w-full border p-1 shadow-sm">
          <div className="h-24 w-24">
            <Image
              src={planData.planImg}
              width={1}
              height={1}
              layout="responsive"
            />
          </div>
          <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
            <p className="p-1">{"場所: " + city}</p>
            <p className="p-1">{`期間: ${start}~${end} `}</p>
            <p className="p-1">{"カテゴリ-: " + tag}</p>
          </div>
        </div>
      )}
    </>
  );
}
