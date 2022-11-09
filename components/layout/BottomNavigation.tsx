import Link from "next/link";
import { BsHouse } from "react-icons/bs";
import { BiMessageRounded, BiCalendar } from "react-icons/bi";
import { GiSteampunkGoggles } from "react-icons/gi";
import { AiOutlineSetting } from "react-icons/ai";

const BottomNavMenu = [
  {
    title: "Home",
    icon: <BsHouse className="inline-block" size={"25"} />,
    href: "#",
  },
  {
    title: "Chat",
    icon: <BiMessageRounded className="inline-block" size={"25"} />,
    href: "#",
  },
  {
    title: "Plan",
    icon: <BiCalendar className="inline-block" size={"25"} />,
    href: "#",
  },
  {
    title: "AR",
    icon: <GiSteampunkGoggles className="inline-block" size={"25"} />,
    href: "#",
  },
  {
    title: "Setting",
    icon: <AiOutlineSetting className="inline-block" size={"25"} />,
    href: "#",
  },
];

export default function BottomNavigation() {
  return (
    <section className="fixed inset-x-0 bottom-0 z-10 block max-h-16 rounded-t-xl bg-white shadow md:hidden">
      <div id="tabs" className="flex justify-between">
        {BottomNavMenu.map((el, index) => (
          <Link href={el.href}>
            <div className="inline-block w-full justify-center pt-2 pb-1 text-center hover:text-teal-500 focus:text-teal-500">
              {el.icon}
              <span className="tab tab-home block text-xs">{el.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
