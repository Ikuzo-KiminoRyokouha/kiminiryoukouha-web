import { useEffect, useState } from "react"
import authRequest from "@/utils/request/authRequest"
import { Plan } from "@/types/plan.interface";
import dayjs from "dayjs";
import axios from "axios";





export default function QWER(){
    const [test,setTest] = useState<Array<Plan>>();
    const [activatedPlans, setActivatedPlans] = useState<Array<Plan>>();
    const [waitingPlans, setWaitingPlans] = useState<Array<Plan>>();
    const [test1,setTest1]=useState(0)

   

useEffect(()=>{
   async function Plancome(){
    try {
    const abc=  await authRequest.get("plan/today")
 

    const qwe= await authRequest.get(`travel/${abc.data.plan.id}`)
      console.log(qwe.data)
  
   

     

        
    } catch (error) {
        console.error(error)   
    }
   }
   Plancome()
   
},[])






    return(<div  className="text-lg  w-72">




   
{activatedPlans?
(activatedPlans?.map((el, i) => {
  return (
    <table key={i} className="border-collapse border border-slate-400 w-full">
      <thead>
        <tr>
          <th className="border border-slate-300 py-2" colSpan={2}>
            {el.title} 
          </th>
        </tr>
      </thead>
      <tbody>
        {el.travels.map((el, i) => {
          return (
            <tr key={i}>
              <td className="border border-slate-300 w-5/6 ">{el.destination.title}</td>
              <td className="border border-slate-300 w-1/6 px-1 py-1 text-center">
                <button
                  className=""
                  onClick={() => {
                    setTest1(el.id);
                  }}
                >
                  수정
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
})):"현재플랜이없습니다"}





        </div>)
}