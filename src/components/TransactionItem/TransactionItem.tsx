import { formatDate } from "@/utils/formatDate";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import s from "./TransactionItem.module.scss";

const TransactionItem = ({
  category,
  date,
  status,
  amount,
}: {
  category: string;
  date: string;
  status: string;
  amount: string;
}) => {
  return (
    <li className={s.item}>
      <div className={s.icon}></div>
      <div>
        <p className={s.category}>{category}</p>
        <p className={s.date}>{formatDate(date)}</p>
      </div>
      <p
        className={`${s.amount} ${status === "expense" ? s.expense : s.income}`}
      >
        {status === "expense" ? "-" : "+"} ₴ {formatNumberWithCommas(amount)}
      </p>
    </li>
  );
};

export default TransactionItem;
