import { useState } from "react";
import { ticketFormSchema } from "../schemas/ticketSchema";
import type { TicketFormData } from "../schemas/ticketSchema";

interface TicketFormProps {
  onSubmit: (data: TicketFormData) => Promise<void>;
  submitting?: boolean;
}

export default function TicketForm({
  onSubmit,
  submitting = false,
}: TicketFormProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    customerEmail: "",
    priority: "MEDIUM",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof TicketFormData, string>>
  >({});

  function handleChange(
    field: keyof TicketFormData,
    value: string
  ) {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: undefined,
    }));
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const result = ticketFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof TicketFormData, string>
      > = {};

      const flattened = result.error.flatten().fieldErrors;

      for (const field of Object.keys(flattened) as Array<
        keyof TicketFormData
      >) {
        const message = flattened[field]?.[0];

        if (message) {
          fieldErrors[field] = message;
        }
      }

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    await onSubmit(result.data);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Title
        </label>

        <input
          type="text"
          value={formData.title}
          onChange={(event) =>
            handleChange("title", event.target.value)
          }
          placeholder="Enter ticket title"
          maxLength={120}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Description
        </label>

        <textarea
          value={formData.description}
          onChange={(event) =>
            handleChange("description", event.target.value)
          }
          placeholder="Describe the customer issue..."
          rows={5}
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Customer Email
        </label>

        <input
          type="email"
          value={formData.customerEmail}
          onChange={(event) =>
            handleChange(
              "customerEmail",
              event.target.value
            )
          }
          placeholder="customer@example.com"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-slate-500"
        />

        {errors.customerEmail && (
          <p className="mt-1 text-sm text-red-600">
            {errors.customerEmail}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Priority
        </label>

        <select
          value={formData.priority}
          onChange={(event) =>
            handleChange("priority", event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 px-4 py-3"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        {errors.priority && (
          <p className="mt-1 text-sm text-red-600">
            {errors.priority}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-slate-900 px-4 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? "Creating..." : "Create Ticket"}
      </button>
    </form>
  );
}