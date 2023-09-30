"use client";
import { useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from "@/context/userContext";
import { InfoSVG } from "../svgs/svgs";
import s from "./Header.module.scss";
import { auth } from "@/firebase";

const Header = () => {
  const pathName = usePathname();
  const title =
    pathName === "/"
      ? "Homepage"
      : pathName.slice(1)[0].toUpperCase() + pathName.slice(2);

  const userContext = useContext(UserContext);

  console.log(userContext?.current.email);
  console.log(auth.currentUser?.email);

  const router = useRouter();

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log(auth?.currentUser?.email);
        userContext!.current = { email: null };
        router.push("/login");
      })
      .catch(console.log);
  };

  return (
    <header className={s.header}>
      <div className={`container ${s.wrap}`}>
        <h1 className={s.title}>{title}</h1>
        <button type="button" onClick={handleLogOut}>
          Log out from {auth.currentUser?.email}
        </button>
        <InfoSVG />
      </div>
    </header>
  );
};

export default Header;
