"use client";
import { memo, useEffect, useState } from "react";
import { getCurrency } from "@/api/getCurrency";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { MoreSVG } from "../svgs/svgs";
import s from "./Card.module.scss";

const Card = ({ addExpense }: { addExpense: boolean }) => {
  const balance = localStorage.getItem("total") || "0";
  //   const [dollar, setDollar] = useState("0");
  //   const [euro, setEuro] = useState("0");

  useEffect(() => {
    // getCurrency().then((res) => {
    //   setDollar(res.find((item) => item.currencyCodeA === 840).rateBuy);
    //   setDollar(res.find((item) => item.currencyCodeA === 978).rateBuy);
    // });
  }, []);

  return (
    <div className={addExpense ? `${s.hidden} ${s.card}` : s.card}>
      <p className={s.title}>Total Balance</p>
      <p className={s.balance}>₴ {formatNumberWithCommas(balance)}</p>
      <p className={s.balance}>$ 2,548.00</p>
      {/* <p className={s.balance}>€ 2,548.00</p> */}
      <div className={s.more}>
        <MoreSVG />
      </div>
    </div>
  );
};

export default memo(Card);
