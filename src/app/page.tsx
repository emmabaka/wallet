"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Home from "@/components/Home/Home";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (!userContext?.current.email) {
      router.push("/login");
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext]);

  return isLoading ? <p style={{ color: "black" }}>Loading...</p> : <Home />;
}
