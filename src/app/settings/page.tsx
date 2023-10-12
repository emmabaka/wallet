"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Navigation from "@/components/Navigation/Navigation";
import Settings from "@/components/Settings/Settings";
import LoaderCircle from "@/components/Loaders/LoaderCircle";

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
      <main>{isLoading ? <LoaderCircle /> : <Settings />}</main>
      <Navigation />
    </>
  );
};

export default SettingsPage;
