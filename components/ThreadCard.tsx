import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import ThreadSummary from "./ThreadSummary";

export default function ThreadCard() {
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
      <div className="flex">
        {/* 게시물 */}
        <div></div>
        {/* 오른쪽 유저인포 */}
        <div></div>
      </div>
    </>
  );
}
