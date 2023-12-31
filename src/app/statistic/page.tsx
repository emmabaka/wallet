"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import LoaderCircle from "@/components/Loaders/LoaderCircle";
import Navigation from "@/components/Navigation/Navigation";
import Statistic from "@/components/Statistic/Statistic";

const StatisticPage = () => {
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
      <main>{isLoading ? <LoaderCircle /> : <Statistic />}</main>
      <Navigation />
    </>
  );
};

export default StatisticPage;
