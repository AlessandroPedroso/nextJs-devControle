import { TicketItem } from "@/app/dashboard/components/ticket";
import { Container } from "@/components/container";
import { requireAdmin } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import Link from "next/link";
import { ButtonRefresh } from "./components/button";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/");
  // }
  // // console.log(session);
  const session = await requireAdmin();

  // const tickets = await prismaClient.ticket.findMany({
  //   where: {
  //     userId: session.user?.id as string,
  //     status: "ABERTO",
  //   },
  //   include: {
  //     customer: true,
  //   },
  //   orderBy: {
  //     create_at: "desc",
  //   },
  // });

  //buscado pelo idCliente (customer) e não pelo id do usuário, pois o cliente é quem tem o relacionamento com o ticket, e o cliente tem o relacionamento com o usuário, então para buscar os tickets abertos do cliente, preciso buscar pelo id do cliente que tem o relacionamento com o usuário logado.
  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user?.id as string,
      },
    },
    include: {
      customer: true,
    },
    orderBy: {
      create_at: "desc",
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-3xl font-bold">Chamados</h1>

          <div className="flex items-center gap-2">
            <ButtonRefresh />
            <Link
              href="/dashboard/new"
              className="bg-blue-500 px-4 py-1 rounded text-white"
            >
              Abrir chamado
            </Link>
          </div>
        </div>

        <table className="min-w-full my-2">
          <thead>
            <tr>
              <th className="font-medium text-left pl-1">CLIENTE</th>
              <th className="font-medium text-left hidden sm:block">
                CADASTRO
              </th>
              <th className="font-medium text-left">STATUS</th>
              <th className="font-medium text-left">#</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((tickets) => (
              <TicketItem
                customer={tickets.customer}
                ticket={tickets}
                key={tickets.id}
              />
            ))}
          </tbody>
        </table>
        {tickets.length === 0 && (
          <h1 className="px-1 text-gray-600">
            Nenhum ticket aberto foi encontrado...
          </h1>
        )}
      </main>
    </Container>
  );
}
