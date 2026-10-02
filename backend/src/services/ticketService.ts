import prisma from "../lib/prisma";

type TicketFilters = {
  search?: string;
  status?: "OPEN" | "IN_PROGRESS" | "RESOLVED";
  priority?: "LOW" | "MEDIUM" | "HIGH";
  sort?: "createdAt";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export async function createTicket(data: {
  title: string;
  description: string;
  customerEmail: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}) {
  return prisma.ticket.create({
    data,
  });
}
export async function updateTicket(
  id: string,
  data: {
    status?: "OPEN" | "IN_PROGRESS" | "RESOLVED";
    priority?: "LOW" | "MEDIUM" | "HIGH";
  }
) {
  return prisma.ticket.update({
    where: { id },
    data,
  });
}

export async function getTicketById(id: string) {
  return prisma.ticket.findUnique({
    where: { id },
  });
}

export async function getTickets(filters: TicketFilters) {
  const {
    search,
    status,
    priority,
    order = "desc",
    page = 1,
    limit = 10,
  } = filters;

  const where = {
    ...(search
      ? {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              customerEmail: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {}),

    ...(status ? { status } : {}),
    ...(priority ? { priority } : {}),
  };

  const skip = (page - 1) * limit;

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy: {
        createdAt: order,
      },
      skip,
      take: limit,
    }),

    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    tickets,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
export async function getTicketSummary() {
  const [total, open, inProgress, resolved] = await Promise.all([
    prisma.ticket.count(),

    prisma.ticket.count({
      where: {
        status: "OPEN",
      },
    }),

    prisma.ticket.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),

    prisma.ticket.count({
      where: {
        status: "RESOLVED",
      },
    }),
  ]);

  return {
    total,
    open,
    inProgress,
    resolved,
  };
}