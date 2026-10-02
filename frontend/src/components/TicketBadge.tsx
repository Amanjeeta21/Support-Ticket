import type { Priority, Status } from "../types/ticket";

interface TicketBadgeProps {
  value: Priority | Status;
}

function formatValue(value: string) {
  return value
    .toLowerCase()
    .replace("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function TicketBadge({
  value,
}: TicketBadgeProps) {
  const isHighPriority = value === "HIGH";
  const isMediumPriority = value === "MEDIUM";
  const isLowPriority = value === "LOW";

  const isOpen = value === "OPEN";
  const isInProgress = value === "IN_PROGRESS";
  const isResolved = value === "RESOLVED";

  let className =
    "inline-flex rounded-full px-2.5 py-1 text-xs font-medium";

  if (isHighPriority) {
    className +=
      " bg-red-100 text-red-700";
  } else if (isMediumPriority) {
    className +=
      " bg-yellow-100 text-yellow-700";
  } else if (isLowPriority) {
    className +=
      " bg-slate-100 text-slate-700";
  } else if (isOpen) {
    className +=
      " bg-blue-100 text-blue-700";
  } else if (isInProgress) {
    className +=
      " bg-orange-100 text-orange-700";
  } else if (isResolved) {
    className +=
      " bg-green-100 text-green-700";
  }

  return (
    <span className={className}>
      {formatValue(value)}
    </span>
  );
}