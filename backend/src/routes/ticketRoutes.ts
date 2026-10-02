import { Router } from "express";
import {
  createTicketController,
  getTicketController,
  getTicketsController,
  updateTicketController,
  getTicketSummaryController,
} from "../controllers/ticketController";

const router = Router();

router.post("/", createTicketController);

router.get("/", getTicketsController);

router.get("/summary", getTicketSummaryController);

router.get("/:id", getTicketController);

router.patch("/:id", updateTicketController);

export default router;