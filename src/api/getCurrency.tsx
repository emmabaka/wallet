export async function getCurrency() {
  try {
    const res = await fetch("https://api.monobank.ua/bank/currency", {
      headers: { Token: "uH7inyssAsEeYFfPW5tXs5vnSvtCvq_X1hP1twW4kYhY" },
    });
    const data = await res.json();
    return data.filter(
      (item: { currencyCodeA: number; currencyCodeB: number }) =>
        item.currencyCodeA === 840 && item.currencyCodeB === 980
      // ||(item.currencyCodeA === 978 && item.currencyCodeB === 980)
    );
  } catch (error) {
    console.log(error);
  }
}
