import Image from "next/image";
import s from "./StatisticItem.module.scss";
import { expenseCategoriesWithIcons } from "@/categories";

const StatisticItem = ({
  category,
  amount,
}: {
  category: string;
  amount: number;
}) => {
  return (
    <li className={s.item}>
      <div className={s.icon}>
        <Image
          src={
            expenseCategoriesWithIcons.includes(category)
              ? `/svgs/${category}.svg`
              : "/svgs/Other expenses.svg"
          }
          alt={category}
          width={30}
          height={30}
        ></Image>
      </div>
      <p className={s.category}>{category}</p>
      <p className={s.amount}>₴ {amount}</p>
    </li>
  );
};

export default StatisticItem;
