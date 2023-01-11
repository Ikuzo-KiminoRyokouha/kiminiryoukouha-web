import { useTMap } from "@/hooks";
import fakeData from "@/utils/dataMap/fakeData.json";
import transfortModeMap from "@/utils/dataMap/transfortModeMap.json";
import { convertSecToTimeObj } from "@/utils/math";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function PlanNavigation({ query }: { query: any }) {
  const {
    pushDrawableMarker,
    makeStartMarker,
    makeEndMarker,
    additionalScriptLoaing,
    drawLineWithPanning,
    reDefineCenterMap,
    resetMarker,
  } = useTMap("map", false);

  const [mode, setMode] = useState(0);
  const [planIdx, setPlanIdx] = useState(0);
  const [plans, setPlans] = useState(undefined);

  const [destination, setDestination] = useState(query?.place);

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
        <div className="absolute z-10 flex h-full w-full items-end p-2">
          <div className="flex space-x-3">
            <div
              onClick={() => setDestination("안녕")}
              className="flex cursor-pointer items-center space-x-3 rounded-lg bg-white p-2 text-lg tracking-wider"
            >
              <div className="h-24 w-24">
                <Image
                  src="/assets/main-img.png"
                  layout="responsive"
                  width={1}
                  height={1}
                />
              </div>
              <span className="text-lg">석굴암</span>
            </div>
          </div>
        </div>
        <div id="map"></div>
      </div>
      <div className="relative flex basis-1/4 flex-col border-r">
        <div className="absolute flex max-h-full min-h-full w-full flex-col">
          <div className="border p-2">{destination} 까지의 경로</div>
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

export async function getServerSideProps(context) {
  return {
    props: {
      query: context.query,
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
