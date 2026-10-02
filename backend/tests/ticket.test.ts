import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app";

describe("Support Ticket API", () => {
  it("should return the health check", async () => {
    const response = await request(app)
      .get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it("should return ticket summary", async () => {
    const response = await request(app)
      .get("/api/tickets/summary");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    expect(response.body.data).toHaveProperty("total");
    expect(response.body.data).toHaveProperty("open");
    expect(response.body.data).toHaveProperty("inProgress");
    expect(response.body.data).toHaveProperty("resolved");
  });

  it("should reject a ticket with an invalid email", async () => {
    const response = await request(app)
      .post("/api/tickets")
      .send({
        title: "Invalid email test",
        description: "Testing email validation",
        customerEmail: "not-an-email",
        priority: "HIGH",
      });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  it("should return 404 for a non-existent ticket", async () => {
    const response = await request(app)
      .get("/api/tickets/non-existent-ticket-id");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});