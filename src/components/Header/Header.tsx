"use client";
import { usePathname } from "next/navigation";
import { InfoSVG } from "../svgs/svgs";
import s from "./Header.module.scss";

const Header = () => {
  const pathName = usePathname();
  const title =
    pathName === "/"
      ? "Homepage"
      : pathName.slice(1)[0].toUpperCase() + pathName.slice(2);

  const isNotAuth = pathName === "/login" || pathName === "/register";

  return (
    <header className={s.header}>
      <div className={`container ${s.wrap}`}>
        <h1 className={s.title}>{title}</h1>
        {!isNotAuth && <InfoSVG />}
      </div>
    </header>
  );
};

export default Header;
