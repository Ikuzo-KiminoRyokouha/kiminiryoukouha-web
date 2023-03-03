import { convertDateToKorean } from "@/utils/common";
import authRequest from "@/utils/request/authRequest";
import mainRequest from "@/utils/request/mainRequest";
import axios from "axios";
import { trace } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlanDetail from "../plan/new/planDetail"
import QWER from "./share";


export default function q ({communityplans,totalplan ,test}){
  const { query } =useRouter();
  console.log(test)
  

 
  

return (
<> 

 
{/* {
totalplan.plans.map((el,i)=>{
  if(totalplan.plans[i]?.id==query.id)
  return communityplans.map((el,j)=>{
    return communityplans[j].plan.id==query.id? <QWER travels={totalplan.plans[i]?.travels} plan={communityplans[j].plan} />:null
  })
})
} */}

{
totalplan.map((el,i)=>{
  return totalplan[i]?.id==query.id ? <QWER travels={totalplan[i]?.travels} plan={test}/>:null
  
})

}








</>
)
}
export async function getServerSideProps({query,req}) {

  
  const totalplan = await authRequest.get(`/plan/all/1`,
  {
    cookie: req.headers.cookie,
  }
  ).then((res) => {
    

    if (res.data.ok) return res.data.plans;
    return [];
  })

  
  
  const test =await mainRequest.get(`http://localhost:8000/plan/${query.id}`).then((res)=>{if(res.data.ok)return res.data.plan })
 
  
  

  return {
    props: {
      totalplan : totalplan || [],
       test : test || []
     
     },
   };
}