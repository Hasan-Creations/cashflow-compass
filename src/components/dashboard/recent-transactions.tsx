import Link from "next/link";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

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
import { mockTransactions } from "@/data/mock-data";

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
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
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden sm:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockTransactions.slice(0, 5).map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  <div className="font-medium">{transaction.description}</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {transaction.type === "income" ? (
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                      <span>Income</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <ArrowDownLeft className="h-4 w-4 text-red-500" />
                      <span>Expense</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="outline">
                    {transaction.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction.date}
                </TableCell>
                <TableCell className={`text-right font-medium ${transaction.type === 'income' ? 'text-green-500' : ''}`}>
                  {transaction.type === "income" ? "+ " : "- "}
                  ${transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
