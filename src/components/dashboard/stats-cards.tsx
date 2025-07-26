
"use client";

import { useEffect } from "react";
import { useTransactionStore } from "@/store/transactions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign, PiggyBank } from "lucide-react";
import { useRecurringExpenseStore } from "@/store/recurring";
import { mockTransactions } from "@/data/mock-data";
import { mockRecurringExpenses } from "@/data/mock-data";

export function StatsCards() {
  const { transactions, setTransactions } = useTransactionStore();
  const { recurringExpenses, setRecurringExpenses } = useRecurringExpenseStore();

  useEffect(() => {
    setTransactions(mockTransactions);
    setRecurringExpenses(mockRecurringExpenses);
  }, [setTransactions, setRecurringExpenses]);

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
          <CardTitle className="text-sm font-medium">Total Income</CardTitle>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₨{totalIncome.toLocaleString()}</div>
          {/* <p className="text-xs text-muted-foreground">+10% from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <ArrowDownRight className="h-4 w-4 text-muted-foreground text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₨{totalExpenses.toLocaleString()}</div>
          {/* <p className="text-xs text-muted-foreground">+5% from last month</p> */}
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings</CardTitle>
          <PiggyBank className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₨{savings.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Your current savings</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₨{totalSubscriptions.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">{recurringExpenses.length} active subscriptions</p>
        </CardContent>
      </Card>
    </div>
  );
}
