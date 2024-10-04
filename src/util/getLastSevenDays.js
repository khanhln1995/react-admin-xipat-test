export const getLastSevenDays = () => {
  const daysArray = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const previousDate = new Date(today);
    previousDate.setDate(today.getDate() - i); // Decrementing days

    // Formatting the date to "DD-MM-YYYY" format
    const day = String(previousDate.getDate()).padStart(2, "0"); // Get day and pad with 0 if necessary
    const month = String(previousDate.getMonth() + 1).padStart(2, "0"); // Get month (0-based index) and pad
    const year = previousDate.getFullYear(); // Get full year

    // Push formatted date to the array
    daysArray.push(`${day}-${month}-${year}`);
  }

  return daysArray.reverse();
};
