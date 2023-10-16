export function formatDate(date: string) {
  const currDate = new Date();
  const servDate = new Date(date);
  console.log(date);

  if (
    servDate.getDate() === currDate.getDate() &&
    servDate.getMonth() === currDate.getMonth() &&
    servDate.getFullYear() === currDate.getFullYear()
  )
    return "Today";

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

  const year = servDate.getFullYear();
  const month = months[servDate.getMonth()];
  const day = servDate.getDate();

  return `${month} ${day}, ${year}`;
}
