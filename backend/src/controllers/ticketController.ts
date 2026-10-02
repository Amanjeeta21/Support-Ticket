import { Request, Response } from "express";
import {
  createTicket,
  getTicketById,
  getTickets,
  getTicketSummary,
  updateTicket,
} from "../services/ticketService";
import { createTicketSchema, updateTicketSchema } from "../schemas/ticketSchema";


export async function createTicketController(
  req: Request,
  res: Response
) {
  try {
    const result = createTicketSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    const ticket = await createTicket(result.data);

    return res.status(201).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create ticket",
    });
  }
}

export async function getTicketController(
  req: Request,
  res: Response
) {
  try {
    const ticket = await getTicketById(String(req.params.id));

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ticket",
    });
  }
}
export async function getTicketsController(
  req: Request,
  res: Response
) {
  try {
    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : undefined;

    const status =
      typeof req.query.status === "string"
        ? (req.query.status as "OPEN" | "IN_PROGRESS" | "RESOLVED")
        : undefined;

    const priority =
      typeof req.query.priority === "string"
        ? (req.query.priority as "LOW" | "MEDIUM" | "HIGH")
        : undefined;

    const order =
      req.query.order === "asc" ? "asc" : "desc";

    const page = Math.max(
      Number(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      10
    );

    const result = await getTickets({
      search,
      status,
      priority,
      order,
      page,
      limit,
    });

    return res.status(200).json({
      success: true,
      data: result.tickets,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tickets",
    });
  }
}
export async function updateTicketController(
  req: Request,
  res: Response
) {
  try {
    const result = updateTicketSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });
    }

    if (Object.keys(result.data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const existingTicket = await getTicketById(
      String(req.params.id)
    );

    if (!existingTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const ticket = await updateTicket(
      String(req.params.id),
      result.data
    );

    return res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to update ticket",
    });
  }
}
export async function getTicketSummaryController(
  _req: Request,
  res: Response
) {
  try {
    const summary = await getTicketSummary();

    return res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch ticket summary",
    });
  }
}