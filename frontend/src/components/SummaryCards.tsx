import type { TicketSummary } from "../types/ticket";

interface SummaryCardsProps {
  summary: TicketSummary;
}

export default function SummaryCards({
  summary,
}: SummaryCardsProps) {
 const cards = [
  {
    label: "Total Tickets",
    value: summary.total,
  },
  {
    label: "Open",
    value: summary.open,
  },
  {
    label: "In Progress",
    value: summary.inProgress,
  },
  {
    label: "Resolved",
    value: summary.resolved,
  },
];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {cards.map((card) => (
        <div
  key={card.label}
  className="rounded-xl border border-[#d8c4b2] bg-[#e8d8c8] p-5 text-center shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:border-[#c6aa94] hover:shadow-md"
>
  <p className="text-sm font-medium text-[#765848]">
    {card.label}
  </p>

  <p className="mt-2 text-3xl font-bold text-[#4a3024]">
    {card.value}
  </p>
</div>
      ))}
    </div>
  );
}