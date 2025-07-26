
"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Loader2, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTransactionStore } from "@/store/transactions";
import { incomeCategories, expenseCategories } from "@/data/mock-data";
import { Transaction } from "@/types";
import { useUserStore } from "@/store/user";
import { addTransaction, updateTransaction as updateTransactionInDb } from "@/lib/firebase/transactions";

const formSchema = z.object({
  description: z.string().min(1, "Description is required."),
  amount: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive("Amount must be a positive number.")
  ),
  date: z.date(),
  category: z.string().min(1, "Category is required."),
});

interface TransactionFormProps {
  type: "income" | "expense";
  open?: boolean;
  setOpen?: (open: boolean) => void;
  transaction?: Transaction;
}

export function TransactionForm({ type, open: externalOpen, setOpen: setExternalOpen, transaction }: TransactionFormProps) {
  const { toast } = useToast();
  const [internalOpen, setInternalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addTransaction: addTransactionToStore, updateTransaction: updateTransactionInStore } = useTransactionStore();
  const user = useUserStore((state) => state.user);

  const isEditMode = transaction !== undefined;
  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = setExternalOpen !== undefined ? setExternalOpen : setInternalOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date(),
      category: "",
    },
  });

  useEffect(() => {
    if (isEditMode && transaction) {
      form.reset({
        description: transaction.description,
        amount: transaction.amount,
        date: parseISO(transaction.date),
        category: transaction.category,
      });
    } else {
      form.reset({
        description: "",
        amount: 0,
        date: new Date(),
        category: "",
      });
    }
  }, [transaction, isEditMode, form]);

  const categories = type === "income" ? incomeCategories : expenseCategories;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({ variant: "destructive", title: "Error", description: "You must be logged in." });
        return;
    }
    setIsLoading(true);

    if (isEditMode && transaction) {
      const updatedTransactionData = {
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
      };
      try {
        await updateTransactionInDb(transaction.id, updatedTransactionData);
        updateTransactionInStore({ ...transaction, ...updatedTransactionData, type: transaction.type });
        toast({ title: "Success", description: "Transaction updated successfully." });
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: "Failed to update transaction." });
      }
    } else {
       const newTransactionData = {
        userId: user.id,
        type,
        ...values,
        date: format(values.date, "yyyy-MM-dd"),
      };
      try {
        const newTransaction = await addTransaction(newTransactionData);
        addTransactionToStore(newTransaction);
        toast({ title: "Success", description: `${type === 'income' ? 'Income' : 'Expense'} added successfully.` });
      } catch (error) {
        toast({ variant: "destructive", title: "Error", description: `Failed to add ${type}.` });
      }
    }

    setIsLoading(false);
    setOpen(false);
    if (!isEditMode) {
      form.reset();
    }
  }

  const dialogContent = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {isEditMode ? `Edit ${type}` : (type === "income" ? "Add New Income" : "Log New Expense")}
        </DialogTitle>
        <DialogDescription>
          {isEditMode ? "Update the details for your transaction." : `Enter the details for your new ${type}.`}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder={`e.g. ${type === 'income' ? 'Monthly Salary' : 'Coffee'}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
               {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              {isEditMode ? 'Save Changes' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );

  // If the form is for editing, we control it externally (from the table row)
  if (isEditMode) {
    return <Dialog open={open} onOpenChange={setOpen}>{dialogContent}</Dialog>
  }

  // If it's for creating, it controls its own state.
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant={type === "income" ? "outline" : "default"}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {type === "income" ? "Add Income" : "Log Expense"}
        </Button>
      </DialogTrigger>
      {dialogContent}
    </Dialog>
  );
}
