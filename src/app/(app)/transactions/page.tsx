import { ArrowDownLeft, ArrowUpRight, File, ListFilter, PlusCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockTransactions } from "@/data/mock-data";

export default function TransactionsPage() {
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filter
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Food
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Transport</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    Entertainment
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
            </div>
          </div>
          <TabsContent value="all">
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
                {mockTransactions.map((transaction) => (
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
                    <TableCell className="hidden sm:table-cell">
                      <Badge className="text-xs" variant="secondary">
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
