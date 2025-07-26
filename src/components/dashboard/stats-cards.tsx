
"use client";

import { useTransactionStore } from "@/store/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, PiggyBank } from "lucide-react";
import { useRecurringExpenseStore } from "@/store/recurring";
import { useUserStore } from "@/store/user";

export function StatsCards() {
  const transactions = useTransactionStore((state) => state.getUserTransactions());
  const recurringExpenses = useRecurringExpenseStore((state) => state.getUserRecurringExpenses());
  const { currency } = useUserStore();

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const savings = totalIncome - totalExpenses;

  const totalSubscriptions = recurringExpenses.reduce((acc, r) => acc + r.amount, 0);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">Total Income</CardTitle>
            <CardContent className="p-0 pt-2">
              <div className="text-2xl font-bold">{currency}{totalIncome.toLocaleString()}</div>
            </CardContent>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground text-green-500" />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CardContent className="p-0 pt-2">
              <div className="text-2xl font-bold">{currency}{totalExpenses.toLocaleString()}</div>
            </CardContent>
          </div>
          <ArrowDownRight className="h-4 w-4 text-muted-foreground text-red-500" />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <CardContent className="p-0 pt-2">
              <div className="text-2xl font-bold">{currency}{savings.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Your current savings</p>
            </CardContent>
          </div>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
            <CardContent className="p-0 pt-2">
              <div className="text-2xl font-bold">{currency}{totalSubscriptions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">{recurringExpenses.length} active subscriptions</p>
            </CardContent>
          </div>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
      </Card>
    </div>
  );
}
