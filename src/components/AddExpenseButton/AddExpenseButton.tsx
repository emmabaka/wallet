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
    <button className={s.button} onClick={handleClick}>
      {addExpense ? <DoneSVG /> : <AddSVG />}
    </button>
  );
};

export default AddExpenseButton;
