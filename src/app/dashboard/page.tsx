import { TicketItem } from "@/app/dashboard/components/ticket";
import { Container } from "@/components/container";
import { requireAdmin } from "@/lib/auth";
import prismaClient from "@/lib/prisma";
import Link from "next/link";

export default async function Dashboard() {
  // const session = await getServerSession(authOptions);

  // if (!session || !session.user) {
  //   redirect("/");
  // }
  // // console.log(session);
  const session = await requireAdmin();

  const tickets = await prismaClient.ticket.findMany({
    where: {
      userId: session.user?.id as string,
      status: "ABERTO",
    },
    include: {
      customer: true,
    },
  });

  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between px-2">
          <h1 className="text-3xl font-bold">Chamados</h1>
          <Link
            href="/dashboard/new"
            className="bg-blue-500 px-4 py-1 rounded text-white"
          >
            Abrir chamado
          </Link>
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
      </main>
    </Container>
  );
}
