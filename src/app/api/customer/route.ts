import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const customerEmail = searchParams.get("email");

  if (!customerEmail || customerEmail === "") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    const customer = await prismaClient.customer.findFirst({
      where: {
        email: customerEmail as string,
      },
    });

    if (!customer || customer === null) {
      return NextResponse.json(
        { message: "Nenhum cliente encontrado com esse email." },
        { status: 400 },
      );
    }

    return NextResponse.json(customer);
  } catch (error) {
    return NextResponse.json(
      { message: "customer nor found" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("id");

  if (!userId) {
    return NextResponse.json(
      { message: "Customer id is required" },
      { status: 400 },
    );
  }

  const findTicket = await prismaClient.ticket.findFirst({
    where: {
      customerId: userId as string,
    },
  });

  if (findTicket) {
    return NextResponse.json(
      {
        message:
          "Não é possível deletar um cliente que possui tickets associados.",
      },
      { status: 400 },
    );
  }

  try {
    await prismaClient.customer.delete({
      where: {
        id: userId as string,
      },
    });

    return NextResponse.json({ message: "Cliente deletado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed delete customer" },
      { status: 400 },
    );
  }
}

//Rota para criar um novo cliente
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, email, phone, address, userId } = await request.json();

  try {
    await prismaClient.customer.create({
      data: {
        name,
        phone,
        email,
        address: address ? address : "",
        userId: userId,
      },
    });

    return NextResponse.json({ message: "Cliente cadastrado com sucesso!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed crete new customer" },
      { status: 400 },
    );
  }

  //   console.log({ name, email, phone, address });
}
