"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Navigation from "@/components/Navigation/Navigation";
import Settings from "@/components/Settings/Settings";
import Loader from "@/components/Loader/Loader";

const SettingsPage = () => {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);
  return (
    <>
      <main>{isLoading ? <Loader /> : <Settings />}</main>
      <Navigation />
    </>
  );
};

export default SettingsPage;
