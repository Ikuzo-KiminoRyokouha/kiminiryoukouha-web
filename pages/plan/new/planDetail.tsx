import Image from "next/image";
import { useTMap } from "../../../hooks";
import { Info } from "../../../types/plan.interface";
import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { convertDateToKorean } from "../../../utils/common";
import { getDescriptionFromAPI } from "../../../utils/apiQuery";
import styled from "styled-components";
import dayjs from "dayjs";


export default function PlanDetail({ travels, plan, info }) {
  const { makeLayerForPlan, additionalScriptLoaing } = useTMap("map");

  const router = useRouter();
  const isSave = useRef(false);
 

  const [selectedDate, setSelectedDate] = useState(dayjs(plan.start));
  //선택된 날짜를 시작값으로 함 
  

  const rerollePlan = async () => {
    await axios.delete(`http://localhost:8000/plan/${plan.id}`);
    router.push(
      {
        pathname: "/plan/new/planDetail",
        query: { info },
      },
      "/plan/new/planDetail",
      {
        shallow: false,
      }
    );
  };

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
      <div className="flex h-full w-full justify-center">
        <div className="flex h-full w-full max-w-2xl  flex-col items-center md:max-w-5xl">
          <h1 className="pt-10 pb-10 text-4xl font-bold ">경주 역사탐방</h1>
          <h2 className="text-2xl">
            {travels.map((el, idx) => {
              if (idx > 2) return;
              if (idx === 2) return el.destination.title;
              return el.destination.title + ", ";
            })}
            등
          </h2>
          <h2 className="text-2xl">
            신라시대의 유적들이 가득한 경주의 역사를 경험해 보세요
          </h2>
          <div className="flex w-full justify-around py-5 shadow-lg">
            <InfoCard
              title="일정"
              sub={convertDateToKorean(plan.start, plan.end)}
            />
            <InfoCard title="예상경비" sub="약7만원" />
            <InfoCard title="관광시간" sub="약5시간" />
          </div>
          <div className="mt-20 w-full max-w-2xl md:max-w-5xl">
          <div className=" flex  space-x-1  mr-5 " >
{/* 2023 02 05 - 2023 02 03 하면 2개가 남지 여기서 fill은 그냥 몇번반복할지만 나오게하는거네   지금은 배열이  let x=[0,0,0]
map은 배열의 인데스만큼 도니까 3번이 생성됨 
2023 02 03 +0
 dayjs(plan.start).add(i,"d"))
시작날짜에서 0번쨰가 첫쩃날
+1번쨰가 둘쨋날
+2번쨰가 셋쩃날

*/}
{
  Array(dayjs(plan.end).diff(plan.start,"d") +1).fill(0).map((el,i)=>{
    return             <Tapbutton date={dayjs(plan.start).add(i,"d").format('YYYY-MM-DD')}
    selectedDate={selectedDate.format('YYYY-MM-DD')}
    onClick={() => {
      setSelectedDate(()=>dayjs(plan.start).add(i,"d"))
    }}>Day{i+1}</Tapbutton>   
  })
} 
            </div>
            <div className="flex h-80 w-full items-center justify-center rounded-lg  shadow-[0_0_60px_-15px_rgba(0,0,0,0.3)]">
              <div className="flex h-[85%] w-[92%]">
                <div className="h-full w-3/4 rounded-lg">
                  <div id="map" className="bg-black">{/* tmap */}</div>
                </div>
                
                <div className="flex h-full w-1/4 flex-col items-start justify-evenly rounded-r-lg pl-4 md:pl-12 ">
                  {
                    travels.filter(el => {
                     return selectedDate.format('YYYY-MM-DD') === dayjs(el.startDay).format("YYYY-MM-DD")
                    }).map((travel)=>{
                      return <DestinationButton>
                      {travel.destination.title}
                    </DestinationButton>
                    })
                  }

                </div>
              </div>
            </div>
            <div className="mt-20 flex w-full justify-center space-x-40 font-bold text-white ">
              <button
                onClick={rerollePlan}
                className="rounded-lg border-2 bg-amber-500 py-6 px-24 transition duration-150 ease-in hover:bg-yellow-600 "
              >
                재생성
              </button>
              <button
                onClick={() => {
                  isSave.current = true;
                  router.push("/plan");
                }}
                className="rounded-lg border-2 bg-sky-600 py-6 px-24 transition duration-150 ease-in hover:bg-sky-700"
              >
                계획생성
              </button>
            </div>
            {travels.map((travel) => {
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

const Tapbutton =styled.button<ButtonProps>`
  margin-left: auto;
  --tw-bg-opacity: 1;
  /* 32px */;
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
  console.log(description)
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
      <p className="line-clamp-4 my-10 text-center leading-6">
        {description?.split("<br/>").join().split("<br>")[0]}
      </p>
    </div>
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
      info: query.info,
    },
  };
}
