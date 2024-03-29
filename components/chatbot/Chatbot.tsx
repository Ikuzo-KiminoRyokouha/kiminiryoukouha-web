import ChatBot from "react-simple-chatbot";
import styled, { ThemeProvider } from "styled-components";
import Chatgpt from "./restaurant/chatgpt";
import ABC from "components/chatbot/weather";
import { useQuery } from "@tanstack/react-query";
import {
  getTodayPlan,
  getTodayTreavel,
  getTransactions,
} from "@/utils/fetchFn/query/chatBot";
import { Component, useCallback, useEffect, useMemo, useState } from "react";
import { TodayTravel } from "./travels/TodayTravel";
import { ShowNewTravels } from "./travels/ShowNewTravels";
import useChatBot from "hooks/useChatBot";
import { UpdateTravel } from "./travels/UpdataTravel";
import { useRouter } from "next/router";
import { BudgetIndex } from "./budgets";
import { Transactions } from "./budgets/Transactions";

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

  const { getNewTravels, getNewTravelsData } = useChatBot();

  const { data: planData } = useQuery(["getTodayPlan"], getTodayPlan);
  const plan = useMemo(() => planData?.data.plan, [planData]);

  const { data: travelData, refetch } = useQuery(
    ["getTodayTreavel"],
    getTodayTreavel
  );
  const travels = useMemo(() => travelData?.data.travels, [travelData]);

  const { data: transactionData, refetch: transactionRefetch } = useQuery(
    ["getTransactions", plan?.id],
    getTransactions
  );

  const transactions = useMemo(
    () => transactionData?.data.transaction,
    [transactionData]
  );

  const [count, setCount] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const tagValues = new Set();
  const newArray = [];

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

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
      message: `旅行中ですね。 \n 何かご用ですか？ `,
      trigger: "help",
    },

    // step1
    {
      id: "help",
      options: [
        { value: "travel", label: "今日の旅程を見せて", trigger: "travel1" },
        { value: "camera", label: "写真を撮りたい", trigger: "camera1" },
        { value: "budget", label: "予算管理", trigger: "budget1" },
        // { value: "food", label: "맛집 추천", trigger: "food1" },
      ],
    },

    //step 2
    {
      id: "travel1",
      message: `本日の旅行日程です。`,
      trigger: "travel1-1",
    },
    {
      id: "camera1",
      component: (
        <>
          <Button onClick={async () => await router.push("/camera")}>
            カメラ
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
          label: "ナビゲーションを見せて",
          trigger: "travel3-1",
        },
        {
          value: "travel2-2",
          label: "他の旅行のおすすめを教えて",
          trigger: "travel3-2",
        },
        {
          value: "travel2-3",
          label: "スタートへ",
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
          value: "travel5-6",
          label: "選択しない",
          trigger: "hello",
        },
      ],
    },

    {
      id: "travel6",
      message: "計画に追加します。",
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

    // 예산 관리--------------------------------------------
    {
      id: "budget1",
      options: [
        { value: "budget1-2", label: "予算の確認", trigger: "budget1-2" },
        { value: "budget1-3", label: "取引履歴の確認", trigger: "budget1-3" },
      ],
    },
    {
      id: "budget1-1",
      message: "今日の予算",
      trigger: "hello",
    },
    {
      id: "budget1-2",
      component: (
        <BudgetIndex
          budgets={{ totalCost: plan?.totalCost, dayPer: plan?.dayPerCost }}
          transactions={transactions}
          startDay={plan?.start}
          endDay={plan?.end}
        ></BudgetIndex>
      ),
      trigger: "hello",
    },
    {
      id: "budget1-3",
      component: <Transactions transactions={transactions}></Transactions>,
      trigger: "hello",
    },
    // {
    //   id: "food1",
    //   component: <Chatgpt></Chatgpt>,
    //   // message: "아직 준비중...",
    //   trigger: "hello",
    // },
  ];

  const nonSteps = [
    {
      id: "hello",
      message: "今日は旅行中ではありません。",
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
        <StyledChatbot steps={plan ? steps : nonSteps} />
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
