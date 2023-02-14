import { convertDateToKorean } from "@/utils/common";
import axios from "axios";
import { trace } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlanDetail from "../plan/new/planDetail"
import QWER from "./123";


export default function q ({communityplans,totalplan ,test}){
  const { query } =useRouter();
 
  

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
totalplan.plans.map((el,i)=>{
  return totalplan.plans[i]?.id==query.id ? <QWER travels={totalplan.plans[i]?.travels} plan={test.plan}/>:null
  
})

}







</>
)

}
export async function getServerSideProps({query}) {

  const res = await axios.get(`http://localhost:8000/community`);
  const totalplan = await axios.get(`http://localhost:8000/plan/all/1`)
  const test =await axios.get(`http://localhost:8000/plan/${query.id}`)

  return {
    props: {
      communityplans: res.data || [],
      totalplan : totalplan.data ,
      test : test.data
     
    },
  };
}
