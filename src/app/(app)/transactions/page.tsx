
import { TransactionsClient } from "@/components/transactions/transactions-client";

export default function TransactionsPage() {
  // In a real app, data would be fetched, but here we rely on the store
  // which is populated in the layout.
  return <TransactionsClient />;
}
