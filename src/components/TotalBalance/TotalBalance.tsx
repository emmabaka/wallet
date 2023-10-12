"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection } from "firebase/firestore";
import { getTotal } from "@/utils/getTotal";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import LoaderHorizontal from "../Loaders/LoaderHorizontal";
import clsx from "clsx";
import s from "./TotalBalance.module.scss";

interface Props {
  addExpense?: boolean;
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
}

const TotalBalance = ({ addExpense, balance, setBalance }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const isHomePage = addExpense !== undefined;
  const dependency = isHomePage ? addExpense : null;

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user && !addExpense) {
        const transactionsCollectionTotalRef = collection(
          db,
          `total${user.uid}`
        );
        setIsLoading(true);
        const total = await getTotal(transactionsCollectionTotalRef);
        if (total.length > 0) {
          setBalance(total[0].total);
        } else {
          setBalance(0);
        }
        setIsLoading(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dependency]);

  return (
    <>
      <p
        className={clsx(s.title, {
          [s.titleCard]: isHomePage,
          [s.titleWallet]: !isHomePage,
        })}
      >
        Total Balance
      </p>
      <p
        className={clsx(s.balance, {
          [s.balanceCard]: isHomePage,
          [s.balanceWallet]: !isHomePage,
        })}
      >
        ₴ {isLoading ? <LoaderHorizontal /> : formatNumberWithCommas(balance)}
      </p>
      <p
        className={clsx(s.balance, {
          [s.balanceCard]: isHomePage,
          [s.balanceWallet]: !isHomePage,
        })}
      >
        $ 2,548.00
      </p>
    </>
  );
};

export default TotalBalance;
