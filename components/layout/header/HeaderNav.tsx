import Link from "next/link";

type navItem = {
  href: string;
  name: string;
};

interface Props {
  items: Array<navItem>;
}

export default function HeaderNav({ items }: Props) {
  return (
    <nav className="hidden  text-sm font-semibold leading-6 text-slate-700 md:block">
      <ul className="flex space-x-8">
        {items.map((item) => (
          <li>
            <Link href={item.href}>
              <a className="hover:text-sky-600">{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
