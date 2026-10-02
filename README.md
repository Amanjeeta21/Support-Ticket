# Support Ticket Dashboard

A full-stack support ticket management application built with React, TypeScript, Node.js, Express, Prisma, and PostgreSQL.

## Features

- Create support tickets
- Frontend and backend validation
- Search tickets by title or customer email
- Filter by status and priority
- Sort by creation date
- Backend-side pagination
- View ticket details
- Update ticket status and priority
- Persistent PostgreSQL storage
- Dataset-wide ticket summary
- Loading, empty, and error states
- Responsive interface
- Seeded database with 30 sample tickets
- Automated API tests

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- Zod

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod

### Testing

- Vitest
- Supertest

## Project Structure

```text
support-ticket-dashboard/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── types/
│   │   └── lib/
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── lib/
│   ├── tests/
│   └── package.json
│
├── .gitignore
└── README.md