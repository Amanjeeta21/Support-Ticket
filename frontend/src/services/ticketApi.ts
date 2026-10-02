import api from "../lib/api";
import type {
  Ticket,
  TicketListResponse,
  TicketSummary,
  Priority,
  Status,
} from "../types/ticket";

export interface TicketFilters {
  search?: string;
  status?: Status;
  priority?: Priority;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export async function getTickets(
  filters: TicketFilters = {}
): Promise<TicketListResponse> {
  const response = await api.get("/tickets", {
    params: filters,
  });

  return response.data;
}

export async function getTicket(
  id: string
): Promise<{ success: boolean; data: Ticket }> {
  const response = await api.get(`/tickets/${id}`);

  return response.data;
}

export async function getTicketSummary(): Promise<{
  success: boolean;
  data: TicketSummary;
}> {
  const response = await api.get("/tickets/summary");

  return response.data;
}

export async function createTicket(data: {
  title: string;
  description: string;
  customerEmail: string;
  priority: Priority;
}): Promise<{ success: boolean; data: Ticket }> {
  const response = await api.post("/tickets", data);

  return response.data;
}

export async function updateTicket(
  id: string,
  data: {
    status?: Status;
    priority?: Priority;
  }
): Promise<{ success: boolean; data: Ticket }> {
  const response = await api.patch(`/tickets/${id}`, data);

  return response.data;
}