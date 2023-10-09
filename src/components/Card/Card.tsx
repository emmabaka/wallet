"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TotalBalance from "../TotalBalance/TotalBalance";
import UpdateTotalCard from "../UpdateTotalCard/UpdateTotalCard";
import { UpdateSVG, CancelSVG } from "../svgs/svgs";
import clsx from "clsx";
import s from "./Card.module.scss";
interface Props {
  addExpense: boolean;
  balance: number;
  setBalance: Dispatch<SetStateAction<number>>;
}

const Card = ({ addExpense, balance, setBalance }: Props) => {
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    if (addExpense) setUpdate(false);
  }, [addExpense]);

  return (
    <div className={clsx(s.wrap, { [s.hidden]: addExpense })}>
      <div className={s.card}>
        <TotalBalance
          addExpense={addExpense}
          balance={balance}
          setBalance={setBalance}
        />
        <div
          className={s.more}
          onClick={() => {
            setUpdate(!update);
          }}
        >
          {update ? <CancelSVG /> : <UpdateSVG />}
        </div>
      </div>
      <UpdateTotalCard
        update={update}
        setUpdate={setUpdate}
        setBalance={setBalance}
      />
    </div>
  );
};

export default Card;
