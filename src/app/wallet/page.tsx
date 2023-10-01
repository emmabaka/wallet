"use client";
import TotalBalance from "@/components/TotalBalance/TotalBalance";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import Navigation from "@/components/Navigation/Navigation";
import s from "./page.module.scss";

const Wallet = () => {
  return (
    <>
      <main>
        <div className={`${s.walletPage} container`}>
          <TotalBalance />
          <TransactionHistory />
        </div>
      </main>
      <Navigation />
    </>
  );
};

export default Wallet;
