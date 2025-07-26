import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockRecurringExpenses } from "@/data/mock-data";
import { PlusCircle } from "lucide-react";

export default function RecurringPage() {
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
          <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" /> Add Recurring
          </Button>
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
            {mockRecurringExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell className="font-medium">{expense.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{expense.category}</Badge>
                </TableCell>
                <TableCell className="capitalize">{expense.frequency}</TableCell>
                <TableCell>{expense.nextPaymentDate}</TableCell>
                <TableCell className="text-right font-medium">
                  ${expense.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
