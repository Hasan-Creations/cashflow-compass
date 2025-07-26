
"use client";

import Link from "next/link";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTransactionStore } from "@/store/transactions";
import { useUserStore } from "@/store/user";
import { TransactionForm } from "@/components/transactions/transaction-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { deleteTransaction } from "@/lib/firebase/transactions";
import { Transaction } from "@/types";

export function RecentTransactions() {
  const { getUserTransactions, deleteTransaction: deleteFromStore } = useTransactionStore();
  const { currency } = useUserStore();
  const transactions = getUserTransactions();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | undefined>(undefined);

  const handleDelete = async (id: string) => {
    try {
      await deleteTransaction(id);
      deleteFromStore(id);
      toast({
        title: "Success",
        description: "Transaction deleted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete transaction.",
      });
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditDialogOpen(true);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center px-4 py-4 sm:px-6">
          <div className="grid gap-2">
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              A quick look at your recent income and expenses.
            </CardDescription>
          </div>
          <Button asChild size="sm" className="ml-auto gap-1">
            <Link href="/transactions">
              View All
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="font-medium">{transaction.description}</div>
                    <div className="text-sm text-muted-foreground sm:hidden">
                        {transaction.date}
                    </div>
                  </TableCell>
                  <TableCell className="table-cell">
                    {transaction.type === "income" ? (
                      <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-500/10">Income</Badge>
                    ) : (
                      <Badge variant="outline" className="text-red-600 border-red-600/50 bg-red-500/10">Expense</Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {transaction.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {transaction.date}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                    {transaction.type === "income" ? "+ " : "- "}
                    {currency}{transaction.amount.toFixed(2)}
                  </TableCell>
                   <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(transaction)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDelete(transaction.id)} className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {transactions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {selectedTransaction && (
        <TransactionForm
          type={selectedTransaction.type}
          open={isEditDialogOpen}
          setOpen={setIsEditDialogOpen}
          transaction={selectedTransaction}
        />
      )}
    </>
  );
}
