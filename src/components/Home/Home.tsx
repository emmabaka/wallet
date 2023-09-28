import { useContext, useEffect, useState } from "react";
import AddExpenseButton from "../AddExpenseButton/AddExpenseButton";
import AddExpenseForm from "../AddExpenseForm/AddExpenseForm";
import Card from "../Card/Card";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import s from "./Home.module.scss";

const Home = () => {
  const [addExpense, setAddExpense] = useState<boolean>(false);

  return (
    <>
      <Header />
      <main>
        <div className={s.wrap}>
          <Card addExpense={addExpense} />
          <AddExpenseForm addExpense={addExpense} />
        </div>
        <AddExpenseButton
          addExpense={addExpense}
          setAddExpense={setAddExpense}
        />
      </main>
      <Navigation />
    </>
  );
};

export default Home;
