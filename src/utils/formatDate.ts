export function formatDate(date: string) {
  const currDate = new Date()
    .toLocaleDateString()
    .split(".")
    .toReversed()
    .join("-");

  if (date === currDate) return "Today";

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateParts = date.split("-");

  const year = dateParts[0];
  const month = months[parseInt(dateParts[1], 10) - 1];
  const day = dateParts[2];

  return `${month} ${day}, ${year}`;
}
