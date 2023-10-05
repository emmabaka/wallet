"use client";
import TotalBalance from "../TotalBalance/TotalBalance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import clsx from "clsx";
import s from "./Wallet.module.scss";
import { useState } from "react";

const Wallet = () => {
  const [balance, setBalance] = useState<number>(0);
  
  return (
    <div className={clsx(s.walletPage, "container")}>
      <TotalBalance balance={balance} setBalance={setBalance} />
      <TransactionHistory />
    </div>
  );
};

export default Wallet;
