"use client";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import s from "./TotalBalance.module.scss";

const TotalBalance = () => {
  const balance = localStorage.getItem("total") || "0";

  return (
    <div>
      <p className={s.title}>Total Balance</p>
      <p className={s.balance}>₴ {formatNumberWithCommas(balance)}</p>
      <p className={s.balance}>$ 2,548.00</p>
    </div>
  );
};

export default TotalBalance;
