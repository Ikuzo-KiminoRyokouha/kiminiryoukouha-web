import ChatBot from "react-simple-chatbot";
import styled, { ThemeProvider } from "styled-components";
import Chatgpt from "./chatgpt";
import ABC from "components/chatbot/weather";
import { useQuery } from "@tanstack/react-query";
import { getTodayPlan, getTodayTreavel } from "@/utils/fetchFn/query/chatBot";
import { Component, useCallback, useEffect, useMemo, useState } from "react";
import { TodayTravel } from "./TodayTravel";
import { ShowNewTravels } from "./ShowNewTravels";
import useChatBot from "hooks/useChatBot";
import { UpdateTravel } from "./UpdataTravel";
import { useRouter } from "next/router";

const CustomComponent = styled.div`
  background-color: #848484;
  color: #fff;
`;

const Button = styled.button`
  background-color: #81daf5;
  color: white;
  padding: 4%;
  border-radius: 5px;
  width: 100%;
  height: 100%;
`;

export default function Chatbot() {
  console.log("hello chatbot");
  const router = useRouter();
  let { data: planData } = useQuery(["getTodayPlan"], getTodayPlan);
  const plan = useMemo(() => planData?.data.plan, [planData]);
  const [count, setCount] = useState(1);

  const { data: travelData, refetch } = useQuery(
    ["getTodayTreavel"],
    getTodayTreavel
  );

  const travels = useMemo(() => travelData?.data.travels, [travelData]);

  const { getNewTravels, getNewTravelsData } = useChatBot();

  const [destinations, setDestinations] = useState([]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const tagValues = new Set();
  const newArray = [];

  if (plan) {
    Object.keys(plan?.tag).forEach((key) => {
      const value = plan?.tag[key];
      if (!tagValues.has(value[0])) {
        tagValues.add(value[0]);
        // 중복되지 않는 값이면 배열에 추가
        newArray.push(value[0]);
      }
    });
  }

  useEffect(() => {
    if (newArray[0] && plan?.id) {
      getNewTravels({ count, tag: newArray, planId: plan?.id });
    }
  }, [plan?.id, count]);

  useEffect(() => {
    if (getNewTravelsData) {
      console.log(getNewTravelsData);
      setDestinations(getNewTravelsData.data.destination);
    }
  }, [getNewTravelsData]);

  const steps = [
    // step: 0
    {
      id: "hello",
      message: plan
        ? `여행 중 이시네요. \n 무엇을 도와드릴까요? `
        : "오늘은 여행 중이 아닙니다.",
      trigger: "help",
    },

    // step1
    {
      id: "help",
      options: [
        { value: "travel", label: "오늘 여행 일정 보여줘", trigger: "travel1" },
        { value: "camera", label: "사진 찍을게요", trigger: "camera1" },
      ],
    },

    //step 2
    {
      id: "travel1",
      message: `오늘의 여행 일정입니다!`,
      trigger: "travel1-1",
    },
    {
      id: "camera1",
      component: (
        <>
          <Button onClick={async () => await router.push("/camera")}>
            카메라로 이동
          </Button>
        </>
      ),
    },

    {
      id: "travel1-1",
      component: <TodayTravel />,
      trigger: "travel2",
    },

    {
      id: "travel2",
      options: [
        {
          value: "travel2-1",
          label: "네비게이션 보여줘",
          trigger: "travel3-1",
        },
        {
          value: "travel2-2",
          label: "다른 여행 추천 해줘",
          trigger: "travel3-2",
        },
        {
          value: "travel2-3",
          label: "처음으로",
          trigger: "hello",
        },
      ],
    },
    {
      id: "travel3-1",
      message: "네비게이션",
      trigger: "hello",
      end: false,
    },
    {
      id: "travel3-2",
      component: <ShowNewTravels destinations={destinations} />,
      trigger: "travel4-1",
    },

    {
      id: "travel4-1",
      options: [
        {
          value: "travel5-1",
          label: `${destinations?.length != 0 && destinations[0][0]?.title}`,
          metadata: `${destinations?.length != 0 && destinations[0][0]?.id}`,
          trigger: "travel6",
        },
        {
          value: "travel5-2",
          label: `${destinations?.length != 0 && destinations[1][0].title}`,
          metadata: `${destinations?.length != 0 && destinations[1][0]?.id}`,
          trigger: "travel6",
        },
        {
          value: "travel5-3",
          label: `${destinations?.length != 0 && destinations[2][0].title}`,
          metadata: `${destinations?.length != 0 && destinations[2][0]?.id}`,
          trigger: "travel6",
        },
        {
          value: "travel5-4",
          label: `${destinations?.length != 0 && destinations[3][0].title}`,
          metadata: `${destinations?.length != 0 && destinations[3][0]?.id}`,
          trigger: "travel6",
        },
        {
          value: "travel5-5",
          label: `${destinations?.length != 0 && destinations[4][0].title}`,
          metadata: `${destinations?.length != 0 && destinations[4][0]?.id}`,
          trigger: "travel6",
        },
        {
          value: "travel3-2",
          message: ({ previousValue, steps }) => {
            setCount((count) => count + 1);
            return "더 추천 해줘";
          },
          trigger: "travel3-2",
        },
      ],
    },

    {
      id: "travel6",
      message: "계획에 추가 하겠습니다.",
      trigger: "travel7",
    },
    {
      id: "travel7",
      component: <UpdateTravel planId={plan?.id}></UpdateTravel>,
      trigger: "travel8",
    },
    {
      id: "travel8",
      component: (
        <RefreshButton onClick={handleRefresh}>새로고침</RefreshButton>
      ),
    },
  ];

  const theme = {
    background: "#f5f8fb",
    fontFamily: "Helvetica Neue",
    headerBgColor: "#81DAF5",
    headerFontColor: "#fff",
    headerFontSize: "15px",
    botBubbleColor: "#848484",
    botFontColor: "#fff",
    userBubbleColor: "#fff",
    userFontColor: "#4a4a4a",
    customComponentBgColor: "#1000f4",
  };
  const StyledChatbot = styled(ChatBot)`
    line-height: normal;
    font-size: 10px;
  `;

  return (
    <>
      <ThemeProvider theme={theme}>
        <StyledChatbot steps={steps} />
      </ThemeProvider>
    </>
  );
}
const RefreshButton = styled.button`
  background-color: #0284c7;
  color: white;
  padding: 2px;
  border-radius: 5px;
  margin-top: 5px;
  width: 100%;
  margin: 0, auto;
`;
