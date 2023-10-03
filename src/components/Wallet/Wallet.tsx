import TotalBalance from "../TotalBalance/TotalBalance";
import TransactionHistory from "../TransactionHistory/TransactionHistory";
import clsx from "clsx";
import s from "./Wallet.module.scss";

const Wallet = () => {
  return (
    <div className={clsx(s.walletPage, "container")}>
      <TotalBalance />
      <TransactionHistory />
    </div>
  );
};

export default Wallet;
