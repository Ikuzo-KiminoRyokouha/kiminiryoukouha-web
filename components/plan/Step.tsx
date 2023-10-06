import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Context,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

import { Info } from "../../types/plan.interface";
import Calendar from "../common/Calendar";
import styled from "styled-components";
import mainRequest from "../../utils/request/mainRequest";
import { AiOutlineWarning } from "react-icons/ai";
import { useInput, useToggle } from "../../hooks";
import "@/utils/extension/array.extension";
import FireworkEffect from "components/Firework";
import select from "./Select.json";
//Step에서는 info는  밑에 규칙을 따라야해 stepProps에서 정의해줬으니까
// export interface Info {
//   tag: { [key: string]: Array<string> };
//   region: string;
//   startDate: string;
//   endDate: string;
//   money: number;
// }

interface StepProps {
  ctx: Context<{
    info: Info;
    setInfo: Dispatch<SetStateAction<Info>>;
    setCanNext: Dispatch<SetStateAction<boolean>>;
  }>;
}

export function StepOne({ ctx }: StepProps) {
  const { info, setInfo, setCanNext } = useContext(ctx);
  //구조분해할당 ctx.info를 그냥 info로

  const [startDate, setStartDate] = useState<dayjs.Dayjs>( //
    info.startDate ? dayjs(info.startDate) : undefined
  );
  const [endDate, setEndDate] = useState<dayjs.Dayjs>(
    info.endDate ? dayjs(info.endDate) : undefined
  );

  useEffect(() => {
    if (startDate && endDate) {
      const diffDate = dayjs(endDate).diff(dayjs(startDate), "d") + 1;
      const tagObj = {};
      for (let i = 1; i <= diffDate; i++) {
        tagObj[i] = [];
      }

      setInfo((prev) => ({
        //이전값이있으면
        ...prev,
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
        tag: { ...tagObj },
      }));
      setCanNext(true);
    } else {
      setCanNext(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    setEndDate(undefined);
  }, [startDate]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-2 md:flex-row">
      <Calendar
        className="flex-1 items-center justify-center"
        mode="startEnd"
        getStartDate={(date) => setStartDate(date)}
        getEndDate={(date) => setEndDate(date)}
      />
      <div className="flex w-full md:w-auto md:pl-10">
        <div className="flex w-full justify-around">
          {["スタート", "エンド"].map((el, idx) => {
            return (
              <div
                className="flex flex-col items-center pr-3"
                key={idx + 10000}
              >
                <label className="my-2 block font-medium text-gray-900">
                  {el}日付
                </label>
                <span className="h-10 w-28 border p-3">
                  {el === "スタート" && startDate?.format("YYYY-MM-DD")}
                  {el === "エンド" && endDate?.format("YYYY-MM-DD")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function StepTwo({ ctx }: StepProps) {
  const { info, setInfo, setCanNext } = useContext(ctx);
  const [key, setKey] = useState<string>("1");
  const [tag, setTag] = useState(info.tag);
  const [revealTag, setRevealTag] = useState<
    Array<{ tag: string; tagCount: string }>
  >([]);
  const [hintMessage, setHintMessage] = useState<Array<String>>([]);
  const toggle = useToggle(false);

  const updateTag = (targetTag: string) => {
    const isInclude = tag[key].includes(targetTag);
    setTag((prev) => {
      const newObj: any = { ...prev };
      isInclude
        ? (newObj[key] = prev[key].filterTarget(targetTag))
        : newObj[key].push(targetTag);
      newObj[key] = newObj[key].deduplication();
      return newObj;
    });
  };

  const [areacode, setAreacode] = useState("");
  const [sigungucode, setSigungu] = useState("");
  const [region, setRegion] = useState("");

  // 카테고리안에 포함되어 있는
  useEffect(() => {
    const obj = {};
    Array.from(Object.keys(tag)).map((key) => {
      obj[key] = 0;
      tag[key].map((value) => {
        revealTag.some((el) => {
          if (el.tag === value) {
            obj[key] += Number(el.tagCount);
            return true;
          }
        });
      });
    });
    let canNext = true;
    Array.from(Object.keys(obj)).map((key) => {
      if (obj[key] < 2) {
        !hintMessage.includes(key) &&
          setHintMessage((prev) => [...prev, key].deduplication());
        canNext = false;
      }
      if (canNext) {
        setHintMessage((prev) => [...prev].filterTarget(key));
      }
    });
    setCanNext(canNext);
  }, [tag]);

  useEffect(() => {
    setCanNext(false);
    if (areacode != "" && sigungucode == "default") {
      setRevealTag([]);
      setKey("1");
    }
    if (areacode && sigungucode) {
      mainRequest
        .get(`/destination/tag/${areacode}/${sigungucode}`)
        .then((res) => {
          if (res.data.ok) {
            setRevealTag(res.data.tags);
          }
        });
    }
  }, [sigungucode]);
  //  2개다있으면 받아오고 두개다없으면 스테이트를 초기화해버리고

  //Info에 areacode랑 sigungucode를 다 넣어서보내고싶음
  //그러면 planDetail의 쿼리스트링에는 다 들어가야하는데
  //왜 2개가 빠져있을까
  //얘는 지우지말자고일단
  useEffect(() => {
    if (areacode && sigungucode)
      return () => {
        //여기를 봐꿔야할듯

        setInfo((prev) => {
          return {
            ...prev,
            areacode: areacode,
            sigungucode: sigungucode,
            region,
          };
        });
      };
  }, [areacode, sigungucode]);

  useEffect(() => {
    return () => {
      setInfo((prev) => {
        return { ...prev, tag: { ...tag } };
      });
    };
  }, [tag]);

  return (
    <>
      <div className="p-2">
        <label
          htmlFor="countries"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Region
        </label>
        <div className="flex ">
          <select
            onChange={(e) => {
              e.target.value && setAreacode(e.target.value);
              setSigungu("default");

              const name = e.target.options[e.target.selectedIndex].text;
              // console.log(name);
              setRegion("");
              setRegion((prev) => prev + name);
            }}
            id="areacode"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value={"default"}>地域選択</option>
            {select.map((el) => {
              return (
                <>
                  <option value={el.code} key={el.code}>
                    {el.name}
                  </option>
                </>
              );
            })}
          </select>

          <select
            onChange={(e) => {
              e.target.value && setSigungu(e.target.value);
              const name = e.target.options[e.target.selectedIndex].text;
              // console.log(name);

              setRegion((prev) => prev + name);
            }}
            id="sigungucode"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option value={"default"}> 地域選択</option>
            {select.map((el, i) => {
              if (areacode == el.code)
                return (
                  <>
                    {el.sigungu.map((el, i) => {
                      return (
                        <>
                          <option value={el.code}> {el.name}</option>
                        </>
                      );
                    })}
                  </>
                );
            })}
          </select>
        </div>
      </div>
      <div className="p-2 py-8">
        <div className="space-x-3">
          {Array.from(Object.keys(tag)).map((el, idx) => {
            return (
              <DateButton
                className={`${key === el ? "bg-teal-600" : "bg-slate-400"}`}
                key={el + " " + idx}
                onClick={() => {
                  setKey(el);
                }}
              >
                {el}日目
              </DateButton>
            );
          })}
        </div>
        <div className="py-3">Category</div>
        {revealTag?.map((el, idx) => {
          console.log(tag[key].includes(el.tag));
          return (
            <>
              <button
                onClick={() => {
                  console.log("tag321", tag, el.tag);

                  updateTag(el.tag);
                }}
                key={el.tag + idx}
                className={`m-2 rounded bg-gray-400 ${
                  tag[key].includes(el.tag) ? "bg-teal-600" : "bg-gray-400"
                } px-2 py-2 text-sm font-medium text-white`}
              >
                {el.tag + " " + el.tagCount}
              </button>
            </>
          );
        })}
        <div className="flex items-start space-x-3">
          {hintMessage.length != 0 && (
            <>
              <button onClick={toggle.onClick}>
                <AiOutlineWarning size={20} color={"red"} />
              </button>
              <div className="text-sm text-red-500">
                {toggle.value &&
                  hintMessage.map((el) => {
                    return (
                      <p key={`${el}`}>
                        {el}日目
                        日程の数が1個以下です。他のカテゴリーも選んでください!
                      </p>
                    );
                  })}
              </div>
            </>
          )}
          {hintMessage.length == 0 && (
            <>
              <div className="h-5"></div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

const DateButton = styled.button`
  padding: 0.75rem;
  border-radius: 0.5rem /* 8px */;
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
`;

export function StepThree({ ctx }: StepProps) {
  const { info, setInfo, setCanNext } = useContext(ctx);
  const money = useInput<number>(
    info.money,
    "必要なお金を入力してくだい",
    "number"
  );

  useEffect(() => {
    setCanNext(false);
  }, []);

  useEffect(() => {
    if (money.value) setCanNext(true);
    else setCanNext(false);
    return () => {
      setInfo((prev) => {
        return { ...prev, money: money.value * 10000 };
      });
    };
  }, [money.value]);

  return (
    <div className="flex flex-1 flex-col">
      <p className="py-8 md:text-sm">これが最後です！</p>
      <div className="flex h-96 justify-between md:h-auto md:flex-1">
        <div>
          <label className="mb-2 block pt-4 font-medium text-gray-900 md:text-sm">
            入力値 (万ウォン)
          </label>
          <input
            {...money}
            className=" block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 md:text-sm"
          ></input>
        </div>
        <div>
          <label className="mb-2 block pt-4 font-medium text-gray-900 md:text-sm">
            総金額
          </label>
          <input
            value={money.value * 10000}
            readOnly
            className=" block w-full rounded-lg border border-gray-300 p-2.5 text-gray-900 md:text-sm"
          ></input>
        </div>
      </div>
    </div>
  );
}

export function StepFour({ ctx }: StepProps) {
  const router = useRouter();
  const { info } = useContext(ctx);
  const onClick = () => {
    router.replace({
      pathname: "/plan/new/planDetail",
      query: {
        info: JSON.stringify(info),
      },
    });
  };

  return (
    <>
      <FireworkEffect />
      <div className="relative my-24 flex h-72 w-full flex-1 flex-col md:my-0">
        <Image src={"/assets/done.png"} layout="fill" className="z-0" />
      </div>
      <div className="flex w-full justify-center">
        <button
          onClick={onClick}
          className=" ml-2  flex  cursor-pointer justify-center rounded border border-teal-600 bg-teal-600 px-4 py-2 text-base 
          font-bold  
          text-teal-100 
          transition 
          duration-200 ease-in-out hover:scale-110 
          hover:bg-teal-600 focus:outline-none"
        >
          complete
        </button>
      </div>
    </>
  );
}
