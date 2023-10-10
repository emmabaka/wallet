"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import s from "./NavigationItem.module.scss";
import clsx from "clsx";

const NavigationItem = ({ href, Icon }: { href: string; Icon: any }) => {
  const pathName = usePathname();

  return (
    <li>
      <Link
        className={clsx(s.link, { [s.active]: pathName === href })}
        href={href}
      >
        <Icon />
      </Link>
    </li>
  );
};

export default NavigationItem;
