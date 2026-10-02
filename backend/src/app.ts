import express from "express";
import cors from "cors";
import ticketRoutes from "./routes/ticketRoutes";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Support Ticket API is running",
  });
});

app.use("/api/tickets", ticketRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;