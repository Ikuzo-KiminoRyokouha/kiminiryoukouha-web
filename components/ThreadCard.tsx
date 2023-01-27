import useToggle from "hooks/useToggle";
import { FaRegThumbsUp, FaUserCircle } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import ThreadSummary from "./ThreadSummary";

export default function ThreadCard({ pokemon, onClick }) {
  const readmore = useToggle(false);
  return (
    <>
      <div className="w-full" key={pokemon?.name || 0}>
        <div className="">
          <div className="m-2 border shadow-md">
            <div className="flex h-auto w-full items-center space-x-3 p-2">
              <FaUserCircle size={40} onClick={onClick.showUser} />
              <span className="" onClick={onClick.showUser}>
                {pokemon?.name || "hello"}
              </span>
            </div>
            <div className="pl-2 text-sm">{"날짜"}</div>
            <div className="p-2">
              <span
                className={`${
                  readmore.value ? "" : "line-clamp-4"
                } block leading-6`}
              >
                {pokemon?.url || "asdf"} Lorem ipsum dolor sit amet, consectetur
                adipisicing elit. Dolor, tempore magnam voluptate nobis, illum
                quas fuga pariatur neque ipsam inventore sequi. Vero
                reprehenderit sapiente labore dolore. Sint molestiae quasi
                commodi. Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Cum vitae nemo expedita magnam distinctio quos cumque
                harum. Eveniet, quos vel, quasi odit modi molestiae praesentium,
                voluptatum sapiente nulla voluptatibus sit. Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Illum ducimus optio
                quaerat, placeat deleniti in consequatur reiciendis, nisi
                dignissimos rem natus a minima sunt ipsum reprehenderit animi?
                Vitae, corrupti possimus!
              </span>
              <div className="flex justify-end">
                <span
                  className="cursor-pointer p-2 text-slate-400"
                  onClick={readmore.onClick}
                >
                  {readmore.value ? "close" : "read more"}
                </span>
              </div>
            </div>
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
    </>
  );
}
