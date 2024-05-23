import { DocumentData, Query, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { formatDate } from "@/utils/formatDate";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
  id: string;
  type: string;
}

export const getHistory = async (
  sortedItemsQuery: Query<DocumentData, DocumentData>,
  setState?: Dispatch<SetStateAction<{ [key: string]: Transaction[] }>>
) => {
  try {
    const data = await getDocs(sortedItemsQuery);

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Transaction[];

    if (setState) {
      const dateArray = Object.entries(
        filteredData.reduce(
          (result, transaction) => ({
            ...result,
            [formatDate(transaction.date)]: [
              ...filteredData
                .filter(
                  (el) => formatDate(el.date) === formatDate(transaction.date)
                )
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                ),
            ],
          }),
          {}
        )
      );

      dateArray.sort((a, b) => {
        const compareFirst =
          a[0] === "Today" ? new Date().getTime() : new Date(a[0]).getTime();
        const compareSecond =
          b[0] === "Today" ? new Date().getTime() : new Date(b[0]).getTime();

        return Number(compareSecond) - Number(compareFirst);
      });

      const sortedDateObjectDesc = Object.fromEntries(dateArray) as {
        [key: string]: Transaction[];
      };

      setState(sortedDateObjectDesc);
    } else {
      return filteredData;
    }
  } catch (error) {
    console.log(error);
  }
};
