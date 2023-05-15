import {OpenAIApi,Configuration} from "openai"
import axios from "axios"
import { useEffect, useState } from "react"
import { KakaoMap, Marker } from 'react-kakao-maps';
import { Head } from "next/document";


export default function Chatgpt(){
    
    
    


    const [myplace,setMyplace]=useState(null)
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
          { headers: { Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}` } }
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

    useEffect(()=>{
      if(myplace)
      getCompletionFromOpenAI()

    },[myplace]
    )
           
         

   

    const configuration = new Configuration({
      apiKey: process.env.NEXT_PUBLIC_ChatGpt_API_KEY
    });
    const openai = new OpenAIApi(configuration);

    async function getCompletionFromOpenAI() {
      console.log("맛집추천 대기중")
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `${myplace}+맛집 추천해주는데 위치랑 전화번호도` }
        ],
        temperature: 0,
      });
    
      console.log(completion.data.choices[0].message.content);
      setReply(completion.data.choices[0].message.content)

    }
    
   

   

    
return(<>


<div className="text-lg w-80">
      <div className="border-black whitespace-pre-wrap">{reply ? reply : "loading"}</div>
    </div>






</>)

}

