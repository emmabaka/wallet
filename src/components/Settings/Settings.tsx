"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import clsx from "clsx";
import s from "./Settings.module.scss";

const Settings = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [clear, setClear] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/login");
  };
  console.log(auth);

  const deleteCollection = () => {};

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  return (
    <div className="box">
      <div className={s.profileWrap}>
        <Image
          className={s.avatar}
          src={
            auth.currentUser?.photoURL
              ? auth.currentUser?.photoURL
              : "/images/default-user-avatar.png"
          }
          alt="Avatar"
          width={75}
          height={75}
        />
        <div className={s.emailWrap}>
          <p className={s.email}>{userEmail}</p>
          <button className={s.logOut} type="button" onClick={handleLogOut}>
            Log out
            <Image src="/svgs/logout.svg" alt="Icon" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className={s.clearDataWrap}>
        <p className={s.label}>Clear all data (confirm to clear)</p>
        {!clear ? (
          <button
            className={clsx(s.clearButton, s.clear)}
            onClick={() => setClear(true)}
          >
            Clear
          </button>
        ) : (
          <button
            className={clsx(s.clearButton, s.confirm)}
            onClick={() => {
              deleteCollection();
              setClear(false);
            }}
          >
            Confirm
          </button>
        )}
      </div>
    </div>
  );
};

export default Settings;
