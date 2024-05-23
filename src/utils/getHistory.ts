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
                .filter((el) => el.date === transaction.date)
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

      console.log(dateArray);

      dateArray.sort((a, b) => Number(b[0]) - Number(a[0]));

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
