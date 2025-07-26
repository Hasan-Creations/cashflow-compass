"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getSpendingRecommendations, type SpendingRecommendationsOutput } from "@/ai/flows/spending-recommendations";
import { mockTransactions, mockSavingGoals } from "@/data/mock-data";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  income: z.preprocess(
    (a) => parseFloat(z.string().parse(a)),
    z.number().positive({ message: "Income must be a positive number." })
  ),
  spendingData: z.string().min(1, { message: "Spending data is required." }),
  savingGoals: z.string().min(1, { message: "Saving goals are required." }),
});

interface RecommendationsFormProps {
  onNewRecommendation: (recommendation: SpendingRecommendationsOutput) => void;
}

export function RecommendationsForm({ onNewRecommendation }: RecommendationsFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      income: 3500,
      spendingData: JSON.stringify(mockTransactions, null, 2),
      savingGoals: JSON.stringify(mockSavingGoals, null, 2),
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const result = await getSpendingRecommendations(values);
      onNewRecommendation(result);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="income"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Monthly Income</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your monthly income" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spendingData"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spending Data (JSON)</FormLabel>
              <FormControl>
                <Textarea placeholder="Paste your spending data here" className="h-40 font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="savingGoals"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Saving Goals (JSON)</FormLabel>
              <FormControl>
                <Textarea placeholder="Paste your saving goals here" className="h-40 font-mono" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Get Recommendations"
          )}
        </Button>
      </form>
    </Form>
  );
}
