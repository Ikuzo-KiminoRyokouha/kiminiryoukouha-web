import { FaTimes } from "react-icons/fa";
import { Modal, Portal } from "./common/modal";

interface Props {
  title: string;
  date: string;
  offModal: () => void;
}

export default function MyModal({ title, date, offModal }: Props) {
  const onClick = {
    deleteing: () => {
      // 삭제 누를시 요청
      console.log("deleting clicked");
    },
  };
  return (
    <>
      <Portal qs={"#__next"}>
        <Modal hide={offModal}>
          <Modal.Header hide={offModal} />
          <div className="flex h-28">
            <div className="h-full w-1/3 bg-blue-200">
              <Modal.Image src="/assets/main-img.png" />
            </div>
            <div className="flex flex-col justify-around pl-4">
              <span className="text-lg">計画名 : {title}</span>
              <span className="text-lg">計画日時 : </span>
              <span className="text-base">{date}</span>
            </div>
          </div>
          <div className="flex justify-center pt-6">
            <span className="py-5 text-xl">
              本当にこのプランを削除しますか？
            </span>
          </div>
          <Modal.Footer>
            <button
              className="h-10 flex-1 border-r-2 bg-sky-600 text-lg font-bold text-white"
              onClick={onClick.deleteing}
            >
              削除
            </button>
            <button
              className="h-10 flex-1 text-lg font-bold"
              onClick={offModal}
            >
              キャンセル
            </button>
          </Modal.Footer>
        </Modal>
      </Portal>
    </>
  );
}
