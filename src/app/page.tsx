"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import Home from "@/components/Home/Home";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
// import { getCookie } from "cookies-next";

// function isLoggedIn() {
//   console.log("USER", getCookie("userEmail"));

//   return Boolean(getCookie("userEmail"));
// }

export default function HomePage() {
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const userContext = useContext(UserContext);

  useEffect(() => {
    console.log(auth);
    console.log(isLoading);

    auth.onAuthStateChanged((user) => {
      if (user?.email) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    console.log(isLoading);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return isLoading ? <p style={{ color: "black" }}>Loading...</p> : <Home />;
}
