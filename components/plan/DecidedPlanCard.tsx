import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { json } from "stream/consumers";

interface Props {
  img: string;
  title: string;
  days: string;
  description: string;
}

export default function DecidedPlanCard({
  img,
  title,
  days,
  description,
}: Props) {
  const [plan, setPlan] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    axios
      .post(`http://localhost:8000/plan/random`, {
        // destination: "경주",
        dayPerDes: 3,
        start: new Date(),
        end: dayjs().add(2, "day").toISOString(),
        city: "경주",
      })
      .then((res) => {
        axios
          .get(`http://localhost:8000/plan/${res.data.id}`)
          .then((res) => {
            if (res.data.ok) setPlan(res.data.plan);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {/* 카드 */}
      <div
        className="h-96 w-60 cursor-pointer rounded-lg border border-black"
        onClick={() =>
          router.push(
            {
              pathname: "/plan/new/planDetail",
              query: { plan: JSON.stringify(plan) },
            },
            "/plan/new/planDetail"
          )
        }
      >
        {/* 미리보기 이미지 */}
        <div className="relative h-[45%]">
          {/* <Image
            src={`${
              plan?.travels[0].destination.firstimg
                ? plan?.travels[0].destination.firstimg
                : "/assets/error_img.png"
            }`}
            layout={"fill"}
          /> */}
          <Image src={img} layout={"fill"} />
        </div>
        {/* 텍스트부분 */}
        <div className="flex h-[55%] flex-col items-center">
          <div className="flex h-1/4 w-[90%] items-center justify-between ">
            {/* <h3>{plan?.title.split(" ")[0]}</h3> */}
            <h3>{title.split(" ")[0]}</h3>
            <p className="text-[10px] text-gray-400">{Number(days) / 2} Days</p>
          </div>
          <div className="h-[65%] w-[90%]">
            <p className="text-sm text-gray-400">
              {plan &&
                plan.travels.map((el, idx) => {
                  if (idx > 2) return;
                  if (idx === 2) return <span>{el.destination.title}</span>;
                  else return <span>{el.destination.title},</span>;
                })}
              을 포함한 멋진 역사적인 여행을 체험해보세요!
            </p>
          </div>
          <div className="flex w-[90%] justify-end">
            <p className="text-[10px] text-gray-400">자세히보기</p>
          </div>
        </div>
      </div>
    </>
  );
}
