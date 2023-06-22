//2023-06-22T09:35:46.078Z

export function dateFormatConvert(date) {
  const yearMonthDay = date.split("T")[0];

  const time =
    date.split("T")[1].split(":")[0] + ":" + date.split("T")[1].split(":")[1];

  return `${yearMonthDay} ${time}`;
}
