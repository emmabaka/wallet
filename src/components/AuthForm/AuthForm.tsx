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
import { useFormik } from "formik";
import * as Yup from "yup";
import { notifyError } from "@/utils/notify";
import { RE_EMAIL } from "@/regex/regex";
import { GoogleSVG, HidePass, ShowPass } from "../svgs/svgs";
import clsx from "clsx";
import s from "./AuthForm.module.scss";

const Login = ({ type }: { type: string }) => {
  const [isShowPass, setShowPass] = useState(false);

  const { values, isValid, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        pass: "",
      },
      validateOnBlur: true,
      validateOnMount: true,
      validationSchema: Yup.object({
        email: Yup.string()
          .min(2, "Must be more than 2 characters")
          .matches(RE_EMAIL, "Invalid email address")
          .max(30, "Must be 30 characters or less")
          .required("Required"),
        pass: Yup.string()
          .min(6, "Must be more than 6 characters")
          .required("Required"),
      }),
      onSubmit: () => {},
    });

  const router = useRouter();

  useEffect(() => {
    if (auth.currentUser?.email) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async (
    e: { preventDefault: () => void },
    email: string,
    pass: string
  ) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      router.push("/");
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  const handleSignUp = async (
    e: { preventDefault: () => void },
    email: string,
    pass: string
  ) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      router.push("/");
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  const handleGoogleAuth = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (error) {
      console.log(error);
      notifyError();
    }
  };

  const handleSubmit = (e: { preventDefault: (() => void) | (() => void) }) => {
    if (type === "login") {
      return handleLogin(e, values.email, values.pass);
    } else {
      return handleSignUp(e, values.email, values.pass);
    }
  };

  return (
    <>
      <form className={s.form} onSubmit={handleSubmit}>
        <div className={s.inputWrap}>
          <label
            className={clsx(s.label, {
              [s.errorLabel]: errors.email && touched.email,
            })}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={clsx(s.input, {
              [s.errorInput]: errors.email && touched.email,
            })}
            id="email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <p className={s.error}>
            {errors.email && touched.email && errors.email}
          </p>
        </div>
        <div className={s.inputWrap}>
          <label
            className={clsx(s.label, {
              [s.errorLabel]: errors.pass && touched.pass,
            })}
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={clsx(s.input, {
              [s.errorInput]: errors.pass && touched.pass,
            })}
            id="pass"
            type={isShowPass ? "text" : "password"}
            name="pass"
            value={values.pass}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className={s.showPass}
            type="button"
            onClick={() => {
              setShowPass(!isShowPass);
            }}
          >
            {isShowPass ? <HidePass /> : <ShowPass />}
          </button>
          <p className={s.error}>
            {errors.pass && touched.pass && errors.pass}
          </p>
        </div>
        <button className={s.submit} disabled={!isValid} type="submit">
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
      <p className={s.hint}>
        {type === "login" ? "Don't" : "Already"} have an account?
        <Link
          href={type === "login" ? "/register" : "/login"}
          className={s.link}
        >
          {type === "login" ? "Register" : "Log in"}
        </Link>
      </p>
    </>
  );
};

export default Login;
