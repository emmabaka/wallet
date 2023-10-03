"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { getHistory } from "@/utils/get";
import TransactionItem from "../TransactionItem/TransactionItem";
import s from "./TransactionHistory.module.scss";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
}

const TransactionHistory = () => {
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);

        const sortedItemsQuery = query(
          transactionsCollectionRef,
          orderBy("date", "desc")
        );

        getHistory(sortedItemsQuery, setHistory);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.historyContainer}>
      <h2 className={s.title}>History</h2>
      <ul className={s.list}>
        {history.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          history.map(
            ({ category, date, status, amount, createdAt }: Transaction) => (
              <TransactionItem
                key={createdAt}
                category={category}
                date={date}
                status={status}
                amount={amount}
              />
            )
          )
        )}
      </ul>
    </div>
  );
};

export default TransactionHistory;
