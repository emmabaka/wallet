"use client";
import { useState } from "react";
import TransactionItem from "../TransactionItem/TransactionItem";
import s from "./TransactionHistory.module.scss";

const TransactionHistory = () => {
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history") || "[]")
  );

  return (
    <div className={s.historyContainer}>
      <h2 className={s.title}>History</h2>
      <ul className={s.list}>
        {history.length === 0 ? (
          <p>No transactions yet</p>
        ) : (
          history.map(
            ({
              category,
              date,
              status,
              amount,
              id,
            }: {
              category: string;
              date: string;
              status: string;
              amount: string;
              id: string;
            }) => (
              <TransactionItem
                key={id}
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
