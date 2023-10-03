import { DocumentData, Query, getDocs } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
}

export const getHistory = async (
  sortedItemsQuery: Query<DocumentData, DocumentData>,
  setState?: Dispatch<SetStateAction<Transaction[]>>
) => {
  try {
    const data = await getDocs(sortedItemsQuery);

    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
    })) as Transaction[];
    console.log(filteredData);

    if (setState) {
      setState(filteredData);
    } else {
      return filteredData[0]?.total ?? String(0);
    }
  } catch (error) {
    console.log(error);
  }
};
