import s from "./StatisticItem.module.scss";

const StatisticItem = ({
  category,
  amount,
}: {
  category: string;
  amount: number;
}) => {
  return (
    <li className={s.item}>
      <div className={s.icon}></div>
      <p className={s.category}>{category}</p>
      <p className={s.amount}>₴ {amount}</p>
    </li>
  );
};

export default StatisticItem;
