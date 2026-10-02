export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status =
  | "OPEN"
  | "IN_PROGRESS"
  | "RESOLVED";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
  status: Status;
  createdAt: string;
  updatedAt: string;
}

export interface TicketPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface TicketListResponse {
  success: boolean;
  data: Ticket[];
  pagination: TicketPagination;
}

export interface TicketSummary {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
}