"use client";
import TotalBalance from "@/components/TotalBalance/TotalBalance";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import s from "./page.module.scss";

const Wallet = () => {
  return (
    <>
      <Header />
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
