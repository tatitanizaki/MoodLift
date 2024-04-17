/**
 * Converts total milliseconds to MM:SS:CS format.
 * @param {number} totalMilliseconds - The total number of milliseconds.
 * @returns {string} - The formatted time string.
 */
export const formatTime = (totalMilliseconds) => {
  const minutes = Math.floor(totalMilliseconds / 60000);
  const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
  const centiseconds = Math.floor((totalMilliseconds % 1000) / 10);

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedCentiseconds = centiseconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}:${formattedCentiseconds}`;
};
