import { useEffect, useRef, useState } from "react";
import { useTMap } from "../../../hooks";
import { Router, useRouter } from "next/router";
import axios from "axios";
import dayjs from "dayjs";
import { convertDateToKorean } from "../../../utils/common";
import { Info } from "../../../types/plan.interface";

export default function PlanDetail({ travels, plan }) {
  const {
    searchToKeywordNoMarker,
    convertLatLng,
    makeLayerForPlan,
    additionalScriptLoaing,
  } = useTMap("map");

  const router = useRouter();
  const isSave = useRef(false);

  const createPlan = () => {};
  const handleRouteChange = async () => {
    !isSave.current &&
      (await axios.delete(`http://localhost:8000/plan/${plan.id}`));
    return;
  };

  useEffect(() => {
    const handleWindowClose = async (e: BeforeUnloadEvent) => {
      !isSave.current &&
        (await axios.delete(`http://localhost:8000/plan/${plan.id}`));
      return;
    };
    router.events.on("beforeHistoryChange", handleRouteChange);
    window.addEventListener("beforeunload", handleWindowClose);
    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
      router.events.off("beforeHistoryChange", handleRouteChange);
    };
  }, []);

  useEffect(() => {
    if (additionalScriptLoaing) {
      const destLatLng = [];
      travels.map((el) => {
        destLatLng.push({ lat: el.destination.mapy, lng: el.destination.mapx });
      });

      makeLayerForPlan(
        destLatLng[0],
        destLatLng[destLatLng.length - 1],
        ...destLatLng.filter(
          (v, idx) => idx != 0 || idx != destLatLng.length - 1
        )
      );
    }
  }, [additionalScriptLoaing]);
  return (
    <>
      <div className="flex h-screen w-full justify-center bg-black">
        <div className="flex h-full w-full max-w-2xl flex-col items-center md:max-w-7xl">
          <h1 className="pt-20 pb-10 text-4xl font-bold text-white">
            경주 역사탐방
          </h1>
          <h2 className="text-2xl text-white">
            {travels.map((el, idx) => {
              if (idx > 2) return;
              if (idx === 2) return el.destination.title;
              return el.destination.title + ", ";
            })}
            등
          </h2>
          <h2 className="text-2xl text-white">
            신라시대의 유적들이 가득한 경주의 역사를 경험해 보세요
          </h2>
          <div className="flex w-full justify-around pt-12">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">일정</p>
              <p className="pt-3 text-2xl font-semibold text-white">
                {convertDateToKorean(plan.start, plan.end)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">예상경비</p>
              <p className="pt-3 text-2xl font-semibold text-white">약7만원</p>
              <p className="text-sm text-blue-500">
                예산보다 3만원 더 적습니다!
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg text-white">관광시간</p>
              <p className="pt-3 text-2xl font-semibold text-white">약5시간</p>
            </div>
          </div>
          <div className="mt-14 w-full max-w-2xl md:max-w-5xl">
            <div className="flex h-80 w-full items-center justify-center rounded-lg bg-[#434343]">
              <div className="flex h-[85%] w-[92%]">
                <div className="h-full w-3/4 rounded-lg">
                  <div id="map">{/* tmap */}</div>
                </div>
                <div className="flex h-full w-1/4 flex-col items-start items-center justify-evenly space-y-2 pl-4 md:pl-12">
                  <button className="text-2xl font-semibold text-white">
                    {travels[0].destination.title}
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    {travels[1].destination.title}
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    {/* {travels[2].destination.title} */}
                  </button>
                  <button className="text-2xl font-semibold text-white">
                    {/* {travels[3].destination.title} */}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-12 flex w-full justify-center font-bold">
              <button
                onClick={() => {
                  isSave.current = true;
                  router.push("/plan");
                }}
                className="rounded-lg bg-white py-6 px-24"
              >
                계획생성
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const info: Info = JSON.parse(query.info);

  const { travels, ...plan } = await axios
    .post(`http://localhost:8000/plan/random`, {
      // destination: "경주",
      // dayPerDes: 3,
      start: info.startDate,
      end: info.endDate,
      city: info.region,
      tag: info.tag,
      totalCost: info.money,
    })
    .then((res) => {
      if (res.data.ok) return res.data.plan;
      return [];
    });

  return {
    props: {
      plan,
      travels,
    },
  };
}
