import { SetStateAction, memo, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getTotal } from "@/utils/getTotal";
import { notifyError, notifySuccess } from "@/utils/notify";
import { expenseCategories, incomeCategories } from "@/categories";
import { ArrowSVG } from "../svgs/svgs";
import clsx from "clsx";
import s from "./AddExpenseForm.module.scss";

interface Total {
  id: string;
  total: number;
}
const currDate = new Date().toDateString();
const maxDate = new Date().toISOString().split("T")[0];

const AddExpenseForm = ({ addExpense }: { addExpense: boolean }) => {
  const [status, setStatus] = useState<string>("expense");
  const [date, setDate] = useState<string>(currDate);
  const [category, setCategory] = useState<string>("expense");
  const [amount, setAmount] = useState<string>("");

  const transactionsCollectionHistoryRef = collection(
    db,
    auth.currentUser!.uid
  );

  const transactionsCollectionTotalRef = collection(
    db,
    `total${auth.currentUser!.uid}`
  );

  useEffect(() => {
    status === "expense"
      ? setCategory(expenseCategories[0])
      : setCategory(incomeCategories[0]);
  }, [status]);

  useEffect(() => {
    if (!addExpense) {
      setDate(currDate);
      setCategory(
        status === "expense" ? expenseCategories[0] : incomeCategories[0]
      );
      setAmount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addExpense]);

  const updateTotal = async () => {
    try {
      const data = await getTotal(transactionsCollectionTotalRef);

      if (data.length === 0) {
        await addDoc(transactionsCollectionTotalRef, {
          total: status === "expense" ? 0 - Number(amount) : 0 + Number(amount),
        });
      } else {
        const totalDoc = doc(db, `total${auth.currentUser!.uid}`, data[0].id);

        await updateDoc(totalDoc, {
          total:
            status === "expense"
              ? data[0].total - Number(amount)
              : data[0].total + Number(amount),
        });
      }
      return await getTotal(transactionsCollectionTotalRef);
    } catch (error) {
      notifyError();
      console.log(error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const passDate = new Date(date).getTime();

    if (passDate > new Date().getTime()) return;

    try {
      const total = (await updateTotal()) as Total[];

      const transaction = {
        status,
        date: passDate,
        category,
        amount,
        createdAt: Date.now(),
        total: total[0].total,
      };

      await addDoc(transactionsCollectionHistoryRef, transaction);
      notifySuccess("Added a new transaction.");
    } catch (error) {
      notifyError();
      console.log(error);
    }

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
      className={clsx(s.form, "box", { [s.active]: addExpense })}
      onSubmit={handleSubmit}
    >
      <div className={s.radioListWrap}>
        <div className={s.radioListContainer}>
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
              id="transport"
              type="radio"
              name="status"
              value="transport"
              checked={status === "transport"}
              onChange={handleStatusChange}
            />
            <label className={s.radioLabel} htmlFor="transport">
              Transport
            </label>
          </div>
          <div className={s.radioWrap}>
            <input
              className={s.radio}
              id="food"
              type="radio"
              name="status"
              value="food"
              checked={status === "food"}
              onChange={handleStatusChange}
            />
            <label className={s.radioLabel} htmlFor="food">
              Food
            </label>
          </div>
          <div className={s.radioWrap}>
            <input
              className={s.radio}
              id="health"
              type="radio"
              name="status"
              value="health"
              checked={status === "health"}
              onChange={handleStatusChange}
            />
            <label className={s.radioLabel} htmlFor="health">
              Health
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
      </div>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="category">
          Category
        </label>
        <select
          className={clsx(s.input, s.select)}
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
          className={clsx(s.input, s.amount)}
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <span className={s.dollar}>₴</span>
      </div>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="date">
          Date
        </label>
        <input
          className={clsx(s.input, s.date)}
          type="date"
          name="date"
          id="date"
          value={date}
          max={maxDate}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className={s.selectedDate}>
          {new Date(date).toString().slice(0, 16)}
        </div>
      </div>
      <button className={s.submit} disabled={amount === ""} type="submit">
        Add
      </button>
    </form>
  );
};

export default memo(AddExpenseForm);
