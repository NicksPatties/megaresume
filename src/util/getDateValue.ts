/**
 * Gets a value used for a "month" input field from a given date
 */
export function getDateValue(d: Date = new Date()): string {
  const currMonth = d.getMonth() + 1;
  let currMonthString = '';
  if (currMonth < 10) {
    currMonthString = `0${currMonth}`;
  } else {
    currMonthString = currMonth + '';
  }
  return `${d.getFullYear()}-${currMonthString}`;
}
