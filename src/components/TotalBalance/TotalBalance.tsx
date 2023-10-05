"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  collection,
} from "firebase/firestore";
import { getTotal } from "@/utils/getTotal";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import clsx from "clsx";
import s from "./TotalBalance.module.scss";

interface Props {
  addExpense?: boolean;
}

const TotalBalance = ({ addExpense }: Props) => {
  const [balance, setBalance] = useState<string | null>(null);
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
        setBalance(String(total[0].total));
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
        ₴{" "}
        {isLoading ? (
          <span className={s.loader}></span>
        ) : (
          formatNumberWithCommas(balance)
        )}
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
