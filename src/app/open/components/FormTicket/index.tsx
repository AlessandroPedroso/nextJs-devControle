"use client";
import { Input } from "@/components/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { CustomerDataInfo } from "../../page";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório."),
  description: z.string().min(1, "Descreva um pouco sobre seu problema..."),
});

type FormData = z.infer<typeof schema>;

interface FormTicketProps {
  customer: CustomerDataInfo;
  setCustomer: (value: null) => void;
}

export function FormTicket({ customer, setCustomer }: FormTicketProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function handleRegisterTicket(data: FormData) {
    const response = await api.post("/api/ticket", {
      name: data.name,
      description: data.description,
      customerId: customer.id,
    });

    setValue("name", "");
    setValue("description", "");
    setCustomer(null);
    // console.log(response.data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterTicket)}
      className="bg-gray--200 flex flex-col space-y-2 mt-6 px-4 py-6 rounded border-2 border-gray-200"
    >
      <label className="font-medium text-lg">Nome do chamado</label>
      <Input
        register={register}
        type="text"
        placeholder="Digite o nome do chamado"
        name="name"
        error={errors.name?.message}
      />
      <label className="font-medium text-lg">Descreva o problema</label>
      <textarea
        className="w-full border-2 border-gray-200 rounded-md h-24 resize-none px-2"
        placeholder="Descreva o seu problema..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1 mb-4">{errors.description?.message}</p>
      )}
      <button
        type="submit"
        className="bg-blue-500 cursor-pointer rounded-md w-full h-11 px-2 text-white"
      >
        Cadastrar
      </button>
    </form>
  );
}
