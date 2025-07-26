
"use client";

import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTransactionStore } from "@/store/transactions";
import { TransactionForm } from "./transactions/transaction-form";
import { useUserStore } from "@/store/user";

export function CurrentBalance() {
  const { transactions, balance, calculateBalance } = useTransactionStore();
  const { currency } = useUserStore();

  useEffect(() => {
    calculateBalance();
  }, [transactions, calculateBalance]);

  return (
    <Card className="sticky top-14 sm:top-4 mb-4 z-20">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <CardDescription>Current Balance</CardDescription>
            <CardTitle className="text-4xl font-headline">{currency}{balance.toLocaleString()}</CardTitle>
          </div>
          <div className="flex gap-2">
            <TransactionForm type="income" />
            <TransactionForm type="expense" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
