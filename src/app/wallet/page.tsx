import TotalBalance from "@/components/TotalBalance/TotalBalance";
import TransactionHistory from "@/components/TransactionHistory/TransactionHistory";
import s from "./page.module.scss";

const Wallet = () => {
  return (
    <div className={`${s.walletPage} container`}>
      <TotalBalance />
      <TransactionHistory/>
    </div>
  );
};

export default Wallet;
