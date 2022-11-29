import { RiArrowDropRightLine, RiArrowDropDownLine } from "react-icons/ri";
import { useToggle } from "../../hooks";
import IProps from "../../types/props.interface";

interface Props extends IProps {
  date: string;
  selected: boolean;
  onClick: () => void;
}
export default function PlaceByDate({
  children,
  date,
  onClick,
  selected,
}: Props) {
  const visible = useToggle(true);
  return (
    <div>
      <div
        onMouseDown={(e) => e.preventDefault()}
        className={`flex space-x-1 border p-2 ${
          selected && "bg-sky-600 text-white"
        }`}
        onClick={(e) => {
          visible.onClick(e);
          onClick();
        }}
      >
        {!visible.value && <RiArrowDropRightLine />}
        {visible.value && <RiArrowDropDownLine />}
        <span>{date}</span>
      </div>
      {visible.value && children}
    </div>
  );
}
