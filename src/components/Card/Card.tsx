import TotalBalance from "../TotalBalance/TotalBalance";
import { MoreSVG } from "../svgs/svgs";
import s from "./Card.module.scss";

const Card = ({ addExpense }: { addExpense: boolean }) => {
  return (
    <div className={addExpense ? `${s.hidden} ${s.card}` : s.card}>
      <TotalBalance addExpense={addExpense} />
      <div className={s.more}>
        <MoreSVG />
      </div>
    </div>
  );
};

export default Card;
