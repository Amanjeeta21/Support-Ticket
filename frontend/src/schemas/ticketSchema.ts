import { z } from "zod";

export const ticketFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be at most 120 characters"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  customerEmail: z
    .string()
    .trim()
    .email("Please provide a valid customer email"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export type TicketFormData = z.infer<typeof ticketFormSchema>;