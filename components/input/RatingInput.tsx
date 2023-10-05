import { useState } from "react";

const FillStar = () => {
  return (
    <svg
      className="h-5 w-5 text-yellow-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
};

interface IBlankStar {
  onMouseOver: () => void;
}
const BlankStar = (props: Partial<IBlankStar>) => {
  return (
    <svg
      {...props}
      className="h-5 w-5 text-gray-300 dark:text-gray-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );
};

export default function RatingInput() {
  const [count, setCount] = useState(0);
  return (
    <div className="max-w-2xl rounded-lg border">
      <div
        className="flex items-center"
        onMouseOut={() => {
          if (count != 0) {
            setCount((prev) => 0);
          }
        }}
      >
        {Array.from({ length: 5 }).map((_, idx) => {
          if (idx < parseInt(`${count}`)) {
            return <FillStar key={"ratinginput" + idx} />;
          }
          return (
            <BlankStar
              onMouseOver={() => {
                setCount(() => idx + 1);
              }}
              key={"ratinginput" + idx}
            />
          );
        })}
      </div>
    </div>
  );
}
