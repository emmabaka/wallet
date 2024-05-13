"use client";

import clsx from "clsx";
import s from "./Taxes.module.scss";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";

const Taxes = () => {
  const [taxData, setTaxData] = useState<{ [key: string]: number }>({
    January: 0,
    February: 0,
    March: 0,
    April: 0,
    May: 0,
    June: 0,
    July: 0,
    August: 0,
    September: 0,
    October: 0,
    November: 0,
    December: 0,
  });

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);
        const data = await getHistory(transactionsCollectionRef);

        if (data) {
          const months = Object.keys(taxData);

          const incomeData = data
            .filter((item) => item.status === "income")
            .map((item) => ({
              amount: item.amount,
              month: months[new Date(item.date).getMonth()],
            }));

          setTaxData((prev) => {
            const updatedData = { ...prev };

            incomeData.forEach((item) => {
              updatedData[item.month] = Number(item.amount);
            });

            return updatedData;
          });
        }
      }
    });
  }, []);

  const taxQuarters = Object.keys(taxData).reduce(
    (acc: string[][], month, index) => {
      if (index % 3 === 0) {
        acc.push(Object.keys(taxData).slice(index, index + 3));
      }
      return acc;
    },
    []
  );

  return (
    <div className={clsx(s.taxesPage, "container")}>
      {taxQuarters.map((quarter, idx) => {
        const quarterSum = quarter
          .reduce((acc, month) => {
            acc += taxData[month];
            return acc;
          }, 0)
          .toFixed(2)
          .replace(".00", "");

        const quarterSumMinusFivePercent = (Number(quarterSum) * 0.05)
          .toFixed(2)
          .replace(".00", "");

        return (
          <div className={s.quarterWrapper} key={idx}>
            {quarter.map((month) => (
              <div className={s.taxMonth} key={idx}>
                <h2>{month}</h2>
                <p>₴ {taxData[month]}</p>
              </div>
            ))}
            <p className={s.quarterSum}>
              Total: ₴ {quarterSum}
              <span>5% - ₴ {quarterSumMinusFivePercent}</span>
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default Taxes;
