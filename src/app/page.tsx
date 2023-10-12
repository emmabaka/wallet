"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Home from "@/components/Home/Home";
import LoaderCircle from "@/components/Loaders/LoaderCircle";
import Navigation from "@/components/Navigation/Navigation";

export default function HomePage() {
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
      <main>{isLoading ? <LoaderCircle /> : <Home />}</main>
      <Navigation />
    </>
  );
}
