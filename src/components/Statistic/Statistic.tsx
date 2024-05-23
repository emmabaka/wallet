import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import ExpenseChart from "../ExpenseChart/ExpenseChart";
import StatisticList from "../StatisticList/StatisticList";
import { combinedExpenseCategories } from "@/categories";
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

  const categories = combinedExpenseCategories.map((el) => ({
    category: el,
    amount: 0,
  }));

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
