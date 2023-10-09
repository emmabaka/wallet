import clsx from "clsx";
import { AddSVG, DoneSVG } from "../svgs/svgs";
import s from "./AddExpenseButton.module.scss";

const AddExpenseButton = ({
  addExpense,
  setAddExpense,
}: {
  addExpense: boolean;
  setAddExpense: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClick = () => {
    addExpense ? setAddExpense(false) : setAddExpense(true);
  };

  return (
    <button
      className={clsx(s.button, { [s.addExpense]: addExpense })}
      onClick={handleClick}
    >
      {addExpense ? <DoneSVG /> : <AddSVG />}
    </button>
  );
};

export default AddExpenseButton;
