"use client";

import clsx from "clsx";
import s from "./Taxes.module.scss";
import { useEffect, useState } from "react";
import { auth, db } from "@/firebase";
import { collection } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import { formatNumberWithSpaces } from "@/utils/formatNumber";
import { ArrowSVG } from "@/components/svgs/svgs";

const getTotalQuarters = (idx: number, allSums: string[], year: number) => {
  switch (idx) {
    case 1:
      return `Q1/Q2: ₴ ${formatNumberWithSpaces(
        Number(allSums[0]) + Number(allSums[1])
      )}`;
    case 2:
      return `Q1/Q2/Q3: ₴ ${formatNumberWithSpaces(
        Number(allSums[0]) + Number(allSums[1]) + Number(allSums[2])
      )}`;
    case 3:
      return `Income for ${year}: ₴ ${formatNumberWithSpaces(
        Number(allSums[0]) +
          Number(allSums[1]) +
          Number(allSums[2]) +
          Number(allSums[3])
      )}`;
    default:
      return "Total: ₴ 0";
  }
};

const Taxes = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([new Date().getFullYear()]);
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
    const user = auth.currentUser;

    const getTaxData = async () => {
      if (user) {
        const transactionsCollectionRef = collection(db, user.uid);
        const data = await getHistory(transactionsCollectionRef);

        if (data) {
          const months = Object.keys(taxData);

          if (years.length === 1) {
            setYears((prev) => {
              const updatedYears = [...prev];
              data.forEach((item) => {
                const year = new Date(item.date).getFullYear();
                if (!updatedYears.includes(year)) {
                  updatedYears.push(year);
                }
              });
              return updatedYears;
            });
          }

          const incomeData = data
            .filter((item) => item.category === "Salary")
            .filter((item) => new Date(item.date).getFullYear() === year)
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
    };

    getTaxData();
  }, [year]);

  const taxQuarters = Object.keys(taxData).reduce(
    (acc: string[][], month, index) => {
      if (index % 3 === 0) {
        acc.push(Object.keys(taxData).slice(index, index + 3));
      }
      return acc;
    },
    []
  );

  const allSums = [] as string[];

  return (
    <div className={clsx(s.taxesPage, "container")}>
      <div className={s.inputWrap}>
        <label className={s.label} htmlFor="category">
          Year
        </label>
        <select
          className={clsx(s.input, s.select)}
          name="category"
          id="category"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        >
          {years.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <div className={s.arrow}>
          <ArrowSVG />
        </div>
      </div>

      <h2 className={s.taxesLabel}>Taxes</h2>
      {taxQuarters.map((quarter, idx) => {
        const quarterSum = quarter
          .reduce((acc, month) => {
            acc += taxData[month];
            return acc;
          }, 0)
          .toFixed(2)
          .replace(".00", "");
        allSums.push(quarterSum);

        const quarterSumMinusFivePercent = (Number(quarterSum) * 0.05)
          .toFixed(2)
          .replace(".00", "");

        return (
          <div className={s.quarterWrapper} key={quarter[0]}>
            {quarter.map((month) => (
              <div className={s.taxMonth} key={month}>
                <h2>{month}</h2>
                <p>₴ {formatNumberWithSpaces(taxData[month])}</p>
              </div>
            ))}
            <p className={s.quarterSum}>
              Total: ₴ {formatNumberWithSpaces(Number(quarterSum))}
              <span>
                5% - ₴{" "}
                {formatNumberWithSpaces(Number(quarterSumMinusFivePercent))}
              </span>
            </p>

            {idx !== 0 && (
              <p className={s.quartersSum}>
                {getTotalQuarters(idx, allSums, year)}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Taxes;
