import Image from "next/image";
export default function ThreadSummary({plan}) {
console.log(plan?.plan)
//console.log(Object.values(plan?.plan.tag))

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
            내용 : {plan?.plan.title}
            
          </p>
          <p className="p-1">테마:   
          {Object.values(plan?.plan.tag).map((el,i)=>{return plan.plan.tag[i+1] })}
           </p>
        </div>
        <div
          className="flex cursor-pointer items-center justify-center rounded-lg bg-sky-600 p-2 text-white"
          onClick={() => {
            console.log("계획보기 clicked");  
          }}
        >
          <span>계획보기</span>
        </div>
      </div>
    </>
  );
}

