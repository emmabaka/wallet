"use client";
import { auth } from "@/firebase";
import { UserContext } from "@/context/userContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { setCookie } from "cookies-next";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const userContext = useContext(UserContext);
  console.log(userContext?.current.email);
  console.log(auth.currentUser?.email);

  useEffect(() => {
    console.log(auth.currentUser?.email);
    if (auth.currentUser?.email) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        userContext!.current = { email: user.email };
        setCookie("userEmail", auth.currentUser?.email);
        router.push("/");
      })
      .catch(console.log);
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <button type="submit">Log in</button>
      </form>
      <p>
        Or <Link href="/register">Register</Link>
      </p>
    </>
  );
};

export default Login;
