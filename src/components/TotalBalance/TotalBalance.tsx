"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import {
  CollectionReference,
  DocumentData,
  collection,
  getDocs,
} from "firebase/firestore";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { totalTransactionsAmount } from "@/utils/totalBalance";
import clsx from "clsx";
import s from "./TotalBalance.module.scss";

interface Props {
  addExpense?: boolean;
}
interface Transaction {
  amount: string;
  status: string;
}

const TotalBalance = ({ addExpense }: Props) => {
  const [balance, setBalance] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isHomePage = addExpense !== undefined;
  const dependency = isHomePage ? addExpense : null;

  const getTotal = async (
    transactionsCollectionRef: CollectionReference<DocumentData, DocumentData>
  ) => {
    try {
      const data = await getDocs(transactionsCollectionRef);

      const filteredData = data.docs.map((doc) => ({
        amount: doc.data().amount,
        status: doc.data().status,
      })) as Transaction[];

      const total =
        totalTransactionsAmount(filteredData, "income") -
        totalTransactionsAmount(filteredData, "expense");

      setBalance(String(total));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && !addExpense) {
        const transactionsCollectionRef = collection(db, user.uid);
        setIsLoading(true);
        getTotal(transactionsCollectionRef);
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
