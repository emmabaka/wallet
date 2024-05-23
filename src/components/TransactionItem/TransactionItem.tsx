import Image from "next/image";
import { formatDate } from "@/utils/formatDate";
import { formatNumberWithSpaces } from "@/utils/formatNumber";
import clsx from "clsx";
import s from "./TransactionItem.module.scss";
import { expenseCategoriesWithIcons, incomeCategories } from "@/categories";

const TransactionItem = ({
  category,
  date,
  status,
  amount,
  type,
}: {
  category: string;
  date: string;
  status: string;
  amount: string;
  type: string;
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
      <div>
        <p className={s.category}>{category}</p>
        <p className={s.date}>{type || "-"}</p>
      </div>
      <p
        className={clsx(s.amount, {
          [s.expense]: status === "expense",
          [s.income]: status === "income",
        })}
      >
        {status === "expense" ? "-" : "+"} ₴{" "}
        {formatNumberWithSpaces(Number(amount))}
      </p>
    </li>
  );
};

export default TransactionItem;
