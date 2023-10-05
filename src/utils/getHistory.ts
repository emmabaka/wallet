import { DocumentData, Query, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

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
  setState?: Dispatch<SetStateAction<Transaction[]>>
) => {
  try {
    const data = await getDocs(sortedItemsQuery);

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Transaction[];

    if (setState) {
      const sort = filteredData.toSorted((a, b) => {
        const curr = a.date.replaceAll("-", "") + a.createdAt;
        const next = b.date.replaceAll("-", "") + b.createdAt;
        return Number(next) - Number(curr);
      });
      setState(sort);
    } else {
      return filteredData[0]?.total ?? String(0);
    }
  } catch (error) {
    console.log(error);
  }
};
