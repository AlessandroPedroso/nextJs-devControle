export function CardCostumer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 border-gray-300 p-2 rounded-lg gap-2 hover:scale-105 duration-300">
      <h2>
        <a href="" className="font-bold">
          Nome:
        </a>{" "}
        Mercado Silva
      </h2>
      <p>
        <a href="" className="font-bold">
          Email:
        </a>{" "}
        teste@teste.com
      </p>
      <p>
        <a href="" className="font-bold">
          Telefone:
        </a>{" "}
        51 99999-9999
      </p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  );
}
