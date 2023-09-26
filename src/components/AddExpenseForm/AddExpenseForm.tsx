"use client";
import { ArrowSVG } from "../svgs/svgs";
import s from "./AddExpenseForm.module.scss";
import { useState } from "react";

const AddExpenseForm = ({ addExpense }: { addExpense: boolean }) => {
  const currDate = new Date()
    .toLocaleDateString()
    .split(".")
    .toReversed()
    .join("-");

  const [date, setDate] = useState(currDate);
  const [category, setCategory] = useState("Coffe & Tea");
  const [amount, setAmount] = useState("");

  return (
    <form className={addExpense ? `${s.active} ${s.form}` : s.form}>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="category">
          Category
        </label>
        <select
          className={`${s.input} ${s.select}`}
          name="category"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Coffe & Tea">Coffe & Tea</option>
          <option value="Car">Car</option>
        </select>
        <div className={s.arrow}>
          <ArrowSVG />
        </div>
      </div>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="amount">
          Amount
        </label>
        <input
          className={`${s.input} ${s.amount}`}
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span className={s.dollar}>$</span>
      </div>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="date">
          Date
        </label>
        <input
          className={`${s.input} ${s.date}`}
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className={s.selectedDate}>
          {new Date(date).toUTCString().slice(0, 16)}
        </div>
      </div>
    </form>
  );
};

export default AddExpenseForm;
