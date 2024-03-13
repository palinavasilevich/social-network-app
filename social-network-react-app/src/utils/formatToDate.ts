export const formatToDate = (date?: Date) => {
  if (!date) {
    return "";
  }

  return new Date(date).toLocaleDateString();
};
