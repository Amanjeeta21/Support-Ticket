import { useEffect, useState } from "react";
import SummaryCards from "../components/SummaryCards";
import LoadingState from "../components/LoadingState";
import TicketFilters from "../components/TicketFilters";
import Pagination from "../components/Pagination";
import TicketBadge from "../components/TicketBadge";
import { formatTicketDate } from "../lib/formatTicketDate";
import { useNavigate } from "react-router-dom";
import {
  getTicketSummary,
  getTickets,
} from "../services/ticketApi";
import type {
  Ticket,
  TicketSummary,
  Priority,
  Status,
} from "../types/ticket";

export default function Dashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const navigate = useNavigate();
  const [summary, setSummary] =
    useState<TicketSummary>({
      total: 0,
      open: 0,
      inProgress: 0,
      resolved: 0,
    });

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<Status | "">("");
  const [priority, setPriority] =
    useState<Priority | "">("");

  const [order, setOrder] =
    useState<"asc" | "desc">("desc");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTickets, setTotalTickets] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const response = await getTickets({
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        order,
        page,
        limit: 10,
      });

      setTickets(response.data);
      setTotalPages(response.pagination.totalPages);
    } catch (error) {
      console.error(error);
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  }

  async function loadSummary() {
    try {
      const response = await getTicketSummary();
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
  async function loadTickets() {
    try {
      setLoading(true);
      setError("");

      const response = await getTickets({
        search: search || undefined,
        status: status || undefined,
        priority: priority || undefined,
        order,
        page,
        limit: 10,
      });

      setTickets(response.data);
      setTotalPages(response.pagination.totalPages);
      setTotalTickets(response.pagination.total);
    } catch (error) {
      console.error(error);
      setError("Failed to load tickets.");
    } finally {
      setLoading(false);
    }
  }

  loadTickets();
}, [search, status, priority, order, page]);
  useEffect(() => {
  async function loadSummary() {
    try {
      const response = await getTicketSummary();
      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  loadSummary();
}, []);

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(1);
  }

  function handleStatusChange(value: Status | "") {
    setStatus(value);
    setPage(1);
  }

  function handlePriorityChange(value: Priority | "") {
    setPriority(value);
    setPage(1);
  }

  function handleOrderChange(value: "asc" | "desc") {
    setOrder(value);
    setPage(1);
  }

  return (
    <main className="min-h-screen bg-[#ebe7df]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide text-[#4a3024] sm:text-4xl">
            Support Ticket Dashboard
          </h1>

          <p className="mt-3 text-[#765848]">
            Manage and track customer support tickets.
          </p>
          </div>

          <button
            onClick={() => navigate("/tickets/new")}
            className="self-end rounded-lg bg-[#6b4634] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#553628] sm:self-start"
          >
            + Create Ticket
          </button>
        </header>

        <SummaryCards summary={summary} />

        <section className="mt-8 rounded-xl border border-[#d8c4b2] bg-[#eadccf] shadow-sm">

          <div className="border-b border-[#d8c4b2] p-5 text-left">
            <h2 className="text-xl font-semibold uppercase tracking-wide text-[#4a3024]">
              Tickets
            </h2>

            <p className="mt-1 text-sm text-[#765848]">
              {totalTickets} matching ticket
              {totalTickets !== 1 ? "s" : ""}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Showing {tickets.length} of {totalPages > 0 ? "matching" : ""} tickets
            </p>
          </div>

          <TicketFilters
            search={search}
            status={status}
            priority={priority}
            order={order}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onPriorityChange={handlePriorityChange}
            onOrderChange={handleOrderChange}
          />

          {loading && <LoadingState />}

          {!loading && error && (
            <div className="p-6 text-center text-red-600">
              {error}
            </div>
          )}

          {!loading && !error && tickets.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No tickets found.
            </div>
          )}

          {!loading && !error && tickets.length > 0 && (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-[#dfcbb9]">
                    <tr>
                      <th className="px-5 py-3 text-sm font-semibold text-[#4a3024]">
                        Title
                      </th>

                      <th className="px-5 py-3 text-sm font-semibold text-[#4a3024]">
                        Customer
                      </th>

                      <th className="px-5 py-3 text-sm font-semibold text-[#4a3024]">
                        Priority
                      </th>

                      <th className="px-5 py-3 text-sm font-semibold text-[#4a3024]">
                        Status
                      </th>

                      <th className="px-5 py-3 text-sm font-semibold text-[#4a3024]">
                        Created
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {tickets.map((ticket) => (
                      <tr key={ticket.id}onClick={() =>
                               navigate(`/tickets/${ticket.id}`)}
                          className="cursor-pointer border-t border-[#dcc8b6] text-[#4a3024] hover:bg-[#e3d3c3]"
                    >
                        <td className="px-5 py-4 font-medium">
                          {ticket.title}
                        </td>

                        <td className="px-5 py-4 text-[#765848]">
                          {ticket.customerEmail}
                        </td>

                        <td className="px-5 py-4">
                             <TicketBadge value={ticket.priority} />
                        </td>

                        <td className="px-5 py-4">
                             <TicketBadge value={ticket.status} />
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-500">
                          {formatTicketDate(ticket.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}