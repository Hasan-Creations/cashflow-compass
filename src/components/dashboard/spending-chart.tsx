
"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTransactionStore } from "@/store/transactions";
import { useMemo } from "react";
import { useUserStore } from "@/store/user";

export function SpendingChart() {
  const { getUserTransactions } = useTransactionStore();
  const { currency } = useUserStore();
  const transactions = getUserTransactions();

  const data = useMemo(() => {
    const monthlySpending: { [key: string]: number } = {
      Jan: 0, Feb: 0, Mar: 0, Apr: 0, May: 0, Jun: 0,
      Jul: 0, Aug: 0, Sep: 0, Oct: 0, Nov: 0, Dec: 0,
    };

    transactions.forEach((t) => {
      if (t.type === 'expense') {
        const date = new Date(t.date);
        const month = date.toLocaleString('default', { month: 'short' });
        if (monthlySpending.hasOwnProperty(month)) {
          monthlySpending[month] += t.amount;
        }
      }
    });

    return Object.keys(monthlySpending).map(month => ({
      name: month,
      total: monthlySpending[month],
    }));
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Overview</CardTitle>
        <CardDescription>Your spending summary for the last 12 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${currency}${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
              contentStyle={{ 
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
              formatter={(value: number) => [`${currency}${value.toLocaleString()}`, "Total"]}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
