"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { GoogleSVG } from "../svgs/svgs";
import s from "./AuthForm.module.scss";

const Login = ({ type }:{type: string}) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.email) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = (
    e: { preventDefault: () => void },
    email: string,
    pass: string
  ) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then(() => {
        router.push("/");
      })
      .catch(console.log);
  };

  const handleSignUp = (
    e: { preventDefault: () => void },
    email: string,
    pass: string
  ) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, pass)
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

  const handleSubmit = (e: { preventDefault: (() => void) | (() => void); }) => {
    if (type === "login") {
      return handleLogin(e, email, pass);
    } else {
      return handleSignUp(e, email, pass);
    }
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          Email
          <input
            className={s.input}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={s.label}>
          Password
          <input
            className={s.input}
            type="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </label>
        <button className={s.submit} type="submit">
          {type === "login" ? "Log in" : "Register"}
        </button>
        <div className={s.or}>
          <span>Or {type === "login" ? "log in" : "sign up"} with</span>
        </div>
        <button
          className={s.googleButton}
          type="button"
          onClick={handleGoogleAuth}
        >
          Google
          <GoogleSVG />
        </button>
      </form>
      <p>
        Or
        <Link href={type === "login" ? "/register" : "/login"}>
          {type === "login" ? "Register" : "Log in"}
        </Link>
      </p>
    </>
  );
};

export default Login;
