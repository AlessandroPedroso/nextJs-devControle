"use client";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSearch, FiX } from "react-icons/fi";
import { z } from "zod";
import { FormTicket } from "./components/FormTicket";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar.")
    .min(1, "O email é obrigatório."),
});

type FormData = z.infer<typeof schema>;

export interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);
  const [errorEmail, setErrorEmail] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function handleClearCustomer() {
    setCustomer(null);
    setValue("email", "");
  }

  async function handleSearchCustomer(data: FormData) {
    try {
      const response = await api.get("/api/customer", {
        params: {
          email: data.email,
        },
      });

      if (!response.data || !response.data.id) {
        setError("email", {
          message: "Nenhum cliente encontrado com esse email.",
        });
        return;
      }

      setCustomer({
        id: response.data.id,
        name: response.data.name,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(
          error.response?.data?.message || "Failed to search customer",
        );
        // setErrorEmail(
        //   error.response?.data?.message ||
        //     "falha no sistema ao procurar cliente",
        // );
        setError("email", {
          message: error.response?.data?.message,
        });
      }
      console.log(error, "Failed to search customer");
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="py-6 px-4 rounded border-2 border-gray-200 flex items-center justify-between">
            <p className="text-lg">
              <strong>Cliente selecionado: </strong>
              {customer.name}
            </p>
            <button
              className="h-11 px-2 items-center justify-center rounded cursor-pointer"
              onClick={handleClearCustomer}
            >
              <FiX size={30} color="#ec2c2c" />
            </button>
          </div>
        ) : (
          <form
            className="py-6 px-2 rounded border border-gray-200"
            onSubmit={handleSubmit(handleSearchCustomer)}
          >
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                placeholder="Digite o email do cliente..."
                type="text"
                error={errors.email?.message}
                register={register}
              />

              <button
                type="submit"
                className="bg-blue-500 cursor-pointer flex flex-row gap-3 px-2 h-11 items-center justify-center text-white rounded font-bold"
              >
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}
        {customer !== null && (
          <FormTicket
            customer={customer}
            setCustomer={(value) => setCustomer(value)}
          />
        )}
      </main>
    </div>
  );
}
