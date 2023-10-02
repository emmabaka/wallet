interface Transaction {
  amount: string;
  status: string;
}

export const totalTransactionsAmount = (
  array: Transaction[],
  status: string
) => {
  return array
    .filter(
      (item: { status: string; amount: string }) => item.status === status
    )
    .reduce((total: number, curr: { amount: string }) => {
      return total + Number(curr.amount);
    }, 0);
};
