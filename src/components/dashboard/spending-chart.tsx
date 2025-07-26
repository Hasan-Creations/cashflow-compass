"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const data = [
  { name: "Jan", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Feb", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Mar", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Apr", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "May", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jun", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Jul", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Aug", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Sep", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Oct", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Nov", total: Math.floor(Math.random() * 2000) + 500 },
  { name: "Dec", total: Math.floor(Math.random() * 2000) + 500 },
]

export function SpendingChart() {
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
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--accent))', opacity: 0.2 }}
              contentStyle={{ 
                background: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)'
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
