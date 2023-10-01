"use client";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { InfoSVG } from "../svgs/svgs";
import s from "./Header.module.scss";
import { useState } from "react";

const Header = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const pathName = usePathname();
  const title =
    pathName === "/"
      ? "Homepage"
      : pathName.slice(1)[0].toUpperCase() + pathName.slice(2);

  const router = useRouter();

  const isNotAuth = pathName === "/login" || pathName === "/register";

  const handleLogOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch(console.log);
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUserEmail(user.email);
    }
  });

  return (
    <header className={s.header}>
      <div className={`container ${s.wrap}`}>
        <h1 className={s.title}>{title}</h1>
        <button type="button" onClick={handleLogOut}>
          Log out from {userEmail}
        </button>
        {!isNotAuth && <InfoSVG />}
      </div>
    </header>
  );
};

export default Header;
