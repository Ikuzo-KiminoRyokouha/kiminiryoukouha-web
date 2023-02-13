import { convertDateToKorean } from "@/utils/common";
import axios from "axios";
import { trace } from "console";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PlanDetail from "../plan/new/planDetail"
import QWER from "./123";


export default function q ({communityplans,totalplan}){
 // console.log(plans)
   const { asPath, pathname,query } = useRouter();
  const realquery=Number(query.id)
  // console.log(realquery)
 // console.log(communityplans[realquery]?.plan) //plan
  // console.log(totalplan.plans[1].id) //==realquery 와 같아야지 
 //밑에꼐 유효값이됨 
   //console.log(totalplan.plans[1].travels) //travels 
   //console.log(totalplan.plans)
   
   // console.log(totalplan.plans[14].id==realquery) true 둘다 49 
   // console.log(communityplans[0].plan.id==realquery) true  둘다 49 
  
  //  totalplan.plans.map((el,i)=>{
  //   return totalplan.plans[i].id ==realquery
  
  // }).map((el,j)=>{
  //   return communityplans[j].plan.id==realquery?
  //   <QWER travels={el.travels} plan={communityplans[j].plan}/>:<><h1>실패</h1></>
  // })
   
   // console.log(totalplan.plans[1].id) //==realquery 와 같아야지 
 //   console.log(communityplans[i].plan.id===realquery communityplans[0].plan.id==realquery)
// <QWER travels={totalplan.plans[14].travels} plan={communityplans[0].plan}/> 
// 이런형식으로 다르게 값을 주고싶은데 



//  totalplan.plans.map((el,i)=>{
//  if( totalplan.plans[i]?.id==realquery)
//  return console.log( totalplan.plans[i]?.travels)

// })
 
// communityplans.map((el,i)=>{
//   if(communityplans[i].plan.id==realquery)
//   return console.log( communityplans[i].plan)

// })




return (
<> 
 
{
totalplan.plans.map((el,i)=>{
  if(totalplan.plans[i]?.id==realquery)
  return communityplans.map((el,j)=>{
    return communityplans[j].plan.id==realquery? <QWER travels={totalplan.plans[i]?.travels} plan={communityplans[j].plan} />:null
  })
})

}






</>
)




}
export async function getServerSideProps() {
  const res = await axios.get(`http://localhost:8000/community`);
  const totalplan = await axios.get(`http://localhost:8000/plan/all/1`)

  return {
    props: {
      communityplans: res.data || [],
      totalplan : totalplan.data
      
    },
  };
}
