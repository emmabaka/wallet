import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);
interface Categories {
  category: string;
  amount: number;
}

const colors = [
  "#ffaaa6",
  "#c6c8ff",
  "#778e78",
  "#ffb082",
  "#694e52",
  "#67a0f8",
  "#6c5797",
  "#bababa",
  "#198754",
  "#fcd975",
];

const ExpenseChart = ({ categories }: { categories: Categories[] }) => {
  const filteredCategories =
    categories.filter((item) => item.amount > 0).length === 0
      ? [{ category: "No transactions yet", amount: 0 }]
      : categories.filter((item) => item.amount > 0);

  const data = {
    labels: filteredCategories.map((item) => item.category),
    datasets: [
      {
        label: "Amount",
        data: filteredCategories.map((item) => item.amount),
        backgroundColor: colors,
        borderColor: colors,
      },
    ],
  };

  const backgroundCircle = {
    id: "backgroundCircle",
    beforeDatasetsDraw(chart: { getDatasetMeta?: any; ctx?: any }) {
      const { ctx } = chart;
      ctx.save();
      const xCoor = chart.getDatasetMeta(0).data[0]?.x;
      const yCoor = chart.getDatasetMeta(0).data[0]?.y;
      const innerRadius = chart.getDatasetMeta(0).data[0]?.innerRadius;
      const outerRadius = chart.getDatasetMeta(0).data[0]?.outerRadius;
      const width = outerRadius - innerRadius;
      const angle = Math.PI / 180;
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.strokeStyle = "grey";
      ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false);
      ctx.stroke();
    },
  };

  return (
    <div className="box">
      <Doughnut
        data={data}
        options={{
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 10,
                boxHeight: 10,
                font: {
                  size: 10,
                },
              },
            },
          },
        }}
        plugins={[backgroundCircle]}
      ></Doughnut>
    </div>
  );
};

export default ExpenseChart;
