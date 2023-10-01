import { useState } from "react";
import AddExpenseButton from "../AddExpenseButton/AddExpenseButton";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import Card from "../Card/Card";
import s from "./Home.module.scss";

const Home = () => {
  const [addExpense, setAddExpense] = useState<boolean>(false);

  return (
    <>
      <div className={s.wrap}>
        <Card addExpense={addExpense} />
        <AddExpenseForm addExpense={addExpense} />
      </div>
      <AddExpenseButton addExpense={addExpense} setAddExpense={setAddExpense} />
    </>
  );
};

export default Home;
