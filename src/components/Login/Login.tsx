"use client";
import { UserContext } from "@/context/userContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const router = useRouter();
  const userContext = useContext(UserContext);
  console.log(userContext?.current.email);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, pass)
      .then(({ user }) => {
        console.log(user);
        userContext!.current = { email: user.email };
        // setUser({ email: user.email });
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
