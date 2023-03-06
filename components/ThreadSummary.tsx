import authRequest from "@/utils/request/authRequest";
import mainRequest from "@/utils/request/mainRequest";
import { defaultContext, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";


export default function ThreadSummary({plan}) {
const router=useRouter()
const a = (plan.plan?.id) as number

const Thema = Object.values(plan?.plan?.tag).map((el)  =>{return el})


// const qwerasdf =  async() =>{
//  const asdf=  await mainRequest.get(`/plan/${a}`)
//  console.log("tlqkf", asdf.data.plan.travels[0].destination)
//     return asdf.data.plan.travels[0].destination
// }
// const dlalwlskdhkfk= qwerasdf()
// console.log("tlqkf",dlalwlskdhkfk)

const getPlan = ({queryKey}) => {
  return mainRequest.get(`/plan/${a}`)
}
const {data:qwer} = useQuery(
  ['getPlan', a], getPlan
)

// const getName= ({query})=>{
//   return authRequest.get(`/users/?userId${query.Key[1]}`)
// }

// const {data:name}= useQuery(
//   ['getName',plan.plan.userId]
// )


//const {data: apple} = useQuery(['getPlan'], getPlan)

// console.log(plan.plan.userId)

  return (
    <>
      <div className="m-4 flex border p-1 shadow-sm">
        <div className="h-24 w-24">
          <Image
            src={qwer?.data?.plan.travels[0].destination.firstimage ||   "/assets/main-img.png"}
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
          <p className="p-1">장소 : {plan.plan.title}</p>
          <p className="line-clamp-2 leading-2 m-1 block">
            예산 : {plan.plan.totalCost}
          </p>
          <p className="p-1">{"테마 :"+ Thema}</p>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white"
          onClick={() => {
            console.log("계획보기 clicked");
            router.push(`/thread/${a}`)
          }}
        >
          <span>계획보기</span>
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps({context}){
//   try{
//     const{data} = await mainRequest.get(
// `/plan/1`
//     )
//   }catch(err) {
//     console.log("ThreadSummary getServerSideProps :  ",err)
//   }
// }