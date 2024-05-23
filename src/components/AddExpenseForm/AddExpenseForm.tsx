import { SetStateAction, memo, useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { getTotal } from "@/utils/getTotal";
import { notifyError, notifySuccess } from "@/utils/notify";
import {
  beautyCategories,
  commonCategories,
  educationCategories,
  entertainmentCategories,
  foodCategories,
  forLovedOneCategories,
  healthCategories,
  homeCategories,
  incomeCategories,
  otherCategories,
  restaurantCategories,
  shoppingCategories,
  subscriptionsCategories,
  transportCategories,
  travelCategories,
} from "@/categories";
import { ArrowSVG } from "../svgs/svgs";
import clsx from "clsx";
import s from "./AddExpenseForm.module.scss";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

interface Total {
  id: string;
  total: number;
}
const currDate = new Date().toDateString();
const maxDate = new Date().toISOString().split("T")[0];

const categories = {
  common: commonCategories,
  transport: transportCategories,
  food: foodCategories,
  shopping: shoppingCategories,
  subscriptions: subscriptionsCategories,
  health: healthCategories,
  "for beloved": forLovedOneCategories,
  entertainment: entertainmentCategories,
  beauty: beautyCategories,
  home: homeCategories,
  restaurant: restaurantCategories,
  travel: travelCategories,
  education: educationCategories,
  other: otherCategories,
  income: incomeCategories,
} as { [key: string]: string[] };

const CategoryButton = ({
  handleStatusChange,
  status,
  id,
}: {
  handleStatusChange: (e: {
    target: { value: SetStateAction<string> };
  }) => void;
  status: string;
  id: string;
}) => (
  <div className={s.radioWrap}>
    <input
      className={s.radio}
      id={id}
      type="radio"
      name="status"
      value={id}
      checked={status === id}
      onChange={handleStatusChange}
    />
    <label className={s.radioLabel} htmlFor={id}>
      {capitalizeFirstLetter(id)}
    </label>
  </div>
);

const AddExpenseForm = ({ addExpense }: { addExpense: boolean }) => {
  const [status, setStatus] = useState<string>("common");
  const [date, setDate] = useState<string>(currDate);
  const [category, setCategory] = useState<string>("Coffe & Tea");
  const [amount, setAmount] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const transactionsCollectionHistoryRef = collection(
    db,
    auth.currentUser!.uid
  );

  const transactionsCollectionTotalRef = collection(
    db,
    `total${auth.currentUser!.uid}`
  );

  useEffect(() => {
    setCategory(categories[status][0]);
  }, [status]);

  useEffect(() => {
    if (!addExpense) {
      setDate(currDate);
      setCategory(categories[status][0]);
      setAmount("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addExpense]);

  const updateTotal = async () => {
    try {
      const data = await getTotal(transactionsCollectionTotalRef);

      if (data.length === 0) {
        await addDoc(transactionsCollectionTotalRef, {
          total: status !== "income" ? 0 - Number(amount) : Number(amount),
        });
      } else {
        const totalDoc = doc(db, `total${auth.currentUser!.uid}`, data[0].id);

        await updateDoc(totalDoc, {
          total:
            status !== "income"
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
    setIsDisabled(true);
    const passDate = new Date(date).getTime();

    if (passDate > new Date().getTime()) return;

    try {
      const total = (await updateTotal()) as Total[];

      const transaction = {
        status: status === "income" ? status : "expense",
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
    setCategory(categories[status][0]);
    setAmount("");
    setIsDisabled(false);
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
        {Object.keys(categories).map((item) => (
          <CategoryButton
            key={item}
            handleStatusChange={handleStatusChange}
            status={status}
            id={item}
          />
        ))}
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
          {categories[status].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
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
      <button
        className={s.submit}
        disabled={amount === "" || isDisabled}
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default memo(AddExpenseForm);
