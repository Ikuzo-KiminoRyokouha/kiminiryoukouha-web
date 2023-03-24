import {OpenAIApi,Configuration} from "openai"
import axios from "axios"
import { useEffect, useState } from "react"
import { KakaoMap, Marker } from 'react-kakao-maps';
import { Head } from "next/document";


export default function Chatgpt(){
    
    const REST_API_KEY="4c037f853d908e8478a94625d39e42d3"
    
    


    const [myplace,setMyplace]=useState("")
    const [x,setX]=useState(0)
    const [y,setY]=useState(0)
    const [reply,setReply]=useState("")
    useEffect(() => {
      const { geolocation } = navigator;
      geolocation.getCurrentPosition(
        (position) => {
          // success.
          setX(position.coords.latitude);
          setY(position.coords.longitude);
        },
        (error) => {
          console.warn('Fail to fetch current location', error);
          setX(37);
          setY(127);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }, []);
    
    const abc = async (x, y) => {
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${y}&y=${x}`,
          { headers: { Authorization: `KakaoAK ${REST_API_KEY}` } }
        )
        .then((res) => {
          console.log(res.data.documents[1].address_name);
          setMyplace(res.data.documents[1].address_name);
        })
        .catch((e) => console.log(e));
    };
    
    useEffect(() => {
      if (x && y) {
        abc(x, y);
      }
    }, [x, y]);

           
         

   

    const configuration = new Configuration({
      apiKey: "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"
    });
    const openai = new OpenAIApi(configuration);

    async function getCompletionFromOpenAI() {
      console.log("맛집추천 대기중")
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `${myplace}+의맛집 추천해줘` }
        ],
        temperature: 0,
      });
    
      console.log(completion.data.choices[0].message.content);
      setReply(completion.data.choices[0].message.content)

    }
    
   

   

    
return(<>
<div className="mx-auto  mb-[53px] max-h-full w-full max-w-2xl flex-1 border lg:mb-0">
  <input className="border-black" />

<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={getCompletionFromOpenAI } >
  맛집추천버튼
</button>
<div>{x}</div>
<div>{y}</div>
<div>{myplace?myplace:1}</div>
<div className="border-black">{reply}</div>


</div>





</>)

}

