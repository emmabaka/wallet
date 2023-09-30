"use client";
import { auth } from "@/firebase";
import { UserContext } from "@/context/userContext";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const userContext = useContext(UserContext);
  const router = useRouter();

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        userContext!.current = { email: user.email };
        router.push("/");
      })
      .catch(console.log);
  };

  const handleGoogleAuth = () => {
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(({ user }) => {
        console.log(user);
        userContext!.current = { email: user.email };
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
        <button type="submit">Register</button>
        <button type="button" onClick={handleGoogleAuth}>
          Sign in with Google
        </button>
      </form>
      <p>
        Or <Link href="/login">Log in</Link>
      </p>
    </>
  );
};

export default Register;
