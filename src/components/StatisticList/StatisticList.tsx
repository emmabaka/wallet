import StatisticItem from "../StatisticItem/StatisticItem";
import s from "./StatisticList.module.scss";

interface Categories {
  category: string;
  amount: number;
}

const StatisticList = ({ categories }: { categories: Categories[] }) => {
  const filteredCategories = categories.filter((item) => item.amount > 0);
  return (
    <ul className={s.list}>
      {filteredCategories.map(({ category, amount }) => (
        <StatisticItem key={category} category={category} amount={amount} />
      ))}
    </ul>
  );
};

export default StatisticList;
