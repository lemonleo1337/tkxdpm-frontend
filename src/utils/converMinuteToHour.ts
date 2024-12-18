const convertMinuteToHour = (minutes?: number): string => {
  if (!minutes) {
    return "0:00";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours} giờ ${remainingMinutes.toString().padStart(2, '0')} phút`;
};

export default convertMinuteToHour;
