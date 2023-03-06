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
    <nav className="hidden  font-semibold leading-6 text-slate-700 md:block">
      <ul className="flex space-x-12 whitespace-nowrap">
        {items.map((item, idx) => (
          <li key={item.name + idx}>
            <Link href={item.href}>
              <a className="hover:text-sky-600">{item.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
