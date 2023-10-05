import { useState } from "react";
import AddExpenseButton from "../AddExpenseButton/AddExpenseButton";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import Card from "../Card/Card";
import s from "./Home.module.scss";

const Home = () => {
  const [addExpense, setAddExpense] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(0);

  return (
    <>
      <div className={s.wrap}>
        <Card
        
          addExpense={addExpense}
          balance={balance}
          setBalance={setBalance}
        />
        <AddExpenseForm addExpense={addExpense} />
      </div>
      <AddExpenseButton addExpense={addExpense} setAddExpense={setAddExpense} />
    </>
  );
};

export default Home;
