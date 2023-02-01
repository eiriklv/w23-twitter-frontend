import { formatDistance } from "date-fns";

export function getFormattedTime(date) {
    return formatDistance(
      new Date(date),
      new Date(),
      { addSuffix: true }
    );
  }