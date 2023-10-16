"use client";
import { Fragment, useEffect, useState } from "react";
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
  const [history, setHistory] = useState<{ [key: string]: Transaction[] }>({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);
        getHistory(transactionsCollectionRef, setHistory);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.historyContainer}>
      <h2 className={s.title}>History</h2>
      <ul className={s.list}>
        {Object.keys(history).length === 0 ? (
          <p className={s.emptyHistory}>No transactions yet</p>
        ) : (
          Object.values(history).map((day: Transaction[], idx) => (
            <Fragment key={idx}>
              {idx > 0 && <div className={s.line} />}
              {day.map(
                ({ category, date, status, amount, id }: Transaction) => (
                  <TransactionItem
                    key={id}
                    category={category}
                    date={date}
                    status={status}
                    amount={amount}
                  />
                )
              )}
            </Fragment>
          ))
        )}
      </ul>
    </div>
  );
};

export default TransactionHistory;
