import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

// http://localhost:3000/api/ticket
export async function PATCH(request: Request) {
  const session = await requireAdmin();

  if (!session || !session.user) {
    return NextResponse.json({ message: "Not authorized" }, { status: 401 });
  }

  const { id } = await request.json();

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      id: id as string,
    },
  });

  if (!findTicket) {
    return NextResponse.json({ error: "Filed update ticket" }, { status: 400 });
  }

  try {
    await prismaClient.ticket.update({
      where: {
        id: id as string,
      },
      data: {
        status: "FECHADO",
      },
    });

    return NextResponse.json({ message: "Chamado atualizado com sucesso!" });
  } catch (error) {
    return NextResponse.json({ error: "Filed update ticket" }, { status: 400 });
  }
}

export async function POST(request: Request) {
  const { customerId, name, description } = await request.json();

  // console.log({ customerId, name, description });

  if (!customerId || !name || !description) {
    return NextResponse.json(
      { message: "Failed create new ticket" },
      { status: 400 },
    );
  }

  try {
    await prismaClient.ticket.create({
      data: {
        name,
        description: description,
        status: "ABERTO",
        customerId: customerId as string,
      },
    });

    return NextResponse.json({ message: "Chamado criado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed create new ticket" },
      { status: 400 },
    );
  }
}
