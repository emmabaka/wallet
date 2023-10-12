"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import { getTotal } from "@/utils/getTotal";
import { notifyError, notifySuccess } from "@/utils/notify";
import clsx from "clsx";
import s from "./UpdateTotalCard.module.scss";

interface Props {
  update: boolean;
  setBalance: Dispatch<SetStateAction<number>>;
  setUpdate: Dispatch<SetStateAction<boolean>>;
}

const UpdateTotalCard = ({ update, setBalance, setUpdate }: Props) => {
  const [newTotal, setNewTotal] = useState("");

  const transactionsCollectionTotalRef = collection(
    db,
    `total${auth.currentUser!.uid}`
  );

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const data = await getTotal(transactionsCollectionTotalRef);
      const totalDoc = doc(db, `total${auth.currentUser!.uid}`, data[0].id);
      await updateDoc(totalDoc, {
        total: Number(newTotal),
      });
      setBalance(Number(newTotal));
      setUpdate(false);
      setNewTotal("");
      notifySuccess("Updated total balance.");
    } catch (error) {
      notifyError();
      console.log(error);
    }
  };

  return (
    <form
      className={clsx(s.form, { [s.active]: update })}
      onSubmit={handleSubmit}
    >
      <input
        className={s.input}
        type="number"
        name="newTotal"
        id="newTotal"
        placeholder="Enter new total balance..."
        value={newTotal}
        onChange={(e) => setNewTotal(e.target.value)}
      />
      <span className={s.dollar}>₴</span>
      <button className={s.submit} type="submit">
        Update
      </button>
    </form>
  );
};

export default UpdateTotalCard;
