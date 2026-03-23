import { requireAdmin } from "@/lib/auth";
import { DashboardHeader } from "./components/header";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  //   console.log(session);
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
