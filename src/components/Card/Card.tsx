import { formatNumberWithCommas } from "@/utils/formatNumber";
import { MoreSVG } from "../svgs/svgs";
import s from "./Card.module.scss";

const Card = ({ addExpense }: { addExpense: boolean }) => {
  const balance = localStorage.getItem("total") || "0";

  return (
    <div className={addExpense ? `${s.hidden} ${s.card}` : s.card}>
      <p className={s.title}>Total Balance</p>
      <p className={s.balance}>₴ {formatNumberWithCommas(balance)}</p>
      <p className={s.balance}>$ 2,548.00</p>
      <div className={s.more}>
        <MoreSVG />
      </div>
    </div>
  );
};

export default Card;
