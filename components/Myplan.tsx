import Image from "next/image";
import {
    MdOutlineArrowForwardIos,
    MdOutlineArrowBackIosNew,
} from "react-icons/md";
import authRequest from "@/utils/request/authRequest";
import { useState } from "react";
export default function Myplan({data,getPlanIdNum}) {
    let [writePlan, setWritePlan] = useState(0);
  
    

    const [image,setImage] =useState("")
    

 
    return (
        <>
            <div
                className="cursor-pointer p-2"
                onClick={() => {
                    if (writePlan > 0) {
                        setWritePlan(writePlan - 1);
                        getPlanIdNum(data[writePlan]?.id)
                        setImage(data[writePlan].travels[0].destination.firstimage)
                    }
                  
                }}
            >
                <MdOutlineArrowBackIosNew />
            </div>
            <div className="m-4 flex items-center rounded-md border p-1 shadow-sm">
                <div className="h-24 w-24">
                    <Image
                        src= {image || "/assets/main-img.png"}
                        width={1}
                        height={1}
                        layout="responsive"
                    />
                </div>
                {data && (
                    <div className="mx-2 flex flex-1 flex-col justify-around overflow-hidden text-ellipsis">
                        <p className="p-1">
                            장소 : {data[writePlan]?.city}
                        </p>
                        <p className="line-clamp-2 leading-2 m-1 block">
                            {writePlan} 
                        </p>
                        <p className="p-1">
                            테마: {Object.values(data[writePlan].tag)}
                        </p>
                    </div>
                )}
            </div>
            <div
                className="cursor-pointer p-2"
                onClick={() => {
                    if (writePlan < data.length - 1) {
                        setWritePlan(writePlan +1);
                        getPlanIdNum(data[writePlan]?.id)
                        setImage(data[writePlan].travels[0].destination.firstimage)
                    }
                    
                }}
            >
                <MdOutlineArrowForwardIos />
            </div>
        </>
    );
}
