export function getDaysBetween(startObj) {
  const startDate = new Date(startObj.start);
  const endDate = new Date(startObj.end);
  const dates = [];

  // Ensure the end date is inclusive by adding 1 day
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate)); // Store a copy of the current date
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }

  return dates.map((date) => date.toISOString().split("T")[0]); // Format date as YYYY-MM-DD
}
