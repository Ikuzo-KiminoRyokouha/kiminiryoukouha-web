import authRequest from "@/utils/request/authRequest";
import axios from "axios";
import router from "next/router";
import { useState } from "react";


export default function update({test}){
  const [text,setText]=useState("")

  const onSubmit= async (e)=>{
  await authRequest.put(`/community/`,{
    id:test.id,
    img:test.img,
    content:text,
    planId:test.planId
  })
router.push("http://localhost:3000/thread")
}




return (<>
<span>{test.content}</span>
<span>{text}</span>
    <input onChange={(e)=>{setText(e.target.value)}} />
    <button onClick={onSubmit}>수정 </button>
    </>)
}


export async function getServerSideProps({query}) {
  const boardid=Object.keys(query)[0];
     const test =await axios.get(`http:localhost:8000/community/${boardid}`) 
console.log(test)
 
    return {
      props: {test:test.data
        
       
      },
    };
  }