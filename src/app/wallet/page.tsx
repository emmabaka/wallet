"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import Navigation from "@/components/Navigation/Navigation";
import Wallet from "@/components/Wallet/Wallet";
import LoaderCircle from "@/components/Loaders/LoaderCircle";

const WalletPage = () => {
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
      <main>{isLoading ? <LoaderCircle /> : <Wallet />}</main>
      <Navigation />
    </>
  );
};

export default WalletPage;
