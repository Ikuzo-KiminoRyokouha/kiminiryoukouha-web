import ThreadSummary from "components/ThreadSummary";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";

export default function Test() {
  const threadData = {
    username: "신민규",
    date: "2022-11-06",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed iureplaceat maxime magni, tempore architecto, itaque laborum assumenda, atin amet. Eius exercitationem aliquid nostrum blanditiis, voluptatibusvoluptatum at iusto?",
  };

  const onClick = {
    showUser: () => {},
  };

  return (
    <>
      <div className="mx-auto  mb-[53px] flex max-h-full w-full max-w-2xl flex-1 border lg:mb-0">
        <div className="w-full">
          <div className="">
            <div className="m-2 w-auto border shadow-md">
              <div className="flex h-auto w-full items-center space-x-3 p-2">
                <FaUserCircle size={40} onClick={onClick.showUser} />
                <span className="" onClick={onClick.showUser}>
                  {threadData.username}
                </span>
              </div>
              <div className="pl-2 text-sm">{threadData.date}</div>
              <div className="p-2">{threadData.description}</div>
              <ThreadSummary />
              <div className="flex items-center justify-start">
                <FaRegThumbsUp className="m-2 ml-5" color="blue" />
                <span className="text-sm">101</span>
                <MdSaveAlt className="mx-2" size={19} />
                <span className="text-sm">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
