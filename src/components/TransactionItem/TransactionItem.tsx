import Image from "next/image";
import { formatNumberWithSpaces } from "@/utils/formatNumber";
import clsx from "clsx";
import s from "./TransactionItem.module.scss";
import { expenseCategoriesWithIcons } from "@/categories";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { notifySuccess } from "@/utils/notify";
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import { getHistory } from "@/utils/getHistory";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  id: string;
  status: string;
  total: string;
  createdAt: string;
  type: string;
}

const TransactionItem = ({
  category,
  status,
  amount,
  type,
  setHistory,
  id,
}: {
  category: string;
  status: string;
  amount: string;
  type: string;
  id: string;
  setHistory: Dispatch<SetStateAction<{ [p: string]: Transaction[] }>>;
}) => {
  const [showDelete, setShowDelete] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const transactionsCollectionHistoryRef = collection(
    db,
    auth.currentUser!.uid
  );

  const deleteTransaction = async () => {
    const transactionDocRef = doc(transactionsCollectionHistoryRef, id);
    await deleteDoc(transactionDocRef);
    handleDelete();

    await getHistory(transactionsCollectionHistoryRef, setHistory);

    notifySuccess("Transaction deleted successfully");
  };

  const handleDelete = () => {
    setIsConfirmed(false);
    setShowDelete((prev) => !prev);
  };

  const confirmDelete = (e: SyntheticEvent) => {
    e.stopPropagation();

    if (isConfirmed) {
      deleteTransaction();
      return;
    }

    setIsConfirmed(true);
  };

  return (
    <li
      className={clsx(s.item, { [s.moved]: showDelete })}
      onClick={handleDelete}
    >
      <button
        className={clsx(s.delete, { [s.confirm]: isConfirmed })}
        onClick={confirmDelete}
      >
        <Image
          src={isConfirmed ? "/svgs/confirm.svg" : "/svgs/delete.svg"}
          alt="delete"
          width={32}
          height={32}
        ></Image>
      </button>
      <div className={s.icon}>
        <Image
          src={
            expenseCategoriesWithIcons.includes(category)
              ? `/svgs/${category}.svg`
              : "/svgs/Other expenses.svg"
          }
          alt={category}
          width={30}
          height={30}
        ></Image>
      </div>
      <div>
        <p className={s.category}>{category}</p>
        <p className={s.date}>{type || "-"}</p>
      </div>
      <p
        className={clsx(s.amount, {
          [s.expense]: status === "expense",
          [s.income]: status === "income",
        })}
      >
        {status === "expense" ? "-" : "+"} ₴{" "}
        {formatNumberWithSpaces(Number(amount))}
      </p>
    </li>
  );
};

export default TransactionItem;
