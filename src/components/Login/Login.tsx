"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.email) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        router.push("/");
      })
      .catch(console.log);
  };

  const handleGoogleAuth = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(() => {
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
        <button type="button" onClick={handleGoogleAuth}>
          Sign in with Google
        </button>
      </form>
      <p>
        Or <Link href="/register">Register</Link>
      </p>
    </>
  );
};

export default Login;
