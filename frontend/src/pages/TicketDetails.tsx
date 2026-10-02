import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getTicket,
  updateTicket,
} from "../services/ticketApi";

import type {
  Ticket,
  Priority,
  Status,
} from "../types/ticket";
import { formatTicketDate } from "../lib/formatTicketDate";

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState<Ticket | null>(null);

  const [status, setStatus] = useState<Status>("OPEN");
  const [priority, setPriority] = useState<Priority>("MEDIUM");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function loadTicket() {
      if (!id) {
        setError("Invalid ticket ID.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await getTicket(id);

        setTicket(response.data);
        setStatus(response.data.status);
        setPriority(response.data.priority);
      } catch (error) {
        console.error(error);
        setError("Failed to load ticket.");
      } finally {
        setLoading(false);
      }
    }

    loadTicket();
  }, [id]);

  async function handleSave() {
    if (!id) {
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateTicket(id, {
        status,
        priority,
      });

      setTicket(response.data);

      setStatus(response.data.status);
      setPriority(response.data.priority);

      setSuccess("Ticket updated successfully.");
    } catch (error) {
      console.error(error);
      setError("Failed to update ticket.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f7f3ed]">
        <p className="text-[#765848]">
          Loading ticket...
        </p>
      </main>
    );
  }

  if (error && !ticket) {
    return (
      <main className="min-h-screen bg-[#f7f3ed] p-8">
        <div className="mx-auto max-w-3xl">
          <p className="text-red-600">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="mt-4 rounded-lg border border-slate-300 px-4 py-2"
          >
            Back to Dashboard
          </button>
        </div>
      </main>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <main className="min-h-screen bg-[#ebe7df]">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-xl border border-[#d8c4b2] bg-[#e8d8c8] p-6 shadow-sm sm:p-8">

          <div className="mb-8">
            <p className="text-sm text-slate-500">
              Ticket
            </p>

            <h1 className="mt-1 text-center text-2xl font-bold uppercase tracking-wide text-[#4a3024]">
  {ticket.title}
</h1>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-700">
              {success}
            </div>
          )}

          <div className="space-y-6">

            <div>
              <p className="text-sm font-medium text-slate-500">
                Customer Email
              </p>

              <p className="mt-1 text-slate-900">
                {ticket.customerEmail}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Description
              </p>

              <p className="mt-1 whitespace-pre-wrap text-slate-900">
                {ticket.description}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-500">
                Created
              </p>

              <p className="mt-1 text-slate-900">
                {formatTicketDate(ticket.createdAt)}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as Status
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="OPEN">
                    Open
                  </option>

                  <option value="IN_PROGRESS">
                    In Progress
                  </option>

                  <option value="RESOLVED">
                    Resolved
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(event) =>
                    setPriority(
                      event.target.value as Priority
                    )
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-3"
                >
                  <option value="LOW">
                    Low
                  </option>

                  <option value="MEDIUM">
                    Medium
                  </option>

                  <option value="HIGH">
                    High
                  </option>
                </select>
              </div>

            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>
        </div>
      </div>
    </main>
  );
}