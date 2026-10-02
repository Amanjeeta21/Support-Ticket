# Support Ticket Dashboard

A full-stack web application for managing customer support tickets. The application replaces spreadsheet-based ticket tracking with a centralized dashboard for creating, viewing, searching, filtering, sorting, updating, and managing support tickets.

## Live Deployment

**Frontend:** https://support-ticket-orpin.vercel.app/

**Backend API:** https://support-ticket-x3hp.onrender.com

**API Endpoint:** https://support-ticket-x3hp.onrender.com/api/tickets

---

## Overview

The Support Ticket Dashboard provides a simple interface for support teams to manage customer issues efficiently.

The application supports:

* Ticket creation
* Ticket listing
* Search
* Status and priority filtering
* Creation-date sorting
* Server-side pagination
* Ticket details
* Status and priority updates
* Persistent PostgreSQL storage
* Dataset-wide summary statistics
* Frontend and backend validation
* Automated API tests
* Responsive design

The project includes **30 seeded support tickets** for testing and demonstration.

---

# Features

## 1. Create Ticket

Users can create a support ticket with:

* Title
* Description
* Customer email
* Priority
* Status

### Validation

* Title is required
* Title maximum length is 120 characters
* Description is required
* Customer email must be valid
* Priority must be `Low`, `Medium`, or `High`
* Status must be `Open`, `In Progress`, or `Resolved`
* New tickets default to `Open`

Creation and update timestamps are generated automatically.

Validation is implemented on both the frontend and backend.

---

## 2. Ticket Listing

The dashboard supports:

* Search by ticket title
* Search by customer email
* Filter by status
* Filter by priority
* Sort by creation date
* Newest-first sorting
* Oldest-first sorting
* Server-side pagination
* 10 tickets per page

Search, filtering, sorting, and pagination can all be combined.

Example:

```text
/api/tickets?search=account&status=OPEN&priority=HIGH&order=desc&page=1&limit=10
```

All these operations are performed server-side rather than only on the currently loaded frontend data.

---

## 3. Ticket Details & Updates

Users can open a ticket to view its complete details.

The following fields can be updated:

* Status
* Priority

Updates are persisted to PostgreSQL and remain available after refreshing the application.

---

## 4. Dashboard Summary

The dashboard displays:

* Total Tickets
* Open
* In Progress
* Resolved

Summary counts are calculated across the **entire ticket dataset**, regardless of the currently selected search, filters, sorting, or pagination.

---

## 5. User Experience

The application includes:

* Responsive desktop layout
* Mobile-friendly layout
* Loading states
* Empty states
* Error states
* Form validation messages
* API error handling
* Clear ticket status and priority indicators

---

# Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Zod

## Backend

* Node.js
* Express
* TypeScript
* Prisma ORM
* Zod

## Database

* PostgreSQL
* Supabase

## Testing

* Vitest
* Supertest

## Deployment

* Vercel — Frontend
* Render — Backend
* Supabase — PostgreSQL Database

---

# Architecture

```text
                   ┌─────────────────────┐
                   │     React Frontend  │
                   │  TypeScript + Vite  │
                   │      Vercel         │
                   └──────────┬──────────┘
                              │
                              │ REST API / Axios
                              ▼
                   ┌─────────────────────┐
                   │    Express Backend  │
                   │   Node + TypeScript │
                   │       Render        │
                   └──────────┬──────────┘
                              │
                              │ Prisma ORM
                              ▼
                   ┌─────────────────────┐
                   │     PostgreSQL      │
                   │      Supabase       │
                   └─────────────────────┘
```

---

# Project Structure

```text
Support-Ticket/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── tests/
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

---

# API Documentation

Base API URL:

```text
https://support-ticket-x3hp.onrender.com/api
```

## Health Check

```http
GET /api/health
```

Returns the current API status.

---

## Create Ticket

```http
POST /api/tickets
```

Example request:

```json
{
  "title": "Unable to access account",
  "description": "Customer is unable to log into their account.",
  "customerEmail": "customer@example.com",
  "priority": "HIGH",
  "status": "OPEN"
}
```

Successful response:

```text
201 Created
```

---

## Get Tickets

```http
GET /api/tickets
```

Supported query parameters:

```text
search
status
priority
order
page
limit
```

Example:

```text
/api/tickets?search=account&status=OPEN&priority=HIGH&order=desc&page=1&limit=10
```

Example response:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 30,
    "totalPages": 3
  }
}
```

---

## Get Summary

```http
GET /api/tickets/summary
```

Returns counts across the complete dataset.

Example:

```json
{
  "success": true,
  "data": {
    "total": 30,
    "open": 10,
    "inProgress": 10,
    "resolved": 10
  }
}
```

---

## Get Single Ticket

```http
GET /api/tickets/:id
```

Returns the complete details of a specific ticket.

---

## Update Ticket

```http
PATCH /api/tickets/:id
```

Example:

```json
{
  "status": "RESOLVED",
  "priority": "LOW"
}
```

Successful response:

```text
200 OK
```

---

# Validation & Error Handling

Validation is implemented at both frontend and backend levels.

Examples:

| Situation                        | Response                    |
| -------------------------------- | --------------------------- |
| Missing required field           | `400 Bad Request`           |
| Invalid email                    | `400 Bad Request`           |
| Invalid status                   | `400 Bad Request`           |
| Invalid priority                 | `400 Bad Request`           |
| Title longer than 120 characters | `400 Bad Request`           |
| Ticket not found                 | `404 Not Found`             |
| Successful creation              | `201 Created`               |
| Successful update                | `200 OK`                    |
| Unexpected server error          | `500 Internal Server Error` |

API errors use a consistent structure:

```json
{
  "success": false,
  "message": "Invalid customer email"
}
```

---

# Database

PostgreSQL is used for persistent storage.

Prisma is used as the ORM for database access, migrations, and type-safe queries.

## Ticket Model

```text
Ticket
├── id
├── title
├── description
├── customerEmail
├── priority
├── status
├── createdAt
└── updatedAt
```

The database includes indexes on commonly queried fields:

* `status`
* `priority`
* `createdAt`
* `customerEmail`

These support the application's filtering, sorting, and search requirements.

---

# Getting Started

## Prerequisites

Install:

* Node.js
* npm
* PostgreSQL
* Git

---

# Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Run database migrations:

```bash
npx prisma migrate deploy
```

Generate Prisma Client:

```bash
npx prisma generate
```

Seed the database:

```bash
npm run seed
```

This creates 30 sample support tickets.

Start the backend:

```bash
npm run dev
```

The backend runs locally at:

```text
http://localhost:5000
```

---

# Frontend Setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

---

# Environment Variables

## Backend

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

## Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

For production, `VITE_API_URL` points to the deployed Render API.

Environment files containing credentials are excluded from Git.

---

# Database Migrations & Seeding

Apply migrations:

```bash
npx prisma migrate deploy
```

Seed sample data:

```bash
npm run seed
```

The seed script creates **30 varied tickets** with different:

* Titles
* Descriptions
* Customer emails
* Priorities
* Statuses

This allows the pagination, search, filtering, and sorting functionality to be demonstrated immediately.

---

# Testing

Automated backend tests are implemented using **Vitest** and **Supertest**.

Run:

```bash
cd backend
npm test
```

The test suite covers:

1. Health endpoint
2. Ticket summary
3. Invalid email validation
4. Non-existent ticket handling

These tests verify both successful API behavior and expected error responses.

---

# Production Build

## Backend

```bash
cd backend
npm run build
```

Run the compiled backend:

```bash
npm start
```

## Frontend

```bash
cd frontend
npm run build
```

The production frontend build is generated in the `dist` directory.

---

# Deployment

## Frontend — Vercel

The React frontend is deployed on Vercel.

**Production URL:**

https://support-ticket-orpin.vercel.app/

The frontend communicates with the deployed backend using:

```text
https://support-ticket-x3hp.onrender.com/api
```

## Backend — Render

The Node.js/Express backend is deployed on Render.

**Production URL:**

https://support-ticket-x3hp.onrender.com

## Database — Supabase

The production PostgreSQL database is hosted on Supabase.

The Render backend connects to the production PostgreSQL database using a PostgreSQL connection pooler.

---

# Technical Choices

## React + TypeScript

React was selected because the dashboard contains multiple interactive components such as filters, forms, ticket details, and summary cards.

TypeScript provides static typing and makes the code easier to maintain.

## Express + Node.js

Express provides a lightweight structure for creating REST APIs, routing, middleware, validation, and centralized error handling.

## PostgreSQL

PostgreSQL was selected because ticket data has a structured relational model and requires reliable persistence, filtering, sorting, and updates.

## Prisma

Prisma provides:

* Type-safe database queries
* Schema management
* Database migrations
* Easy integration with PostgreSQL

## Zod

Zod is used to validate incoming data and ensure that invalid ticket data is rejected.

---

# Key Design Decisions

## Server-Side Search & Filtering

Search and filtering are implemented on the backend.

This means the application does not need to load the entire dataset into the browser before filtering it.

It also ensures that pagination works correctly with search and filters.

## Server-Side Pagination

The API returns only the requested page of tickets.

The default page size is 10.

This reduces unnecessary data transfer and makes the approach more scalable.

## Separate Summary Endpoint

The summary endpoint calculates ticket counts independently of listing filters.

Therefore, dashboard statistics represent the complete dataset.

## PATCH for Ticket Updates

`PATCH /api/tickets/:id` is used because only selected ticket properties, such as status and priority, need to be modified.

---

# Assumptions

* Customer email must follow a valid email format.
* Ticket titles cannot exceed 120 characters.
* Every ticket has one status and one priority.
* New tickets default to `Open`.
* Timestamps are generated automatically.
* Pagination uses 10 tickets per page.
* Summary statistics represent the complete dataset.
* Authentication and authorization are outside the assignment scope.
* Ticket deletion was not implemented because it was not part of the requirements.

---

# Known Limitations

The current implementation intentionally focuses on the assignment requirements.

The application does not currently include:

* User authentication
* Role-based access control
* Ticket deletion
* File attachments
* Real-time ticket updates
* Email notifications
* Advanced full-text search
* Audit logs

These features could be added in a production version.

---

# Responsive Design

The interface is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Forms, ticket information, filters, and dashboard components adapt to smaller screen sizes.

---

# Screenshots / Demo

Screenshots have been added to a `docs/` directory.

Screenshots:

```text
docs/
├── dashboard.png
├── ticket-list.png
├── create-ticket.png
├── ticket-details.png
```

User workflow :

```text
Dashboard
   ↓
Create Ticket
   ↓
Ticket Appears in List
   ↓
Search / Filter
   ↓
Open Ticket
   ↓
Update Status / Priority
   ↓
Refresh
   ↓
Updated Data Persists
```

---

# AI Usage

AI tools were used during development as a coding and documentation assistant.

They were used for:

* Understanding implementation approaches
* Debugging development issues
* Reviewing API and frontend logic
* Improving validation and error handling
* Documentation assistance
* Exploring deployment configuration

All generated suggestions and code were reviewed, tested, and adapted as necessary for the final implementation.

---

# Time Spent

Approximate development time: 5 hours

```text
4–6 hours
```

The implementation prioritizes the required functionality while keeping the codebase understandable and extensible.

---

# Tradeoffs

Due to the assignment's 4–6 hour time constraint, development was focused on the core ticket management workflow:

```text
Create
  ↓
View
  ↓
Search / Filter / Sort
  ↓
Update
  ↓
Persist
```

Features such as authentication, real-time updates, attachments, notifications, and advanced search were excluded because they were not required.

---

# HTTP Status Codes

| Status Code | Meaning                              |
| ----------- | ------------------------------------ |
| `200`       | Successful request                   |
| `201`       | Ticket successfully created          |
| `400`       | Invalid request / validation failure |
| `404`       | Resource not found                   |
| `500`       | Internal server error                |

---

# License

This project was developed as a technical assignment and demonstration project.
