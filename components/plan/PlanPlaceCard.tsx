import { Modal, Portal } from "@/common/modal";
import { useToggle } from "@/hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { MdArrowRight } from "react-icons/md";
import { TbFileDescription, TbMap } from "react-icons/tb";
import { getDescriptionFromAPI } from "../../utils/apiQuery";

export default function PlanPlaceCard() {
  const show = useToggle(false);
  const disable = useToggle(false);
  const router = useRouter();
  /**
   * @description 서버에 장소 완료 했다고 보내는 함수
   */
  const planComplete = () => {};

  return (
    <div className="relative">
      <div className="flex items-center justify-between border p-2">
        <div>
          <span className="text-xl font-bold">0일차</span> - 2022/01/10
        </div>
        <div>
          <MdArrowRight size={30} />
        </div>
      </div>
      <div className="relative m-2 flex flex-col justify-center">
        {disable.value && (
          <span className="absolute my-auto h-[1px] w-full border"></span>
        )}
        <div className="flex items-center justify-between border p-2">
          <span className="text-lg font-bold">석굴암</span>
          <div className="space-x-2">
            <button onClick={disable.onClick}>
              <AiOutlineCheckCircle size={30} color={"blue"} />
            </button>
            <button
              onClick={() =>
                router.push(
                  {
                    pathname: "/plan/detail/nav",
                    query: { place: "석굴암" },
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
      {show.value && (
        <PlaceDescModal
          title={"석굴암"}
          src={"/assets/budda.JPG"}
          description={
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, magnam. Eaque libero ea repudiandae in dolores vitae eos, aut omnis non beatae tenetur nisi consequatur voluptatem, iusto, accusamus maiores necessitatibus!"
          }
          hide={show.setFalse}
        />
      )}
    </div>
  );
}

interface ModalProps {
  hide: () => void;
  title: string;
  src: string;
  description: string;
}

const PlaceDescModal = ({ hide, title, src }: ModalProps) => {
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    getDescriptionFromAPI(126216, 12).then((res) => {
      setDescription(res);
    });
  }, []);

  return (
    <Portal qs={"#__next"}>
      <Modal>
        <Modal.Header hide={hide}>
          <Modal.Title text={title} />
        </Modal.Header>
        <Modal.Image src={src} />
        {description && <Modal.Description text={description} />}
      </Modal>
    </Portal>
  );
};
