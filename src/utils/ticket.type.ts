export interface TicketProps {
  id: string;
  name: string;
  description: string;
  status: string;
  create_at: Date | null;
  updated_at: Date | null;
  customerId: string | null;
  userId: string | null;
}
