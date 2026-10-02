import { z } from "zod";

export const createTicketSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be at most 120 characters"),

  description: z
    .string()
    .min(1, "Description is required"),

  customerEmail: z
    .string()
    .email("Please provide a valid customer email"),

  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

export const updateTicketSchema = z.object({
  priority: z
    .enum(["LOW", "MEDIUM", "HIGH"])
    .optional(),

  status: z
    .enum(["OPEN", "IN_PROGRESS", "RESOLVED"])
    .optional(),
});