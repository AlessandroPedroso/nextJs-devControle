import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
