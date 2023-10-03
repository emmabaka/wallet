"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import s from './Settings.module.scss'

const Settings = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const router = useRouter();

  const handleLogOut = async () => {
    const auth = getAuth();
    await signOut(auth);
    router.push("/login");
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  return (
    <button className={s.logOut} type="button" onClick={handleLogOut}>
      Log out from {userEmail}
    </button>
  );
};

export default Settings;
