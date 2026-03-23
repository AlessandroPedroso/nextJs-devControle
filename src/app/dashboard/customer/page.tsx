import { CardCostumer } from "@/app/dashboard/customer/components/card";
import { Container } from "@/components/container";
import Link from "next/link";

export default async function Customer() {
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Meus Clientes</h1>
          <Link
            href="/dashboard/customer/new"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            Novo cliente
          </Link>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-2">
          <CardCostumer />
          <CardCostumer />
          <CardCostumer />
        </section>
      </main>
    </Container>
  );
}
