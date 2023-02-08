import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useEffect, useLayoutEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { TbFileDescription, TbMap } from "react-icons/tb";

import { useToggle } from "../../hooks";
import { Travel } from "../../types/plan.interface";
import { getDescriptionFromAPI } from "../../utils/apiQuery";
import { Modal, Portal } from "../common/modal";

interface Props {
  travel: Travel;
  planId: number;
}

export default function DetailCard({ planId, travel }: Props) {
  const [description, setDescription] = useState<string>("");
  const show = useToggle(false);
  const router = useRouter();

  useLayoutEffect(() => {
    getDescriptionFromAPI(
      Number(travel.destination.contentid),
      Number(travel.destination.contenttypeid)
    ).then((res) => setDescription(res));
  }, []);

  return (
    
    <>
   
      <div className="w-1/2 p-4 lg:w-1/3 ">
        <div
          className="h-full overflow-hidden rounded-lg border-2
                        border-gray-200 border-opacity-60 "
         >
          <img
            className="w-full object-cover object-center 
                       md:h-48 lg:h-72"
            src={
              travel.destination.firstimage ||
              "https://picsum.photos/id/188/720/400/"
            }
            alt="card image"
          />
          <div
            className="cursor-pointer p-6 transition
                         duration-300 ease-in hover:bg-indigo-600 hover:text-white"
          >
            <h2 className="mb-1 text-base  font-medium">
              {dayjs(travel.startDay).format("YYYY-MM-DD")}
            </h2>
            <h1 className="mb-3 text-lg font-semibold">
              {travel.destination.title}
            </h1>
            <p className="mb-3 truncate text-xs leading-relaxed">
              {description}
            </p>
          </div>
          <div className="flex">
            <div className="ml-auto">
              <button>
                <AiOutlineCheckCircle size={30} color={"blue"} />
              </button>
              <button
                onClick={() =>
                  router.push(
                    {
                      pathname: "/plan/detail/nav",
                      query: {
                        planId,
                        travelId: travel.id,
                      },
                    },
                    "/plan/detail/nav"
                  )
                }
              >
                <TbMap size={30} color={"green"} />
              </button>
              <button onClick={show.setTrue}>
                <TbFileDescription size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {show.value && (
        <PlaceDescModal
          title={travel.destination.title}
          src={
            travel.destination.firstimage ||
            "https://picsum.photos/id/188/720/400/"
          }
          description={description}
          hide={show.setFalse}
        />
      )}
        
    </>

  );
}

interface ModalProps {
  hide: () => void;
  title: string;
  src: string;
  description: string;
}

const PlaceDescModal = ({ hide, title, src, description }: ModalProps) => {
  return (
    <Portal qs={"#__next"}>
      <Modal hide={hide}>
        <Modal.Header hide={hide}>
          <Modal.Title text={title} />
        </Modal.Header>
        <Modal.Image src={src} />
        {description && <Modal.Description text={description} />}
      </Modal>
    </Portal>
  );
};
