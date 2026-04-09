import { Container } from "@/components/container";
import { requireAdmin } from "@/lib/auth";

import prismaClient from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function NewTicket() {
  const session = await requireAdmin();

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user?.id,
    },
  });

  async function handlerRegisterTicket(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const customerId = formData.get("customer") as string;

    if (!name || !description || !customerId) {
      return;
    }

    await prismaClient.ticket.create({
      data: {
        name,
        description,
        customerId,
        status: "ABERTO",
        userId: session.user?.id as string,
      },
    });

    revalidatePath("/dashboard"); //garante o refresh da pagina do dashboard para mostrar o novo chamado cadastrado
    redirect("/dashboard"); //redireciona para a pagina do dashboard apos criar o chamado
  }

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold">Novo chamado</h1>
        </div>
        <form className="flex flex-col mt-6" action={handlerRegisterTicket}>
          <label className="mb-1 font-medium text-lg">Nome do chamado</label>
          <input
            className="w-full border-2 rounded-md px-2 mb-2 h-11"
            type="text"
            placeholder="Digite o nome do chamado"
            required
            name="name"
          />
          <label className="mb-1 font-medium text-lg">
            Descreva o problema
          </label>
          <textarea
            className="w-full border-2 rounded-md px-2 mb-2 h-28 resize-none"
            placeholder="Descreva o problema..."
            required
            name="description"
          ></textarea>
          {customers.length !== 0 && (
            <>
              <label className="mb-1 font-medium text-lg">
                Selecione o cliente
              </label>
              <select
                name="customer"
                className="w-full border-2 rounded-md px-2 mb-2 h-11 bg-white"
              >
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
            </>
          )}

          {customers.length === 0 && (
            <Link href="/dashboard/new">
              Você ainda não tem nenhum cliente,{" "}
              <span className="text-blue-500 font-medium">
                Cadastrar cliente
              </span>
            </Link>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold px-2 h-11 rounded my-4 cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed hover:opacity-80 transition duration-700 ease-in-out"
            disabled={customers.length === 0}
          >
            Cadastrar
          </button>
        </form>
      </main>
    </Container>
  );
}
