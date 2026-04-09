"use client";

import { api } from "@/lib/api";
import { CustomerProps } from "@/utils/customer.type";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";

export function CardCostumer({ customer }: { customer: CustomerProps }) {
  // console.log(customer);
  const router = useRouter();

  async function handleDeleteCustomer() {
    try {
      const response = await api.delete("/api/customer", {
        params: {
          id: customer.id,
        },
      });

      console.log(response.data);
      router.refresh(); //garante o refresh da pagina para mostrar a lista de clientes atualizada
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          error.response?.data?.message || "Failed to delete customer",
        );
        alert(
          error.response?.data?.message ||
            "falha no sistema ao deletar cliente",
        );
      }

      console.error(error, "Failed to delete customer");
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 border-gray-300 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a href="" className="font-bold">
          Nome:
        </a>{" "}
        {customer.name}
      </h2>
      <p>
        <a href="" className="font-bold">
          Email:
        </a>{" "}
        {customer.email}
      </p>
      <p>
        <a href="" className="font-bold">
          Telefone:
        </a>{" "}
        {customer.phone}
      </p>
      <button
        className="bg-red-500 px-4 rounded text-white mt-2 self-start"
        onClick={handleDeleteCustomer}
      >
        Deletar
      </button>
    </article>
  );
}
