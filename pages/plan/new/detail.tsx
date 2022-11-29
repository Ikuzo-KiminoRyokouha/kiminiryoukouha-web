import axios from "axios";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { FiBox } from "react-icons/fi";
import NavigationCard from "../../../components/card/NavigationCard";
import PlaceByDate from "../../../components/plan/PlaceByDate";
import { useInput, useLocation, useTMap } from "../../../hooks";
import { Info } from "../../../types/plan.interface";
import { LatLng } from "../../../types/tmap.type";

export default function Detail() {
  const router = useRouter();
  const { myLatLng } = useLocation();
  const { searchAroundPOI, convertLatLng, searchAroundResult, tmap } =
    useTMap("map");
  const place = useInput("", "장소를 검색해주세요");
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const info: Info = useMemo(
    () => JSON.parse((router.query?.info as string) || "{}"),
    [router.query]
  );

  useEffect(() => {
    if (!info?.contry) {
      router.push("/");
    }
  }, [info]);

  const [items, setItems] = useState([]);
  const [dateItemMap, setDateItemMap] = useState({});

  const setResult = (
    name: string,
    distance: string,
    addr: string,
    latLng: LatLng
  ) => {
    setItems((prev) => [...prev, { name, distance, addr, latLng }]);
  };

  const deleteItem = (name: string) => {
    setItems((prev) => [...prev.filter((el) => el.name != name)]);
  };

  const selectDate = (date: string) => {
    setSelectedDate(date);
  };

  const placeByDate = (item: any) => {
    setDateItemMap((prev) => {
      const newData = {};
      newData[selectedDate] = prev[selectedDate]
        ? [...prev[selectedDate], item]
        : [item];
      return { ...prev, ...newData };
    });
    deleteItem(item.name);
  };

  const restoreItem = (item: any, date: string) => {
    setDateItemMap((prev) => {
      const newData = {};
      newData[date] = prev[date].filter((el) => el.name != item.name);
      return { ...prev, ...newData };
    });
    setItems((prev) => [...prev, item]);
  };

  const checkDone = () => {
    if (Object.keys(dateItemMap).length > 0 && items.length === 0) {
      return true;
    }
    return false;
  };

  const createPlan = async () => {
    await axios.post("http://localhost:3001/plan", {
      info,
      placeByDate: dateItemMap,
    });
  };

  return (
    <div className="max-w-8xl mx-auto mb-[53px] flex max-h-full w-full flex-1 lg:mb-0">
      <div className="basis-3/4">
        <div className="absolute z-10 m-4 space-y-4 bg-slate-300 p-4 text-sm text-white">
          <div className="flex items-center justify-between">
            <span>{info.contry === "KR" && "韓国"}</span>
            <button>
              <span className="text-lg">{"-"}</span>
            </button>
          </div>
          <p>
            {info.startDate} - {info.endDate}
          </p>
          <p>予算 : {info.money}円</p>
          <p>
            テーマ:{" "}
            {info?.theme?.map((el) => (
              <span>{el}</span>
            ))}
          </p>
        </div>
        <div id="map"></div>
      </div>
      <div className="flex basis-1/4 flex-col">
        {step === 1 && (
          <>
            <div className="relative flex w-full flex-1">
              <div
                className={`absolute inset-0 z-50 w-full basis-full border bg-white transition-all duration-300 lg:relative lg:top-auto lg:z-0 lg:flex lg:flex-col`}
              >
                <div className="absolute flex h-full w-full flex-col overflow-hidden">
                  <div className="flex items-center justify-between p-3 text-xl font-bold">
                    <span>場所探し</span>
                    <button
                      onClick={(e) => {
                        setStep(2);
                        tmap.resetMarker();
                      }}
                      className="bg-sky-600 px-4 py-1 text-white"
                    >
                      次へ
                    </button>
                  </div>
                  <div className="mb-3 flex space-x-2 border-y px-2 py-2">
                    <div className="space-y-2 px-3">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            searchAroundPOI(place.value);
                          }
                        }}
                        className="w-full border p-1"
                        {...place}
                      />
                    </div>
                    <button className="bg-sky-600 px-1 py-1 text-white">
                      검색
                    </button>
                  </div>
                  <div className="relative mt-2 flex-1">
                    <div className="absolute flex max-h-full min-h-full w-full flex-col">
                      <span className="pl-4">検索結果</span>
                      <div className="flex px-3"></div>
                      <div className="flex-1 overflow-scroll overflow-x-hidden">
                        {searchAroundResult &&
                          searchAroundResult.map((poi, idx) => {
                            return (
                              <NavigationCard
                                convertLatLng={convertLatLng}
                                myLatLng={myLatLng}
                                key={poi.name + idx}
                                idx={idx}
                                poi={poi}
                                setResult={setResult}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-auto border">
              <div className="p-3">
                <div className="sticky flex items-center justify-center space-x-2">
                  <FiBox />
                  <span>MY BOX</span>
                </div>
              </div>
              <>
                {items &&
                  items.map((item) => {
                    return (
                      <div className="flex flex-col space-y-3 rounded-lg border p-2">
                        <div>{item.name}</div>
                        <div>
                          {item.distance > 1
                            ? Math.round(item.distance) + "km"
                            : Math.round(item.distance * 1000) + "m"}
                        </div>
                        <div>{item.addr}</div>
                        <button
                          onClick={() => deleteItem(item.name)}
                          className="inline w-fit bg-red-600 px-6 py-3 text-white"
                        >
                          삭제
                        </button>
                      </div>
                    );
                  })}
              </>
            </div>
          </>
        )}
        {step === 2 && (
          <div className="flex w-full flex-1 flex-col border">
            <div className="flex items-center justify-between p-3 text-xl font-bold">
              <span>日選び</span>
              {!checkDone() ? (
                <button
                  onClick={(e) => {
                    setStep(1);
                    tmap.resetMarker();
                  }}
                  className="bg-gray-400 px-4 py-1 text-white"
                >
                  前へ
                </button>
              ) : (
                <button
                  onClick={createPlan}
                  className="bg-sky-600 px-4 py-1 text-white"
                >
                  完了
                </button>
              )}
            </div>
            <div className="flex-1 overflow-auto border">
              {Array.from({
                length:
                  Math.abs(
                    Math.floor(
                      dayjs(info.startDate).diff(info.endDate, "day", true)
                    )
                  ) + 1,
              }).map((_, idx) => {
                const date = dayjs(info.startDate)
                  .add(idx, "day")
                  .format("YYYY-MM-DD");
                return (
                  <PlaceByDate
                    onClick={() => selectDate(date)}
                    date={date}
                    selected={selectedDate === date}
                  >
                    {dateItemMap[date]?.map((item) => {
                      return (
                        <div className="flex justify-between rounded-lg border p-2">
                          <div className="space-y-3">
                            <div className="font-bold">{item.name}</div>
                            <div>{item.addr}</div>
                          </div>
                          <button
                            onClick={() => restoreItem(item, date)}
                            className="bg-red-400 px-3 text-xs text-white"
                          >
                            제거
                          </button>
                        </div>
                      );
                    })}
                  </PlaceByDate>
                );
              })}
            </div>
            <div className="flex-1 overflow-auto border">
              <div className="p-3">
                <div className="sticky flex items-center justify-center space-x-2">
                  <FiBox />
                  <span>MY BOX</span>
                </div>
              </div>
              <>
                {items &&
                  items.map((item) => {
                    return (
                      <div className="flex flex-col space-y-3 rounded-lg border p-2">
                        <div>{item.name}</div>
                        <div>
                          {item.distance > 1
                            ? Math.round(item.distance) + "km"
                            : Math.round(item.distance * 1000) + "m"}
                        </div>
                        <div>{item.addr}</div>
                        <button
                          onClick={() => placeByDate(item)}
                          className="inline w-fit bg-sky-600 px-6 py-3 text-white"
                        >
                          추가
                        </button>
                      </div>
                    );
                  })}
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
