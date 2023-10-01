import { SetStateAction, memo, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ArrowSVG } from "../svgs/svgs";
import s from "./AddExpenseForm.module.scss";

const expenseCategories = ["Coffe & Tea", "Car", "Home", "Food", "Beauty"];
const incomeCategories = ["Salary", "Present"];

const AddExpenseForm = ({ addExpense }: { addExpense: boolean }) => {
  const currDate = new Date()
    .toLocaleDateString()
    .split(".")
    .toReversed()
    .join("-");

  const [status, setStatus] = useState<string>("expense");
  const [date, setDate] = useState<string>(currDate);
  const [category, setCategory] = useState<string>("expense");
  const [amount, setAmount] = useState<string>("");

  const transactionsCollectionRef = collection(db, auth.currentUser!.uid);

  useEffect(() => {
    status === "expense"
      ? setCategory(expenseCategories[0])
      : setCategory(incomeCategories[0]);
  }, [status]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const transaction = {
      status,
      date,
      category,
      amount,
      userId: auth.currentUser?.uid,
    };

    try {
      await addDoc(transactionsCollectionRef, transaction);
    } catch (error) {
      console.log(error);
    }

    const newTotal =
      status === "expense"
        ? Number(localStorage.getItem("total")) - Number(amount)
        : Number(localStorage.getItem("total")) + Number(amount);
    localStorage.setItem("total", String(newTotal));

    setDate(currDate);
    setCategory(
      status === "expense" ? expenseCategories[0] : incomeCategories[0]
    );
    setAmount("");
  };

  const handleStatusChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setStatus(e.target.value);
  };

  return (
    <form
      className={addExpense ? `${s.active} ${s.form}` : s.form}
      onSubmit={handleSubmit}
    >
      <div className={s.radioListWrap}>
        <div className={s.radioWrap}>
          <input
            className={s.radio}
            id="expense"
            type="radio"
            name="status"
            value="expense"
            checked={status === "expense"}
            onChange={handleStatusChange}
          />
          <label className={s.radioLabel} htmlFor="expense">
            Expense
          </label>
        </div>
        <div className={s.radioWrap}>
          <input
            className={s.radio}
            id="income"
            type="radio"
            name="status"
            value="income"
            checked={status === "income"}
            onChange={handleStatusChange}
          />
          <label className={s.radioLabel} htmlFor="income">
            Income
          </label>
        </div>
      </div>
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
          {(status === "expense" ? expenseCategories : incomeCategories).map(
            (item) => (
              <option key={item} value={item}>
                {item}
              </option>
            )
          )}
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
      <button className={s.submit} disabled={amount === ""} type="submit">
        Add
      </button>
    </form>
  );
};

export default AddExpenseForm;
