"use client";
import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { auth, db } from "@/firebase";
import { collection, query, where } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
  id: string;
}

const categories = [
  { category: "Coffe & Tea", amount: 0 },
  { category: "Car", amount: 0 },
  { category: "Home", amount: 0 },
  { category: "Food", amount: 0 },
  { category: "Beauty", amount: 0 },
];

const colors = ["#ffaaa6", "#c6c8ff", "#778e78", "#ffb082", "#694e52"];

const ExpenseChart = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  const data = {
    labels: categories.map((item) => item.category),
    datasets: [
      {
        label: "Amount",
        data: categories.map((item) => item.amount),
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };

  return (
    <div className="box">
      <Doughnut data={data} options={{}}></Doughnut>
    </div>
  );
};

export default ExpenseChart;

// #ffaaa6;
// #c6c8ff;
// #778e78
// #ffb082
