
"use client";

import { RecurringForm } from "@/components/recurring/recurring-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRecurringExpenseStore } from "@/store/recurring";

export default function RecurringPage() {
  const recurringExpenses = useRecurringExpenseStore((state) => state.getUserRecurringExpenses());

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recurring Expenses</CardTitle>
            <CardDescription>
              Manage your subscriptions and recurring payments.
            </CardDescription>
          </div>
          <RecurringForm />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Next Payment</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recurringExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{expense.category}</Badge>
                </TableCell>
                <TableCell className="capitalize">{expense.frequency}</TableCell>
                <TableCell>{expense.nextPaymentDate}</TableCell>
                <TableCell className="text-right font-medium">
                  ₨{expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
