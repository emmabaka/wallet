import Card from "@/components/Card/Card";
import s from "./page.module.scss";
import AddExpenseForm from "@/components/AddExpenseForm/AddExpenseForm";

export default function Home() {
  return (
    <>
      <Card />
      <AddExpenseForm />
    </>
  );
}
