export async function getCurrency() {
  const cacheKey = "currencyData";
  const cacheTimeKey = "currencyDataTime";
  const cacheTime = 1000 * 60 * 60 * 2;
  const cachedData = localStorage.getItem(cacheKey);
  const lastFetchTime = localStorage.getItem(cacheTimeKey);

  if (
    cachedData &&
    lastFetchTime &&
    Date.now() - Number(lastFetchTime) < cacheTime
  ) {
    return JSON.parse(cachedData);
  }

  try {
    const res = await fetch("https://api.monobank.ua/bank/currency", {
      headers: { Token: "uH7inyssAsEeYFfPW5tXs5vnSvtCvq_X1hP1twW4kYhY" },
    });
    const data = await res.json();
    const filteredData = data.filter(
      (item: { currencyCodeA: number; currencyCodeB: number }) =>
        item.currencyCodeA === 840 && item.currencyCodeB === 980
    )[0];

    localStorage.setItem(cacheKey, JSON.stringify(filteredData));
    localStorage.setItem(cacheTimeKey, Date.now().toString());

    return filteredData;
  } catch (error) {
    console.log(error);
    return cachedData ? JSON.parse(cachedData) : null;
  }
}
