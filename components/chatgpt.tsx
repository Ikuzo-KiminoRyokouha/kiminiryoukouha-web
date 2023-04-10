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
    const [loadding,setLoadding]=useState(false)
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

    useEffect( ()=>{
      if(myplace!="")
       getCompletionFromOpenAI()
    },[])
           
         

   

    const configuration = new Configuration({
      apiKey: "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" 
    });
    const openai = new OpenAIApi(configuration);

    async function getCompletionFromOpenAI() {
      console.log("맛집추천 대기중")
      setLoadding(true)
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'user', content: `${myplace}+맛집 5개만 추천해줘 가게이름, 전화번호,위치만 나타내서` }
        ],
        temperature: 0,
      });
    
      console.log(completion.data.choices[0].message.content);
      setReply(completion.data.choices[0].message.content)
      setLoadding(false)
     

    }
    
    useEffect(() => {
      if (myplace !== "") getCompletionFromOpenAI();
    }, [myplace]);

   

    
return(<>
<div className="mx-auto  w-full max-w-2xl flex-1 border lg:mb-0 ">
{/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 rounded-full" onClick={getCompletionFromOpenAI } >
  맛집추천버튼
</button> */}
<div className="bg-gray-500">
<div className="border-black text-lg overflow-auto  ">{reply}</div>
<div className="animate-bounce bg-#848484"> {loadding?"...loadding":null}</div>
</div>
</div>





</>)

}

