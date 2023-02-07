import { useLocation, useTMap } from "@/hooks";
import { Destination, Plan } from "@/types/plan.interface";
import fakeData from "@/utils/dataMap/fakeData.json";
import transfortModeMap from "@/utils/dataMap/transfortModeMap.json";
import { convertSecToTimeObj } from "@/utils/math";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosAirplane } from "react-icons/io";

import mainRequest from "../../../utils/request/mainRequest";

interface Props {
  query: {
    planId: number;
    travelId: number;
  };
  plan: Plan;
}

export default function PlanNavigation({ query, plan }: Props) {
  const {
    pushDrawableMarker,
    makeStartMarker,
    makeEndMarker,
    additionalScriptLoaing,
    drawLineWithPanning,
    reDefineCenterMap,
    resetMarker,
    getDirectionUseTransfort,
  } = useTMap("map", false);

  const { myLatLng } = useLocation();

  const [mode, setMode] = useState(0);
  const [planIdx, setPlanIdx] = useState(0);
  const [plans, setPlans] = useState(undefined);
  const [currentmode, setCurrentmode] = useState(0);

  const [destination, setDestination] = useState<Destination>(
    plan.travels.filter((el) => {
      return el.id === Number(query.travelId);
    })[0].destination
  );

  // const drawRoute = async () => {
  //   const destLatLng = {
  //     lat: Number(destination.mapy),
  //     lng: Number(destination.mapx),
  //   };

  //   console.log(destLatLng, myLatLng);

  //   const data = await getDirectionUseTransfort(myLatLng, destLatLng);
  //   // console.log("data", data);
  // };
  // useEffect(() => {
  //   const destLatLng = {
  //     lat: Number(destination.mapy),
  //     lng: Number(destination.mapx),
  //   };
  //   myLatLng && drawRoute();
  // }, [myLatLng]);

  useEffect(() => {
    if (mode) {
      setPlans(
        fakeData.metaData.plan.itineraries.filter((el) => el.pathType === mode)
      );
    } else {
      setPlans(fakeData.metaData.plan.itineraries);
    }
  }, [mode]);

  useEffect(() => {
    if (additionalScriptLoaing && planIdx != undefined && plans) {
      resetMarker().then(() => {
        let latLng;
        const startLatLng = {
          lat: Number(fakeData.metaData.requestParameters.startY),
          lng: Number(fakeData.metaData.requestParameters.startX),
        };
        const endLatLng = {
          lat: Number(fakeData.metaData.requestParameters.endY),
          lng: Number(fakeData.metaData.requestParameters.endX),
        };
        makeStartMarker(startLatLng);
        makeEndMarker(endLatLng);
        plans[planIdx].legs.map((leg) => {
          switch (leg.mode) {
            case "WALK":
              leg.steps?.forEach((step) => {
                step.linestring.split(" ").forEach((el) => {
                  latLng = el.split(",");
                  latLng = {
                    lat: Number(latLng[1]),
                    lng: Number(latLng[0]),
                  };
                  pushDrawableMarker(latLng);
                });
              });
            default:
              leg.passShape?.linestring.split(" ").forEach((el) => {
                latLng = el.split(",");
                latLng = {
                  lat: Number(latLng[1]),
                  lng: Number(latLng[0]),
                };
                pushDrawableMarker(latLng);
              });
          }
        });
        reDefineCenterMap(startLatLng);
        drawLineWithPanning();
      });
    }
  }, [additionalScriptLoaing, planIdx, plans]);

  return (
    <div
      className="max-w-8xl max- mx-auto mb-[53px] flex
    h-full w-full flex-1 lg:mb-0"
    >
      <div className="relative basis-3/4">
        <div className="absolute z-10 flex h-full w-full flex-col justify-end space-y-3 bg-gray-200 p-1">
          <button className=" ml-auto mb-auto rounded-2xl bg-slate-500 p-4  text-white">
            <IoIosAirplane></IoIosAirplane>
          </button>

          <div className="flex space-x-2 bg-white p-1">
            {Array(dayjs(plan.end).diff(plan.start, "d") + 1)
              .fill(0)
              .map((el, i) => {
                return (
                  <button
                    className={`${
                      currentmode === i
                        ? "border-1 bg-green-200 p-4 font-bold "
                        : "  bg-gray-200 p-4 font-bold"
                    }`}
                    onClick={() => {
                      setCurrentmode(i);
                    }}
                  >
                    {i + 1}일차
                  </button>
                );
              })}
          </div>
        </div>
        <div id="map"></div>
      </div>
      <div className="relative flex basis-1/4 flex-col border-r">
        <div className="absolute flex max-h-full min-h-full w-full flex-col ">
          <div className="border p-2">{destination.title} 까지의 경로</div>
          <div className="space-x-2">
            <ModeButton
              color={`${mode === 0 && "blue"}`}
              onClick={() => {
                setMode(0);
                setPlanIdx(0);
              }}
            >
              전체
            </ModeButton>
            <ModeButton
              color={`${mode === 2 && "blue"}`}
              onClick={() => {
                setMode(2);
                setPlanIdx(0);
              }}
            >
              버스 {fakeData.metaData.requestParameters.busCount}
            </ModeButton>
            <ModeButton
              color={`${mode === 1 && "blue"}`}
              onClick={() => {
                setMode(1);
                setPlanIdx(0);
              }}
            >
              지하철 {fakeData.metaData.requestParameters.subwayCount}
            </ModeButton>
            <ModeButton
              color={`${mode === 3 && "blue"}`}
              onClick={() => {
                setMode(3);
                setPlanIdx(0);
              }}
            >
              버스 + 지하철 {fakeData.metaData.requestParameters.subwayBusCount}
            </ModeButton>
          </div>
          <div className="flex-1 overflow-scroll overflow-x-hidden">
            {plans?.map((plan, idx) => {
              const timeObj = convertSecToTimeObj(plan.totalTime);
              return (
                <div
                  onClick={() => setPlanIdx(idx)}
                  className={`border ${
                    idx === planIdx && " border-sky-600 bg-sky-100"
                  } cursor-pointer p-4`}
                >
                  <div>
                    <TimeText>{timeObj.hour && timeObj.hour}</TimeText>
                    {timeObj.hour && "시간 "}
                    <TimeText>{timeObj.min && timeObj.min}</TimeText>
                    {timeObj.min && "분 "}
                    <ColDivider />
                    {dayjs()
                      .add(timeObj.hour, "hour")
                      .add(timeObj.min, "minute")
                      .format("HH:mm")}
                    도착 <ColDivider />
                    {plan.fare.regular.totalFare} 원
                  </div>
                  <div>
                    {plan.legs.map((leg) => {
                      const transfortTime = convertSecToTimeObj(
                        leg.sectionTime
                      );
                      return (
                        <div
                          className="p-2"
                          key={leg.start.name + leg.end.name}
                        >
                          <p>
                            <span>
                              {leg.route
                                ? leg.route
                                : transfortModeMap[leg.mode]}
                            </span>
                            <span> - </span>
                            {leg.passStopList?.stationList && (
                              <>
                                <span className="text-sm">
                                  {leg.passStopList?.stationList[0].stationName}
                                </span>
                                <span> - </span>
                              </>
                            )}
                            <span>
                              <span>
                                {transfortTime.hour && transfortTime.hour}
                              </span>
                              {transfortTime.hour && "시간 "}
                              <span>
                                {transfortTime.min != 0 && transfortTime.min}
                              </span>
                              {transfortTime.min != 0 && "분 "}
                            </span>
                            <span className="cursor-pointer"> {">"} </span>
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ query }: Props) {
  if (!query?.planId) {
    return {
      redirect: {
        destination: "/plan",
        permanent: false,
      },
    };
  }

  const plan = await mainRequest
    .get(`/plan/${query?.planId}`)
    .then((res) => res.data.plan);

  return {
    props: {
      query,
      plan,
    }, // will be passed to the page component as props
  };
}

const ModeButton = styled.button`
  padding: 0.5rem;
  font-size: 0.875rem /* 14px */;
  line-height: 1.25rem /* 20px */;
  border-bottom: solid 1px ${(props) => props.color || "transparent"};
`;

const ColDivider = styled.span`
  margin-left: 0.5rem /* 8px */;
  margin-right: 0.5rem /* 8px */;
  border-width: 1px;
`;

const TimeText = styled.span`
  font-size: 1.5rem /* 24px */;
  line-height: 2rem /* 32px */;
  font-weight: 700;
`;
