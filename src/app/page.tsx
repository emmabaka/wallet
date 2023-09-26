'use client'
import { useState } from "react";
import Card from "@/components/Card/Card";
import AddExpenseForm from "@/components/AddExpenseForm/AddExpenseForm";
import AddExpenseButton from "@/components/AddExpenseButton/AddExpenseButton";
import s from "./page.module.scss";

export default function Home() {
  const [addExpense, setAddExpense] = useState<boolean>(false)

  return (
    <>
      <div className={s.wrap}>
        <Card addExpense={addExpense} />
        <AddExpenseForm addExpense={addExpense} />
      </div>
      <AddExpenseButton addExpense={addExpense} setAddExpense={setAddExpense} />
    </>
  );
}
