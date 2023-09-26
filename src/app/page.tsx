import Card from "@/components/Card/Card";
import AddExpenseForm from "@/components/AddExpenseForm/AddExpenseForm";
import s from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Card />
      <AddExpenseForm />
    </>
  );
}
