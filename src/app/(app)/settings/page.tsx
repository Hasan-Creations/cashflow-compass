
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useTransactionStore } from "@/store/transactions";
import { useToast } from "@/hooks/use-toast";
import { Transaction } from "@/types";

export default function SettingsPage() {
  const { transactions } = useTransactionStore();
  const { toast } = useToast();

  const handleExport = () => {
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
  
  const handleBackup = () => {
    // This is a placeholder for actual Google Drive integration.
    toast({
      title: "Backup Initiated",
      description: "Your data is being backed up. In a real app, this would connect to Google Drive.",
    });
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-6">
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="User" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue="user@example.com" disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize your app experience.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="currency">Currency</Label>
            <Select defaultValue="pkr">
              <SelectTrigger id="currency" className="w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pkr">PKR (₨)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or backup your financial data.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Button variant="outline" onClick={handleExport}>Export Data as CSV</Button>
          <Button variant="outline" onClick={handleBackup}>Backup to Google Drive</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
           <div>
            <h4 className="font-semibold">Delete Account</h4>
            <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
           </div>
           <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
