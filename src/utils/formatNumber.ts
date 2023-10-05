export function formatNumberWithCommas(number: number | null) {
  if (!number && number !== 0) {
    return;
  }

  const parts = String(number).split(",");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(",");
}
