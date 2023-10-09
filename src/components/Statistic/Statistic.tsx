import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import StatisticList from "../StatisticList/StatisticList";
interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
  id: string;
}

const Statistic = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const categories = [
    { category: "Coffe & Tea", amount: 0 },
    { category: "Car", amount: 0 },
    { category: "Home", amount: 0 },
    { category: "Food", amount: 0 },
    { category: "Beauty", amount: 0 },
    { category: "Entertainment", amount: 0 },
    { category: "Travel", amount: 0 },
    { category: "Education", amount: 0 },
    { category: "Restaurant", amount: 0 },
    { category: "Subscriptions", amount: 0 },
  ];

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const transactionsCollectionRef = collection(db, user.uid);

          const sortedItemsQuery = query(
            transactionsCollectionRef,
            where("status", "==", "expense")
          );

          const data = (await getHistory(sortedItemsQuery)) as Transaction[];

          setTransactions(data);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }, []);

  for (let index = 0; index < categories.length; index++) {
    transactions.map((item) => {
      if (categories[index].category === item.category) {
        const obj = categories[index];
        obj["amount"] += Number(item.amount);
      }
    });
  }

  return (
    <div className="container">
      <ExpenseChart categories={categories} />
      <StatisticList categories={categories} />
    </div>
  );
};

export default Statistic;
