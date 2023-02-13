import Image from "next/image";
import { useRouter } from "next/router";
export default function ThreadSummary({plan}) {

//console.log(Object.values(plan?.plan.tag))
const router =useRouter();

  return (
    <>
      <div className="m-4 flex border p-1 shadow-sm">
        <div className="h-24 w-24">
          <Image
            src="/assets/main-img.png"
            width={1}
            height={1}
            layout="responsive"
          />
        </div>
        <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
          <p className="p-1">도시 : {plan?.plan?.city}</p>
          <p className="line-clamp-2 leading-2 m-1 block">
            내용 : {plan?.plan?.title}
            
          </p>
          <p className="p-1">테마:   
          {Object.values(plan?.plan.tag).map((el,i)=>{return plan.plan.tag[i+1] })}
           </p>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white"
          onClick={() => {
            router.push(`/thread/${plan.plan.id}`)
            //일단여기에 페이지 이동을 달아줘야함 그냥여기에다가 컴포넌트 넣으면 되나 아닌데 
          }}
        >
          <span>계획보기</span>
        </div>
      </div>
    </>
  );
}

