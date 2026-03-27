import { Container } from "@/components/container";
import Link from "next/link";
export default function NewCostumer() {
  return (
    <Container>
      <main className="flex flex-col mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/customer">Voltar</Link>
        </div>
      </main>
    </Container>
  );
}
