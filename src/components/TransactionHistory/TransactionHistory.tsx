"use client";
import { Fragment, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import { formatDate } from "@/utils/formatDate";
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
              {
                <div className={s.infoWrap}>
                  <span className={s.date}>{formatDate(day[0].date)}</span>
                  <div className={s.totalWrap}>
                    {day.some((item) => item.status === "income") && (
                      <span className={s.totalIncome}>
                        +
                        {day.reduce((prev, curr) => {
                          if (curr.status === "income") {
                            prev += Number(curr.amount);
                          }
                          return prev;
                        }, 0)}
                      </span>
                    )}

                    {day.some((item) => item.status === "expense") && (
                      <span className={s.totalExpense}>
                        {day.reduce((prev, curr) => {
                          if (curr.status === "expense") {
                            prev -= Number(curr.amount);
                          }
                          return prev;
                        }, 0)}
                      </span>
                    )}
                  </div>
                </div>
              }
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
