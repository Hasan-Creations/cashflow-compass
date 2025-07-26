
"use client";

import { File, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTransactionStore } from "@/store/transactions";
import { Transaction } from "@/types";
import { useUserStore } from "@/store/user";
import { useToast } from "@/hooks/use-toast";

export function TransactionsClient() {
  const allTransactions = useTransactionStore((state) => state.getFilteredTransactions('all'));
  const incomeTransactions = useTransactionStore((state) => state.getFilteredTransactions('income'));
  const expenseTransactions = useTransactionStore((state) => state.getFilteredTransactions('expense'));
  const { currency } = useUserStore();
  const { toast } = useToast();

  const handleExport = () => {
    const transactions = allTransactions;
    if (transactions.length === 0) {
      toast({
        variant: "destructive",
        title: "No Data",
        description: "There are no transactions to export.",
      });
      return;
    }

    const headers = ["ID", "Type", "Category", "Amount", "Date", "Description"];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => [t.id, t.type, t.category, t.amount, t.date, `"${t.description.replace(/"/g, '""')}"`].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `transactions-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
     toast({
        title: "Export Successful",
        description: "Your transaction data has been exported as a CSV file.",
      });
  };

  const renderTable = (data: Transaction[]) => (
     <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden lg:table-cell">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.length > 0 ? data.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              <div className="font-medium">{transaction.description}</div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {transaction.type === "income" ? (
                  <Badge variant="outline" className="text-green-600 border-green-600/50 bg-green-500/10">Income</Badge>
              ) : (
                <Badge variant="outline" className="text-red-600 border-red-600/50 bg-red-500/10">Expense</Badge>
              )}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <Badge className="text-xs" variant="secondary">
                {transaction.category}
              </Badge>
            </TableCell>
            <TableCell className="hidden lg:table-cell">
              {transaction.date}
            </TableCell>
            <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                {transaction.type === "income" ? "+ " : "- "}
                {currency}{transaction.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        )) : (
            <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                    No transactions found.
                </TableCell>
            </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Manage your expenses and income.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all">
          <div className="flex items-center">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">{renderTable(allTransactions)}</TabsContent>
          <TabsContent value="income">{renderTable(incomeTransactions)}</TabsContent>
          <TabsContent value="expense">{renderTable(expenseTransactions)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
