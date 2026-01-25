import { formatDistanceToNow } from "date-fns";

export function timeAgo(date: Date | null | undefined) {
  if (!date) return "No activity yet";

  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
