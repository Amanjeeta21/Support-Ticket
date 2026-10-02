import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import { createTicket } from "../services/ticketApi";
import type { TicketFormData } from "../schemas/ticketSchema";

export default function CreateTicket() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [created, setCreated] = useState(false);

  async function handleSubmit(data: TicketFormData) {
    try {
      setSubmitting(true);
      setError("");

      await createTicket(data);
      setCreated(true);
    } catch (error) {
      console.error(error);
      setError("Failed to create ticket. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f3ed]">
      {created && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2b211b]/50 p-4">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="ticket-created-title"
            className="w-full max-w-md rounded-xl border border-[#d8c4b2] bg-[#faf8f4] p-8 text-center shadow-xl"
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#e5efe6] text-[#356b43]">
              <svg
                aria-hidden="true"
                className="h-7 w-7"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="m5 12.5 4.5 4.5L19 7"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </div>
            <h2
              id="ticket-created-title"
              className="mt-5 text-xl font-semibold text-[#4a3024]"
            >
              Ticket created successfully
            </h2>
            <p className="mt-2 text-sm text-[#765848]">
              We'll get back to you soon.
            </p>
            <button
              autoFocus
              onClick={() => navigate("/")}
              className="mt-6 rounded-lg bg-[#6b4634] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#553628] focus:outline-none focus:ring-2 focus:ring-[#6b4634]/40 focus:ring-offset-2"
            >
              Back to dashboard
            </button>
          </section>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to Dashboard
        </button>

        <div className="rounded-xl border border-[#d8c4b2] bg-[#e8d8c8] p-6 shadow-sm sm:p-8">
          <h1 className="text-center text-2xl font-bold uppercase tracking-wide text-[#4a3024]">
  Create Support Ticket
</h1>

          <p className="mt-2 mb-8 text-center text-[#765848]">
  Create a new customer support ticket.
</p>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <TicketForm
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        </div>
      </div>
    </main>
  );
}