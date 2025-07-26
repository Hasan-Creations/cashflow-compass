import { TransactionsClient } from "@/components/transactions/transactions-client";
import { mockTransactions } from "@/data/mock-data";

export default function TransactionsPage() {
  // In a real app, you would fetch this data from your API
  const transactions = mockTransactions;

  return <TransactionsClient initialTransactions={transactions} />;
}
