"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { auth, db } from "@/firebase";
import { getAuth, signOut } from "firebase/auth";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getHistory } from "@/utils/getHistory";
import { getTotal } from "@/utils/getTotal";
import { notifyError, notifySuccess } from "@/utils/notify";
import clsx from "clsx";
import s from "./Settings.module.scss";

interface Transaction {
  amount: string;
  category: string;
  date: string;
  createdAt: string;
  status: string;
  total: string;
  id: string;
}

const Settings = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [clear, setClear] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      notifyError();
      console.log(error);
    }
  };
  // console.log(auth);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      }
    });
  }, []);

  const deleteDocs = async () => {
    try {
      setLoading(true);
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          const transactionsCollectionRef = collection(db, user.uid);
          const transactionsCollectionTotalRef = collection(
            db,
            `total${user.uid}`
          );

          const history = (await getHistory(
            transactionsCollectionRef
          )) as Transaction[];

          history
            .map((item) => item.id)
            .forEach(async (item: string) => {
              await deleteDoc(doc(db, user.uid, item));
            });

          const data = await getTotal(transactionsCollectionTotalRef);
          const totalDoc = doc(db, `total${auth.currentUser!.uid}`, data[0].id);
          await updateDoc(totalDoc, {
            total: 0,
          });
        }
      });

      setTimeout(() => {
        setLoading(false);
        notifySuccess("Removed all the data.");
      }, 1000);
    } catch (error) {
      notifyError();
      setLoading(false);

      console.log(error);
    }
  };

  const handleGotToTaxes = () => {
    router.push("/taxes");
  };

  return (
    <div className={clsx("box", s.settingsWrap)}>
      <div className={s.profileWrap}>
        <Image
          className={s.avatar}
          src={
            auth.currentUser?.photoURL
              ? auth.currentUser?.photoURL
              : "/images/default-user-avatar.png"
          }
          alt="Avatar"
          width={75}
          height={75}
        />
        <div className={s.emailWrap}>
          <p className={s.email}>{userEmail}</p>
          <button className={s.logOut} type="button" onClick={handleLogOut}>
            Log out
            <Image src="/svgs/logout.svg" alt="Icon" width={20} height={20} />
          </button>
        </div>
      </div>
      <div className={s.clearDataWrap}>
        <p className={s.label}>Clear all data (confirm to clear)</p>
        {!clear && !loading ? (
          <button
            className={clsx(s.clearButton, s.clear)}
            onClick={() => setClear(true)}
          >
            Clear
          </button>
        ) : (
          <button
            className={clsx(s.clearButton, s.confirm)}
            disabled={loading}
            onClick={() => {
              deleteDocs();
              setClear(false);
            }}
          >
            Confirm {loading && <span className={s.loader}></span>}
          </button>
        )}
      </div>

      <button className={s.goToTaxes} onClick={handleGotToTaxes}>
        Go to taxes
      </button>
    </div>
  );
};

export default Settings;
