"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import TransactionItem from "../TransactionItem/TransactionItem";
import s from "./TransactionHistory.module.scss";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  id: string;
  status: string;
  total: string;
  createdAt: string;
}

const TransactionHistory = () => {
  const [history, setHistory] = useState<Transaction[]>([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);

        const sortedItemsQuery = query(
          transactionsCollectionRef,
          orderBy("createdAt", "desc")
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
          history.map(({ category, date, status, amount, id }: Transaction) => (
            <TransactionItem
              key={id}
              category={category}
              date={date}
              status={status}
              amount={amount}
            />
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionHistory;
