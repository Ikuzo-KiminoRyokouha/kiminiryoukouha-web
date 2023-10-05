import IProps from "../../types/props.interface";

interface Props extends Partial<IProps> {
  visible: boolean;
}
export default function DropDown({ children, visible }: Props) {
  return (
    <div
      className={`absolute top-10 ${
        visible ? "block" : "hidden"
      } z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:divide-gray-600 dark:bg-gray-700`}
    >
      {children}
    </div>
  );
}

DropDown.Header = function ({ children }: IProps) {
  return (
    <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
      {children}
    </div>
  );
};

DropDown.ItemContainer = function ({ children }: IProps) {
  return (
    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
      {children}
    </ul>
  );
};

DropDown.Item = function ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <li onClick={onClick}>
      <span className="block cursor-pointer  py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
        {text}
      </span>
    </li>
  );
};

DropDown.Tail = function ({ children }: IProps) {
  return <div className="py-1">{children}</div>;
};
