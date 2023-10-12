import Image from "next/image";
import { useInput, useTMap } from "../../hooks";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { convertDateToKorean } from "../../utils/common";
import { getDescriptionFromAPI } from "../../utils/apiQuery";
import styled from "styled-components";
import dayjs from "dayjs";
import { LatLng } from "../../types/tmap.type";
import authRequest from "@/utils/request/authRequest";

export default function Share({ travels, plan }) {
  const { makeLayerForPlan, additionalScriptLoaing } = useTMap("map");

  const router = useRouter();
  const isSave = useRef(false);
  const startDay1 = useInput("", "開始日ex) 2023-02-27");

  const [selectedDate, setSelectedDate] = useState(dayjs(plan?.start));

  const [dayPlan, setDayPlan] = useState(1);

  const funcopy = async () => {
    await authRequest.post(`plan/copy`, {
      planId: plan.id as number,
      start: startDay1.value,
    });
  };
  // console.log(plan.id)

  /** 계획에 따라 지도에 장소를 띄워 주는 로직 */
  useEffect(() => {
    if (additionalScriptLoaing && travels) {
      const destLatLng: Array<LatLng> = [];
      /**여형지의 모든 정보를 받아와서 목적지 위도경도에 넣는다 */
      travels.map((el) => {
        destLatLng.push({ lat: el.destination.mapy, lng: el.destination.mapx });
      });

      /**모든 정보를 지도 상에 띄워 준다. */
      makeLayerForPlan(...destLatLng.slice((dayPlan - 1) * 2, dayPlan * 2));
    }
  }, [additionalScriptLoaing, travels, dayPlan]);
  return (
    <>
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-2xl  flex-col items-center md:max-w-5xl">
          <h1 className="pb-10 pt-10 text-4xl font-bold ">慶州歴史探訪</h1>

          <h2 className="text-2xl">
            {travels?.map((el, idx) => {
              if (idx > 2) return;
              if (idx === 2) return el.destination.title;
              return el.destination.title + ", ";
            })}
            等
          </h2>
          <h2 className="text-2xl">
            新羅時代の遺跡がいっぱいの慶州の歴史を体験してください。
          </h2>
          <div className="flex w-full justify-around py-5 shadow-lg">
            <InfoCard
              title="日程"
              sub={convertDateToKorean(plan?.start, plan?.end)}
            />
            <InfoCard title="予想経費" sub="約7000円" />
            <InfoCard title="観光時間" sub="約５時間" />
          </div>
          <div className="mt-20 w-full max-w-2xl md:max-w-5xl">
            <div className=" mr-5  flex  space-x-1 ">
              {Array(dayjs(plan?.end).diff(plan?.start, "d") + 1)
                .fill(0)
                .map((el, i) => {
                  return (
                    <Tapbutton
                      date={dayjs(plan?.start).add(i, "d").format("YYYY-MM-DD")}
                      selectedDate={selectedDate.format("YYYY-MM-DD")}
                      onClick={() => {
                        setSelectedDate(() => dayjs(plan?.start).add(i, "d"));
                      }}
                    >
                      Day{i + 1}
                    </Tapbutton>
                  );
                })}
            </div>
            <div className="flex h-80 w-full items-center justify-center rounded-lg  shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="flex h-[85%] w-[92%]">
                <div className="h-full w-3/4 rounded-lg">
                  <div id="map" className="bg-black">
                    {/* tmap */}
                  </div>
                </div>

                <div className="flex h-full w-1/4 flex-col items-start justify-evenly rounded-r-lg pl-4 md:pl-12 ">
                  {travels
                    ?.filter((el) => {
                      return (
                        selectedDate.format("YYYY-MM-DD") ===
                        dayjs(el.startDay).format("YYYY-MM-DD")
                      );
                    })
                    .map((travel) => {
                      return (
                        <DestinationButton>
                          {travel.destination.title}
                        </DestinationButton>
                      );
                    })}
                </div>
              </div>
            </div>

            <div className="mt-10 flex w-full justify-center space-x-10 font-bold text-white ">
              <div className="flex ">
                <input className="h-16 text-center text-black" {...startDay1} />
              </div>
              <button
                onClick={() => {
                  isSave.current = true;
                  () => {
                    funcopy();
                  };
                }}
                className="rounded-lg border-2 bg-sky-600 px-24 py-6 transition duration-150 ease-in hover:bg-sky-700"
              >
                プランの持ち込み
              </button>
            </div>
            {travels?.map((travel) => {
              return <IntroduceCard travel={travel} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

interface ButtonProps {
  date: string;
  selectedDate: string;
}

const Tapbutton = styled.button<ButtonProps>`
  margin-left: auto;
  --tw-bg-opacity: 1;
  /* 32px */
  cursor: pointer;
  border-width: ${(props) => props.date != props.selectedDate && "1px"};
  padding: 1rem /* 16px */;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  --tw-bg-opacity: 1;
  --tw-text-opacity: 1;
  color: ${(props) =>
    props.date === props.selectedDate &&
    "rgb(255 255 255 / var(--tw-text-opacity))"};
  background-color: ${(props) =>
    props.date === props.selectedDate &&
    "rgb(2 132 199 / var(--tw-bg-opacity))"};
  &:hover {
    background-color: rgb(2 132 199 / var(--tw-bg-opacity));
    color: rgb(255 255 255 / var(--tw-text-opacity));
  }
`;

const DestinationButton = styled.button`
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  font-weight: 600;
  transition-property: color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter;
  transition-duration: 150ms;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  &:hover {
    --tw-text-opacity: 1;
    color: rgb(0 0 0 / var(--tw-text-opacity));
    opacity: 0.9;
  }
`;

function InfoCard({ title, sub }) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <p className="text-lg ">{title}</p>
      <p className="pt-3 text-2xl font-semibold ">{sub}</p>
    </div>
  );
}

function IntroduceCard({ travel }) {
  const [description, setDescription] = useState<string>("");

  useLayoutEffect(() => {
    getDescriptionFromAPI(
      Number(travel.destination.contentid),
      Number(travel.destination.contenttypeid)
    ).then((res) => setDescription(res));
  }, []);

  return (
    <div className="mt-10 flex flex-col items-center justify-center">
      <h1 className="py-5 text-2xl font-bold">{travel.destination.title}</h1>
      <div className="w-1/2">
        <Image
          src={
            travel.destination.firstimage ||
            "https://picsum.photos/id/188/720/400/"
          }
          layout="responsive"
          width={16}
          height={9}
        />
      </div>
      <p className="my-10 line-clamp-4 text-center leading-6">
        {description?.split("<br/>").join().split("<br>")[0]}
      </p>
    </div>
  );
}
