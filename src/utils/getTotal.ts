import { CollectionReference, DocumentData, getDocs } from "firebase/firestore";

interface Total {
  id: string;
  total: number;
}

export   const getTotal = async (
  ref: CollectionReference<DocumentData, DocumentData>
) => {
  const data = await getDocs(ref);

  const filteredData = data.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Total[];
  return filteredData;
};