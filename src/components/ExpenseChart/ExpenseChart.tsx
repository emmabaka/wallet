import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

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
interface Categories {
  category: string;
  amount: number;
}
const colors = ["#ffaaa6", "#c6c8ff", "#778e78", "#ffb082", "#694e52"];

const ExpenseChart = ({ categories }: { categories: Categories[] }) => {
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
