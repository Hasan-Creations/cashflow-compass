
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/store/user";
import { Loader2 } from "lucide-react";
import { currencies } from "@/data/mock-data";
import { deleteUserAccount } from "@/lib/firebase/users";
import { useRouter } from "next/navigation";


export default function SettingsPage() {
  const { toast } = useToast();
  const { user, setUser, currency, setCurrency } = useUserStore();
  const [name, setName] = useState(user?.name || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();


  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  const handleProfileUpdate = async () => {
    if (!user || name === user.name) return;
    setIsLoading(true);
    try {
       const response = await fetch('/api/update-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: user.id, name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile.');
      }

      const updatedUser = { ...user, name };
      setUser(updatedUser); // Update user in zustand store
      toast({
        title: "Profile Updated",
        description: "Your name has been updated successfully.",
      });

    } catch (error) {
       toast({
        variant: "destructive",
        title: "Update Failed",
        description: "Could not update your profile. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCurrencyChange = (value: string) => {
    const selectedCurrency = currencies.find(c => c.value === value);
    if(selectedCurrency) {
      setCurrency(selectedCurrency.symbol);
      toast({
        title: "Currency Updated",
        description: `Your currency has been set to ${selectedCurrency.label}.`,
      });
    }
  }

   const handleDeleteAccount = async () => {
    if (!user) return;
    setIsDeleting(true);
    try {
      await deleteUserAccount();
      toast({
        title: "Account Deleted",
        description: "Your account has been permanently deleted.",
      });
      setUser(null);
      router.push("/login");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Deletion Failed",
        description: error.message || "Could not delete your account. Please try again.",
      });
    } finally {
      setIsDeleting(false);
    }
  };

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
          <CardDescription>Update your personal information. Click save when you're done.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ""} disabled />
          </div>
           <Button onClick={handleProfileUpdate} disabled={isLoading || name === user?.name} className="w-fit">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
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
            <Select onValueChange={handleCurrencyChange} defaultValue={currencies.find(c => c.symbol === currency)?.value}>
              <SelectTrigger id="currency" className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger Zone</CardTitle>
          <CardDescription>These actions are irreversible.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-destructive/50 p-4 gap-4">
           <div>
            <h4 className="font-semibold">Delete Account</h4>
            <p className="text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
           </div>
           <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" disabled={isDeleting}>
                  {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    disabled={isDeleting}
                    className="bg-destructive hover:bg-destructive/90"
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
