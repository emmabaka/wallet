"use client";
import { useEffect } from "react";
import { initializeApp } from "firebase/app";

const FirebaseApp = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.NEXT_PUBLIC_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_PROJ_ID,
      storageBucket: process.env.NEXT_PUBLIC_STOR_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_APP_ID,
    };
    const app = initializeApp(firebaseConfig);
  });
  return children;
};

export default FirebaseApp;
