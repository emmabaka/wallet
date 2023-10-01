"use client";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { getDocs, collection } from "firebase/firestore";
import TransactionItem from "../TransactionItem/TransactionItem";
import s from "./TransactionHistory.module.scss";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  id: string;
  status: string;
}

const TransactionHistory = () => {
  const [history, setHistory] = useState<Transaction[]>([]);

  // const transactionsCollectionRef = collection(db, auth.currentUser!.uid);
  console.log(auth.currentUser?.uid);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);
        const getHistory = async () => {
          try {
            const data = await getDocs(transactionsCollectionRef);
            const filteredData = data.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            })) as Transaction[];
            console.log(filteredData);
            setHistory(filteredData);
          } catch (error) {
            console.log(error);
          }
        };

        getHistory();
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
