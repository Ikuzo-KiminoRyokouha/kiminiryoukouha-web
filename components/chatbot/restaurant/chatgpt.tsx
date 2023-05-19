import { OpenAIApi, Configuration } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { KakaoMap, Marker } from "react-kakao-maps";
import { Head } from "next/document";

export default function Chatgpt() {
  // const [myplace, setMyplace] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const { geolocation } = navigator;
    geolocation.getCurrentPosition(
      (position) => {
        // success.
        setX(position.coords.latitude);
        setY(position.coords.longitude);
      },
      (error) => {
        console.warn("Fail to fetch current location", error);
        setX(37);
        setY(127);
      }
      // {
      //   enableHighAccuracy: false,
      //   maximumAge: 0,
      //   timeout: Infinity,
      // }
    );
  }, []);

  const abc = async (x, y) => {
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${y}&y=${x}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        }
      )
      .then(async (res) => {
        console.log(res.data.documents[1].address_name);
        // await setMyplace(res.data.documents[1].address_name);

        getCompletionFromOpenAI(res.data.documents[1].address_name);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (x && y) {
      abc(x, y);
    }
  }, [x, y]);

  async function getCompletionFromOpenAI(myplace) {
    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_ChatGpt_API_KEY,
    });
    console.log(configuration);
    const openai = new OpenAIApi(configuration);
    console.log(openai);

    console.log("맛집추천 대기중");
    console.log(myplace);
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${myplace}+에서 만원정도 중국요리 맛집 추천해줘`,
        },
      ],
      temperature: 0,
    });
    console.log(myplace);

    console.log(completion.data.choices[0].message.content);
    setReply(completion.data.choices[0].message.content);
  }

  return (
    <>
      <div className="w-72  text-lg">
        <div>{x}</div>
        <div>{y}</div>
        {/* <div>{myplace ? myplace : 1}</div> */}
        <div>{reply}</div>
        <div className="border-black">{reply}</div>
      </div>
    </>
  );
}
