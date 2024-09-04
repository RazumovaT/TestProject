import { parseISO, format } from "date-fns";

export const converTime = (date: string) => {
  const newDate = parseISO(date);
  return format(newDate, "p");
};

export const converDate = (date: string) => {
  const newDate = parseISO(date);
  return format(newDate, "PP");
};
