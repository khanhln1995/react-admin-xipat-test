export function getRandomDayString() {
  const randomTimestamp =
    new Date().getTime() -
    Math.floor(Math.random() * 100 * 365 * 24 * 60 * 60 * 1000);

  const randomDate = new Date(randomTimestamp);

  return randomDate.toDateString();
}
