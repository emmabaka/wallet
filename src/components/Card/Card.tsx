import TotalBalance from "../TotalBalance/TotalBalance";
import { MoreSVG } from "../svgs/svgs";
import clsx from "clsx";
import s from "./Card.module.scss";

const Card = ({ addExpense }: { addExpense: boolean }) => {
  return (
    <div className={clsx(s.card, { [s.hidden]: addExpense })}>
      <TotalBalance addExpense={addExpense} />
      <div className={s.more}>
        <MoreSVG />
      </div>
    </div>
  );
};

export default Card;
