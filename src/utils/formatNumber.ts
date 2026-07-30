export function formatNumberWithSpaces(number: number | null) {
  if (!number && number !== 0) {
    return;
  }

  const parts = number.toFixed(2).split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
}
