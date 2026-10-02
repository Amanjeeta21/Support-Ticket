# Support Ticket Dashboard

A full-stack support ticket management dashboard for creating, tracking, filtering, and updating customer support tickets.

The application provides a responsive interface for support teams to manage tickets efficiently, with server-side search, filtering, sorting, pagination, summary statistics, and persistent updates.

## Features

### Ticket Management

* Create support tickets with:

  * Title
  * Description
  * Customer email
  * Priority
  * Status
* Update ticket status and priority
* View individual ticket details
* Automatically managed creation and update timestamps

### Search & Filtering

* Search tickets by title or customer email
* Filter by status:

  * Open
  * In Progress
  * Resolved
* Filter by priority:

  * Low
  * Medium
  * High
* Sort by creation date:

  * Newest first
  * Oldest first
* Combine search, filters, sorting, and pagination

### Dashboard

* Total ticket count
* Open ticket count
* In Progress ticket count
* Resolved ticket count
* Paginated ticket listing with 10 tickets per page

### Validation & Error Handling

* Frontend and backend validation
* Valid customer email validation
* Required field validation
* Maximum title length validation
* Consistent API error responses
* Meaningful HTTP status codes
* Loading, empty, and error states

### Database

* PostgreSQL database
* Prisma ORM
* Database migrations
* Seed script with 30 sample tickets
* Indexed fields for commonly used queries

### Testing

Automated backend tests cover:

* Health check
* Ticket summary
* Invalid input validation
* Non-existent ticket handling

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios
* Zod

### Backend

* Node.js
* Express
* TypeScript
* Prisma
* PostgreSQL
* Zod

### Testing

* Vitest
* Supertest

### Deployment

* Vercel — Frontend
* Render — Backend
* Supabase — PostgreSQL

## Architecture

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  React + TypeScript │
                    │      Frontend       │
                    │      (Vercel)       │
                    └──────────┬──────────┘
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │   Express + Node.js │
                    │      Backend        │
                    │      (Render)       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       Prisma        │
                    │         ORM         │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ PostgreSQL Database │
                    │     (Supabase)      │
                    └─────────────────────┘
```

## Project Structure

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
│   ├── package.json
│   └── vite.config.ts
│
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## API Endpoints

| Method  | Endpoint               | Description                   |
| ------- | ---------------------- | ----------------------------- |
| `GET`   | `/api/health`          | Check API health              |
| `POST`  | `/api/tickets`         | Create a ticket               |
| `GET`   | `/api/tickets`         | Get paginated tickets         |
| `GET`   | `/api/tickets/summary` | Get ticket summary counts     |
| `GET`   | `/api/tickets/:id`     | Get a single ticket           |
| `PATCH` | `/api/tickets/:id`     | Update ticket status/priority |

### Ticket Listing Query Parameters

The ticket listing endpoint supports server-side query parameters:

```text
/api/tickets?search=payment&status=OPEN&priority=HIGH&order=desc&page=1&limit=10
```

Supported parameters:

* `search`
* `status`
* `priority`
* `order`
* `page`
* `limit`

These parameters can be combined.

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* PostgreSQL or a PostgreSQL-compatible hosted database

### 1. Clone the Repository

```bash
git clone https://github.com/Amanjeeta21/Support-Ticket.git
cd Support-Ticket
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="your-postgresql-connection-string"
PORT=5000
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate deploy
```

Seed the database:

```bash
npm run seed
```

Start the development server:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
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

The frontend will be available at the local Vite URL shown in the terminal.

## Running Tests

From the backend directory:

```bash
npm test
```

The test suite uses Vitest and Supertest.

## Production Build

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

## Database Seeding

The project includes a seed script containing 30 varied support tickets.

Run:

```bash
npm run seed
```

This creates sample tickets across different:

* Statuses
* Priorities
* Customer emails
* Support issues

## Environment Variables

### Backend

```env
DATABASE_URL=your-postgresql-connection-string
PORT=5000
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api
```

For production, `VITE_API_URL` should point to the deployed backend API.

> Never commit `.env` files or database credentials to the repository.

## Deployment

The application is deployed using a three-part setup:

```text
Frontend → Vercel
Backend  → Render
Database → Supabase PostgreSQL
```

For production deployment:

1. Configure the PostgreSQL connection in Render.
2. Deploy the backend to Render.
3. Set the frontend `VITE_API_URL` to the deployed backend API.
4. Deploy the frontend to Vercel.
5. Verify the API health endpoint.
6. Verify ticket creation, listing, filtering, and updates.

## API Response Format

Successful responses follow a consistent structure.

Example:

```json
{
  "success": true,
  "data": []
}
```

Errors follow a consistent structure to make frontend handling predictable.

## Design Considerations

* Server-side filtering, searching, sorting, and pagination
* Separate frontend and backend responsibilities
* Centralized API error handling
* Database indexes on frequently queried fields
* Environment-based configuration
* Persistent ticket updates through PostgreSQL
* Responsive UI for desktop and mobile devices

## AI Usage

AI tools were used during development for assistance with:

* Project structure and implementation planning
* Debugging
* API and database troubleshooting
* Reviewing code and improving documentation

All application logic, integration, testing, and deployment were verified as part of the development process.

## License

This project was developed as a technical assignment and is intended for demonstration and evaluation purposes.

```
```
